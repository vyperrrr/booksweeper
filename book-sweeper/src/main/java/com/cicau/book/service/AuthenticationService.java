package com.cicau.book.service;

import com.cicau.book.dto.AuthenticationRequest;
import com.cicau.book.dto.AuthenticationResponse;
import com.cicau.book.dto.RegistrationRequest;
import com.cicau.book.entity.Token;
import com.cicau.book.entity.User;
import com.cicau.book.enums.EmailTemplateName;
import com.cicau.book.repository.RoleRepository;
import com.cicau.book.repository.TokenRepository;
import com.cicau.book.repository.UserRepository;
import com.cicau.book.security.JwtService;
import jakarta.mail.MessagingException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.security.SecureRandom;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;
    private final TokenRepository tokenRepository;
    private final EmailService emailService;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;

    @Value("${application.mailing.frontend.activation-url}")
    private String activationUrl;

    public void register(RegistrationRequest request) throws MessagingException {
        var role = roleRepository.findByName("USER")
                .orElseThrow(() -> new IllegalArgumentException("Role user was not found"));

        var user = User.builder()
                .firstName(request.getFirstName())
                .lastName(request.getLastName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .accountLocked(false)
                .enabled(false)
                .roles(List.of(role))
                .build();

        userRepository.save(user);
        sendValidationEmail(user);
    }

    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        var auth = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );

        var claims = new HashMap<String, Object>();
        var user = ((User) auth.getPrincipal());
        claims.put("fullName", user.getFullName());

        var jwtToken = jwtService.generateToken(claims, (User) auth.getPrincipal());
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .build();
    }

    private void sendValidationEmail(User user) throws MessagingException {
        var code = generateAndSaveActivationCode(user);

        emailService.sendEmail(
                user.getEmail(),
                user.getFullName(),
                "Account activation",
                EmailTemplateName.ACTIVATE_ACCOUNT,
                activationUrl,
                code
        );

    }

    private String generateAndSaveActivationCode(User user) {
        String activationCode = generateActivationCode(6);
        var token = Token.builder()
                .token(activationCode)
                .createdAt(LocalDateTime.now())
                .expiresAt(LocalDateTime.now().plusMinutes(15))
                .user(user)
                .build();
        tokenRepository.save(token);
        return activationCode;
    }

    private String generateActivationCode(int length) {
        String characters = "0123456789";
        StringBuilder codeBuilder = new StringBuilder();
        SecureRandom random = new SecureRandom();
        for(int i = 0; i < length; i++) {
            codeBuilder.append(characters.charAt(random.nextInt(characters.length())));
        }
        return codeBuilder.toString();
    }

    public void activateAccount(String code) throws MessagingException {
        Token savedCode = tokenRepository.findByToken(code)
                .orElseThrow(() -> new IllegalArgumentException("Invalid activation code"));

        if(LocalDateTime.now().isAfter(savedCode.getExpiresAt())) {
            sendValidationEmail(savedCode.getUser());
            throw new RuntimeException("Activation code expired, new code sent to your email");
        }

        var user = userRepository.findById(savedCode.getUser().getId())
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        user.setEnabled(true);

        userRepository.save(user);

        savedCode.setValidatedAt(LocalDateTime.now());

        tokenRepository.save(savedCode);
    }
}
