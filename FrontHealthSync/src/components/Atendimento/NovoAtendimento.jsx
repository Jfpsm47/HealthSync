import React, { useState } from 'react'
import axios from 'axios'
import { useEffect } from 'react'
import Select from 'react-select'

const NovoAtendimento = ({isOpen}) => {
    const [pacientesCPF, setPacientesCPF] = useState([])
    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get('http://localhost:8081/api/paciente/listaCPF');
            setPacientesCPF(response.data);
            console.log(response.data)
          } catch (error) {
            console.log('Erro na requisição:', error);
          }
        };
      
        fetchData();
      }, []);
      const opt = []
      for(let i = 0; i < pacientesCPF.length; i++){
        const opcao = {
            value:pacientesCPF[i],label:pacientesCPF[i]
        }
    opt.push(opcao)
      }
  return (
        isOpen && (
            <div className='cadastro'> 
                <div className='modal-content'>
                    <h1 className='titulo-cadastro'>Cadastrar Atendimento</h1>
                    <Select options={opt}></Select>
                </div>
            </div>
        )
  )
  
}

export default NovoAtendimento