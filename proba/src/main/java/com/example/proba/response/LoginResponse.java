package com.example.proba.response;

import lombok.Data;

@Data
public class LoginResponse {

	
	private String accessToken;
	private Long expiresIn;
	
	public LoginResponse(String jwt, int expiresIn2) {
		accessToken=jwt;
		expiresIn = Long.parseLong(Integer.toString(expiresIn2));
	}
}
