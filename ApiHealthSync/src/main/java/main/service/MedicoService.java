package main.service;

import main.model.medico.MedicoModel;
import main.repository.MedicoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class MedicoService {
    @Autowired
    MedicoRepository repository;
    public List<MedicoModel> listarMedicos(){
        return repository.findAllByOrderByStatusAsc();
    }

    public List<MedicoModel> listarPorNome(String nome){
        return repository.findByNomeContaining(nome);
    }

    public List<String> listaNomesMedico(){
        List<MedicoModel> listaMedico = repository.listaNome();
        List<String> listaNome = new ArrayList<>();
        for (MedicoModel medico: listaMedico) {
            listaNome.add(medico.getNome());
        }
        return listaNome;
    }
    public void cadastrarMedico(MedicoModel medico){
        repository.save(medico);
    }
    public void deletarMedico(Long id){
       MedicoModel medico =  repository.findById(id).get();
       medico.setStatus("Desativado");

       repository.save(medico);
    }
    public void editarMedico(Long id, MedicoModel data){
        MedicoModel medico = repository.findById(id).get();

        medico.setCrm(data.getCrm());
        medico.setEspecialidade(data.getEspecialidade());
        medico.setNome(data.getNome());

        repository.save(medico);
    }
    public List<MedicoModel> teste(){
        return repository.listaNome();
    }
}
