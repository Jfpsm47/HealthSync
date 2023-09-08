package main.service;

import main.model.paciente.PacienteModel;
import main.repository.PacienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class PacienteService {
    @Autowired
    PacienteRepository repository;

    public List<PacienteModel> listarPaciente() {
        return repository.findAll();
    }

    public void cadastrarPaciente(PacienteModel paciente) {
        repository.save(paciente);
    }

    public void editarPaciente(Long id, PacienteModel data) {
        PacienteModel paciente = repository.findById(id).get();

        paciente.setCpf(data.getCpf());
        paciente.setEmail(data.getEmail());
        paciente.setNome(data.getNome());
        paciente.setRg(data.getRg());
        paciente.setTelefone(data.getTelefone());

        repository.save(paciente);
    }

    public void deletarPaciente(Long id) {
        repository.deleteById(id);
    }

    public List<PacienteModel> ListarPorNom(String nome) {
        return repository.findByNomeContaining(nome);
    }

    public PacienteModel buscarPorCpf(String cpf) {
        return repository.findByCpf(cpf).get();
    }
    public List<String> listaCPFpaciente(){
        List<PacienteModel> listaPaciente = repository.findAll();
        List<String> listaCPF = new ArrayList<>();

        for (PacienteModel paciente : listaPaciente) {
            listaCPF.add(paciente.getCpf());
        }
        return listaCPF;
    }
}

