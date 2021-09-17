package com.example.proba.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.UriComponentsBuilder;
import org.springframework.security.access.prepost.PreAuthorize;
import com.example.proba.model.User;
import com.example.proba.dto.JwtAuthenticationRequest;
import com.example.proba.dto.LoginResponse;
import com.example.proba.dto.UserRequest;
import com.example.proba.serviceImpl.AuthServiceImpl;
@RestController
@RequestMapping(value = "/auth", produces = MediaType.APPLICATION_JSON_VALUE)
public class AuthController {
	
	
	@Autowired
	AuthServiceImpl authService;
	
	@PostMapping("/login")
	public ResponseEntity<LoginResponse> login(@RequestBody JwtAuthenticationRequest loginRequest){		
		return authService.login(loginRequest);	
	}
	
	@PreAuthorize("hasRole('ADMIN')")
	@PostMapping("/signup")
	public ResponseEntity<User> register(@RequestBody UserRequest userRequest, UriComponentsBuilder ucBuilder) {
		return authService.register(userRequest, ucBuilder);
	}
}
	