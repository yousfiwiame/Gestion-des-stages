package com.Mamda.Mamda.service;

import com.Mamda.Mamda.model.Etudiant;
import com.Mamda.Mamda.model.Stage;
import com.Mamda.Mamda.exception.ResourceNotFoundException;
import com.Mamda.Mamda.repository.EtudiantRepository;
import com.Mamda.Mamda.repository.StageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EtudiantService {

    @Autowired
    private EtudiantRepository etudiantRepository;

    @Autowired
    public EtudiantService(EtudiantRepository etudiantRepository) {
        this.etudiantRepository = etudiantRepository;
    }

    @Autowired
    private StageRepository stageRepository;

    //Method to create or add a new student to the list
    public Etudiant createEtudiant(Etudiant etudiant) {
        return etudiantRepository.save(etudiant);
    }

    //Method to view a student using the studentId
    public Etudiant getEtudiantById(int etudiantId) {
        return etudiantRepository.findById(etudiantId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Student not found with corresponding id: " + etudiantId));
    }

    //Method to view all the students
    public List<Etudiant> getAllEtudiants() {
        return etudiantRepository.findAll();
    }

    //Method to view all the majors
    public List<String> getFilieres() {
        return etudiantRepository.findDistinctFilieres();
    }

    //Method to view all the students of a particular major
    public List<Etudiant> getStudentsByMajor(String filiere) {
        return etudiantRepository.findByFiliere(filiere);
    }

    //Method to update the information of a student
    public Etudiant updateEtudiant(int etudiantId, Etudiant updatedEtudiant) {
        Etudiant etudiant = etudiantRepository.findById(etudiantId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Student not found with corresponding id: " + etudiantId));

        etudiant.setFirstName(updatedEtudiant.getFirstName());
        etudiant.setLastName(updatedEtudiant.getLastName());
        etudiant.setEmail(updatedEtudiant.getEmail());
        etudiant.setSexe(updatedEtudiant.getSexe());
        etudiant.setDate_naissance(updatedEtudiant.getDate_naissance());
        etudiant.setTelephone(updatedEtudiant.getTelephone());
        etudiant.setFiliere(updatedEtudiant.getFiliere());
        etudiant.setStatut(updatedEtudiant.getStatut());

        return etudiantRepository.save(etudiant);
    }

    //Method to delete a student using the studentId
    public void deleteEtudiant(int etudiantId) {
        Etudiant etudiant = etudiantRepository.findById(etudiantId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Student not found with corresponding id: " + etudiantId));

        etudiantRepository.delete(etudiant);
    }

    //Method to view all the internships associated to a student
    public List<Stage> getInternshipsByStudentId(int etudiantId) {
         etudiantRepository.findById(etudiantId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Student not found with corresponding id: " + etudiantId));

        return stageRepository.findByEtudiantId(etudiantId);
    }


    //Method to assign an internship to a student
    public void assignInternshipToStudent(int etudiantId, int stageId) {
        Etudiant etudiant = etudiantRepository.findById(etudiantId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Student not found with corresponding id: " + etudiantId));

        Stage stage = stageRepository.findById(stageId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Internship not found with corresponding id: " + stageId));
  
        // Assign internship to student logic
        stage.setEtudiant(etudiant);
        stageRepository.save(stage);
    }

    // Method to unassign an internship from a student
    public void unassignInternshipFromStudent(int etudiantId, int stageId) {
         etudiantRepository.findById(etudiantId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Student not found with corresponding id: " + etudiantId));

        Stage stage = stageRepository.findById(stageId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Internship not found with corresponding id: " + stageId));
  
        // Unassign internship from student logic
        stage.setEtudiant(null);
        stageRepository.save(stage);
    }

    // Method to get all available internships (not assigned to any student) by studentId
    public List<Stage> getAvailableInternships() {
        return stageRepository.findByEtudiantIdIsNull();
    }
}
