package com.example.proba.serviceImpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.util.UriComponentsBuilder;

import com.example.proba.config.TokenUtils;
import com.example.proba.dto.JwtAuthenticationRequest;
import com.example.proba.dto.LoginResponse;
import com.example.proba.dto.UserRequest;
import com.example.proba.exception.ResourceConflictException;
import com.example.proba.model.User;
import com.example.proba.service.UserService;

@Service
public class AuthServiceImpl {

	@Autowired
	private AuthenticationManager authenticationManager; 
	
	@Autowired
	TokenUtils tokenUtils;
	
	@Autowired
	UserService userService;
	
	public ResponseEntity<LoginResponse> login(JwtAuthenticationRequest loginRequest) {
		Authentication auth = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword()));
		//TODO: ako autentifikacija ne prodje uspesno
		
		SecurityContextHolder.getContext().setAuthentication(auth);
		
		User user = (User) auth.getPrincipal();
		if (!user.isEnabled()){
			return (ResponseEntity<LoginResponse>) ResponseEntity.badRequest();
		} else {
			String jwt = tokenUtils.generateToken(user.getEmail());
			Long expiresIn = Long.parseLong(Integer.toString(tokenUtils.getExpiredIn()));

			return ResponseEntity.ok(new LoginResponse(jwt, expiresIn));
		}
	}

	public ResponseEntity<User> register(UserRequest userRequest, UriComponentsBuilder ucBuilder) {
		User existUser = this.userService.findByEmail(userRequest.getEmail());
		if (existUser != null) {
			throw new ResourceConflictException(existUser.getId(), "Account with this email already exists");
		}
		
		User user = this.userService.save(userRequest);
		HttpHeaders headers = new HttpHeaders();
		headers.setLocation(ucBuilder.path("/auth/user/{userId}").buildAndExpand(user.getId()).toUri());
		return new ResponseEntity<>(user, HttpStatus.CREATED);
	}


	public User getCurrentUSerByToken(String token) {
		System.out.println(token);
		String email = tokenUtils.getUsernameFromToken(token);
		System.out.println(email);
		User user = userService.findByEmail(email);
		return user;
	}

}
