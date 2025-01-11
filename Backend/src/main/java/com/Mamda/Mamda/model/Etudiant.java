package com.Mamda.Mamda.model;


import jakarta.persistence.*;
import lombok.*;

import java.util.List;


@Entity
@AllArgsConstructor
@Table(name = "Etudiants")
public class Etudiant extends UserEntity {

    @Column(name = "nom")
    private String lastName;

    @Column(name = "prénom")
    private String firstName;

    @Column(name = "sexe")
    private String sexe;

    @Column(name = "dateNaissance", nullable = false)
    private String dateNaissance;
  
    @Column(name = "telephone", nullable = false)
    private String telephone;

    @Column(name = "filiere", nullable = false)
    private String filiere;

    @Column(name = "statut", nullable = false)
    private String statut;

    @OneToMany(mappedBy = "etudiant", cascade = CascadeType.ALL)
    private List<Stage> stages;

    public Etudiant(){
        this.setRole(Role.ETUDIANT);
    }

    public Etudiant(int id){
        super(id);
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

    public String getDate_naissance() {
        return dateNaissance;
    }

    public void setDate_naissance(String date_naissance) {
        this.dateNaissance = date_naissance;
    }

    public String getTelephone() {
        return telephone;
    }

    public void setTelephone(String telephone) {
        this.telephone = telephone;
    }

    public String getFiliere() {
        return filiere;
    }

    public void setFiliere(String filiere) {
        this.filiere = filiere;
    }

    public String getStatut() {
        return statut;
    }

    public void setStatut(String statut) {
        this.statut = statut;
    }

    public List<Stage> getStages() {
        return stages;
    }

    public void setStages(List<Stage> stages) {
        this.stages = stages;
    }
}
