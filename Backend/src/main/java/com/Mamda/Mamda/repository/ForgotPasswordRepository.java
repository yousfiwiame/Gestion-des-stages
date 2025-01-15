package com.Mamda.Mamda.repository;

import com.Mamda.Mamda.model.ForgotPassword;
import com.Mamda.Mamda.model.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface ForgotPasswordRepository extends JpaRepository<ForgotPassword, Integer> {

    @Query("SELECT fp FROM ForgotPassword fp WHERE fp.otp = ?1 AND fp.userEntity = ?2")
    Optional<ForgotPassword> findByOtpAndUser(Integer otp, UserEntity userEntity);
}
