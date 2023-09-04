package main.model.atendimento;

public record AtendimentoDTO(String data, String hora, String status, String data_agendamento, Long pacienteID, Long medicoID) {
}
