package com.example.proba.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class LoginResponse {
	

	private String accessToken;
	private Long expiresIn;
	
}
