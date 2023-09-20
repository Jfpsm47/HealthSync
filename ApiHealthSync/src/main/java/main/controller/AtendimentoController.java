package main.controller;

import main.model.atendimento.AtendimentoDTO;
import main.model.atendimento.AtendimentoModel;
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
    @GetMapping("/listar")
    public List<AtendimentoModel> listarAtendimentos(){
        return service.listarAtendimento();
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
        @GetMapping("/AtendimentoPorMes")
    public Map<String, Integer> teste(){
        return service.atendimentoPorMes();
    }
}
