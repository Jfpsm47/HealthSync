import React from 'react'
import Select from 'react-select'
import ReactDatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"
import { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import { format } from 'date-fns';

const EditarAtendimento = ({isOpen, onClose, atendimento}) => {
  const currentDate = new Date();
  const [atendimentoStatus,setAtendimentoStatus] = useState(atendimento.status)
  const [atendimentoID,setAtendimentoID] = useState(atendimento.id)
  const [pacientesCPF, setPacientesCPF] = useState([])
  const [medicosNome,setMedicosNome] = useState([])
  const [pacienteSelecionado,setPacienteSelecionado] = useState(atendimento.paciente.cpf)
  const[medicoSelecionado,setMedicoSelecionado] = useState(atendimento.medico.nome)
  const[inputDataOpen,setInputDataOpen] = useState(false)
  const[modifyData,setModifyData] = useState(true)
  const [dataModified,setDataModified] = useState(false)
  const [selectedDate, setSelectedDate] = useState("")
  const[inputHoraOpen,setInputHoraOpen] = useState(false)
  const [horariosDisponiveis,setHorariosDisponiveis] = useState([])
  const [horarioSelecionado,setHorarioSelecionado] = useState(atendimento.hora)
  const [modifyHora,setModifyHora] = useState(false)
  const [botaoCadastrarOpen,setBotaoCadastrarOpen] = useState(false)
 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8081/api/paciente/listaCPF');
        setPacientesCPF(response.data);
      } catch (error) {     
        console.log('Erro na requisição:', error);
      }
    };
  
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8081/api/medico/listaNome');
        setMedicosNome(response.data);
      } catch (error) {
        console.log('Erro na requisição:', error);
      }
    };
  
    fetchData();
  }, []);

  const optPacientes = []
  for(let i = 0; i < pacientesCPF.length; i++){
    const opcao = {
        value:pacientesCPF[i],label:pacientesCPF[i]
    }
    optPacientes.push(opcao)
  }

  const optMedicos = []
  for (let i=0;i < medicosNome.length;i++){
    const opcao2 = {
      value:medicosNome[i],label:medicosNome[i]
    }
    optMedicos.push(opcao2)
  }

    var indexPaciente = optPacientes.findIndex((opcao) => {
      return opcao.value === atendimento.paciente.cpf && opcao.label === atendimento.paciente.cpf;
      
    })


    var indexMedico = optMedicos.findIndex((opcao) => {
      return opcao.value === atendimento.medico.nome && opcao.label === atendimento.medico.nome;
    })

    const handleChangePaciente = (selectedOption) =>{
      setPacienteSelecionado(selectedOption.value)
      console.log(pacienteSelecionado)
    }
    const handleChangeMedico = (selectedOption) => {
      setMedicoSelecionado(selectedOption.value)
      console.log(medicoSelecionado)
    }
    const handleSelecionarData = async (date) => {
      let dataFormatada = date.toLocaleDateString('pt-BR')
      setSelectedDate(date)
      setModifyHora(true)

      const requisicaoHorario = {
        data:(dataFormatada),
        nome:(medicoSelecionado)
      }
      console.log(requisicaoHorario)
      try {
        const response = await axios.post('http://localhost:8081/api/atendimento/horariosDisponiveis',requisicaoHorario);
        console.log(response.data)
        setHorariosDisponiveis(response.data)
      } catch (error) {
        console.log('Erro na requisição:', error);
      }
    }
    const optHorarios = []
      for(let i = 0; i < horariosDisponiveis.length; i++){
        const horario = {
            value:horariosDisponiveis[i],label:horariosDisponiveis[i]
        }
      optHorarios.push(horario)
      }
    const handleModifyData = () => {
      setInputDataOpen(true)
      setModifyData(false)
      setDataModified(true)
    }
    const handleNotModifyData = async () => {
      setModifyData(false)
      setModifyHora(true)

      setSelectedDate(atendimento.data)
      var dataSelecionada = atendimento.data

      const requisicaoHorario = {
        data:(dataSelecionada),
        nome:(medicoSelecionado)
      }
      console.log(requisicaoHorario)
      try {
        const response = await axios.post('http://localhost:8081/api/atendimento/horariosDisponiveis',requisicaoHorario);
        console.log(response.data)
        setHorariosDisponiveis(response.data)
      } catch (error) {
        console.log('Erro na requisição:', error);
      }
    }
    const handleChangeHorario = (selectedOption) => {
      setHorarioSelecionado(selectedOption.value)
      setBotaoCadastrarOpen(true)
    }
    const handleModifyHora = () =>{
      setInputHoraOpen(true)
      setModifyHora(false)
    }
    const handleNotmodifyHora = () => {
      setModifyHora(false)
      setBotaoCadastrarOpen(true)
    }
    const handleEditarAtendimento = async () => {
      if(dataModified){
        var atendimento = {
          data:(selectedDate.toLocaleDateString('pt-BR')),
          hora:(horarioSelecionado),
          status:(atendimentoStatus),
          pacienteCPF:(pacienteSelecionado),
          medicoNome:(medicoSelecionado)

        }
      }else{
        var atendimento = {
          data:(selectedDate),
          hora:(horarioSelecionado),
          status:(atendimentoStatus),
          pacienteCPF:(pacienteSelecionado),
          medicoNome:(medicoSelecionado)
        }
      }
      try {
        const response = await axios.post(`http://localhost:8081/api/atendimento/editar/${atendimentoID}`,atendimento);
        console.log(response.data)
      } catch (error) {
        console.log('Erro na requisição:', error);
      }
      console.log(atendimento)
      onClose()
    }
    return (
    isOpen? (
        <div className='editar'>
            <div>
                <h1>Editar Paciente</h1>
                <label>CPF do Paciente</label>
                <Select defaultValue={optPacientes[indexPaciente]} options={optPacientes} onChange={handleChangePaciente}></Select>
                <label>Nome do Médico</label>
                <Select defaultValue={optMedicos[indexMedico]} options={optMedicos} onChange={handleChangeMedico}></Select>
                
                {modifyData? (
                  <>
                  <h3>Deseja alterar a data do atendimento? ({atendimento.data})</h3>
                  <button onClick={() => handleModifyData()}>Sim</button>
                  <button onClick={() => handleNotModifyData()}>Não</button>
                  </>
                ):(null)}
                {inputDataOpen? (
                  <>
                  <ReactDatePicker dateFormat={"dd/MM/yyyy"}
                  selected={selectedDate} 
                  placeholderText='Data da consulta...'
                  minDate={currentDate}
                  value={selectedDate}
                  onChange={handleSelecionarData}><div style={{ color: "red" }}>DATA ANTERIOR: {atendimento.data}</div></ReactDatePicker>
                  <br />
                  </>
                ):(null)}
                 {modifyHora? (
                  <>
                  <h3>Deseja alterar a hora do atendimento? ({atendimento.hora})</h3>
                  <button onClick={() => handleModifyHora()}>Sim</button>
                  <button onClick={() => handleNotmodifyHora()}>Não</button>
                  </>
                ):(null)}
                {inputHoraOpen? (
                  <>
                  <label>Selecione a Hora</label>
                    <Select options={optHorarios} isSearchable={true}onChange={handleChangeHorario}></Select>
                  </>
                  ):(null)}
                  {botaoCadastrarOpen? (
                    <button onClick={handleEditarAtendimento}>Agendar</button>
                  ):(null)}
                <button onClick={onClose}>X</button>
            </div>
        </div>
    ):(null)
  )
}

export default EditarAtendimento