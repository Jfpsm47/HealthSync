package main.repository;

import main.model.medico.MedicoModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface MedicoRepository extends JpaRepository <MedicoModel,Long> {
    List<MedicoModel> findByNomeContaining(String nome);
    Optional<MedicoModel> findByNome(String nome);
}
