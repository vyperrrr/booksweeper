package com.cicau.book.handler;

import com.cicau.book.enums.BusinessErrorCode;
import jakarta.mail.MessagingException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.LockedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.HashSet;
import java.util.Set;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(LockedException.class)
    public ResponseEntity<ExceptionResponse> handleException(LockedException ex) {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body(ExceptionResponse.builder()
                        .businessErrorCode(BusinessErrorCode.ACCOUNT_LOCKED.getCode())
                        .businessErrorDescription(BusinessErrorCode.ACCOUNT_LOCKED.getDescription())
                        .error(ex.getMessage())
                        .build());
    }

    @ExceptionHandler(DisabledException.class)
    public ResponseEntity<ExceptionResponse> handleException(DisabledException ex) {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body(ExceptionResponse.builder()
                        .businessErrorCode(BusinessErrorCode.ACCOUNT_DISABLED.getCode())
                        .businessErrorDescription(BusinessErrorCode.ACCOUNT_DISABLED.getDescription())
                        .error(ex.getMessage())
                        .build());
    }

    @ExceptionHandler(BadCredentialsException.class)
    public ResponseEntity<ExceptionResponse> handleException(BadCredentialsException ex) {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body(ExceptionResponse.builder()
                        .businessErrorCode(BusinessErrorCode.BAD_CREDENTIALS.getCode())
                        .businessErrorDescription(BusinessErrorCode.BAD_CREDENTIALS.getDescription())
                        .error(BusinessErrorCode.BAD_CREDENTIALS.getDescription())
                        .build());
    }

    @ExceptionHandler(MessagingException.class)
    public ResponseEntity<ExceptionResponse> handleException(MessagingException ex) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(ExceptionResponse.builder()
                        .error(ex.getMessage())
                        .build());
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ExceptionResponse> handleException(MethodArgumentNotValidException ex) {
        Set<String> errors = new HashSet<>();
        ex.getBindingResult().getAllErrors()
                .forEach(error -> errors.add(error.getDefaultMessage()));
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(ExceptionResponse.builder()
                        .validationErrors(errors)
                        .build());
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ExceptionResponse> handleException(Exception ex) {
        // logging
        ex.printStackTrace();
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(ExceptionResponse.builder()
                        .businessErrorDescription("An unexpected error occurred")
                        .error(ex.getMessage())
                        .build());
    }
}
