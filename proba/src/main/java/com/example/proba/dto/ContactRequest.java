package com.example.proba.dto;

import com.example.proba.model.Number;
import lombok.Data;

import java.util.List;

@Data
public class ContactRequest {
    private String email;
    private String name;
    private String lastName;
    private String nickName;
    private boolean favorite;
   // private String number;
    private List<NumberRequest> number;
    private byte[] picture;

}
