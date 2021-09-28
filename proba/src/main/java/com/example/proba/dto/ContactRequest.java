package com.example.proba.dto;

import com.example.proba.model.Number;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
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
    private MultipartFile picture;

}
