package com.example.proba.controller;


import java.util.List;
import java.util.Map;

import com.example.proba.dto.ContactRequest;
import com.example.proba.dto.EnableUserRequest;
import com.example.proba.model.Contact;
import com.example.proba.serviceImpl.ContactServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.example.proba.dto.UserRequest;
import com.example.proba.model.User;
import com.example.proba.service.UserService;

@RestController
@RequestMapping(value = "/auth", produces = MediaType.APPLICATION_JSON_VALUE)
public class UserController {

	//Users
	@Autowired
	UserService userService;

	@PostMapping("/user")
	public User signup(@RequestBody UserRequest userRequest) {
		return userService.save(userRequest);
	}
	@GetMapping("/user")
	public List<User> findAll() {
		return userService.findAll();
	}
	@GetMapping("/user/{id}")
	public User findById(@PathVariable String id) {
		return userService.findById(id);
	}
	@GetMapping("/user/email/{email}")
	public User findByEmail(@PathVariable String email) {
		return userService.findByEmail(email);
	}

	@PutMapping("/user/{id}")
	public User findById(@PathVariable String id, @RequestBody UserRequest userRequest) {
		return userService.update(id, userRequest);
	}
	@PreAuthorize("hasRole('ADMIN')")
	@DeleteMapping("/user/{id}") // da bude za brisanje usera koji ne dobiju enable
	public void delete(@PathVariable String id) {
		System.out.println(id);
		userService.delete(id);
		return;
	}
	@PreAuthorize("hasRole('ADMIN')")
	@PostMapping("/user/enable")
	public User enableUser(@RequestBody String userId){
		System.out.println(userId);
		return userService.enableUser(userId.split("=")[0]);
	}
	@PreAuthorize("hasRole('ADMIN')")
	@GetMapping("/users/toenable")
	public List<User> getAllForEnable(){
		System.out.println("usao u controller");
		return  userService.getAllForEnable();
	}

	//Contacts
	@Autowired
	ContactServiceImpl contactSevice;

	@GetMapping("/contacts")
	public List<Contact> findAll(@RequestHeader Map<String, String> headers) {
		return contactSevice.findAllByUser(headers.get("authorization").toString().split("\"")[1]);
	}
	@GetMapping("/contact/{id}")
	public Contact findAll(@PathVariable String id) {
		return contactSevice.findContactById(id);
	}
	@GetMapping("/favcontacts/{email}")
	public List<Contact> findAllFavorites(@PathVariable String email) {
		return contactSevice.findAllFavoritesByUser(email);
	}
	@PostMapping("/contact")
	public Contact add(@RequestBody ContactRequest contact){
		System.out.println("usao u contactuser controler");
		return  contactSevice.addContact(contact);
	}
	@PutMapping("/contact")
	public Contact add(@RequestBody Contact contact){
		System.out.println("usao u pot contact");
		return  contactSevice.saveContact(contact);
	}
	@DeleteMapping("/contact/{id}")
	public void deleteContact(@PathVariable String id) {
		contactSevice.deleteContact(id);
		return;
	}
}
