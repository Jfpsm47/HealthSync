import React, { useState } from 'react'
import axios from 'axios'
import EditarAtendimento from './EditarAtendimento'

const FichaAtendimento = ({isOpen,onClose,atendimento}) => {
    const [isOpenEditar,setIsOpenEditar] = useState(false)

    const handleExcluir = async () => {
        var excluir = confirm("Deseja realmente excluir o atendimento selecionado?")
        if (excluir){
            try {
                const response  = await axios.post(`http://localhost:8081/api/atendimento/deletar/${atendimento.id}`)
                console.log(response)
                onClose()
              } catch (error) {
                console.log('erro na requisão',error)
            } 
        }
        
    }
    const handleOpenEditar = () => {
        setIsOpenEditar(true)
    }
    const handleCloseEditar = () => {
        setIsOpenEditar(false)
        onClose()
    }
    const handleConcluirAtendimento = async () => {
        try {
            const response = await axios.post(`http://localhost:8081/api/atendimento/concluir/${atendimento.id}`)
            console.log(response)
            onClose()
        } catch (error) {
            console.log('erro na requisição',error)
        }
    }
    const handleCancelarAtendimento = async () => {
        try {
            const response = await axios.post(`http://localhost:8081/api/atendimento/cancelar/${atendimento.id}`)
            console.log(response)
            onClose()
        } catch (error) {
            console.log(error)
        }
    }
  return (
        isOpen &&(
            <div className='ficha'>
                <div className='modal-content' >
                <ul className='ul-principal'>
                    <li>
                        <h2>-Dados do Paciente-</h2>    
                        <ul>
                            <li className='dado'>Nome: {atendimento.paciente.nome}</li>
                            <li className='dado'>RG: {atendimento.paciente.rg}</li>
                            <li className='dado'>CPF: {atendimento.paciente.cpf}</li>
                            <li className='dado'>Email: {atendimento.paciente.email}</li>
                            <li className='dado'>Telefone: {atendimento.paciente.telefone}</li>
                        </ul>
                    </li>
                    
                    <li>
                        <h2>-Dados do Médico-</h2>
                        <ul>
                            <li className='dado'>Nome: {atendimento.medico.nome}</li>
                            <li className='dado'>Código: {atendimento.medico.crm}</li>
                            <li className='dado'>Especialidade: {atendimento.medico.especialidade}</li>
                        </ul>
                    </li>
                    <br />
                    <li>
                        <h2>-Dados do Atendimento-</h2>
                        <ul>
                            <li className='dado'>Data: {atendimento.data}</li>
                            <li className='dado'>Hora: {atendimento.hora}</li>
                            <li className='dado'>Status: {atendimento.status}</li>
                            <li className='dado'>Data do Agendamento: {atendimento.data_agendamento}</li>
                        </ul>
                    </li>
                </ul>

                    <EditarAtendimento isOpen={isOpenEditar} onClose={() => handleCloseEditar()} atendimento={atendimento}></EditarAtendimento>
                    <button onClick={() => handleOpenEditar()}>Editar</button>
                    <button onClick={() => onClose()}>X</button>
                    <button onClick={() => handleExcluir()}>Excluir</button>
                    <button onClick={() => handleConcluirAtendimento()} >Concluir</button>
                    <button onClick={() => handleCancelarAtendimento()}>Cancelar</button>
                </div>
            </div>
    )
  )
}

export default FichaAtendimento