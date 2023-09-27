package main.model.paciente;

import java.io.Serializable;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import main.model.atendimento.AtendimentoModel;

@Entity
@Table(name = "paciente")
public class PacienteModel implements Serializable {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	private String nome;
	@Column(unique = true)
	private String cpf;
	@Column(unique = true)
	private String rg;
	@Column(unique = true)
	private String email;
	@Column(unique = true)
	private String telefone;
	
	@OneToMany(mappedBy = "paciente", cascade = CascadeType.REMOVE)
	@JsonIgnore
	private List<AtendimentoModel> atendimentos;
	
	public PacienteModel() {
		super();
	}

	public PacienteModel(String nome, String cpf, String rg, String email, String telefone) {
		super();
		this.nome = nome;
		this.cpf = cpf;
		this.rg = rg;
		this.email = email;
		this.telefone = telefone;
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

	public String getCpf() {
		return cpf;
	}

	public void setCpf(String cpf) {
		this.cpf = cpf;
	}

	public String getRg() {
		return rg;
	}

	public void setRg(String rg) {
		this.rg = rg;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getTelefone() {
		return telefone;
	}

	public void setTelefone(String telefone) {
		this.telefone = telefone;
	}

	public List<AtendimentoModel> getAtendimentos() {
		return atendimentos;
	}

	public void setAtendimentos(List<AtendimentoModel> atendimentos) {
		this.atendimentos = atendimentos;
	}
}
