package com.Mamda.Mamda.model;


import jakarta.persistence.*;
import lombok.*;

import java.util.List;


@Entity
@AllArgsConstructor
@Table(name = "Entreprises")
public class Entreprise extends UserEntity {

    @Column(name = "raison_sociale", nullable = false)
    private String raisonSociale;

    @Column(name = "forme_juridique", nullable = false)
    private String formeJuridique;

    @Column(name = "fax_entreprise")
    private String faxEntreprise;

    @Column(name = "adresse_entreprise")
    private String adresseEntreprise;

    @Column(name = "telephone_entreprise")
    private String telephoneEntreprise;


    @OneToMany(mappedBy = "entreprise", cascade = CascadeType.ALL)
    private List<OffreStage> offreStages;

    public Entreprise(int id){
        super(id);
    }

    public Entreprise(){
        this.setRole(Role.ENTREPRISE);
    }


    public String getRaisonSociale() {
        return raisonSociale;
    }

    public void setRaisonSociale(String raisonSociale) {
        this.raisonSociale = raisonSociale;
    }

    public String getFormeJuridique() {
        return formeJuridique;
    }

    public void setFormeJuridique(String formeJuridique) {
        this.formeJuridique = formeJuridique;
    }

    public String getFaxEntreprise() {
        return faxEntreprise;
    }

    public void setFaxEntreprise(String faxEntreprise) {
        this.faxEntreprise = faxEntreprise;
    }

    public String getAdresseEntreprise() {
        return adresseEntreprise;
    }

    public void setAdresseEntreprise(String adresseEntreprise) {
        this.adresseEntreprise = adresseEntreprise;
    }

    public String getTelephoneEntreprise() {
        return telephoneEntreprise;
    }

    public void setTelephoneEntreprise(String telephoneEntreprise) {
        this.telephoneEntreprise = telephoneEntreprise;
    }

    public List<OffreStage> getOffreStages() {
        return offreStages;
    }

    public void setOffreStages(List<OffreStage> offreStages) {
        this.offreStages = offreStages;
    }
}
