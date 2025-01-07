package com.Mamda.Mamda.controller;

import com.Mamda.Mamda.model.OffreStage;
import com.Mamda.Mamda.service.OffreStageService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/stages-offres")
public class OffreStageController {

    private final OffreStageService offreStageService;

    public OffreStageController(OffreStageService offreStageService) {
        this.offreStageService = offreStageService;
    }

    // Build Add stage offer REST API
    @PostMapping
    public ResponseEntity<OffreStage> createOffreStage(@RequestBody OffreStage offrestage){
        OffreStage savedOffreStage = offreStageService.createOffreStage(offrestage);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedOffreStage);
    }

    // Build Get stage REST API
    @GetMapping("{id}")
    public ResponseEntity<OffreStage> getStageOffreById(@PathVariable("id") int offrestageId) {
        OffreStage offrestage = offreStageService.getOffreStageById(offrestageId);
        return ResponseEntity.ok(offrestage);
    }

    // Build Get All Fields REST API
    @GetMapping("/fields")
    public ResponseEntity<List<String>> getFields(){
        List<String> fields = offreStageService.getFields();
        return ResponseEntity.ok(fields);
    }

    // Build Get Offres Stages By Fields REST API
    @GetMapping("/field/{field}")
    public ResponseEntity<List<OffreStage>> getStagesOffersByField(@PathVariable("field") String field){
        List<OffreStage> offrestages = offreStageService.getStagesOffersByField(field);
        return ResponseEntity.ok(offrestages);
    }

    // Build Get All Stages Offers REST API
    @GetMapping
    public ResponseEntity<List<OffreStage>> getAllStagesOffers(){
        List<OffreStage> offrestages = offreStageService.getAllStagesOffers();
        return ResponseEntity.ok(offrestages);
    }

    // Build Get All Assigned Stages REST API
    @GetMapping("/assigned")
    public ResponseEntity<List<OffreStage>> getAssignedStagesOffres(){
        List<OffreStage> offrestages = offreStageService.getAssignedStagesOffres();
        return ResponseEntity.ok(offrestages);
    }

    // Build Update Stage Offer REST API
    @PutMapping("{id}")
    public ResponseEntity<OffreStage> updateOffreStage(@PathVariable("id") int offrestageId, @RequestBody OffreStage updatedoffreStage){
        OffreStage offrestage = offreStageService.updateStageOffer(offrestageId, updatedoffreStage);
        return ResponseEntity.ok(offrestage);
    }

    // Build Delete Stage Offer REST API
    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteOffreStage(@PathVariable("id") int offrestageId){
        offreStageService.deleteInternshipOffer(offrestageId);
        return ResponseEntity.ok("Internship offer deleted successfully");
    }

    // Build Get Stages Offers by CompanyId REST API
    @GetMapping("entreprise/{entrepriseId}")
    public ResponseEntity<List<OffreStage>> getOffresStagesByEntrepriseId(@PathVariable("entrepriseId") int entrepriseId){
        List<OffreStage> offrestages = offreStageService.getStagesOffresByEntrepriseId(entrepriseId);
        return ResponseEntity.ok(offrestages);
    }

    //Build Get Available Stages offers REST API
    @GetMapping("/available")
    public ResponseEntity<List<OffreStage>> getAvailableOffreStages(){
        List<OffreStage> offrestages = offreStageService.getAvailableInternshipOffers();
        return ResponseEntity.ok(offrestages);
    }

    // Build Get If Stage Offer is Assigned REST API
    @GetMapping("{id}/isAssigned")
    public ResponseEntity<Boolean> isOffreStageAssigned(@PathVariable("id") int offrestageId){
        boolean isAssigned = offreStageService.isStageOfferAssigned(offrestageId);
        return ResponseEntity.ok(isAssigned);
    }
}
