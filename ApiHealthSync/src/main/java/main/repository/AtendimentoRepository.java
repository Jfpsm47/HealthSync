package main.repository;

import main.model.atendimento.AtendimentoModel;
import main.model.medico.MedicoModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface AtendimentoRepository extends JpaRepository<AtendimentoModel, Long> {
    List<AtendimentoModel> findByData(String data);

    List<AtendimentoModel> findByMedico(MedicoModel medico);

    @Query("SELECT atend FROM AtendimentoModel atend WHERE atend.data = :data AND medico.id = :id AND atend.status = 'Agendado'")
    List<AtendimentoModel> encontrarAtendimento(@Param("data")String data,@Param("id")Long id);

    List<AtendimentoModel> findByDataContaining(String data);
}
