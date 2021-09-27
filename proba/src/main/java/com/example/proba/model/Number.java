package com.example.proba.model;

import lombok.Data;

import javax.persistence.*;

@Data
@Entity
@Table
public class Number {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String number;


}
