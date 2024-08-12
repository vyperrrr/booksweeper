package com.cicau.book;

import com.cicau.book.entity.Role;
import com.cicau.book.repository.RoleRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.scheduling.annotation.EnableAsync;

@SpringBootApplication
@EnableJpaAuditing
@EnableAsync
public class BookSweeperApiApplication {

	public static void main(String[] args) {
		SpringApplication.run(BookSweeperApiApplication.class, args);
	}

	@Bean
	public CommandLineRunner commandLineRunner(RoleRepository roleRepository) {
		return args -> {
			if(roleRepository.findByName("USER").isEmpty())
				roleRepository.save(Role
						.builder()
						.name("USER")
						.build());

		};
	}

}
