package main.repository;

import main.model.paciente.PacienteModel;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PacienteRepository extends JpaRepository<PacienteModel, Long> {

}
