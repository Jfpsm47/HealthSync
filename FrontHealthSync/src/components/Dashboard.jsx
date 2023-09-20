import axios from "axios";
import React, { useEffect, useState } from "react";
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
  const [mapa, setMapa] = useState({})

  useEffect(() => {
    const getMap = async () => {
      try {
        const response = await axios.get("http://localhost:8081/api/atendimento/AtendimentoPorMes")
        console.log(response.data)
        setMapa(response.data)
      } catch (error) {
        console.log(error)
      }
    };
    getMap();
  },[])
  
      data[1]= ["Janeiro", mapa.Janeiro, "color: #32236C"]
      data[2]= ["Fevereiro", mapa.Fevereiro, "color: #32236C"]
      data[3]= ["Março", mapa.Março, "color: #32236C"]
      data[4]= ["Abril", mapa.Abril, "color: #32236C"]
      data[5]= ["Maio",mapa.Maio, "color: #32236C"]
      data[6]= ["Junho", mapa.Junho, "color: #32236C"]
      data[7]= ["Julho", mapa.Julho, "color: #32236C"]
      data[8]= ["Agosto", mapa.Agosto, "color: #32236C"]
      data[9]= ["Setembro", mapa.Setembro, "color: #32236C"]
      data[10]= ["Outubro", mapa.Outubro, "color: #32236C"]
      data[11]= ["Novembro", mapa.Novembro, "color: #32236C"]
      data[12]= ["Dezembro", mapa.Dezembro, "color: #32236C"]

  return (
    <div>
        <h1>Teste</h1>
        <h2>Atendimentos por Mês</h2>
        <Chart chartType="ColumnChart" width="100%" height="400px" data={data}/>
    </div>
  )
}

export default Dashboard