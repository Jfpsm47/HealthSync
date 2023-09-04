package main.controller;

import main.model.paciente.PacienteModel;
import main.service.PacienteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.NoSuchElementException;

@RestController
@RequestMapping("/api/paciente")
public class PacienteController {
    @Autowired
    PacienteService service;
    @GetMapping("/listar")
    public List<PacienteModel> listarPacientes(){
        return service.listarPaciente();
    }
    @PostMapping("/cadastrar")
    public void cadastrarPaciente(@RequestBody PacienteModel paciente){
        service.cadastrarPaciente(paciente);
    }
    @PostMapping("/editar/{id}")
    public void  editarPaciente(@PathVariable Long id, @RequestBody PacienteModel data){
        service.editarPaciente(id,data);
    }
    @PostMapping("deletar/{id}")
    public void deletarPaciente(@PathVariable Long id){
        service.deletarPaciente(id);
    }
    @GetMapping("listar/nome/{nome}")
    public List<PacienteModel> buscarPorNome(@PathVariable String nome){
        return service.ListarPorNom(nome);
    }
    @GetMapping("/listar/cpf/{cpf}")
    public ResponseEntity buscarPorCpf(@PathVariable String cpf){
        try {
           return ResponseEntity.ok(service.buscarPorCpf(cpf));
        }catch (NoSuchElementException e){
            return ResponseEntity.badRequest().body("Nenhum paciente encontrado");
        }
    }
}
