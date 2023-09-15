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
                            <li className='dado'>Código: {atendimento.medico.codigo}</li>
                            <li className='dado'>Especialidade: {atendimento.medico.especialidade}</li>
                        </ul>
                    </li>
                    <li>
                        <h2>-Dados do Atendimento-</h2>
                        <ul>
                            <li className='dado'>Data: {atendimento.data}</li>
                            <li className='dado'>Hora: {atendimento.hora}</li>
                            <li className='dado'>Status: {atendimento.status}</li>
                            <li className='dado'>Data do Agendamento: {atendimento.agendamento}</li>
                        </ul>
                    </li>
                </ul>

                    <EditarAtendimento isOpen={isOpenEditar} onClose={() => handleCloseEditar()} atendimento={atendimento}></EditarAtendimento>
                    <button onClick={() => handleOpenEditar()}>Editar</button>
                    <button onClick={() => onClose()}>X</button>
                    <button onClick={() => handleExcluir()}>Excluir</button>
                </div>
            </div>
    )
  )
}

export default FichaAtendimento