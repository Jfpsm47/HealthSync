import React, { useState } from 'react'
import { useRef } from 'react'
import axios from 'axios'
import ReactInputMask from 'react-input-mask'
import { Modal } from 'react-bootstrap'
const NovoMedico = ({isOpen,onClose}) => {

    const nomeref = useRef(null)
    const crmref = useRef(null)
    const especref = useRef(null)

    const [erroNome,setErroNome] = useState()
    const [erroCRM,setErroCRM] = useState()
    const [erroEspec,setErroEspec] = useState()
    
    

    const handleCadastrarMedico = async () => {
      var nome = nomeref.current.value
      var crm = crmref.current.value
      var especialidade = especref.current.value

      const errors = [];
      
      if(!/^[a-zA-ZÀ-ÖØ-öø-ÿ\s]+$/.test(nome)){
        if(nome === ''){
          errors[0] = ("Por favor preencha o campo nome!")

        }else{
          errors[0] = ("Digite um nome válido!")
        }
      }
      if(!/^\d{8}-[1-9]$/.test(crm)){
        if(crm === ''){
          errors[1] = ("Por favor preencha o campo CRM!")
        }else{
          errors[1] = ("Digite um CRM válido (XXXXXXXX-X)!")
        }
      }
      if(!/^[a-zA-ZÀ-ÖØ-öø-ÿ\s]+$/.test(especialidade)){
        if(especialidade === ''){
          errors[2] = ('Por favor preencha o campo especialidade!')
        }else{
          errors[2] = ("Digite uma especialidade válida!")
        }
        
      }
      if(errors.length > 0){
        setErroNome(errors[0])
        setErroCRM(errors[1])
        setErroEspec(errors[2])
        const messageErros =  errors.join("\n")
        console.log(messageErros)
      }else{  
          var medico = {
            nome:(nomeref.current.value),
            crm:(crmref.current.value),
            especialidade:(especref.current.value)
        }
        console.log(medico)
        try {
            const response  = await axios.post('http://localhost:8081/api/medico/cadastrar',medico)
            console.log(response)
            onClose()
          } catch (error) {
            console.log('erro na requisão',error)
          }
      }
    }
    const closeNovoMedico = () => {
      setErroNome('')
      setErroCRM('')
      setErroEspec('')
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
                <span className='span-error'>{erroNome}</span>
                <br />
                <label>CRM</label>
                <input type='text' ref={crmref} className='input-cadastrar' maxLength={10} placeholder='CRM...'></input>
                <span className='span-error'>{erroCRM}</span>
                <br />
                <label>Especialidade</label>
                <input type='text' ref={especref} className='input-cadastrar' placeholder='Especialidade...'></input>
                <span className='span-error'>{erroEspec}</span>
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