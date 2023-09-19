import React from "react";
import { Chart } from "react-google-charts";



export const data = [
    ["Element", "Density", { role: "style" }],
    ["Janeiro", 8.94, "color: #32236C"],
    ["Fevereiro", 10.49, "color: #32236C"],
    ["Março", 19.3, "color: #32236C"],
    ["Abril", 21.45, "color: #32236C"],
    ["Maio", 21.45, "color: #32236C"],
    ["Junho", 1.45, "color: #32236C"],
    ["Julho", 31.45, "color: #32236C"],
    ["Agosto", 10.45, "color: #32236C"],
    ["Setembro", 15.45, "color: #32236C"],
    ["Outubro", 18.45, "color: #32236C"],
    ["Novembro", 21.45, "color: #32236C"],
    ["Dezembro", 7.45, "color: #32236C"]
  ];

const Dashboard = () => {
  return (
    <div>
        <h1>Teste</h1>
        <h2>Atendimentos por Mês</h2>
        <Chart chartType="ColumnChart" width="100%" height="400px" data={data}/>
    </div>
  )
}

export default Dashboard