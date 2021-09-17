package com.example.proba.service;

import com.example.proba.request.RoleRequest;

import java.util.List;
import java.util.Set;

import com.example.proba.model.*;
public interface RoleService {
	
	Role save(RoleRequest roleRequest);

	Set<Role> findAllByRole(String role);

	List<Role> findAll();

	Role save(RoleRequest roleRequest, String id);

	void delete(String id);

}
