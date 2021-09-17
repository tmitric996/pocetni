package com.example.proba.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.proba.model.Role;
import com.example.proba.model.enums.Roles;

public interface RoleRepository extends JpaRepository<Role, Long> {

	List<Role> findAllByRole(Roles role);
	
}
