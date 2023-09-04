package main.service;

import main.model.atendimento.AtendimentoDTO;
import main.model.atendimento.AtendimentoModel;
import main.model.medico.MedicoModel;
import main.model.paciente.PacienteModel;
import main.repository.AtendimentoRepository;
import main.repository.MedicoRepository;
import main.repository.PacienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

@Service
public class AtendimentoService {
    @Autowired
    AtendimentoRepository repository;

    @Autowired
    PacienteRepository pacienteRepository;

    @Autowired
    MedicoRepository medicoRepository;
    public List<AtendimentoModel> listarAtendimento(){
        return repository.findAll();
    }
    public List<AtendimentoModel> listaDeHoje(){
        Date dataAtual = new Date();
        String data  = new SimpleDateFormat("dd/MM/yyyy").format(dataAtual);
        return repository.findByData(data);
    }
    public List<AtendimentoModel> buscaPorData(String data){
        return repository.findByData(data);
    }
    public void cadastrarAtendimento(AtendimentoDTO data){
        MedicoModel medico = medicoRepository.findById(data.medicoID()).get();
        PacienteModel paciente = pacienteRepository.findById(data.pacienteID()).get();
        AtendimentoModel atendimento = new AtendimentoModel(data.data(),data.hora(),data.status(),data.data_agendamento(),paciente,medico);

        repository.save(atendimento);
    }
    public void editarAtendimento(Long id,AtendimentoDTO data){
        AtendimentoModel atendimento = repository.findById(id).get();
        MedicoModel medico = medicoRepository.findById(data.medicoID()).get();
        PacienteModel paciente = pacienteRepository.findById(data.pacienteID()).get();

        atendimento.setData(data.data());
        atendimento.setHora(data.hora());
        atendimento.setData_agendamento(data.data_agendamento());
        atendimento.setStatus(data.status());
        atendimento.setMedico(medico);
        atendimento.setPaciente(paciente);

        repository.save(atendimento);
    }
    public void deletarAtendimento(Long id){
        repository.deleteById(id);
    }
}
