package com.example.proba.repository;

import com.example.proba.model.Number;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NumberRepository extends JpaRepository<Number, Long> {
}
