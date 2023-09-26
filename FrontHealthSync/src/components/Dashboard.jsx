import axios from "axios";
import { set } from "date-fns";
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
export const data2 = [
  ["Status do atendimento", "Porcentagem"],
  ["Cancelados", 0],
  ["Agendados",0]
];


const Dashboard = () => {
  const [mapa, setMapa] = useState({})
  const [indiceCancelamento,setIndiceCancelamento] = useState(0.0)
  const [indiceTotal,setIndiceTotal] = useState(0.0)
  const [agendados,setAgendados] = useState(0)

  const [showAlert, setShowAlert] = useState(true);

  const chartOption = {
      title: 'Atendimentos por mês',
      titleTextStyle: {
        color: '#32236C',
        fontSize: 20
      } 
  }

  useEffect(() => {
    const getMap = async () => {
      try {
        const response = await axios.get("http://localhost:8081/api/atendimento/AtendimentoPorMes")
        console.log(response.data)
        setMapa(response.data)
      } catch (error) {
        console.log(error)
      }
      try {
        const response = await axios.get("http://localhost:8081/api/atendimento/indiceCancelamento")
        console.log(response.data)
        if(isNaN(response.data.indiceTotal)){
          setIndiceCancelamento(0.0)
          setIndiceTotal(0.0)
        }else{
          setIndiceTotal(response.data.indiceTotal)
          setIndiceCancelamento(response.data.indicecancelamento)
        }
      } catch (error) {
        console.log(error)
      }
      try {
        const response = await axios.get("http://localhost:8081/api/atendimento/atendimentosAgendadosHoje")
        console.log(response.data)
        setAgendados(response.data)
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

    data2[2] = ["Cancelados", indiceCancelamento],
    data2[1] = ["Agendados",indiceTotal]
    console.log(data2)
  return (
    <div>
      <div className="info-dashboard">
        <div className="pieChart">
          <h1 className="titulo-dashboard">Dashboard</h1>
        </div>
         
        <div className="cards-dashboard">
          <Chart chartType="PieChart" data={data2} width={"70%"} height={"210px"}/>
          <div className="card-dashboard">
            <span>Atendimentos marcados para hoje</span> 
            <span className="indice">{agendados}</span>
          </div>
        </div>
      </div>

        <div className="grafico">
          <Chart chartType="ColumnChart" width="100%" height="100%" data={data} options={chartOption} />
        </div>
    </div>
  )
}

export default Dashboard