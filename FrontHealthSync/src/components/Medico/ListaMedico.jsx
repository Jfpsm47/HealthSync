import React, { useState } from 'react'
import { useEffect } from 'react';
import axios from 'axios';
import NovoMedico from './NovoMedico';

const ListaMedico = () => {
  const [medicos, setMedicos] = useState([])
  const [isOpenNovoMedico, setIsOpenNovoMedico] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8081/api/medico/listar');
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
  const handleOpenNovoMedico = () => {
    setIsOpenNovoMedico(true)
  }
  const handleCloseNovoMedico= () => {
    setIsOpenNovoMedico(false)
  }
  const handleExcluirMedico = async (id) => {
    var excluir = confirm("Deseja realmente excluir o médico?")
    if(excluir){
      try {
        const response = await axios.post(`http://localhost:8081/api/medico/deletar/${id}`);
        console.log(response)
      } catch (error) {
        console.log('Erro na requisição:', error);
      }
    }
  }
  return (
    <div>
      <input type='text' className='busca' onChange={handleBuscarMedico} placeholder='Digite o nome do médico...'></input>
      <NovoMedico isOpen={isOpenNovoMedico} onClose={() => handleCloseNovoMedico}></NovoMedico>
      <button onClick={() =>handleOpenNovoMedico()} className={`botao-cadastro ${isOpenNovoMedico ? 'hidden' : ''}`} >+ Novo Médico</button>
      <h1 className='titulo-modal'>Médicos</h1>
      <ul className='lista'>
        {medicos.map(medico =>(
          <li key={medico.id} className='card'>
            <span>Dr(a) {medico.nome}</span>
            <br></br>
            {medico.crm}
            <br></br>
            {medico.especialidade}
            <button onClick={() => handleExcluirMedico(medico.id)}>Excluir</button>
            <button>Editar</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ListaMedico