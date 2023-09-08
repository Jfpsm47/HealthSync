package main.model.atendimento;

public record AtendimentoDTO(String data, String hora, String status,Long pacienteID, Long medicoID) {
}
