package com.Mamda.Mamda.repository;

import com.Mamda.Mamda.model.Etudiant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;


@Repository
public interface EtudiantRepository extends JpaRepository<Etudiant, Integer> {

    List<Etudiant> findByFiliere(String filiere);

    @Query("SELECT DISTINCT e.filiere FROM Etudiant e")
    List<String> findDistinctFilieres();
}
