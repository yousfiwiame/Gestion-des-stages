package com.Mamda.Mamda.service;

import com.Mamda.Mamda.model.Entreprise;
import com.Mamda.Mamda.model.OffreStage;
import com.Mamda.Mamda.exception.ResourceNotFoundException;
import com.Mamda.Mamda.repository.EntrepriseRepository;
import com.Mamda.Mamda.repository.OffreStageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EntrepriseService {

    @Autowired
    private EntrepriseRepository entrepriseRepository;

    @Autowired
    public EntrepriseService(EntrepriseRepository entrepriseRepository) {
        this.entrepriseRepository = entrepriseRepository;
    }

    @Autowired
    private OffreStageRepository offrestageRepository;

    //Method to create or add a new company to the list
    public Entreprise createEntreprise(Entreprise entreprise) {
        return entrepriseRepository.save(entreprise);
    }

    //Method to view a comapny using the companyId
    public Entreprise getEntrepriseById(int entrepriseId) {
        return entrepriseRepository.findById(entrepriseId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Company not found with corresponding id: " + entrepriseId));
    }

    //Method to view all the companies
    public List<Entreprise> getAllEntreprises() {
        return entrepriseRepository.findAll();
    }

    //Method to view all the raisons sociales
    public List<String> getRaisonSociale() {
        return entrepriseRepository.findDistinctRaisonsSociales();
    }

    //Method to view all the companies of a particular raison sociale
    public List<Entreprise> getEntreprisesByRaisonSociale(String raisonSociale) {
        return entrepriseRepository.findByRaisonSociale(raisonSociale);
    }

    //Method to update the information of a company
    public Entreprise updateEntreprise(int entrepriseId, Entreprise updatedEntreprise) {
        Entreprise entreprise = entrepriseRepository.findById(entrepriseId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Company not found with corresponding id: " + entrepriseId));

        entreprise.setRaisonSociale(updatedEntreprise.getRaisonSociale());
        entreprise.setFormeJuridique(updatedEntreprise.getFormeJuridique());
        entreprise.setFaxEntreprise(updatedEntreprise.getFaxEntreprise());
        entreprise.setAdresseEntreprise(updatedEntreprise.getAdresseEntreprise());
        entreprise.setTelephoneEntreprise(updatedEntreprise.getTelephoneEntreprise());

        return entrepriseRepository.save(entreprise);
    }

    //Method to delete a company using the companyId
    public void deleteEntreprise(int entrepriseId) {
        Entreprise entreprise = entrepriseRepository.findById(entrepriseId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Company not found with corresponding id: " + entrepriseId));

        entrepriseRepository.delete(entreprise);
    }

    //Method to view all the internship offers associated to a company
    public List<OffreStage> getInternshipOffersByEntrepriseId(int entrepriseId) {
        entrepriseRepository.findById(entrepriseId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Company not found with corresponding id: " + entrepriseId));

        return offrestageRepository.findByEntrepriseId(entrepriseId);
    }

    // Method to get all available internship offers (not assigned to any student) by companyId
    public List<OffreStage> getAvailableInternshipOffers() {
        return offrestageRepository.findByEntrepriseIdIsNull();
    }
}
