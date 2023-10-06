package main.repository;

import main.model.paciente.PacienteModel;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface    PacienteRepository extends JpaRepository<PacienteModel, Long> {
    List<PacienteModel> findByNomeContainingIgnoreCase(String nome);
    Optional<PacienteModel> findByCpf(String cpf);
}
