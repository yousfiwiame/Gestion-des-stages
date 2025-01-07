package com.Mamda.Mamda.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    public void sendResetEmail(String email, String token) {
        
        String resetUrl = "http://localhost:3000/reset-password/" + token;

        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("Enter the email of the sender");
        message.setTo("enter the email of the receiver");
        message.setSubject("Réinitialisation de mot de passe");
        message.setText("Pour réinitialiser votre mot de passe, veuillez cliquer sur le lien suivant: \n" + resetUrl);  
        
        mailSender.send(message);
    }
    
}
