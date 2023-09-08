import React, { useState } from 'react'
import { useEffect } from 'react';
import axios from 'axios';

const ListaMedico = () => {
  const [medicos, setMedicos] = useState([])

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

  return (
    <div>
      <input type='text' className='busca' onChange={handleBuscarMedico} placeholder='Digite o nome do médico...'></input>
      <h1 className='titulo-modal'>Médicos</h1>
      <ul className='lista'>
        {medicos.map(medico =>(
          <li key={medico.id} className='card'>
            <span>Dr(a) {medico.nome}</span>
            <br></br>
            {medico.codigo}
            <br></br>
            {medico.especialidade}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ListaMedico