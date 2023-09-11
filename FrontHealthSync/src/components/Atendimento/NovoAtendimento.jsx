import React, { useState } from 'react'
import axios from 'axios'
import { useEffect } from 'react'
import Select from 'react-select'
import ReactDatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"

const NovoAtendimento = ({isOpen,onClose}) => {
    const [pacientesCPF, setPacientesCPF] = useState([])
    const [medicosNome,setMedicosNome] = useState([])

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
        console.log(selectedOption.value)
      }
      const handleChangePaciente = (selectedOption) =>{
        console.log(selectedOption.value)
      }
  return (
    isOpen && ( 
      <div className='cadastro'> 
        <div className='modal-content'>
            <h1 className='titulo-cadastro'>Cadastrar Atendimento</h1>
            <label>CPF do Paciente</label>
            <Select options={optPacientes} isSearchable={true} onChange={handleChangePaciente}></Select>
            <label>Nome do Médico</label>
            <Select options={optMedicos} isSearchable={true} onChange={handleChangeMedico}></Select>
            <ReactDatePicker></ReactDatePicker>
            <button onClick={onClose}>X</button>
        </div>
      </div>
    )
  )
}

export default NovoAtendimento