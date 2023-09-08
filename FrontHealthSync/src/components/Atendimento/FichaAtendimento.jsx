import React from 'react'
import axios from 'axios'

const FichaAtendimento = ({isOpen,onClose,atendimento}) => {
    const handleExcluir = async () => {
        try {
            const response  = await axios.post(`http://localhost:8081/api/atendimento/deletar/${atendimento.id}`)
            console.log(response)
            onClose()
          } catch (error) {
            console.log('erro na requisão',error)
        } 
    }
  return (
        isOpen &&(
            <div className='ficha'>
                <div className='modal-content' >
                    <div className='dados-paciente'>
                        <h2>-Dados do Paciente-</h2>    
                        <p>Nome: {atendimento.paciente.nome}</p>
                        <p>RG: {atendimento.paciente.rg}</p>
                        <p>CPF: {atendimento.paciente.cpf}</p>
                        <p>Email: {atendimento.paciente.email}</p>
                        <p>Telefone: {atendimento.paciente.telefone}</p>
                    </div>
                    <div>
                        <h2>-Dados do Médico-</h2>
                        <p>Nome: {atendimento.medico.nome}</p>
                        <p>Código: {atendimento.medico.codigo}</p>
                        <p>Especialidade {atendimento.medico.especialidade}</p>
                    </div>
                    <div>
                        <h2>-Dados do Atendimento-</h2>
                        <p>Data: {atendimento.data}</p>
                        <p>Hora: {atendimento.hora}</p>
                        <p>Status: {atendimento.status}</p>
                        <p>Data do Agendamento: {atendimento.agendamento}</p>
                    </div>
                    <button onClick={() => onClose()}>X</button>
                    <button onClick={() => handleExcluir()}>Excluir</button>
                </div>
            </div>
        )
  )
}

export default FichaAtendimento