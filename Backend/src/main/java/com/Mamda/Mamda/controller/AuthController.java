package com.Mamda.Mamda.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import com.Mamda.Mamda.model.UserEntity;
import com.Mamda.Mamda.model.Admin;
import com.Mamda.Mamda.model.PasswordResetToken;
import com.Mamda.Mamda.service.EmailService;
import com.Mamda.Mamda.payload.request.SignInRequest;
import com.Mamda.Mamda.payload.request.SignUpRequest;
import com.Mamda.Mamda.payload.response.JwtResponse;
import com.Mamda.Mamda.payload.response.MessageResponse;
import com.Mamda.Mamda.repository.UserEntityRepository;
import com.Mamda.Mamda.repository.EntrepriseRepository;
import com.Mamda.Mamda.repository.EtudiantRepository;
import com.Mamda.Mamda.repository.AdminRepository;
import com.Mamda.Mamda.repository.TokenRepository;
import com.Mamda.Mamda.security.jwt.JwtUtils;
import com.Mamda.Mamda.security.services.UserDetailsImpl;

import java.util.Map;
import java.util.Optional;
import java.util.UUID;
import java.time.LocalDateTime;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    UserEntityRepository userEntityRepository;

    @Autowired
    AdminRepository adminRepository;

    @Autowired
    EtudiantRepository etudiantRepository;

    @Autowired
    EntrepriseRepository entrepriseRepository;

    @Autowired
    PasswordEncoder encoder;

    @Autowired
    JwtUtils jwtUtils;

    @Autowired
    TokenRepository tokenRepository;

    @Autowired
    EmailService emailService;

    private static final Logger logger = LoggerFactory.getLogger(AuthController.class);

    @PostMapping("/signin")
    public ResponseEntity<JwtResponse> authenticateUser(@RequestBody SignInRequest loginRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);

        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();

        // Find the user to get their role
        UserEntity user = userEntityRepository.findByEmail(loginRequest.getEmail())
                .orElseThrow(() -> new UsernameNotFoundException("User Not Found with email: " + loginRequest.getEmail()));

        // Determine redirect URL based on the role
        String redirectUrl;
        String role = user.getRole().toString();

        switch(user.getRole()) {
            case ADMIN:
                redirectUrl = "/admin/dashboard";
                break;
            case ETUDIANT:
                redirectUrl = "/etudiant/dashboard";
                break;
            case ENTREPRISE:
                redirectUrl = "/entreprise/dashboard";
                break;
            default:
                redirectUrl = "/login";
                break;
        }

        JwtResponse jwtResponse = new JwtResponse(jwt, userDetails.getId(), userDetails.getUsername(),
                userDetails.getEmail(), role, redirectUrl);

        return ResponseEntity.ok(jwtResponse);
    }

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@RequestBody SignUpRequest signUpRequest) {
        // Check if email already exists
        if (userEntityRepository.existsByEmail(signUpRequest.getEmail())) {
            return ResponseEntity.badRequest()
                .body(new MessageResponse("Error: Email is already in use!"));
        }
    
        //Only allow ADMIN role for direct signup
        if (!signUpRequest.getRole().equals("ADMIN")) {
            return ResponseEntity.badRequest()
                .body(new MessageResponse("Error: Only admin registration is allowed"));
        }
    
        // Check if any admin exists
        if (adminRepository.count() > 0) {
            return ResponseEntity.badRequest()
                .body(new MessageResponse("Error: Admin already exists"));
        }

        // Create user entity for the "utilisateurs" table
    
        UserEntity userEntity = new UserEntity();
        userEntity.setUsername(signUpRequest.getUsername());
        userEntity.setEmail(signUpRequest.getEmail());
        userEntity.setPassword(encoder.encode(signUpRequest.getPassword()));
        userEntity.setRole(UserEntity.Role.ADMIN); // Set role explicitly
    
        // Save user to the user table
        userEntityRepository.save(userEntity);

        // Create and save admin for the "administrateurs" table
        Admin admin = new Admin();
        admin.setUsername(userEntity.getUsername());
        admin.setEmail(userEntity.getEmail());
        admin.setPassword(userEntity.getPassword());
        admin.setRole(userEntity.getRole());
        admin.setLastName(signUpRequest.getLastName());
        admin.setFirstName(signUpRequest.getFirstName());
        admin.setSexe(signUpRequest.getSexe());

        adminRepository.save(admin);
    
        return ResponseEntity.ok(new MessageResponse("Admin registered successfully!"));
    }

    /*@PostMapping("/login")
    private ResponseEntity<?> createUserByAdmin(SignUpRequest signUpRequest) {
        if (userEntityRepository.existsByEmail(signUpRequest.getEmail())) {
            return ResponseEntity.badRequest()
                .body(new MessageResponse("Error: Email already in use!"));
        }
    
        // Create base user entity
        UserEntity userEntity = new UserEntity();
        userEntity.setUsername(signUpRequest.getUsername());
        userEntity.setEmail(signUpRequest.getEmail());
        userEntity.setPassword(encoder.encode(signUpRequest.getPassword()));
        userEntity.setRole(UserEntity.Role.valueOf(signUpRequest.getRole()));
    
        userEntityRepository.save(userEntity);
    
        // Create specific user type based on role
        switch(signUpRequest.getRole()) {
            case "ETUDIANT":
                Etudiant etudiant = new Etudiant();
                etudiant.setUsername(userEntity.getUsername());
                etudiant.setEmail(userEntity.getEmail());
                etudiant.setPassword(userEntity.getPassword());
                etudiant.setRole(userEntity.getRole());
                etudiant.setLastName(signUpRequest.getLastName());
                etudiant.setFirstName(signUpRequest.getFirstName());
                etudiant.setSexe(signUpRequest.getSexe());
                etudiant.setDate_naissance(signUpRequest.getDateNaissance());
                etudiant.setTelephone(signUpRequest.getTelephone());
                etudiant.setFiliere(signUpRequest.getFiliere());
                etudiant.setStatut(signUpRequest.getStatut());
                etudiantRepository.save(etudiant);
                break;
    
            case "ENTREPRISE":
                Entreprise entreprise = new Entreprise();
                entreprise.setUsername(userEntity.getUsername());
                entreprise.setEmail(userEntity.getEmail());
                entreprise.setPassword(userEntity.getPassword());
                entreprise.setRole(userEntity.getRole());
                entreprise.setRaisonSociale(signUpRequest.getRaisonSociale());
                entreprise.setFormeJuridique(signUpRequest.getFormeJuridique());
                entreprise.setFaxEntreprise(signUpRequest.getFaxEntreprise());
                entreprise.setAdresseEntreprise(signUpRequest.getAdresseEntreprise());
                entreprise.setTelephoneEntreprise(signUpRequest.getTelephoneEntreprise());
                entrepriseRepository.save(entreprise);
                break;
    
            default:
                return ResponseEntity.badRequest()
                    .body(new MessageResponse("Error: Invalid role specified"));
        }
    
        return ResponseEntity.ok(new MessageResponse("User created successfully!"));
    }*/
    @PostMapping("/forgotPassword")
    public ResponseEntity<?> forgotPassword(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        logger.info("Received forgot password request for email: {}", email);

        UserEntity userEntity = userEntityRepository.findByEmail(email)
                .orElseThrow(() -> {
                    logger.error("User Not Found with email: {}", email);
                    return new UsernameNotFoundException("User Not Found with email: " + email);
                });

        // Generate a token
        String token = UUID.randomUUID().toString();
        PasswordResetToken passwordResetToken = new PasswordResetToken();
        passwordResetToken.setToken(token);
        passwordResetToken.setUserEntity(userEntity);
        passwordResetToken.setExpiryDateTime(LocalDateTime.now().plusHours(24));
        tokenRepository.save(passwordResetToken);

        // Send email
        emailService.sendResetEmail(email, token);

        logger.info("Password reset token sent to email: {}", email);
        return ResponseEntity.ok(new MessageResponse("Password reset token has been sent to your email!"));
    }

    @PostMapping("/resetPassword")
    public ResponseEntity<?> resetPassword(@RequestBody Map<String, String> request) {
        String token = request.get("token");
        String newPassword = request.get("newPassword");

        Optional<PasswordResetToken> optionalPasswordResetToken = tokenRepository.findByToken(token);
        if (!optionalPasswordResetToken.isPresent()
                || optionalPasswordResetToken.get().getExpiryDateTime().isBefore(LocalDateTime.now())) {
            logger.error("Invalid or expired token: {}", token);
            return ResponseEntity.badRequest().body(new MessageResponse("Invalid or expired token"));
        }

        PasswordResetToken passwordResetToken = optionalPasswordResetToken.get();
        UserEntity userEntity = passwordResetToken.getUserEntity();
        userEntity.setPassword(encoder.encode(newPassword));
        userEntityRepository.save(userEntity);

        tokenRepository.delete(passwordResetToken);

        logger.info("Password has been reset successfully for email: {}", userEntity.getEmail());
        return ResponseEntity.ok(new MessageResponse("Password has been reset successfully!"));
    }

    @GetMapping("/profile/{id}")
    public ResponseEntity<?> getUserProfile(@PathVariable int id) {
        try {
            UserEntity userEntity = userEntityRepository.findById(id)
                    .orElseThrow(() -> new UsernameNotFoundException("User Not Found with id: " + id));
            return ResponseEntity.ok(userEntity);
        } catch (Exception e) {
            logger.error("Error retrieving user profile for id: {}", id, e);
            return ResponseEntity.status(401).body(new MessageResponse("Error: Unauthorized"));
        }
    }

    @PutMapping("/profile/{id}")
    public ResponseEntity<?> updateUserProfile(@PathVariable int id, @RequestBody UserEntity updatedUser) {
        try {
            UserEntity currentUser = userEntityRepository.findById(id)
                    .orElseThrow(() -> new UsernameNotFoundException("User Not Found with id: " + id));

            // Update fields only if they are provided
            if (updatedUser.getUsername() != null) {
                currentUser.setUsername(updatedUser.getUsername());
            }
            if (updatedUser.getEmail() != null && !updatedUser.getEmail().isEmpty()) {
                currentUser.setEmail(updatedUser.getEmail());
            }
            if (updatedUser.getPassword() != null && !updatedUser.getPassword().isEmpty()) {
                currentUser.setPassword(encoder.encode(updatedUser.getPassword()));
            }

            userEntityRepository.save(currentUser);
            return ResponseEntity.ok(currentUser);
        } catch (UsernameNotFoundException e) {
            logger.error("Error updating user profile: User not found", e);
            return ResponseEntity.status(404).body(new MessageResponse("Error: User not found"));
        } catch (Exception e) {
            logger.error("Error updating user profile", e);
            return ResponseEntity.status(500).body(new MessageResponse("Error: Unable to update user profile"));
        }
    }
}
