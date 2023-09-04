package main.controller;

import main.model.paciente.PacienteModel;
import main.service.PacienteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

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
    public void cadastrarPaciente(PacienteModel paciente){
        service.cadastrarPaciente(paciente);
    }
}
