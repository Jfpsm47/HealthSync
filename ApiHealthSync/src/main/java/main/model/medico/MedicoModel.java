package main.model.medico;

import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import main.model.atendimento.AtendimentoModel;

@Entity
@Table(name = "medico")
public class MedicoModel {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	private String nome;
	private Long codigo;
	private String especialidade;
	
	@OneToMany(mappedBy = "medico")
	private List<AtendimentoModel> atendimentos;
	
	public MedicoModel() {
		super();
	}

	public MedicoModel(String nome, Long codigo, String especialidade) {
		super();
		this.nome = nome;
		this.codigo = codigo;
		this.especialidade = especialidade;
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

	public Long getCodigo() {
		return codigo;
	}

	public void setCodigo(Long codigo) {
		this.codigo = codigo;
	}

	public String getEspecialidade() {
		return especialidade;
	}

	public void setEspecialidade(String especialidade) {
		this.especialidade = especialidade;
	}
	
	
}
