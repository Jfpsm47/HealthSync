import React from 'react';
import { useRef } from 'react';
import axios from 'axios';
import { useState } from 'react';

const NovoPaciente = ({ isOpen, onClose }) => {
  const nomeref = useRef(null);
  const cpfref = useRef(null);
  const rgref = useRef(null);
  const telefoneref = useRef(null);
  const emailref = useRef(null);
  
  const handleCadastrarPaciente = async () => {
    var nome = nomeref.current.value;
    var cpf = cpfref.current.value;
    var rg = rgref.current.value;
    var email = emailref.current.value;
    var telefone = telefoneref.current.value;

    const errors = [];

    if (!/^[a-zA-ZÀ-ÖØ-öø-ÿ\s]+$/.test(nome)) {
      if (nome === '') {
        errors[0] = 'Por favor preencha o campo nome';
      } else {
        errors[0] = 'Digite um nome válido';
      }
    }
    
    if (!/^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(cpf)) {
      if (cpf === '') {
        errors[1] = 'Por favor preencha o campo CPF';
      } else {
        errors[1] = 'Digite um CPF válido (xxx.xxx.xxx-xx)';
      }
    }
    
    if (!/^\d{7}-\d{1}$/.test(rg)) {
      if (rg === '') {
        errors[2] = 'Por favor preencha o campo RG';
      } else {
        errors[2] = 'Digite um RG válido (xxxxxxx-x)';
      }
    }
    
    if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(email)) {
      if (email === '') {
        errors[3] = 'Por favor preencha o campo email';
      } else {
        errors[3] = 'Digite um email válido';;
      }
    }
    
    if (!/^(\d{2})9\d{8}$/.test(telefone)) {
      if (telefone === '') {
        errors[4] = 'Por favor preencha o campo telefone';
      } else {
        errors.push('Digite um telefone válido (xx9xxxxxxxx)');
      }
    }

    if (errors.length > 0) {
      const messageErros = errors.join('\n');
      alert(messageErros);
    } else {
      var paciente = {
        nome: nomeref.current.value,
        cpf: cpfref.current.value,
        rg: rgref.current.value,
        email: emailref.current.value,
        telefone: telefoneref.current.value,
      };
      console.log(paciente);
      try {
        const response = await axios.post(
          'http://localhost:8081/api/paciente/cadastrar',
          paciente
        );
        console.log(response);
        onClose();
        alert("Paciente cadastrado com sucesso!")
      } catch (error) {
        alert('- Valores já cadastrados');
      }
    }
  };

  return isOpen ? (
    <div className="cadastro">
  <div className="modal-content">
    <div className="cadastro-paciente">
      <h1 className="titulo-cadastro-paciente">Cadastrar Paciente</h1>
      <div className='all-inputs-paciente'>
        <div className="inputs-paciente-1">
        <div className="input-container">
          
          <label className="label-cadastrar">Nome</label>
          <input
            type="text"
            ref={nomeref}
            className="input-cadastrar-paciente"
            placeholder='Nome...'
          />
          <br />
        </div>

        <div className="input-container">
          <label className="label-cadastrar">CPF</label>
          <input
            type="text"
            ref={cpfref}
            maxLength={14}
            className="input-cadastrar-paciente"
            placeholder='CPF...'
          />
        </div>

        <div className="input-container">
          <label className="label-cadastrar">RG</label>
          <input
            type="text"
            ref={rgref}
            maxLength={9}
            className="input-cadastrar-paciente"
            placeholder='RG...'
          />
        </div>
      </div>

      <div className="inputs-paciente-2">
        <div className="input-container">
          <label className="label-cadastrar">Telefone</label>
          <input
            type="text"
            ref={telefoneref}
            maxLength={11}
            className="input-cadastrar-paciente"
            placeholder='Telefone...'
          />
        </div>

        <div className="input-container">
          <label className="label-cadastrar">Email</label>
          <input
            type="text"
            ref={emailref}
            className="input-cadastrar-paciente"
            placeholder='Email...'
          />
        </div>
        
      </div>
      <button onClick={() => handleCadastrarPaciente()} className='botao-cadastrar-paciente'>Cadastrar</button>
      </div>
    </div>
    <img src="src/assets/Close-blue.svg" alt="" className='close-cadastrar-atendimento' onClick={() => onClose()} />
  </div>
</div>

  ) : null;
};

export default NovoPaciente;
