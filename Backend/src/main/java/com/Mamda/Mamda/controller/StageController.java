package com.Mamda.Mamda.controller;

import com.Mamda.Mamda.model.Stage;
import com.Mamda.Mamda.service.StageService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/stages")
public class StageController {

    private final StageService stageService;

    public StageController(StageService stageService) {
        this.stageService = stageService;
    }

    // Build Add stage REST API
    @PostMapping
    public ResponseEntity<Stage> createStage(@RequestBody Stage stage){
        Stage savedStage = stageService.createStage(stage);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedStage);
    }

    // Build Get stage REST API
    @GetMapping("{id}")
    public ResponseEntity<Stage> getStageById(@PathVariable("id") int stageId) {
        Stage stage = stageService.getStageById(stageId);
        return ResponseEntity.ok(stage);
    }

    // Build Get All Fields REST API
    @GetMapping("/fields")
    public ResponseEntity<List<String>> getFields(){
        List<String> fields = stageService.getFields();
        return ResponseEntity.ok(fields);
    }

    // Build Get Stages By Fields REST API
    @GetMapping("/field/{field}")
    public ResponseEntity<List<Stage>> getStagesByField(@PathVariable("field") String field){
        List<Stage> stages = stageService.getStagesByField(field);
        return ResponseEntity.ok(stages);
    }
    
    // Build Get All Stages REST API
    @GetMapping
    public ResponseEntity<List<Stage>> getAllStages(){
        List<Stage> stages = stageService.getAllStages();
        return ResponseEntity.ok(stages);
    }

    // Build Get All Assigned Stages REST API
    @GetMapping("/assigned")
    public ResponseEntity<List<Stage>> getAssignedStages(){
        List<Stage> stages = stageService.getAssignedStages();
        return ResponseEntity.ok(stages);
    }

    // Build Update Stage REST API
    @PutMapping("{id}")
    public ResponseEntity<Stage> updateStage(@PathVariable("id") int stageId, @RequestBody Stage updatedStage){
        Stage stage = stageService.updateStage(stageId, updatedStage);
        return ResponseEntity.ok(stage);
    }

    // Build Delete Stage REST API
    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteStage(@PathVariable("id") int stageId){
        stageService.deleteInternship(stageId);
        return ResponseEntity.ok("Internship deleted successfully");
    }

    // Build Get Stages by StudentId REST API
    @GetMapping("etudiant/{etudiantId}")
    public ResponseEntity<List<Stage>> getStagesByEtudiantId(@PathVariable("etudiantId") int etudiantId){
        List<Stage> stages = stageService.getStagesByEtudiantId(etudiantId);
        return ResponseEntity.ok(stages);
    }

    //Build Assign Stage to Etudiant REST API
    @PostMapping("etudiant/{id}")
    public ResponseEntity<Stage> assignStageToEtudiant(@PathVariable("id") int etudiantId, @RequestBody Stage stage){
        Stage assignedStage = stageService.assignStageToEtudiant(etudiantId, stage);
        return ResponseEntity.ok(assignedStage);
    }

    //Build Get Available Stages REST API
    @GetMapping("/available")
    public ResponseEntity<List<Stage>> getAvailableStages(){
        List<Stage> stages = stageService.getAvailableInternships();
        return ResponseEntity.ok(stages);
    }

    // Build Get If Stage is Assigned REST API
    @GetMapping("{id}/isAssigned")
    public ResponseEntity<Boolean> isStageAssigned(@PathVariable("id") int stageId){
        boolean isAssigned = stageService.isStageAssigned(stageId);
        return ResponseEntity.ok(isAssigned);
    }

    // Build Get Date of Assignement REST API
    /*@GetMapping("{id}/dateAffectation")
    public ResponseEntity<String> getDateAffectation(@PathVariable("id") int productId){
        String dateAffectation = productService.getDateOfAssignment(productId);
        return ResponseEntity.ok(dateAffectation);
    }*/
}
