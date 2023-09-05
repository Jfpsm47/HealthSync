import React from 'react'
import axios from 'axios'
import { useState } from 'react'
import { useEffect } from 'react'
import ReactModal from 'react-modal'

const Paciente = () => {
    const [pacientes, setPacientes] = useState([])
    const [isOpenFicha, setOpenFicha] = useState(false)
    const [selectedPaciente, setSelectedPaciente] = useState([])

    const openFicha = (paciente) => {
        setSelectedPaciente(paciente)
        setOpenFicha(true)
    }
    const closeFicha = () => {
        setOpenFicha(false)
    }

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get('http://localhost:8081/api/paciente/listar');
            setPacientes(response.data);
          } catch (error) {
            console.log('Erro na requisição:', error);
          }
        };
      
        fetchData();
      }, []);
      
  return (
    <div>
       <ul className='lista-paciente'>
            {pacientes.map(paciente => (
                <li key={paciente.id} className='card-paciente'>
                    {paciente.nome}
                    <br></br>
                    {paciente.cpf}
                    <br></br>
                    <span className='ver-mais' onClick={() => openFicha(paciente)}>Ver Mais</span>
                    <div>
                    {isOpenFicha && (
                        <div className="ficha-paciente">
                        <div className="modal-content">
                            <h1>-Ficha do Paciente-</h1>
                            <p>-Nome: {selectedPaciente.nome}-</p>
                            <p>-RG: {selectedPaciente.rg}-</p>
                            <p>-CPF: {selectedPaciente.cpf}-</p>
                            <p>-Email: {selectedPaciente.email}-</p>
                            <p>-Telefone: {selectedPaciente.telefone}-</p>
                            <button onClick={closeFicha}>X</button>
                        </div>
                        </div>
                    )}
                    </div>
                </li>
            ))}
       </ul>
        
    </div>
  )
}

export default Paciente