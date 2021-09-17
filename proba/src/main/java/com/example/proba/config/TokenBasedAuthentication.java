package com.example.proba.config;


import org.springframework.security.authentication.AbstractAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;

import lombok.Setter;

@Setter
public class TokenBasedAuthentication extends AbstractAuthenticationToken {

	private String token;
	private final UserDetails principle;
	
	public TokenBasedAuthentication(UserDetails principle) {
		super(principle.getAuthorities());
		this.principle = principle;
	}

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@Override
	public Object getCredentials() {
		return token;
	}

	@Override
	public UserDetails getPrincipal() {
		return principle;
	}
	@Override
	public boolean isAuthenticated() {
		return true;
	}

}
