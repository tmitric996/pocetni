package com.example.proba.service;

import java.util.List;

import com.example.proba.dto.EnableUserRequest;
import com.example.proba.dto.UserRequest;
import com.example.proba.model.User;

public interface UserService {

	User save(UserRequest userRequest);

	List<User> findAll();

	User findById(String id);

	User findByEmail(String email);

	User update(String id, UserRequest userRequest);

	void delete(String id);


	User enableUser(String userId);

	List<User> getAllForEnable();
}
