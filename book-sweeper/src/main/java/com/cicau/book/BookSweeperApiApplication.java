package com.cicau.book;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
public class BookSweeperApiApplication {

	public static void main(String[] args) {
		SpringApplication.run(BookSweeperApiApplication.class, args);
	}

}
