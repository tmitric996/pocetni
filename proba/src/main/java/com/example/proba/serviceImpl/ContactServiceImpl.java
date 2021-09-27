package com.example.proba.serviceImpl;

import com.example.proba.dto.ContactRequest;
import com.example.proba.dto.NumberRequest;
import com.example.proba.model.Contact;
import com.example.proba.model.Number;
import com.example.proba.model.User;
import com.example.proba.repository.ContactRepository;
import com.example.proba.repository.NumberRepository;
import com.example.proba.repository.UserRepository;
import com.example.proba.service.ContactService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ContactServiceImpl implements ContactService {

    @Autowired
    ContactRepository contactRepository;
    @Autowired
    UserRepository userRepository;
    @Autowired
    NumberRepository numberRepository;
    @Autowired
    AuthServiceImpl authService;

    public List<Contact> findAllByUser(String token) {

        return contactRepository.findAllByUser(authService.getCurrentUSerByToken(token));
    }

    public List<Contact> findAllFavoritesByUser(String email) {
        return contactRepository.findAllByUserAndFavorite(userRepository.findByEmail(email), true);
    }

    public Contact addContact(ContactRequest contactRequest) {

        User u =userRepository.findByEmail(contactRequest.getEmail());
        Contact contact = new Contact();
        contact.setUser(u);
        contact.setFavorite(contactRequest.isFavorite());
        contact.setLastName(contactRequest.getLastName());
        contact.setName(contactRequest.getName());
        //contact.setNumber(contactRequest.getNumber());
        List<NumberRequest> nums = contactRequest.getNumber();
        List<Number> numbers = new ArrayList<>();
        for (NumberRequest n: nums) {
            Number num = new Number();
            num.setNumber(n.getNumber());
            numberRepository.save(num);
            numbers.add(num);
        }
        contact.setNumber(numbers);
        contact.setPicture(contactRequest.getPicture());
        contact.setNickName(contactRequest.getNickName());
        return contactRepository.save(contact);

    }

    public Contact saveContact(Contact contact) {
        System.out.println(contact);
        Contact c = contactRepository.getById(contact.getId());
        c.setNumber(contact.getNumber());
        c.setPicture(contact.getPicture());
        c.setName(contact.getName());
        c.setFavorite(contact.isFavorite());
        c.setLastName(contact.getLastName());
        c.setNickName(contact.getNickName());

        return contactRepository.save(c);
    }

    public void deleteContact(String id) {
        contactRepository.delete(contactRepository.getById(Long.parseLong(id)));
    }

    public Contact findContactById(String id) {
      return contactRepository.findById(Long.parseLong(id)).orElse(null);
    }
}
