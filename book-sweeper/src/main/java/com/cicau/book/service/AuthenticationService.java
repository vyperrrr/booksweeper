package com.cicau.book.service;

import com.cicau.book.dtos.AuthenticationRequest;
import com.cicau.book.dtos.AuthenticationResponse;
import com.cicau.book.dtos.RegistrationRequest;
import com.cicau.book.entity.Token;
import com.cicau.book.entity.User;
import com.cicau.book.enums.EmailTemplateName;
import com.cicau.book.repository.RoleRepository;
import com.cicau.book.repository.TokenRepository;
import com.cicau.book.repository.UserRepository;
import jakarta.mail.MessagingException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
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

    public AuthenticationResponse authenticate(AuthenticationRequest request, HttpServletResponse response) {
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

        Cookie cookie = new Cookie("access_token", jwtToken);
        cookie.setHttpOnly(true);
        cookie.setSecure(true);
        cookie.setPath("/");
        response.addCookie(cookie);

        return AuthenticationResponse.builder()
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .email(user.getEmail())
                .roles(user.getRoles())
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
        Token savedToken = tokenRepository.findByToken(code)
                .orElseThrow(() -> new RuntimeException("Invalid code"));
        if (LocalDateTime.now().isAfter(savedToken.getExpiresAt())) {
            sendValidationEmail(savedToken.getUser());
            throw new RuntimeException("Activation code has expired. A new code has been send to the same email address");
        }

        var user = userRepository.findById(savedToken.getUser().getId())
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
        user.setEnabled(true);
        userRepository.save(user);

        savedToken.setValidatedAt(LocalDateTime.now());
        tokenRepository.save(savedToken);
    }

    public void logout(HttpServletResponse response) {
        Cookie cookie = new Cookie("access_token", null);
        cookie.setHttpOnly(true);
        cookie.setSecure(true);
        cookie.setPath("/");
        cookie.setMaxAge(0);
        response.addCookie(cookie);
    }
}
