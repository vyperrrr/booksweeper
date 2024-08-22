package com.cicau.book.seeder;

import com.cicau.book.entity.Book;
import com.cicau.book.entity.Role;
import com.cicau.book.entity.User;
import com.cicau.book.repository.BookRepository;
import com.cicau.book.repository.RoleRepository;
import com.cicau.book.repository.UserRepository;
import com.github.javafaker.Faker;
import com.github.javafaker.service.FakeValuesInterface;
import com.github.javafaker.service.FakeValuesService;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import javax.management.relation.RoleNotFoundException;
import java.time.LocalDate;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

@Configuration
@RequiredArgsConstructor
public class DatabaseSeeder implements ApplicationRunner {

    private final Faker faker = new Faker();

    private final RoleRepository roleRepository;
    private final UserRepository userRepository;
    private final BookRepository bookRepository;

    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(ApplicationArguments args) throws Exception {

            List<Role> roles = generateRoles();
            List<User> users = generateUsers();
            List<Book> books = generateBooks();

            roleRepository.saveAll(roles);
            userRepository.saveAll(users);
            bookRepository.saveAll(books);

            users.forEach(user -> {
                user.setRoles(Collections.singletonList(roles.get(faker.random().nextInt(0, roles.size()-1))));
                userRepository.save(user);
            });

            books.forEach(book -> {
                book.setOwner(users.get(faker.random().nextInt(0, users.size()-1)));
                bookRepository.save(book);
            });

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

    public List<User> generateUsers() {

        return IntStream.range(0, faker.random().nextInt(3, 10))
                .mapToObj(i -> User.builder()
                        .firstName(faker.name().firstName())
                        .lastName(faker.name().lastName())
                        .dateOfBirth(LocalDate.now().minusYears(faker.random().nextInt(18, 100)))
                        .email(faker.internet().emailAddress())
                        .password(passwordEncoder.encode("password"))
                        .accountLocked(faker.random().nextBoolean())
                        .enabled(faker.random().nextBoolean())
                        .build())
                .collect(Collectors.toList());

    }

    public List<Book> generateBooks() {

        return IntStream.range(0, faker.random().nextInt(30, 60))
                .mapToObj(i -> Book.builder()
                        .title(faker.book().title())
                        .authorName(faker.book().author())
                        .isbn(faker.code().isbn10())
                        .synopsis(faker.lorem().paragraph())
                        .bookCoverUrl(faker.internet().image())
                        .shareable(faker.random().nextBoolean())
                        .archived(faker.random().nextBoolean())
                        .build())
                .collect(Collectors.toList());
    }

}
