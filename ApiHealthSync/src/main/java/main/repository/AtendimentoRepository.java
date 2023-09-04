package main.repository;

import main.model.atendimento.AtendimentoModel;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AtendimentoRepository extends JpaRepository<AtendimentoModel, Long> {
}
