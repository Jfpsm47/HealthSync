import React, { useState } from 'react'
import { useRef } from 'react'
import axios from 'axios'
import ReactInputMask from 'react-input-mask'
import { Modal } from 'react-bootstrap'
const NovoMedico = ({isOpen,onClose}) => {

    const nomeref = useRef(null)
    const crmref = useRef(null)
    const especref = useRef(null)
    
    

    const handleCadastrarMedico = async () => {
      var nome = nomeref.current.value
      var crm = crmref.current.value
      var especialidade = especref.current.value

      const errors = [];
      
      if(!/^[a-zA-ZÀ-ÖØ-öø-ÿ\s]+$/.test(nome)){
        if(nome === ''){
          errors.push("- Por favor preencha o campo nome!")

        }else{
          errors.push("- Digite um nome válido!")
        }
      }
      if(!/^\d{8}-[1-9]$/.test(crm)){
        if(crm === ''){
          errors.push("- Por favor preencha o campo CRM!")
        }else{
          errors.push("- Digite um CRM válido (XXXXXXXX-X)!")
        }
      }
      if(!/^[a-zA-ZÀ-ÖØ-öø-ÿ\s]+$/.test(especialidade)){
        if(especialidade === ''){
          errors.push('- Por favor preencha o campo especialidade!')
        }else{
          errors.push("- Digite uma especialidade válida!")
        }
        
      }
      if(errors.length > 0){
        const messageErros =  errors.join("\n")
        alert(messageErros)
      }else{  
          var medico = {
            nome:(nomeref.current.value),
            crm:(crmref.current.value),
            especialidade:(especref.current.value),
            status:"Ativo"
        }
        console.log(medico)
        try {
            const response  = await axios.post('http://localhost:8081/api/medico/cadastrar',medico)
            console.log(response)
            onClose()
            alert("Médico cadastrado com sucesso!")
          } catch (error) {
            alert("- CRM já cadastrado")
          }
      }
    }
    const closeNovoMedico = () => {
      onClose()
    }
  return (  
    isOpen && (
      <div className='cadastro'>
          <div className='modal-content'>
            <div className='cadastro-medico'>
            <h1 className='titulo-cadastro'>Cadastrar Médico</h1>
            <div className='inputs'>
                <label>Nome</label>
                <input type='text' ref={nomeref} className='input-cadastrar' placeholder='Nome...'></input>
                <br />
                <label>CRM</label>
                <input type='text' ref={crmref} className='input-cadastrar' maxLength={10} placeholder='CRM...'></input>
                <br />
                <label>Especialidade</label>
                <input type='text' ref={especref} className='input-cadastrar' placeholder='Especialidade...'></input>
                <br />
                <button className='botao-cadastrar' onClick={() => handleCadastrarMedico()}>Cadastrar</button>
            </div>
                
            </div>
              <img src="src/assets/Close-blue.svg" alt="" className='close-cadastrar-atendimento' onClick={() => closeNovoMedico()}/>
          </div>
      </div>
  )
  )
}

export default NovoMedico