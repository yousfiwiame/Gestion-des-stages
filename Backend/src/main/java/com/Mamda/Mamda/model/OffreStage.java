package com.Mamda.Mamda.model;

import java.sql.Date;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.persistence.*;
import lombok.*;


@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "OffreStages")
public class OffreStage {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;

    @Column(name = "titreOffreStage")
    private String titreOffreStage;

    @Column(name = "lieuOffreStage")
    private String lieuOffreStage;

    @Column(name = "domaine")
    private String field;

    @JsonFormat(pattern = "dd-MM-yyyy")
    @Column(name = "dateDebut")
    private Date dateDebut;

    @JsonFormat(pattern = "dd-MM-yyyy")
    @Column(name = "dateFin")
    private Date dateFin;

    @Column(name = "dureeOffreStage")
    private String dureeOffreStage;

    @Column(name = "remunerationOffreStage")
    private String remunerationOffreStage;

    @Column(name = "descriptionOffreStage")
    private String descriptionOffreStage;

    @ManyToOne
    @JoinColumn(name = "entreprise_id")
    @JsonIgnore
    private Entreprise entreprise;

    @JsonProperty("assigned")
    public boolean isAssigned() {
        return this.entreprise != null;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getTitreOffreStage() {
        return titreOffreStage;
    }

    public void setTitreOffreStage(String titreStage) {
        this.titreOffreStage = titreStage;
    }

    public String getLieuOffreStage() {
        return lieuOffreStage;
    }

    public void setLieuOffreStage(String lieuStage) {
        this.lieuOffreStage = lieuStage;
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

    public String getDureeOffreStage() {
        return dureeOffreStage;
    }

    public void setDureeOffreStage(String dureeStage) {
        this.dureeOffreStage = dureeStage;
    }

    public String getRemunerationOffreStage() {
        return remunerationOffreStage;
    }

    public void setRemunerationOffreStage(String remunerationStage) {
        this.remunerationOffreStage = remunerationStage;
    }

    public String getDescriptionOffreStage() {
        return descriptionOffreStage;
    }

    public void setDescriptionOffreStage(String descriptionStage) {
        this.descriptionOffreStage = descriptionStage;
    }

    public Entreprise getEntreprise() {
        return entreprise;
    }

    public void setEntreprise(Entreprise entreprise) {
        this.entreprise = entreprise;
    }
}

