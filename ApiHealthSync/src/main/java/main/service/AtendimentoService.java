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

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

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
        String data  = new SimpleDateFormat("dd-MM-yyyy").format(dataAtual);
        return repository.findByData(data);
    }
    public List<AtendimentoModel> buscaPorData(String data){
        return repository.findByDataContaining(data);
    }
    public void cadastrarAtendimento(AtendimentoDTO data){
        MedicoModel medico = medicoRepository.findByNome(data.medicoNome()).get();
        PacienteModel paciente = pacienteRepository.findByCpf(data.pacienteCPF()).get();
        Date dataAtual = new Date();
        String data_agendamento  = new SimpleDateFormat("dd-MM-yyyy").format(dataAtual);
        String status = "Agendado";
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
    public void concluirAtendimento(Long id){
        AtendimentoModel atendimento = repository.findById(id).get();

        atendimento.setStatus("Concluido");
        repository.save(atendimento);
    }
    public void cancelarConsulta(Long id){
        AtendimentoModel atendimento = repository.findById(id).get();

        atendimento.setStatus("Cancelado");

        repository.save(atendimento);
    }
    public Map<String,Integer> atendimentoPorMes(){
        List<AtendimentoModel> atendimentos = repository.findAll();
        SimpleDateFormat dataFormat = new SimpleDateFormat("dd-MM-yyyy");
        SimpleDateFormat mesFormat = new SimpleDateFormat("MM");
        List<String> meses = new ArrayList<>();

        Map<String, Integer> atendimentosPorMes = new HashMap<>();
        atendimentosPorMes.put("Janeiro", 0);
        atendimentosPorMes.put("Fevereiro", 0);
        atendimentosPorMes.put("Março", 0);
        atendimentosPorMes.put("Abril", 0);
        atendimentosPorMes.put("Maio", 0);
        atendimentosPorMes.put("Junho", 0);
        atendimentosPorMes.put("Julho", 0);
        atendimentosPorMes.put("Agosto", 0);
        atendimentosPorMes.put("Setembro", 0);
        atendimentosPorMes.put("Outubro", 0);
        atendimentosPorMes.put("Novembro", 0);
        atendimentosPorMes.put("Dezembro", 0);

        for (AtendimentoModel atendimento:atendimentos) {
            if(!"Cancelado".equals(atendimento.getStatus())){
                try {
                    Date dataAtendimento = dataFormat.parse(atendimento.getData());
                    String mes = mesFormat.format(dataAtendimento);
                    switch (mes) {
                        case "01":
                            Integer valorJan = atendimentosPorMes.get("Janeiro");
                            atendimentosPorMes.put("Janeiro", valorJan + 1);
                            break;
                        case "02":
                            Integer valorFev = atendimentosPorMes.get("Fevereiro");
                            atendimentosPorMes.put("Fevereiro", valorFev + 1);
                            break;
                        case "03":
                            Integer valorMar = atendimentosPorMes.get("Março");
                            atendimentosPorMes.put("Março", valorMar + 1);
                            break;
                        case "04":
                            Integer valorAbr = atendimentosPorMes.get("Abril");
                            atendimentosPorMes.put("Abril", valorAbr + 1);
                            break;
                        case "05":
                            Integer valorMai = atendimentosPorMes.get("Maio");
                            atendimentosPorMes.put("Maio", valorMai + 1);
                            break;
                        case "06":
                            Integer valorJun = atendimentosPorMes.get("Junho");
                            atendimentosPorMes.put("Junho", valorJun + 1);
                            break;
                        case "07":
                            Integer valorJul = atendimentosPorMes.get("Julho");
                            atendimentosPorMes.put("Julho", valorJul + 1);
                            break;
                        case "08":
                            Integer valorAgo = atendimentosPorMes.get("Agosto");
                            atendimentosPorMes.put("Agosto", valorAgo + 1);
                            break;
                        case "09":
                            Integer valorSet = atendimentosPorMes.get("Setembro");
                            atendimentosPorMes.put("Setembro", valorSet + 1);
                            break;
                        case "10":
                            Integer valorOut = atendimentosPorMes.get("Outubro");
                            atendimentosPorMes.put("Outubro", valorOut + 1);
                            break;
                        case "11":
                            Integer valorNov = atendimentosPorMes.get("Novembro");
                            atendimentosPorMes.put("Novembro", valorNov + 1);
                            break;
                        case "12":
                            Integer valorDez = atendimentosPorMes.get("Dezembro");
                            atendimentosPorMes.put("Dezembro", valorDez + 1);
                            break;
                        default:
                            // Caso o mês não seja reconhecido
                    }
                }catch (ParseException e){
                    e.printStackTrace();
                }

            }
        }
        return atendimentosPorMes;
    }
}
