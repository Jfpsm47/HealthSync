package main.controller;

import main.model.atendimento.AtendimentoDTO;
import main.model.atendimento.AtendimentoModel;
import main.model.atendimento.PieChartData;
import main.model.atendimento.RequisicaoHorario;
import main.model.medico.MedicoModel;
import main.model.paciente.PacienteModel;
import main.service.AtendimentoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
    @RequestMapping("/api/atendimento")
public class AtendimentoController {
    @Autowired
    AtendimentoService service;
    @GetMapping("/listar/{listarTodos}")
    public List<AtendimentoModel> listarAtendimentos(@PathVariable boolean listarTodos){
        if(listarTodos){
            return service.listarAtendimento();
        }else{
            return service.listaDeHoje();
        }

    }
    @GetMapping("listarHoje")
    public List<AtendimentoModel> listaAtendimentoHoje(){
        return service.listaDeHoje();
    }
    @GetMapping("/listar/data/{data}")
    public List<AtendimentoModel> buscarPorData(@PathVariable String data){
       return service.buscaPorData(data);
    }
    @PostMapping("/cadastrar")
    public void cadastrarAtendimento(@RequestBody AtendimentoDTO data){
        service.cadastrarAtendimento(data);
    }
    @PostMapping("/editar/{id}")
    public void editarAtendimeno(@PathVariable Long id,@RequestBody AtendimentoDTO data){
        service.editarAtendimento(id,data);
    }
    @PostMapping("/deletar/{id}")
    public void deletarAtendimento(@PathVariable Long id){
        service.deletarAtendimento(id);
    }
    @PostMapping("/horariosDisponiveis")
    public List<String> horariosDisponiveis(@RequestBody RequisicaoHorario requisicaoHorario){
       return service.HorariosDisponiveisMedico(requisicaoHorario.data(),requisicaoHorario.nome());

    }
    @PostMapping("/concluir/{id}")
    public void concluirAtendimento(@PathVariable Long id){
        service.concluirAtendimento(id);
    }
    @PostMapping("/cancelar/{id}")
    public void cancelarAtendimento(@PathVariable Long id){
        service.cancelarConsulta(id);
    }
    @PostMapping("agendar/{id}")
    public void agendarAtendimento(@PathVariable Long id){
        service.agendarAtendimento(id);
    }
    @GetMapping("/AtendimentoPorMes")
    public Map<String, Integer> atedimentoPorMes(){
        return service.atendimentoPorMes();
    }
    @GetMapping("/indiceCancelamento")
    public PieChartData indiceDeCancelamento(){
        return service.indiceDeCancelamento();
    }
    @GetMapping("/atendimentosAgendadosHoje")
    public Long atendimentosMarcadosHoje(){
        return service.atendimentosAgendadosHoje();
    }

    @GetMapping("/teste")
    public List<AtendimentoModel> teste(){
        return service.teste();
    }
}
