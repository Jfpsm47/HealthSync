package main.repository;

import main.model.atendimento.AtendimentoModel;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AtendimentoRepository extends JpaRepository<AtendimentoModel, Long> {
    List<AtendimentoModel> findByData(String data);


}
