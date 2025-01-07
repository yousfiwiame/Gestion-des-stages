package com.Mamda.Mamda.repository;

import com.Mamda.Mamda.model.Stage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface StageRepository extends JpaRepository<Stage, Integer> {
    
    @Query("SELECT DISTINCT p.field FROM Stage p")
    List<String> findDistinctFields();

    List<Stage> findByField(String field);

    List<Stage> findByEtudiantId(int etudiantId);

    List<Stage> findByEtudiantIdIsNull();
    
    List<Stage> findByEtudiantIdIsNotNull();
    
}
