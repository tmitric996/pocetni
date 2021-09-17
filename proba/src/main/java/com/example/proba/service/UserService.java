package com.example.proba.service;

import java.util.List;

import com.example.proba.model.User;
import com.example.proba.request.UserRequest;

public interface UserService {

	User save(UserRequest userRequest);

	List<User> findAll();

	User findById(String id);

	User findByEmail(String email);

	User update(String id, UserRequest userRequest);

	void delete(String id);

}
