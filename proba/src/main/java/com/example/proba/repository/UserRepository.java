package com.example.proba.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.proba.model.User;

public interface UserRepository extends JpaRepository<User, Long>{

	User findByEmail(String email);

}
