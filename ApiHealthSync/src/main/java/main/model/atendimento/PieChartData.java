package main.model.atendimento;

public class PieChartData {
    double indiceTotal;
    double indicecancelamento;

    public PieChartData() {
    }

    public PieChartData(double indiceTotal, double indicecancelamento) {
        this.indiceTotal = indiceTotal;
        this.indicecancelamento = indicecancelamento;
    }

    public double getIndiceTotal() {
        return indiceTotal;
    }

    public void setIndiceTotal(double indiceTotal) {
        this.indiceTotal = indiceTotal;
    }

    public double getIndicecancelamento() {
        return indicecancelamento;
    }

    public void setIndicecancelamento(double indicecancelamento) {
        this.indicecancelamento = indicecancelamento;
    }
}
