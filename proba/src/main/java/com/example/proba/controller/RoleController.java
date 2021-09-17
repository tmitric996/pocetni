package com.example.proba.controller;

import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.proba.model.*;
import com.example.proba.request.*;
import com.example.proba.service.*;

@RestController
@RequestMapping(value = "/auth", produces = MediaType.APPLICATION_JSON_VALUE)
public class RoleController {

	@Autowired
	RoleService roleService;
	
	@PostMapping("/role")
	public Role signup(@RequestBody RoleRequest roleRequest) {
		return roleService.save(roleRequest);
	}
	
	@GetMapping("/role")
	public List<Role> getAll(){
		return roleService.findAll();
	}
	@GetMapping("/role/{role}")
	public Set<Role> getAllByRole(@PathVariable String role){
		return roleService.findAllByRole(role);
	}
	@PutMapping("/role/{id}")
	public Role update(@PathVariable String id, @RequestBody RoleRequest roleRequest) {
		return roleService.save(roleRequest, id);
	}
	@DeleteMapping("/role/{id}")
	public void delete(@PathVariable String id) {
		roleService.delete(id);
		return;
	}
}
