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
  return ( 
    isOpen &&(
        <div className='editar'>
            <div className='modal-content'>
                <h1>-Editar Paciente-</h1>
                <label>Nome</label>
                <input type='text' value={nome} onChange={(e) => setNome(e.target.value)} ref={nomeref}></input>
                <br></br>
                <label>CPF</label>
                <input type='text' value={cpf} onChange={(e) => setCpf(e.target.value)} ref={cpfref}></input>
                <br></br>
                <label>RG</label>
                <input type='text' value={rg} onChange={(e) => setRg(e.target.value)} ref={rgref}></input>
                <br></br>
                <label>Telefone</label>
                <input type='text' value={telefone} onChange={(e) => setTelefone(e.target.value)} ref={telefoneref}></input>
                <br></br>
                <label>Email</label>
                <input type='text' value={email} onChange={(e) => setEmail(e.target.value)} ref={emailref}></input>
                <br></br>
                <button onClick={() => onClose()}>X</button>
                <button onClick={() => handleEditarPaciente()}>Salvar</button>
            </div>
        </div>
    )
  )
}

export default EditarPaciente