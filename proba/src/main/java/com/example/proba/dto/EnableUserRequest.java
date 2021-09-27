package com.example.proba.dto;

import lombok.Data;

@Data
public class EnableUserRequest {
    private String userId;
    private boolean enable;
}
