package main.service;

import main.model.paciente.PacienteModel;
import main.repository.PacienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PacienteService {
    @Autowired
    PacienteRepository repository;
    public List<PacienteModel> listarPaciente(){
        return repository.findAll();
    }
    public void cadastrarPaciente(PacienteModel paciente){
        repository.save(paciente);
    }
}
