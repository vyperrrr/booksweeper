package com.cicau.book.dtos;

import com.cicau.book.entity.Role;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@Builder
public class AuthenticationResponse {
    private String firstName;
    private String lastName;
    private String email;
    private List<Role> roles;
}
