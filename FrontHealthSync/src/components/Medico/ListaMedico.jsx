import React, { useState } from 'react'
import { useEffect } from 'react';
import axios from 'axios';
import NovoMedico from './NovoMedico';
import EditarMedico from './EditarMedico';
import { Modal } from 'react-bootstrap';

const ListaMedico = () => {
  const [medicos, setMedicos] = useState([])
  const [isOpenNovoMedico, setIsOpenNovoMedico] = useState(false)
  const [isOpenEditarMedico, setIsOpenEditarMedico] = useState(false)
  const [selectedMedico, setSelectedMedico] = useState({})
  const [tipoCard, setTipoCard] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = sessionStorage.getItem("token");
        const response = await axios.get('http://localhost:8081/api/medico/listar',{
          headers : {
            'Authorization' : `Bearer ${token}`
          }
        });
        console.log(response.data)
        setMedicos(response.data)
      } catch (error) {
        console.log('Erro na requisição:', error);
      
      }
    };
  
    fetchData();
  }, []);


  const handleBuscarMedico = async (e) => {
    var nome = e.target.value
    console.log(nome)
    if(nome === ''){
      try {
        const response = await axios.get('http://localhost:8081/api/medico/listar');
        setMedicos(response.data)
      } catch (error) {
        console.log('Erro na requisição:', error);
      }
    }else{
      try {
        const response = await axios.get(`http://localhost:8081/api/medico/listar/nome/${nome}`);
        setMedicos(response.data)
      } catch (error) {
        console.log('Erro na requisição:', error);
      }
    }
  }
  const handleCloseNovoMedico = async () => {
    setIsOpenNovoMedico(false)
    try {
      const response = await axios.get('http://localhost:8081/api/medico/listar');
      setMedicos(response.data)
    } catch (error) {
      console.log('Erro na requisição:', error);
    }
  }
  const handleExcluirMedico = async (id) => {
    var excluir = confirm("Deseja realmente desativar o médico?")
    if(excluir){
      try {
        const response = await axios.post(`http://localhost:8081/api/medico/desativar/${id}`);
        console.log(response)
      } catch (error) {
        console.log('Erro na requisição:', error);
      }
      try {
        const response = await axios.get('http://localhost:8081/api/medico/listar');
        setMedicos(response.data)
      } catch (error) {
        console.log('Erro na requisição:', error);
      }
    }
  }
  const handleOpenEditar = (medico) => {
    setIsOpenEditarMedico(true)
    setSelectedMedico(medico)
    console.log(medico)
  }
  const handleCloseEditar = async () => {
    setIsOpenEditarMedico(false)
    try {
      const response = await axios.get('http://localhost:8081/api/medico/listar');
      setMedicos(response.data)
    } catch (error) {
      console.log('Erro na requisição:', error);
    }
  }
  return (
    <div>
      <input type='text' className='busca' onChange={handleBuscarMedico} placeholder='Digite o nome do médico...'></input>
      <NovoMedico isOpen={isOpenNovoMedico} onClose={() => handleCloseNovoMedico()}></NovoMedico>
      <EditarMedico isOpen={isOpenEditarMedico} medico={selectedMedico} onClose={() => handleCloseEditar()}></EditarMedico>
      <button onClick={() => setIsOpenNovoMedico(true)} className={`botao-cadastro ${isOpenNovoMedico || isOpenEditarMedico ? 'hidden' : ''}`} >+ Novo Médico</button>
      <h1 className='titulo-modal'>Médicos</h1>
      {medicos.length === 0 && <h3>Sem médicos para exibir.</h3>}
      <div className='lista-medico'>
  <ul className='lista'>
    {medicos.map(medico => {
      const tipoCard = medico.status === "Ativo" ? 'card' : 'card-desativado';
      return (
        <li key={medico.id} className={tipoCard}>
          <span className='nome-medico'>Dr(a) {medico.nome}</span>
          <br></br>
          {medico.crm}
          <br></br>
          {medico.especialidade}
          <br />
          <button onClick={() => handleExcluirMedico(medico.id)} className={`botao-excluir-medico ${medico.status === 'Desativado'? 'hidden':'' }`}>
            <img src="src/assets/Desativado.svg" alt="" className={`logo-desativado`}/>
          </button>
          <button onClick={() => handleOpenEditar(medico)} className='button-editar-medico'>
            <img src="src/assets/Editar.svg" alt="" className='logo-editar'/>
          </button>
        </li>
      );
    })}
  </ul>
</div>
</div>
  )
}

export default ListaMedico