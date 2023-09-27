import React from 'react'
import { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';
import FichaAtendimento from './FichaAtendimento';
import NovoAtendimento from './NovoAtendimento';
import { useAccordionButton } from 'react-bootstrap';
const ListaAtendimento = () => {
    const [atendimentos, setAtendimentos] = useState([])
    const [isOpenFichaAt,setIsOpenFichaAt] = useState(false)
    const [selectedAtendimento, setSelectedAtendimento] = useState([])
    const [isOpenNovoAtendimento, setIsOpenNovoAtendimeno] = useState(false)
    const [labelBotao, setLabelBotao] = useState()
    

    useEffect(() => {
      if(sessionStorage.getItem("listarTodos") === 'true'){
        setLabelBotao("Ver hoje")
      }else{
        setLabelBotao("Ver todos")
      }
        const fetchData = async () => {
          try {
            const response = await axios.get(`http://localhost:8081/api/atendimento/listar/${sessionStorage.getItem("listarTodos")}`);
            setAtendimentos(response.data)
            console.log(response.data)
          } catch (error) {
            console.log('Erro na requisição:', error);
          }
        };
      
        fetchData();
      }, []);

      const handleOpenFicha = (atendimento) => {
        setIsOpenFichaAt(true)
        setSelectedAtendimento(atendimento)
      }
      const handleCloseFicha = async () =>{
        setIsOpenFichaAt(false)
          try {
            const response  = await axios.get(`http://localhost:8081/api/atendimento/listar/${sessionStorage.getItem("listarTodos")}`)
            setAtendimentos(response.data)
          } catch (error) {
            console.log('erro na requisão',error) 
          }
      }
      const handleOpenNovoAtendimento = () => {
        setIsOpenNovoAtendimeno(true)
      }
      const handleCloseNovoAtendimento = async () => {
        setIsOpenNovoAtendimeno(false)
        
        try {
          const response = await axios.get(`http://localhost:8081/api/atendimento/listar/${sessionStorage.getItem("listarTodos")}`);
          setAtendimentos(response.data)
          console.log(response.data)
        } catch (error) {
          console.log('Erro na requisição:', error);
        }
      }
      const handleBuscarAtendimento = async (e) => {
        var data = e.target.value
        console.log(data)
        if(data == ''){
          try {
            const response = await axios.get(`http://localhost:8081/api/atendimento/listar/${sessionStorage.getItem("listarTodos")}`);
            setAtendimentos(response.data)
          } catch (error) {
            console.log("Erro na requiusição,",error)
          }
        }else{
          try {
            const response = await axios.get(`http://localhost:8081/api/atendimento/listar/data/${data}`);
            setAtendimentos(response.data)
          } catch (error) {
            console.log("Erro na requiusição,",error) 
          }
        }
    }

      
    const handleMudarListagem = async() => {
      var listarTodos = JSON.parse(sessionStorage.getItem("listarTodos").valueOf());
      sessionStorage.setItem("listarTodos",!listarTodos)

      if(sessionStorage.getItem("listarTodos") === 'true'){
        setLabelBotao("Ver hoje")
      }else{
        setLabelBotao("Ver todos")
      }
      
      try {
        const response = await axios.get(`http://localhost:8081/api/atendimento/listar/${sessionStorage.getItem("listarTodos")}`);
        setAtendimentos(response.data)
        console.log(response.data)
      } catch (error) {
        console.log('Erro na requisição:', error);
      }
    }
  return (
    <div>
      <input type='text' className='busca' placeholder='Digite a data da consulta (dd-mm-yyy)' onChange={handleBuscarAtendimento}></input>
        <h1 className='titulo-modal'>Atendimentos</h1>
        <button onClick={() => handleOpenNovoAtendimento()} className='botao-cadastro-2'>+Novo Atendimento</button>
        <NovoAtendimento isOpen={isOpenNovoAtendimento} onClose={()=> handleCloseNovoAtendimento()}></NovoAtendimento>
        {atendimentos.length === 0 && <h3>Sem atendimentos para exibir.</h3>}
        <div className='lista-atendimento'>
        <ul className='lista'>
            {atendimentos.map(atendimento =>(
                <li key={atendimento.id} className='card'>
                    <span>Dr(a) {atendimento.medico.nome}</span>
                    <br></br>
                    <span>Paciente: {atendimento.paciente.nome}</span>
                    <br></br>
                    <span>{atendimento.data} | {atendimento.hora}</span>
                    <br></br>
                    <span onClick={() => handleOpenFicha(atendimento)} className='ver-mais' >Ver mais</span>
                    <FichaAtendimento isOpen={isOpenFichaAt} onClose={() => handleCloseFicha()} atendimento={selectedAtendimento}></FichaAtendimento>
                </li>
            ))}
        </ul>
        </div>
        <button onClick={() => handleMudarListagem()}>{labelBotao}</button>
    </div>
  ) 
}

export default ListaAtendimento