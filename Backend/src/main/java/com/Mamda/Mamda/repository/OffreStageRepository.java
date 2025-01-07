package com.Mamda.Mamda.repository;

import com.Mamda.Mamda.model.OffreStage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface OffreStageRepository extends JpaRepository<OffreStage, Integer> {

    @Query("SELECT DISTINCT p.field FROM OffreStage p")
    List<String> findDistinctFields();

    List<OffreStage> findByField(String field);

    List<OffreStage> findByEntrepriseId(int entrepriseId);

    List<OffreStage> findByEntrepriseIdIsNull();

    List<OffreStage> findByEntrepriseIdIsNotNull();

}
