package com.cicau.book.repository;

import com.cicau.book.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
    <Optional>User findByEmail(String email);
}
