import React, { useState } from 'react'
import { useRef } from 'react'
import axios from 'axios'

const EditarPaciente = ({isOpen,onClose,paciente}) => {
    const [nome,setNome] = useState(paciente.nome)
    const [cpf,setCpf] = useState(paciente.cpf)
    const [rg,setRg] = useState(paciente.rg)
    const [telefone,setTelefone] = useState(paciente.telefone)
    const [email,setEmail] = useState(paciente.email)

    const nomeref = useRef(null)
    const cpfref = useRef(null)
    const rgref = useRef(null)
    const telefoneref = useRef(null)
    const emailref = useRef(null)

    const handleEditarPaciente = async () => {
        console.log(nomeref.current.value)
        console.log(cpfref.current.value)
        console.log(rgref.current.value)
        console.log(telefoneref.current.value)
        console.log(emailref.current.value)

        var nome = nomeref.current.value;
        var cpf = cpfref.current.value;
        var rg = rgref.current.value;
        var email = emailref.current.value;
        var telefone = telefoneref.current.value;

        const errors = [];

        if (!/^[a-zA-ZÀ-ÖØ-öø-ÿ\s]+$/.test(nome)) {
          if (nome === '') {
            errors.push('- Por favor preencha o campo nome');
          } else {
            errors.push('- Digite um nome válido');
          }
        }

        if (!/^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(cpf)) {
          if (cpf === '') {
            errors.push('- Por favor preencha o campo CPF');
          } else {
            errors.push('- Digite um CPF válido (xxx.xxx.xxx-xx)');
          }
        }
        if (!/^\d{7}-\d{1}$/.test(rg)) {
          if (rg === '') {
            errors.push('- Por favor preencha o campo RG');
          } else {
            errors.push('- Digite um RG válido (xxxxxxx-x)');
          }
        }
        if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(email)) {
          if (email === '') {
            errors.push('- Por favor preencha o campo email');
          } else {
            errors.push('- Digite um email válido');
          }
        }
        if (!/^(\d{2})9\d{8}$/.test(telefone)) {
          if (telefone === '') {
            errors.push('- Por favor preencha o campo telefone');
          } else {
            errors.push('- Digite um telefone válido (xx9xxxxxxxx)');
          }
        }
        if(errors.length > 0){
          const messageErros = errors.join('\n');
          alert(messageErros);
        }else{
          var novoPaciente = {
            nome:(nomeref.current.value),
            cpf:(cpfref.current.value),
            rg:(rgref.current.value),
            email:(emailref.current.value),
            telefone:(telefoneref.current.value)
          }
        console.log(novoPaciente)
        try {
            const response  = await axios.post(`http://localhost:8081/api/paciente/editar/${paciente.id}`,novoPaciente)
            console.log(response)
            onClose()
          } catch (error) {
            console.log('erro na requisão',error) 
          }
        }

        
    }
  return ( 
    isOpen &&(
        <div className='editar'>
            <div className='modal-content'>
            <h1>Editar Paciente</h1>
            <div className='all-inputs-editar-paciente'>
            <div className='inputs-editar-paciente-1'>
                <div className='input-container-editar'>
                  <label className='label-editar-paciente'>Nome</label>
                  <br />
                  <input type='text' value={nome} onChange={(e) => setNome(e.target.value)} ref={nomeref} className='input-editar'></input>
                </div>

                <div className='input-container-editar'>
                  <label className='label-editar-paciente'>CPF</label>
                  <br />
                  <input type='text' value={cpf} onChange={(e) => setCpf(e.target.value)} ref={cpfref} maxLength={14} className='input-editar'></input>
                </div>
                <div className='input-container-editar'>
                  <label className='label-editar-paciente'>RG</label>
                  <br />
                  <input type='text' value={rg} onChange={(e) => setRg(e.target.value)} ref={rgref} maxLength={9} className='input-editar'></input>
                </div>
              </div>
              
              <div className='inputs-editar-paciente-2'>
                <div className='input-container-editar'>
                  <label className='label-editar-paciente'>Telefone</label>
                  <br />
                  <input type='text' value={telefone} onChange={(e) => setTelefone(e.target.value)} ref={telefoneref} maxLength={11} className='input-editar'></input>
                </div>

                <div className='input-container-editar'>
                  <label className='label-editar-paciente'>Email</label>
                  <br />
                  <input type='text' value={email} onChange={(e) => setEmail(e.target.value)} ref={emailref} className='input-editar'></input>
                </div>
              </div>
              <button onClick={() => handleEditarPaciente()} className='botao-editar-paciente'>Salvar</button>
            </div>
          </div>
        </div>
    )
  )
}

export default EditarPaciente