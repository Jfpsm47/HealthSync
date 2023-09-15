package main.controller;

import main.model.medico.MedicoModel;
import main.service.MedicoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/medico")
public class MedicoController {
    @Autowired
    MedicoService service;

    @PostMapping("/cadastrar")
    public void cadastrarMedico(@RequestBody MedicoModel medico){
        service.cadastrarMedico(medico);
    }
    @GetMapping("/listar")
    public List<MedicoModel> listarMedicos(){
        return service.listarMedicos();
    }

    @GetMapping("/listar/nome/{nome}")
    public List<MedicoModel> listarMedicoNome(@PathVariable String nome) {
        return service.listarPorNome(nome);
    }
    @GetMapping("/listaNome")
    public List<String> listaNomeMedico(){
        return service.listaNomesMedico();
    }
    @PostMapping("/deletar/{id}")
    public void deletarMedico(@PathVariable Long id){
        service.deletarMedico(id);
    }
    @PostMapping("/editar/{id}")
    public void editarMedico(@PathVariable Long id, @RequestBody MedicoModel medico){
        service.editarMedico(id,medico);
    }
}
