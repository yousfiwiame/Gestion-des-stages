package com.Mamda.Mamda.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@AllArgsConstructor
@Table(name = "Administrateurs")
public class Admin extends UserEntity {

    @Column(name = "nom")
    private String lastName;

    @Column(name = "prénom")
    private String firstName;

    @Column(name = "sexe")
    private String sexe;

    public Admin(int id){
        super(id);
    }

    public Admin(){
        this.setRole(Role.ADMIN);
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getSexe() {
        return sexe;
    }

    public void setSexe(String sexe) {
        this.sexe = sexe;
    }
}
