package com.example.proba.serviceImpl;

import java.util.Collections;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.proba.model.Role;
import com.example.proba.request.RoleRequest;
import com.example.proba.service.RoleService;
import com.example.proba.repository.*;

@Service
public class RoleServiceImpl implements RoleService{

	@Autowired
	RoleRepository roleRepository;
	
	@Override
	public Role save(RoleRequest roleRequest) {
		Role role = new Role();
		role.setRole(roleRequest.getRole());
		return roleRepository.save(role);
	}

	@Override
	public Set<Role> findAllByRole(String role) {
		List<Role> temp = roleRepository.findAllByRole(role);
		Set<Role> roles =  new HashSet<Role>(temp);
		System.out.println(roles);
		return roles;
	}

	public Role findById(String id) {
		return roleRepository.findById(Long.parseLong(id)).orElse(null);
	}

	public Set<Role> findAlltoSet() {
		return (Set<Role>) roleRepository.findAll();
	}
	
	@Override
	public List<Role> findAll(){
		return roleRepository.findAll();
	}

	@Override
	public Role save(RoleRequest roleRequest, String id) {
		Role role = findById(id);
		role.setRole(roleRequest.getRole());
		return roleRepository.save(role);
	}

	@Override
	public void delete(String id) {
		roleRepository.deleteById(Long.parseLong(id));
		return;
	}

}
