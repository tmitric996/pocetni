package com.example.proba.service;

import java.util.List;
import java.util.Set;

import com.example.proba.model.*;
import com.example.proba.model.enums.Roles;
public interface RoleService {
	
	Role saveAdmin();
	Role saveUser();
	
	Set<Role> findAllByRole(Roles role);

	List<Role> findAll();


	void delete(String id);

}
