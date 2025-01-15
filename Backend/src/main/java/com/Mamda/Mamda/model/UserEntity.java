package com.Mamda.Mamda.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@AllArgsConstructor
@Inheritance(strategy = InheritanceType.JOINED)
@Table(name = "utilisateurs")
public class UserEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;

    @Column(name = "username", nullable = false, unique = true)
    private String username;

    @Column(name = "email", nullable = false, unique = true)
    private String email;

    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private String password;

    @OneToOne(mappedBy = "userEntity")
    private ForgotPassword forgotPassword;

    @Enumerated(EnumType.STRING)
    private Role role;

    public UserEntity(){
    }

    public Role getRole() {
        return role;
    }

    public enum Role {
        ETUDIANT,
        ENTREPRISE,
        ADMIN
    }

    public void setRole(Role role) {
        this.role = role;
    }

    public UserEntity(int id){
        this.id = id;
    }

    public int getId() {
        return id;
    }

    public String getUsername() {
        return username;
    }

    public String getEmail() {
        return email;
    }

    public String getPassword() {
        return password;
    }

    public ForgotPassword getForgotPassword() {
        return forgotPassword;
    }

    public void setId(int id) {
        this.id = id;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setForgotPassword(ForgotPassword forgotPassword) {
        this.forgotPassword = forgotPassword;
    }
}
