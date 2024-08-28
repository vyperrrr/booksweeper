package com.cicau.book.seeder;

import com.cicau.book.book.Book;
import com.cicau.book.role.Role;
import com.cicau.book.user.User;
import com.cicau.book.book.BookRepository;
import com.cicau.book.role.RoleRepository;
import com.cicau.book.user.UserRepository;
import com.github.javafaker.Faker;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.time.LocalDate;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

@Configuration
@RequiredArgsConstructor
public class DatabaseSeeder implements ApplicationRunner {

    private final RoleRepository roleRepository;

    @Override
    public void run(ApplicationArguments args) throws Exception {

            List<Role> roles = generateRoles();

            roleRepository.saveAll(roles);

    }

    public List<Role> generateRoles() {

        Role USER = Role.builder()
                .name("USER")
                .build();

        Role ADMIN = Role.builder()
                .name("ADMIN")
                .build();

        return List.of(USER, ADMIN);

    }
}
