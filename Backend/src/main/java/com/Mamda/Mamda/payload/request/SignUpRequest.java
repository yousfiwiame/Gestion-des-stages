package com.Mamda.Mamda.payload.request;

import jakarta.validation.constraints.*;
import lombok.Data;

@Data
public class SignUpRequest {
    @NotBlank
    @Size(min = 3, max = 20)
    private String username;

    @NotBlank
    @Size(max = 50)
    @Email
    private String email;

    @NotBlank
    @Size(min = 6, max = 40)
    private String password;

    private String role;

    // Admin and Student fields
    private String firstName;
    private String lastName;
    private String sexe;

    // Student specific fields
    private String dateNaissance;
    private String telephone;
    private String filiere;
    private String statut;

    // Company specific fields
    private String raisonSociale;
    private String formeJuridique;
    private String faxEntreprise;
    private String adresseEntreprise;
    private String telephoneEntreprise;

    // Since we're using @Data, Lombok will generate all getters and setters
    // But if you need custom validation in getters/setters, you can override them:

    public void setPassword(@NotBlank @Size(min = 6, max = 40) String password) {
        this.password = password;
    }

    public void setUsername(@NotBlank @Size(min = 3, max = 20) String username) {
        this.username = username;
    }

    public void setEmail(@NotBlank @Size(max = 50) @Email String email) {
        this.email = email;
    }
}