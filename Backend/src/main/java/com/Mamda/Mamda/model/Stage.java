package com.Mamda.Mamda.model;

import java.sql.Date;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.persistence.*;
import lombok.*;


@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "Stages")
public class Stage {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;

    @Column(name = "titreStage")
    private String titreStage;

    @Column(name = "lieuStage")
    private String lieuStage;

    @Column(name = "domaine")
    private String field;

    @Column(name = "dateDebut")
    private Date dateDebut;

    @Column(name = "dateFin")
    private Date dateFin;

    @Column(name = "dureeStage")
    private String dureeStage;

    @Column(name = "statutStage")
    private String statutStage;

    @Column(name = "appreciationStage")
    private String appreciationStage;

    @Column(name = "remunerationStage")
    private String remunerationStage;

    @Column(name = "descriptionStage")
    private String descriptionStage;

    @ManyToOne
    @JoinColumn(name = "etudiant_id")
    @JsonIgnore
    private Etudiant etudiant;

    @JsonProperty("assigned")
    public boolean isAssigned() {
        return this.etudiant != null;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getTitreStage() {
        return titreStage;
    }

    public void setTitreStage(String titreStage) {
        this.titreStage = titreStage;
    }

    public String getLieuStage() {
        return lieuStage;
    }

    public void setLieuStage(String lieuStage) {
        this.lieuStage = lieuStage;
    }

    public String getField() {
        return field;
    }

    public void setField(String field) {
        this.field = field;
    }

    public Date getDateDebut() {
        return dateDebut;
    }

    public void setDateDebut(Date dateDebut) {
        this.dateDebut = dateDebut;
    }

    public Date getDateFin() {
        return dateFin;
    }

    public void setDateFin(Date dateFin) {
        this.dateFin = dateFin;
    }

    public String getDureeStage() {
        return dureeStage;
    }

    public void setDureeStage(String dureeStage) {
        this.dureeStage = dureeStage;
    }

    public String getStatutStage() {
        return statutStage;
    }

    public void setStatutStage(String statutStage) {
        this.statutStage = statutStage;
    }

    public String getAppreciationStage() {
        return appreciationStage;
    }

    public void setAppreciationStage(String appreciationStage) {
        this.appreciationStage = appreciationStage;
    }

    public String getRemunerationStage() {
        return remunerationStage;
    }

    public void setRemunerationStage(String remunerationStage) {
        this.remunerationStage = remunerationStage;
    }

    public String getDescriptionStage() {
        return descriptionStage;
    }

    public void setDescriptionStage(String descriptionStage) {
        this.descriptionStage = descriptionStage;
    }

    public Etudiant getEtudiant() {
        return etudiant;
    }

    public void setEtudiant(Etudiant etudiant) {
        this.etudiant = etudiant;
    }
}

