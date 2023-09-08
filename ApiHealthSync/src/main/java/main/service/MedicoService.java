package main.service;

import main.model.medico.MedicoModel;
import main.repository.MedicoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MedicoService {
    @Autowired
    MedicoRepository repository;
    public List<MedicoModel> listarMedicos(){
        return repository.findAll();
    }

    public List<MedicoModel> listarPorNome(String nome){
        return repository.findByNomeContaining(nome);
    }
}
