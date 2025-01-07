package com.Mamda.Mamda.service;

import com.Mamda.Mamda.model.OffreStage;
import com.Mamda.Mamda.exception.ResourceNotFoundException;
import com.Mamda.Mamda.repository.OffreStageRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OffreStageService {

    private OffreStageRepository offrestageRepository;

    @Autowired
    public OffreStageService(OffreStageRepository offrestageRepository) {
        this.offrestageRepository = offrestageRepository;
    }

    //Method to create or add a new internship offer to the list
    public OffreStage createOffreStage(OffreStage offrestage) {
        return offrestageRepository.save(offrestage);
    }


    //Method to view an internship offer using the internshipofferId
    public OffreStage getOffreStageById(int offrestageId) {
        return offrestageRepository.findById(offrestageId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Internship offer not found with corresponding id: " + offrestageId));
    }

    //Method to view all the fields
    public List<String> getFields() {
        return offrestageRepository.findDistinctFields();
    }

    //Method to view all the internship offers of a particular field
    public List<OffreStage> getStagesOffersByField(String field) {
        return offrestageRepository.findByField(field);
    }

    //Method to view all the internship offers
    public List<OffreStage> getAllStagesOffers() {
        return offrestageRepository.findAll();
    }

    //Method to view all the assigned internship offers
    public List<OffreStage> getAssignedStagesOffres() {
        return offrestageRepository.findByEntrepriseIdIsNotNull();
    }

    //Method to update the information of an internship offer
    public OffreStage updateStageOffer(int offrestageId, OffreStage updatedOffreStage) {
        OffreStage offrestage = offrestageRepository.findById(offrestageId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Internship offer not found with corresponding id: " + offrestageId));

        offrestage.setTitreOffreStage(updatedOffreStage.getTitreOffreStage());
        offrestage.setLieuOffreStage(updatedOffreStage.getLieuOffreStage());
        offrestage.setField(updatedOffreStage.getField());
        offrestage.setDateDebut(updatedOffreStage.getDateDebut());
        offrestage.setDateFin(updatedOffreStage.getDateFin());
        offrestage.setDureeOffreStage(updatedOffreStage.getDureeOffreStage());
        offrestage.setRemunerationOffreStage(updatedOffreStage.getRemunerationOffreStage());
        offrestage.setDescriptionOffreStage(updatedOffreStage.getDescriptionOffreStage());

        return offrestageRepository.save(offrestage);
    }

    //Method to delete an internship offer using the internshipOfferId
    public void deleteInternshipOffer(int offreStageId) {
        OffreStage offreStage = offrestageRepository.findById(offreStageId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Internship offer not found with corresponding id: " + offreStageId));

        offrestageRepository.delete(offreStage);
    }

    //Method to view all the internship offers of a particular company
    public List<OffreStage> getStagesOffresByEntrepriseId(int entrepriseId) {
        return offrestageRepository.findByEntrepriseId(entrepriseId);
    }



    //Method to show available internship offers of a company
    public List<OffreStage> getAvailableInternshipOffers() {
        return offrestageRepository.findByEntrepriseIdIsNull();
    }

    //Method to show if an internship offer is already assigned to a student
    public boolean isStageOfferAssigned(int offrestageId) {
        return offrestageRepository.existsById(offrestageId);
    }

}

