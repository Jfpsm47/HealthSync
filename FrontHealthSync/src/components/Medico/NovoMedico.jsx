import React from 'react'
import { useRef } from 'react'
import axios
 from 'axios'
const NovoMedico = ({isOpen,onClose}) => {
    const nomeref = useRef(null)
    const crmref = useRef(null)
    const especref = useRef(null)

    const handleCadastrarMedico = async () => {
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
  return (
    isOpen && (
        <div className='cadastro'>
            <div className='modal-content'>
                <h1 className='titulo-cadastro'>Cadastrar Médico</h1>
                <label>Nome</label>
                <input type='text' ref={nomeref}></input>
                <br />
                <label>CRM</label>
                <input type='text' ref={crmref}></input>
                <br />
                <label>Especialidade</label>
                <input type='text' ref={especref}></input>
                <br />
                <button onClick={() => handleCadastrarMedico()}>Cadastrar</button>
                <button onClick={() => onClose()}>X</button>
            </div>
        </div>
    )
  )
}

export default NovoMedico