package main.model.atendimento;

import org.hibernate.annotations.ManyToAny;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import main.model.medico.MedicoModel;
import main.model.paciente.PacienteModel;

@Entity
@Table(name = "atendimento")
public class AtendimentoModel {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	private String data;
	private String hora;
	private String status;
	private String data_agendamento;
	
	@ManyToOne
	@JoinColumn(name = "paciente_id")
	private PacienteModel paciente; 
	
	@ManyToOne
	@JoinColumn(name = "medico_id")
	private MedicoModel medico;

	public AtendimentoModel() {
	}

	public AtendimentoModel(String data, String hora, String status, String data_agendamento, PacienteModel paciente, MedicoModel medico) {
		this.data = data;
		this.hora = hora;
		this.status = status;
		this.data_agendamento = data_agendamento;
		this.paciente = paciente;
		this.medico = medico;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getData() {
		return data;
	}

	public void setData(String data) {
		this.data = data;
	}

	public String getHora() {
		return hora;
	}

	public void setHora(String hora) {
		this.hora = hora;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getData_agendamento() {
		return data_agendamento;
	}

	public void setData_agendamento(String data_agendamento) {
		this.data_agendamento = data_agendamento;
	}

	public PacienteModel getPaciente() {
		return paciente;
	}

	public void setPaciente(PacienteModel paciente) {
		this.paciente = paciente;
	}

	public MedicoModel getMedico() {
		return medico;
	}

	public void setMedico(MedicoModel medico) {
		this.medico = medico;
	}
}
