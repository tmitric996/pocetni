package com.example.proba.controller;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.UriComponentsBuilder;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import com.example.proba.model.User;
import com.example.proba.request.*;
import com.example.proba.exception.*;
import com.example.proba.request.JwtAuthenticationRequest;
import com.example.proba.response.LoginResponse;
import com.example.proba.security.TokenUtils;
import com.example.proba.serviceImpl.UserServiceImpl;

@RestController
@RequestMapping(value = "/auth", produces = MediaType.APPLICATION_JSON_VALUE)
public class AuthController {

	@Autowired
	private AuthenticationManager authenticationManager;
	
	@Autowired
	TokenUtils tokenUtils;
	
	@Autowired
	UserServiceImpl userService;
	
	@PostMapping("/login")
	public ResponseEntity<LoginResponse> login(@RequestBody JwtAuthenticationRequest loginRequest){
		Authentication auth = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword()));
		//TODO: ako autentifikacija ne prodje uspesno
		
		SecurityContextHolder.getContext().setAuthentication(auth);
		
		User user = (User) auth.getPrincipal();
		String jwt = tokenUtils.generateToken(user.getEmail());
		int expiresIn = tokenUtils.getExpiredIn();
		
		return ResponseEntity.ok(new LoginResponse(jwt, expiresIn));
	}

	@PostMapping("/signup")
	public ResponseEntity<User> register(@RequestBody UserRequest userRequest, UriComponentsBuilder ucBuilder) {

		User existUser = this.userService.findByEmail(userRequest.getEmail());
		if (existUser != null) {
			throw new ResourceConflictException(existUser.getId(), "Account with this email already exists");
		}
		
		User user = this.userService.save(userRequest);
		HttpHeaders headers = new HttpHeaders();
		headers.setLocation(ucBuilder.path("/auth/user/{userId}").buildAndExpand(user.getId()).toUri());
		return new ResponseEntity<>(user, HttpStatus.CREATED);
	}
}
	