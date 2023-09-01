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
}
