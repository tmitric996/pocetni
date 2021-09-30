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
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
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
        List<Contact> contacts = contactRepository.findAllByUser(authService.getCurrentUSerByToken(token));
        
        return contacts;
    }

    public List<Contact> findAllFavoritesByUser(String email) {
        return contactRepository.findAllByUserAndFavorite(userRepository.findByEmail(email), true);
    }

    public Contact addContact(ContactRequest contactRequest) throws IOException {

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
        MultipartFile f = contactRequest.getPicture();

        contact.setPicture(f.getBytes());
        contact.setNickName(contactRequest.getNickName());
        return contactRepository.save(contact);

    }

    public Contact saveContact(Contact contact) {
        Contact c = contactRepository.getById(contact.getId());
        c.setNumber(contact.getNumber());
        //byte[] f = contact.getPicture();
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


    public Contact addContact(String email, String name, String lastName, String nickName, boolean favorite, String number, final MultipartFile[] picture) throws IOException {

        Contact c = new Contact();
        c.setFavorite(favorite);
        c.setName(name);
        c.setLastName(lastName);
        c.setNickName(nickName);
        User u = userRepository.findByEmail(email);
        c.setUser(u);
        Number num = new Number();
        num.setNumber(number);
        numberRepository.save(num);
        List<Number> numbers = new ArrayList<>();
        numbers.add(num);
        c.setNumber(numbers);
        if (picture!=null){
            c.setPicture(picture[0].getBytes());}
        return contactRepository.save(c);
    }

    public Contact saveContact(String id, String email, String name, String lastName, String nickName, boolean favorite, String number,final MultipartFile[] picture) throws IOException {
        Contact c = contactRepository.findById(Long.parseLong(id)).orElse(null);
        c.setFavorite(favorite);
        c.setName(name);
        c.setLastName(lastName);
        c.setNickName(nickName);

        Number num = new Number();
        num.setNumber(number);
        numberRepository.save(num);
        List<Number> numbers = new ArrayList<>();
        numbers.add(num);
        c.setNumber(numbers);
        if (picture!=null){
        c.setPicture(picture[0].getBytes());}
        return contactRepository.save(c);
    }
}
