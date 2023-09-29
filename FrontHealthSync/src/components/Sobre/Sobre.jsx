import React from 'react'
import "./Sobre.css"
import { useState } from 'react'
import { useNavigate } from 'react-router'

const Sobre = () => {
  const navigate = useNavigate()

  return (
    <div className='body'>
        <h1 className='titulo-sobre'>Sobre o HealthSYNC</h1>
        <div className='sobre'>
            <h2 className='subtitulo-sobre'>Autor</h2>
            <span>Nome: João Flávio</span>
            <span>Curso Fic_dev programador de sistemas</span>
            <br />

            <h2 className='subtitulo-sobre'>Sobre o sistema</h2>
            <span>Sistema de gestão de atendimento médico</span>
            <span>Versão: 1.26.15</span>

            <h2 className='subtitulo-sobre'>Tecnologias</h2>
            <span>Back-end: Java Spring boot</span>
            <span>IDE: IntelliJ IDEA</span>
            <span>Front-end: React + Vite</span>
            <span>Gráficos: React Google Charts v: 4.0.1</span>
            <span>IDE: VS Code</span>
            <span>Banco de dados: PostgresSQL</span>
            <a href="https://github.com/Jfpsm47/HealthSync">GitHub</a>
            <br />
            <button onClick={() => navigate("/")} className='botao-voltar' >Voltar</button>
        </div>
    </div>
  )
}

export default Sobre