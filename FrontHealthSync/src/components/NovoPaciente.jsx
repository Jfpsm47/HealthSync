import React from 'react'

const NovoPaciente = ({isOpen}) => {
  return (
    isOpen && (
        <div className="ficha-paciente">
          <div className="modal-content">
            <h1>Teste</h1>
          </div>
        </div>
      )
  )
}

export default NovoPaciente