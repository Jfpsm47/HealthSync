package main.controller;

import main.model.medico.MedicoModel;
import main.service.MedicoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/medico")
public class MedicoController {
    @Autowired
    MedicoService service;
    @GetMapping("/listar")
    public List<MedicoModel> listarMedicos(){
        return service.listarMedicos();
    }
}
