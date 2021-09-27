package com.example.proba.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;
import org.springframework.security.access.prepost.PreAuthorize;
import com.example.proba.model.User;
import com.example.proba.dto.JwtAuthenticationRequest;
import com.example.proba.dto.LoginResponse;
import com.example.proba.dto.UserRequest;
import com.example.proba.serviceImpl.AuthServiceImpl;

import java.util.Map;

@RestController
@RequestMapping(value = "/auth", produces = MediaType.APPLICATION_JSON_VALUE)
public class AuthController {
	
	
	@Autowired
	AuthServiceImpl authService;
	
	@PostMapping("/login")
	public ResponseEntity<LoginResponse> login(@RequestBody JwtAuthenticationRequest loginRequest){		
		return authService.login(loginRequest);	
	}
	
	//@PreAuthorize("hasRole('ADMIN')")
	@PostMapping("/signup")
	public ResponseEntity<User> register(@RequestBody UserRequest userRequest, UriComponentsBuilder ucBuilder) {
		return authService.register(userRequest, ucBuilder);
	}

	@GetMapping("/token")
	public User getUserByToken(@RequestParam final String token){
		System.out.println(authService.getCurrentUSerByToken(token));
		return  authService.getCurrentUSerByToken(token);
	}
	@GetMapping("/current")
	public User getUser(@RequestHeader Map<String, String> headers){
		System.out.println(headers.get("authorization").toString().split("\"")[1]);
		return  authService.getCurrentUSerByToken(headers.get("authorization").toString().split("\"")[1]);
	}
}
	