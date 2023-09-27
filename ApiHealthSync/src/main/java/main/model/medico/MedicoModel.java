package main.model.medico;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import main.model.atendimento.AtendimentoModel;

@Entity
@Table(name = "medico")
public class MedicoModel {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	private String nome;
	@Column(unique = true)
	private String crm;
	private String especialidade;
	private String status;
	
	@OneToMany(mappedBy = "medico")
	@JsonIgnore
	private List<AtendimentoModel> atendimentos;
	
	public MedicoModel() {
		super();
	}

	public MedicoModel(String nome, String crm, String especialidade, String status) {
		this.nome = nome;
		this.crm = crm;
		this.especialidade = especialidade;
		this.status = status;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	public String getEspecialidade() {
		return especialidade;
	}

	public void setEspecialidade(String especialidade) {
		this.especialidade = especialidade;
	}

	public String getCrm() {
		return crm;
	}

	public void setCrm(String crm) {
		this.crm = crm;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}
}
