package com.Mamda.Mamda.repository;

import com.Mamda.Mamda.model.PasswordResetToken;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface TokenRepository extends JpaRepository<PasswordResetToken, Integer> {

    Optional<PasswordResetToken> findByToken(String token);
}
