package com.Mamda.Mamda.controller;

import com.Mamda.Mamda.model.ForgotPassword;
import com.Mamda.Mamda.model.ResetPassword;
import com.Mamda.Mamda.model.UserEntity;
import com.Mamda.Mamda.payload.MailBody;
import com.Mamda.Mamda.repository.ForgotPasswordRepository;
import com.Mamda.Mamda.repository.UserEntityRepository;
import com.Mamda.Mamda.service.EmailService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.util.Date;
import java.util.Objects;
import java.util.Random;

@RestController
@RequestMapping("/api/forgotPassword")
public class ForgotPasswordController {

    private final UserEntityRepository userEntityRepository;

    private final EmailService emailService;

    private final ForgotPasswordRepository forgotPasswordRepository;

    private final PasswordEncoder passwordEncoder;

    public ForgotPasswordController(UserEntityRepository userEntityRepository, EmailService emailService, ForgotPasswordRepository forgotPasswordRepository, PasswordEncoder passwordEncoder) {
        this.userEntityRepository = userEntityRepository;
        this.emailService = emailService;
        this.forgotPasswordRepository = forgotPasswordRepository;
        this.passwordEncoder = passwordEncoder;
    }

    // send email for email verification
    @PostMapping("/verifyEmail/{email}")
    public ResponseEntity<String> verifyEmail(@PathVariable String email){
        UserEntity userEntity = userEntityRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User Not Found with email: " + email));

        int otp = otpGenerator();
        MailBody mailBody = MailBody.builder()
                .to(email)
                .text("This is the OTP for your Forgot Password request" + otp)
                .subject("OTP for Forgot Password request")
                .build();

        ForgotPassword fp = ForgotPassword.builder()
                .otp(otp)
                .expirationTime(new Date(System.currentTimeMillis() + 70 * 1000))
                .userEntity(userEntity)
                .build();

        emailService.sendSimpleMessage(mailBody);
        forgotPasswordRepository.save(fp);

        return ResponseEntity.ok("Email sent successfully");

    }

    @PostMapping("/verifyOtp/{otp}/{email}")
    public ResponseEntity<String> verifyOtp(@PathVariable Integer otp, @PathVariable String email) {
        UserEntity userEntity = userEntityRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User Not Found with email: " + email));

        ForgotPassword fp = forgotPasswordRepository.findByOtpAndUser(otp, userEntity)
                .orElseThrow(() -> new RuntimeException("Invalid OTP for email: " + email));

        if (fp.getExpirationTime().before(Date.from(Instant.now()))) {
            forgotPasswordRepository.deleteById(fp.getFpid());
            return new ResponseEntity<>("OTP has expired !", HttpStatus.EXPECTATION_FAILED);
        }

        return ResponseEntity.ok("OTP verified successfully");
    }

    @PostMapping("/resetPassword/{email}")
    public ResponseEntity<String> resetPasswordHandler(@RequestBody ResetPassword resetPassword, @PathVariable String email) {
       if(!Objects.equals(resetPassword.password(), resetPassword.confirmPassword())){
           return new ResponseEntity<>("Please enter the password again!", HttpStatus.EXPECTATION_FAILED);
       }

       String encodedPassword = passwordEncoder.encode(resetPassword.password());
       userEntityRepository.updatePassword(email, encodedPassword);

       return ResponseEntity.ok("Password reset successfully");
    }


    private Integer otpGenerator(){
        Random random = new Random();
        return random.nextInt(100_000, 999_999);
    }
}
