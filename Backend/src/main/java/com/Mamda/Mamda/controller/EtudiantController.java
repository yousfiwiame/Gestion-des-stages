package com.Mamda.Mamda.controller;

import com.Mamda.Mamda.model.Etudiant;
import com.Mamda.Mamda.model.Stage;
import com.Mamda.Mamda.service.EtudiantService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/etudiants")
public class EtudiantController {

    private final EtudiantService etudiantService;

    public EtudiantController(EtudiantService etudiantService) {
        this.etudiantService = etudiantService;
    }

    // Build Add Student REST API
    @PostMapping
    public ResponseEntity<Etudiant> createEtudiant(@RequestBody Etudiant etudiant){
        Etudiant savedEtudiant = etudiantService.createEtudiant(etudiant);
        return new ResponseEntity<>(savedEtudiant, HttpStatus.CREATED);
    }

    // Build Get Student REST API
    @GetMapping("{id}")
    public ResponseEntity<Etudiant> getEtudiantById(@PathVariable("id") int etudiantId){
        Etudiant etudiant = etudiantService.getEtudiantById(etudiantId);
        return ResponseEntity.ok(etudiant);
    }

    // Build Get All Majors REST API
    @GetMapping("/majors")
    public ResponseEntity<List<String>> getMajors(){
        List<String> majors = etudiantService.getFilieres();
        return ResponseEntity.ok(majors);
    }

    // Build Get Students by Major REST API
    @GetMapping("/major/{major}")
    public ResponseEntity<List<Etudiant>> getEtudiantsByMajor(@PathVariable("major") String major){
        List<Etudiant> etudiants = etudiantService.getStudentsByMajor(major);
        return ResponseEntity.ok(etudiants);
    }

    // Build Get All Students REST API
    @GetMapping
    public ResponseEntity<List<Etudiant>> getAllEtudiants(){
        List<Etudiant> etudiants = etudiantService.getAllEtudiants();
        return ResponseEntity.ok(etudiants);
    }

    // Build Update Student REST API
    @PutMapping("{id}")
    public ResponseEntity<Etudiant> updateEtudiant(@PathVariable("id") int etudiantId, @RequestBody Etudiant updatedEtudiant){
        Etudiant etudiant = etudiantService.updateEtudiant(etudiantId, updatedEtudiant);
        return ResponseEntity.ok(etudiant);
    }

    // Build Delete Student REST API
    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteEtudiant(@PathVariable("id") int etudiantId){
        etudiantService.deleteEtudiant(etudiantId);
        return ResponseEntity.ok("Student deleted successfully");
    }

    // Build Get Internships assigned to a Student REST API
    @GetMapping("{id}/assigned-internships")
    public ResponseEntity<List<Stage>> getAssignedInternshipByEtudiantId(@PathVariable("id") int etudiantId){
        List<Stage> assignedStages = etudiantService.getInternshipsByStudentId(etudiantId);
        return ResponseEntity.ok(assignedStages);
    }


    // Build Assign Internship to a Student REST API
    @PostMapping("{id}/internships")
    public ResponseEntity<String> assignStageToEtudiant(@PathVariable("id") int etudiantId, @RequestBody Stage stage){
       etudiantService.assignInternshipToStudent(etudiantId, stage.getId());
       return ResponseEntity.ok("Internship assigned to student successfully");
    }

    // Build Unassign Internship from a Student REST API
    @DeleteMapping("{id}/internships/{internshipId}")
    public ResponseEntity<String> unassignInternshipFromStudent(@PathVariable("id") int etudiantId, @PathVariable("internshipId") int stageId){
        etudiantService.unassignInternshipFromStudent(etudiantId, stageId);
        return ResponseEntity.ok("Internship unassigned from student successfully");
    }

    // Build Get Available Internships REST API
    @GetMapping("/available-internships")
    public ResponseEntity<List<Stage>> getAvailableStages(){
        List<Stage> availableStages = etudiantService.getAvailableInternships();
        return ResponseEntity.ok(availableStages);
    }


}
