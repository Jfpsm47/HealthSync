import React, { useRef, useState } from 'react'
import axios from 'axios'
import { useEffect } from 'react'
import Select from 'react-select'
import ReactDatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"
import format from 'date-fns/format'

const NovoAtendimento = ({isOpen,onClose}) => {
    const [pacientesCPF, setPacientesCPF] = useState([])
    const [medicosNome,setMedicosNome] = useState([])
    const [selectedDate, setSelectedDate] = useState(null)
    const[inputHoraOpen,setInputHoraOpen] = useState(false)
    const[medicoSelecionado,setMedicoSelecionado] = useState("")
    const [pacienteSelecionado,setPacienteSelecionado] = useState("")
    const [horariosDisponiveis,setHorariosDisponiveis] = useState([])
    const[inputDataOpen,setInputDataOpen] = useState(false)
    const [horarioSelecionado,setHorarioSelecionado] = useState("")
    const [botaoCadastrarOpen,setBotaoCadastrarOpen] = useState(false)
    const currentDate = new Date();

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
      const handleChangeMedico = (selectedOption) => {
        var medico = selectedOption.value
        setMedicoSelecionado(medico)
        setInputDataOpen(true)
        
      } 
      const handleChangePaciente = (selectedOption) =>{
        var paciente = selectedOption.value
        setPacienteSelecionado(paciente)
        console.log(pacienteSelecionado)
      }
      const handleSelecionarData = async (date) => {
        const dataFormatada = format(date, 'dd-MM-yyy')
        console.log(dataFormatada)
        setSelectedDate(date)
        setInputHoraOpen(true)

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
      const handleChangeHorario = (selectedOption) => {
        setHorarioSelecionado(selectedOption.value)
        setBotaoCadastrarOpen(true)
      }
      const handleAgendarAtendimento = async () => {

        console.log(pacienteSelecionado)
        const erros = [];

        const dataFormatada = format(selectedDate, 'dd-MM-yyyy')

        if(dataFormatada === ''){
          erros.push("- Por favor selecione uma data")
        }

        if (pacienteSelecionado === ''){
          erros.push("- Por favor selecione um paciente")
        }

        if (medicoSelecionado === ''){
          erros.push("- Por favor selecione um medico")
        }
        if (horarioSelecionado === ''){
          erros.push("- Por favor selecione um horario")
        }
        if (erros.length > 0) {
          const messageErros = erros.join('\n');
          alert(messageErros);
        }else{
          console.log(dataFormatada)
        var atendimento = { 
          data:(dataFormatada),
          hora:(horarioSelecionado),
          status:("Agendado"),
          pacienteCPF:(pacienteSelecionado),
          medicoNome:(medicoSelecionado)
        }
        console.log(atendimento)
        try {
          const response = await axios.post('http://localhost:8081/api/atendimento/cadastrar',atendimento);
          console.log(response.data)
        } catch (error) {
          console.log('Erro na requisição:', error);
        }
        setInputHoraOpen(false)
        setInputDataOpen(false)
        setBotaoCadastrarOpen(false)
        setSelectedDate(null)
        onClose()
        }
        
      }
  return (
    isOpen && ( 
      <div className='cadastro'> 
        <div className='modal-content'>
            <h1 className='titulo-cadastro-atendimento'>Marcar Atendimento</h1>
            <div className='cadastro-atendimento'>
              <label className='dropdown-label'>CPF do Paciente</label>
            <Select options={optPacientes} isSearchable={true} onChange={handleChangePaciente} className='dropdown'></Select>
            <label className='dropdown-label'>Nome do Médico</label>
            <Select options={optMedicos} isSearchable={true} onChange={handleChangeMedico} className='dropdown'></Select>
            {inputDataOpen? (
              <>
              <label htmlFor="" className='dropdown-label'>Data</label>
              <br />
              <ReactDatePicker dateFormat={"dd-MM-yyyy"}
              selected={selectedDate} 
              placeholderText='Data da consulta...'
              minDate={currentDate}
              value={selectedDate}
              onChange={handleSelecionarData}
              className='dataPicker'></ReactDatePicker>
              <br />
              </>
            ):(null)}
            {inputHoraOpen? (
             <>
             <label className='dropdown-label'>Horario</label>
              <Select options={optHorarios} isSearchable={true}onChange={handleChangeHorario} className='dropdown'></Select>
             </>
            ):(null)}
            {botaoCadastrarOpen? (
              <button onClick={handleAgendarAtendimento} className='marcar-atendimento'>Marcar</button>
            ):(null)}
            </div>
            <button onClick={onClose} >X</button>
        </div>
      </div>
    )
  )
}
 
export default NovoAtendimento