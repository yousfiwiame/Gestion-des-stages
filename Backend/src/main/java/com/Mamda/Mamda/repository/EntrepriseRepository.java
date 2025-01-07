package com.Mamda.Mamda.repository;

import com.Mamda.Mamda.model.Entreprise;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

@Repository
public interface EntrepriseRepository extends JpaRepository<Entreprise, Integer> {

    List<Entreprise> findByRaisonSociale(String raisonSociale);

    @Query("SELECT DISTINCT e.raisonSociale FROM Entreprise e")
    List<String> findDistinctRaisonsSociales();
}
