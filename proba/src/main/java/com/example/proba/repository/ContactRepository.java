package com.example.proba.repository;

import com.example.proba.model.Contact;
import com.example.proba.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ContactRepository extends JpaRepository<Contact, Long> {

    List<Contact> findAllByUser(User user);
    List<Contact> findAllByUserAndFavorite(User user, boolean favorite);
}
