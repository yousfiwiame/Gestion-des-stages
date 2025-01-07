package com.Mamda.Mamda.service;

import com.Mamda.Mamda.model.Etudiant;
import com.Mamda.Mamda.model.Stage;
import com.Mamda.Mamda.exception.ResourceNotFoundException;
import com.Mamda.Mamda.repository.StageRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StageService {

    private StageRepository stageRepository;

    @Autowired
    public StageService(StageRepository stageRepository) {
        this.stageRepository = stageRepository;
    }

    //Method to create or add a new internship to the list
    public Stage createStage(Stage stage) {
        return stageRepository.save(stage);
    }

    
    //Method to view an internship using the stageId
    public Stage getStageById(int stageId) {
        return stageRepository.findById(stageId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Internship not found with corresponding id: " + stageId));
    }

    //Method to view all the fields
    public List<String> getFields() {
        return stageRepository.findDistinctFields();
    }

    //Method to view all the internships of a particular field
    public List<Stage> getStagesByField(String field) {
        return stageRepository.findByField(field);
    }

    //Method to view all the internships
    public List<Stage> getAllStages() {
        return stageRepository.findAll();
    }

    //Method to view all the assigned internships
    public List<Stage> getAssignedStages() {
        return stageRepository.findByEtudiantIdIsNotNull();
    } 

    //Method to update the information of an internship
    public Stage updateStage(int stageId, Stage updatedStage) {
        Stage stage = stageRepository.findById(stageId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Internship not found with corresponding id: " + stageId));

        stage.setTitreStage(updatedStage.getTitreStage());
        stage.setLieuStage(updatedStage.getLieuStage());
        stage.setField(updatedStage.getField());
        stage.setDateDebut(updatedStage.getDateDebut());
        stage.setDateFin(updatedStage.getDateFin());
        stage.setDureeStage(updatedStage.getDureeStage());
        stage.setStatutStage(updatedStage.getStatutStage());
        stage.setAppreciationStage(updatedStage.getAppreciationStage());
        stage.setRemunerationStage(updatedStage.getRemunerationStage());
        stage.setDescriptionStage(updatedStage.getDescriptionStage());

        return stageRepository.save(stage);
    }

    //Method to delete an internship using the stageId
    public void deleteInternship(int stageId) {
        Stage stage = stageRepository.findById(stageId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Internship not found with corresponding id: " + stageId));

        stageRepository.delete(stage);
    }

    //Method to view all the internships of a particular student
    public List<Stage> getStagesByEtudiantId(int etudiantId) {
        return stageRepository.findByEtudiantId(etudiantId);
    }

    //Method to assign internships to a student
    public Stage assignStageToEtudiant(int etudiantId, Stage stage) {
        stage.setEtudiant(new Etudiant(etudiantId));
        return stageRepository.save(stage);
    }

    //Method to show available internships of a student
    public List<Stage> getAvailableInternships() {
        return stageRepository.findByEtudiantIdIsNull();
    }

    //Method to show if an internship is already assigned to a student
    public boolean isStageAssigned(int stageId) {
        return stageRepository.existsById(stageId);
    }

    // Method to get date of assignment of an internship
    /*public String getDateOfAssignment(int stageId) {
        Stage stage = stageRepository.findById(stageId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Internship not found with corresponding id: " + stageId));
        return stage.getDateAffectation().toString();
    }*/
}
