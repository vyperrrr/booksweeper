package com.cicau.book.controller;

import com.cicau.book.dtos.AuthenticationRequest;
import com.cicau.book.dtos.AuthenticationResponse;
import com.cicau.book.dtos.RegistrationRequest;
import com.cicau.book.service.AuthenticationService;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.mail.MessagingException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("auth")
@RequiredArgsConstructor
@Tag(name = "Authentication") // Swagger tag
public class AuthenticationController {

    private final AuthenticationService authenticationService;

    @PostMapping("/register")
    @ResponseStatus(HttpStatus.ACCEPTED)
    public ResponseEntity<?> register(@RequestBody @Valid RegistrationRequest request) throws MessagingException {
        authenticationService.register(request);
        return ResponseEntity.accepted().build();
    }

    @PostMapping("/authenticate")
    public ResponseEntity<AuthenticationResponse> authenticate(@RequestBody @Valid AuthenticationRequest request, HttpServletResponse response) {
        return ResponseEntity.ok(authenticationService.authenticate(request, response));
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpServletResponse response) {
        authenticationService.logout(response);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/activate-account")
    public void confirm(@RequestParam String code) throws MessagingException {
        authenticationService.activateAccount(code);
    }

}
