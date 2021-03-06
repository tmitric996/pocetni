package com.example.proba.serviceImpl;

import java.util.List;
import java.util.Set;

import com.example.proba.dto.EnableUserRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.MailException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.proba.dto.UserRequest;
import com.example.proba.model.*;
import com.example.proba.model.enums.Roles;
import com.example.proba.repository.*;
import com.example.proba.service.*;

import javax.mail.MessagingException;

@Service
public class UserServiceImpl implements UserService{

	

	@Autowired
	private PasswordEncoder passwordEncoder;

	@Autowired
	MailServiceImpl emailService;
	@Autowired
	UserRepository userRepository;
	
	@Autowired
	RoleServiceImpl roleService;
	
	@Override
	public User save(UserRequest userRequest) {
		User user = new User();
		user.setEmail(userRequest.getEmail());
		user.setFirstName(userRequest.getFirstName());
		user.setLastName(userRequest.getLastName());
		user.setPassword(passwordEncoder.encode(userRequest.getPassword()));
		user.setEnabled(false);
		
		Set<Role> auth = roleService.findAllByRole(Roles.ROLE_USER);
		user.setAuthorities(auth);
		return userRepository.save(user);
	}

	@Override
	public List<User> findAll() {
		return userRepository.findAll();
	}

	@Override
	public User findById(String id) {
		return userRepository.findById(Long.parseLong(id)).orElse(null);
	}

	@Override
	public User findByEmail(String email) {
		return userRepository.findByEmail(email);
	}

	@Override
	public User update(String id, UserRequest userRequest) {
		User user = userRepository.findById(Long.parseLong(id)).orElse(null);
		user.setFirstName(userRequest.getFirstName());
		user.setLastName(userRequest.getLastName());
		return userRepository.save(user);
	}

	@Override
	public void delete(String id) {
		userRepository.delete(userRepository.getById(Long.parseLong(id)));
		return;
		
	}
	@Override
	public User enableUser(String userId) {
		User u = userRepository.findById(Long.parseLong(userId)).orElse(null);
		u.setEnabled(true);
		userRepository.save(u);
		try {
			emailService.sendNotificaitionAsync(u.getFirstName(), u.getEmail());
		} catch (MailException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (InterruptedException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (MessagingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return u;
	}

	@Override
	public List<User> getAllForEnable() {

		return userRepository.findAllByEnabled(false);
	}


}
