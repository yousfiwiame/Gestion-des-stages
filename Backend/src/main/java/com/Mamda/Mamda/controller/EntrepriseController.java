package com.Mamda.Mamda.controller;

import com.Mamda.Mamda.model.Entreprise;
import com.Mamda.Mamda.model.OffreStage;
import com.Mamda.Mamda.service.EntrepriseService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/entreprises")
public class EntrepriseController {

    private final EntrepriseService entrepriseService;

    public EntrepriseController(EntrepriseService entrepriseService) {
        this.entrepriseService = entrepriseService;
    }

    // Build Add Company REST API
    @PostMapping
    public ResponseEntity<Entreprise> createEntreprise(@RequestBody Entreprise entreprise){
        Entreprise savedEntreprise = entrepriseService.createEntreprise(entreprise);
        return new ResponseEntity<>(savedEntreprise, HttpStatus.CREATED);
    }

    // Build Get Company REST API
    @GetMapping("{id}")
    public ResponseEntity<Entreprise> getEntrepriseById(@PathVariable("id") int entrepriseId){
        Entreprise entreprise = entrepriseService.getEntrepriseById(entrepriseId);
        return ResponseEntity.ok(entreprise);
    }

    // Build Get All Raison Sociale REST API
    @GetMapping("/raisonsociale")
    public ResponseEntity<List<String>> getRaisonSociale(){
        List<String> raisonsociale = entrepriseService.getRaisonSociale();
        return ResponseEntity.ok(raisonsociale);
    }

    // Build Get Company by Raison Sociale REST API
    @GetMapping("/raisonsociale/{raisonsociale}")
    public ResponseEntity<List<Entreprise>> getEntreprisesByRaisonSociale(@PathVariable("raisonsociale") String raisonsociale){
        List<Entreprise> entreprises = entrepriseService.getEntreprisesByRaisonSociale(raisonsociale);
        return ResponseEntity.ok(entreprises);
    }

    // Build Get All Companies REST API
    @GetMapping
    public ResponseEntity<List<Entreprise>> getAllEntreprises(){
        List<Entreprise> entreprises = entrepriseService.getAllEntreprises();
        return ResponseEntity.ok(entreprises);
    }

    // Build Update Company REST API
    @PutMapping("{id}")
    public ResponseEntity<Entreprise> updateEntreprise(@PathVariable("id") int entrepriseId, @RequestBody Entreprise updatedEntreprise){
        Entreprise entreprise = entrepriseService.updateEntreprise(entrepriseId, updatedEntreprise);
        return ResponseEntity.ok(entreprise);
    }

    // Build Delete Company REST API
    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteEntreprise(@PathVariable("id") int entrepriseId){
        entrepriseService.deleteEntreprise(entrepriseId);
        return ResponseEntity.ok("Company deleted successfully");
    }

    // Build Get Internship Offers assigned to a Company REST API
    @GetMapping("{id}/assigned-internship-offers")
    public ResponseEntity<List<OffreStage>> getAssignedInternshipOffersByEntrepriseId(@PathVariable("id") int entrepriseId){
        List<OffreStage> assignedStageOffres = entrepriseService.getInternshipOffersByEntrepriseId(entrepriseId);
        return ResponseEntity.ok(assignedStageOffres);
    }


    // Build Assign Internship to a Student REST API
    /*@PostMapping("{id}/internships")
    public ResponseEntity<String> assignStageToEtudiant(@PathVariable("id") int etudiantId, @RequestBody Stage stage){
        etudiantService.assignInternshipToStudent(etudiantId, stage.getId());
        return ResponseEntity.ok("Internship assigned to student successfully");
    }

    // Build Unassign Internship from a Student REST API
    @DeleteMapping("{id}/internships/{internshipId}")
    public ResponseEntity<String> unassignInternshipFromStudent(@PathVariable("id") int etudiantId, @PathVariable("internshipId") int stageId){
        etudiantService.unassignInternshipFromStudent(etudiantId, stageId);
        return ResponseEntity.ok("Internship unassigned from student successfully");
    }*/

    // Build Get Available Internship Offers REST API
    @GetMapping("/available-internship-offers")
    public ResponseEntity<List<OffreStage>> getAvailableStageOffres(){
        List<OffreStage> availableStageOffres = entrepriseService.getAvailableInternshipOffers();
        return ResponseEntity.ok(availableStageOffres);
    }

}
