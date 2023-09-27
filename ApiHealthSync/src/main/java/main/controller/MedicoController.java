package main.controller;

import main.model.medico.MedicoModel;
import main.service.MedicoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/medico")
public class MedicoController {
    @Autowired
    MedicoService service;

    @PostMapping("/cadastrar")
    public ResponseEntity cadastrarMedico(@RequestBody MedicoModel medico){
        try {
            service.cadastrarMedico(medico);
            return ResponseEntity.ok().build();
        }catch (Exception e){
            return ResponseEntity.badRequest().body("CRM já cadastrada");
        }

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
    @PostMapping("/desativar/{id}")
    public void deletarMedico(@PathVariable Long id){
        service.deletarMedico(id);
    }
    @PostMapping("/editar/{id}")
    public void editarMedico(@PathVariable Long id, @RequestBody MedicoModel medico){
        service.editarMedico(id,medico);
    }
    @GetMapping("/teste")
    public List<MedicoModel> teste(){
        return service.teste();
    }
}
