import React from 'react'
import axios from 'axios'
import { useState } from 'react'
import { useEffect } from 'react'
import NovoPaciente from './NovoPaciente'
import EditarPaciente from './EditarPaciente'
import BuscarPaciente from './BuscarPaciente'

const Paciente = () => {
    const [pacientes, setPacientes] = useState([])
    const [isOpenFicha, setOpenFicha] = useState(false)
    const [selectedPaciente, setSelectedPaciente] = useState([])
    const [isOpenCadastro, setIsOpenCadastro] = useState(false)
    const [isOpenEditar,setIsOpenEditar] = useState(false)


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

      const handleExcluir = async (id) => {
      var excluir = confirm("Tem certeza que deseja excluir o paciente?")
       if(excluir){
        try {
          const response = await axios.post(`http://localhost:8081/api/paciente/deletar/${id}`);
          console.log(response);

          const secondResponse = await axios.get('http://localhost:8081/api/paciente/listar');
          setPacientes(secondResponse.data);
          console.log(pacientes);
      } catch (error) {
          console.log('Erro na requisição:', error);
      }
      setOpenFicha(false)
       }
    }

    const handleOpenCadastro = async () =>{
      setIsOpenCadastro(true)
      try {
        const response = await axios.get('http://localhost:8081/api/paciente/listar');
        setPacientes(response.data)
      } catch (error) {
        console.log('Erro na requisiçaõ', error)
      }
    }
    const handleCloseCadastro = async () => {
      setIsOpenCadastro(false)
      try {
        const response = await axios.get('http://localhost:8081/api/paciente/listar');
        setPacientes(response.data)
      } catch (error) {
        console.log("Erro na requiusição,",error)
      }
    }

    const handleOpenEditar = () => {
      setIsOpenEditar(true)
    }
    const handleCloseEditar = async () => {
      setIsOpenEditar(false)
      setOpenFicha(false)
      try {
        const response = await axios.get('http://localhost:8081/api/paciente/listar');
        setPacientes(response.data)
      } catch (error) {
        console.log("Erro na requiusição,",error)
      }
    }
    const handleBuscarPaciente = async (e) => {
      var nome = e.target.value
      console.log(nome)
      if(nome == ''){
        try {
          const response = await axios.get('http://localhost:8081/api/paciente/listar');
          setPacientes(response.data)
        } catch (error) {
          console.log("Erro na requiusição,",error)
        }
      }else{
        try {
          const response = await axios.get(`http://localhost:8081/api/paciente/listar/nome/${nome}`);
          setPacientes(response.data)
        } catch (error) {
          console.log("Erro na requiusição,",error)
        }
      }
      
  }
  return (
    <div>
      <input type='text' onChange={handleBuscarPaciente} placeholder='Buscar por nome...' className='busca'></input>
      <h1 className='titulo-modal'>Pacientes</h1>
      <button onClick={() => handleOpenCadastro()} className='botao-cadastro'>+ Novo paciente</button>
      <NovoPaciente isOpen={isOpenCadastro} onClose={() => handleCloseCadastro()}></NovoPaciente>
      {pacientes.length === 0 && <h3>Sem pacientes para exibir.</h3>}
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
                            <button onClick={() => handleExcluir(selectedPaciente.id)}>Excluir</button>
                            <button onClick={() => handleOpenEditar()}>Editar</button>
                            <EditarPaciente isOpen={isOpenEditar} onClose={() => handleCloseEditar()} paciente={selectedPaciente}></EditarPaciente>
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