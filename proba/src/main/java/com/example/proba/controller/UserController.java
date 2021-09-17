package com.example.proba.controller;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.proba.dto.UserRequest;
import com.example.proba.model.User;
import com.example.proba.service.UserService;

@RestController
@RequestMapping(value = "/auth", produces = MediaType.APPLICATION_JSON_VALUE)
public class UserController {
	
	@Autowired
	UserService userService;
	
	@PostMapping("/user")
	public User signup(@RequestBody UserRequest userRequest) {
		return userService.save(userRequest);
	}
	@GetMapping("/user")
	public List<User> findAll() {
		return userService.findAll();
	}
	@GetMapping("/user/{id}")
	public User findById(@PathVariable String id) {
		return userService.findById(id);
	}
	@GetMapping("/user/email/{email}")
	public User findByEmail(@PathVariable String email) {
		return userService.findByEmail(email);
	}

	@PutMapping("/user/{id}")
	public User findById(@PathVariable String id, @RequestBody UserRequest userRequest) {
		return userService.update(id, userRequest);
	}
	
	@DeleteMapping("/user/{id}")
	public void delete(@PathVariable String id) {
		userService.delete(id);
		return;
	}
}
