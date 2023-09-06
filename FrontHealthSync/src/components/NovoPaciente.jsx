import React from 'react'
import { useRef } from 'react'
import axios from 'axios'

const NovoPaciente = ({isOpen, onClose}) => {
  const nomeref = useRef(null)
  const cpfref = useRef(null)
  const rgref = useRef(null)
  const telefoneref = useRef(null)
  const emailref = useRef(null)

  const handleCadastrarPaciente = async () => {
    console.log(nomeref.current.value)
    console.log(cpfref.current.value)
    console.log(rgref.current.value)
    console.log(telefoneref.current.value)
    console.log(emailref.current.value)

    var paciente = {
      nome:(nomeref.current.value),
      cpf:(cpfref.current.value),
      rg:(rgref.current.value),
      email:(emailref.current.value),
      telefone:(telefoneref.current.value)
    }
    console.log(paciente);
    try {
      const response  = await axios.post('http://localhost:8081/api/paciente/cadastrar',paciente)
      console.log(response)
      onClose()
    } catch (error) {
      console.log('erro na requisão',error)
      
    }
  }
  return (
    isOpen? (
        <div className="cadastro-paciente">
          <div className="modal-content">
            <h1>Cadastrar Paciente</h1>

            <label>Nome</label>
            <input type='text' ref={nomeref}></input>

            <label>CPF</label>
            <input type='text' ref={cpfref}></input>

            <label>RG</label>
            <input type='text' ref={rgref}></input>
            <br></br>

            <label>Telefone</label>
            <input type='text' ref={telefoneref}></input>

            <label>Email</label>
            <input type='text' ref={emailref}></input>
            <br></br>

            <button onClick={() => handleCadastrarPaciente()}>Cadastrar</button>
            <button onClick={() => onClose()}>X</button>
          </div>
        </div>
      ):null
  )
}

export default NovoPaciente