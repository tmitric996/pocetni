package com.example.proba.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.proba.model.*;
import com.example.proba.service.*;

@RestController
@RequestMapping(value = "/auth", produces = MediaType.APPLICATION_JSON_VALUE)
public class RoleController {

	@Autowired
	RoleService roleService;
	
	@PostMapping("/role/admin")
	public Role addAdminRole() {
		return roleService.saveAdmin();
	}
	@PostMapping("/role/user")
	public Role addUserRole() {
		return roleService.saveUser();
	}
	
	@GetMapping("/role")
	public List<Role> getAll(){
		return roleService.findAll();
	}
	
	@DeleteMapping("/role/{id}")
	public void delete(@PathVariable String id) {
		roleService.delete(id);
		return;
	}
}
