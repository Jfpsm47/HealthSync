package main.service;

import main.model.atendimento.AtendimentoDTO;
import main.model.atendimento.AtendimentoModel;
import main.model.medico.MedicoModel;
import main.model.paciente.PacienteModel;
import main.repository.AtendimentoRepository;
import main.repository.MedicoRepository;
import main.repository.PacienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
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
        return repository.findByDataContaining(data);
    }
    public void cadastrarAtendimento(AtendimentoDTO data){
        MedicoModel medico = medicoRepository.findByNome(data.medicoNome()).get();
        PacienteModel paciente = pacienteRepository.findByCpf(data.pacienteCPF()).get();
        Date dataAtual = new Date();
        String data_agendamento  = new SimpleDateFormat("dd/MM/yyyy").format(dataAtual);
        String status = "Agendada";
        AtendimentoModel atendimento = new AtendimentoModel(data.data(),data.hora(),status,data_agendamento,paciente,medico);

        repository.save(atendimento);
    }
    public void editarAtendimento(Long id,AtendimentoDTO data){
        AtendimentoModel atendimento = repository.findById(id).get();
        MedicoModel medico = medicoRepository.findByNome(data.medicoNome()).get();
        PacienteModel paciente = pacienteRepository.findByCpf(data.pacienteCPF()).get();
        Date dataAtual = new Date();
        String data_agendamento  = new SimpleDateFormat("dd/MM/yyyy").format(dataAtual);

        atendimento.setData(data.data());
        atendimento.setHora(data.hora());
        atendimento.setData_agendamento(data_agendamento);
        atendimento.setStatus(data.status());
        atendimento.setMedico(medico);
        atendimento.setPaciente(paciente);

        repository.save(atendimento);
    }
    public void deletarAtendimento(Long id){
        repository.deleteById(id);
    }

    public List<String> HorariosDisponiveisMedico(String data, String nome){
        List<String> horarios = new ArrayList<>();
        horarios.add("08:00");
        horarios.add("09:00");
        horarios.add("10:00");
        horarios.add("11:00");
        horarios.add("12:00");
        horarios.add("13:00");
        horarios.add("14:00");
        horarios.add("15:00");
        horarios.add("16:00");
        horarios.add("17:00");
        horarios.add("18:00");
        MedicoModel medico = medicoRepository.findByNome(nome).get();
       List<AtendimentoModel> atendimentos =  repository.encontrarAtendimento(data, medico.getId());

        for (AtendimentoModel atendimento:atendimentos) {
            if(horarios.contains(atendimento.getHora())){
                horarios.remove(atendimento.getHora());
            }
        }
        return horarios;
    }
}
