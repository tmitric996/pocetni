package com.example.proba.serviceImpl;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.proba.model.Role;
import com.example.proba.model.enums.Roles;
import com.example.proba.service.RoleService;
import com.example.proba.repository.*;

@Service
public class RoleServiceImpl implements RoleService{

	@Autowired
	RoleRepository roleRepository;
	
	@Override
	public Role saveAdmin() {
		Role role = new Role();
		role.setRole(Roles.ROLE_ADMIN);
		return roleRepository.save(role);
	}
	@Override
	public Role saveUser() {
		Role role = new Role();
		role.setRole(Roles.ROLE_USER);
		return roleRepository.save(role);
	}

	@Override
	public Set<Role> findAllByRole(Roles role) {
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
	public void delete(String id) {
		roleRepository.deleteById(Long.parseLong(id));
		return;
	}

}
