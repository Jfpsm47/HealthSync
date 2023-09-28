import React, { useEffect, useState } from 'react'
import axios from 'axios'
import EditarAtendimento from './EditarAtendimento'

const FichaAtendimento = ({isOpen,onClose,atendimento}) => {
    var atendimendoStatus = atendimento.status
    const [isOpenEditar,setIsOpenEditar] = useState(false)
    const [agendado, setAgendado] = useState(false)
    const [cancelado, setCanceleado] = useState(false)
    const [concluido, setConcluido] = useState(false)

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
        var concluir = confirm("Deseja realmente marcar o atendimento como concluido?")
        if(concluir){
           try {
            const response = await axios.post(`http://localhost:8081/api/atendimento/concluir/${atendimento.id}`)
            console.log(response)
            onClose()
        } catch (error) {
            console.log('erro na requisição',error)
        } 
        }
        
    }
    const handleCancelarAtendimento = async () => {
        var cancelar = confirm("Deseja realmente cancelar o atendimento?")
        if(cancelar){
           try {
            const response = await axios.post(`http://localhost:8081/api/atendimento/cancelar/${atendimento.id}`)
            console.log(response)
            onClose()
        } catch (error) {
            console.log(error)
        } 
        }
        
    }
    const handleAgendarAtendimento = async () => {
        var agendar = confirm("Deseja realmente marcar o atendimento como agendado?")
        if(agendar){
          try {
            const response = await axios.post(`http://localhost:8081/api/atendimento/agendar/${atendimento.id}`)
            console.log(response)
            onClose()
        } catch (error) {
            console.log(error)
        }  
        }
        
    }
  return (
        isOpen &&(
            <div className='ficha'>  
                <div className='modal-content' >
                <ul className='ul-principal'>
                    <li>
                        <h1></h1>
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
                    <button onClick={() => handleOpenEditar()} className='button-editar-paciente'>
                        <img src="src/assets/editar.svg" alt="" className='logo-editar-paciente'/>
                    </button>

                    <button onClick={() => handleExcluir()} className='button-excluir-paciente'>
                        <img src="src/assets/trash.svg" alt="" className='logo-excluir-paciente'/>
                    </button>
                    {atendimento.status === "Agendado"? (
                        <div>
                            <button onClick={() => handleConcluirAtendimento()} className='botao-cancelar-atendimento'>
                                <img src="src/assets/Check.svg" alt="" className='logo-concluir'/>
                            </button>
                            <button onClick={() => handleCancelarAtendimento()} className='botao-cancelar-atendimento'>
                                <img src="src/assets/Cancelar.svg" alt="" className='logo-cancelar'/>
                            </button>    
                        </div>
                    ):(null)}
                    {atendimento.status === "Cancelado"? (
                        <div>
                            <button onClick={() => handleConcluirAtendimento()} className='botao-cancelar-atendimento'>
                                <img src="src/assets/Check.svg" alt="" className='logo-concluir'/>
                            </button>

                            <button onClick={() => handleAgendarAtendimento()} className='botao-cancelar-atendimento'>
                                <img src="src/assets/agendar.svg" alt="" className='logo-agendar' />
                            </button>
                        </div>
                    ):(null)}
                    {atendimento.status === "Concluido"? (
                        <div>
                            <button onClick={() => handleCancelarAtendimento()} className='botao-cancelar-atendimento'>
                                <img src="src/assets/Cancelar.svg" alt="" className='logo-cancelar'/>
                            </button>
                            <button onClick={() => handleAgendarAtendimento()} className='botao-cancelar-atendimento'>
                                <img src="src/assets/agendar.svg" alt="" className='logo-agendar' />
                            </button>
                        </div>
                    ):(null)}

                    
                    <img src="src/assets/close-white.svg" alt="" className='close-atendimento' onClick={() => onClose()}/>
                </div>
            </div>
    )
  )
}

export default FichaAtendimento