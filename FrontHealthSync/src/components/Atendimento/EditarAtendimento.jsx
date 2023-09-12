import React from 'react'

const EditarAtendimento = ({isOpen}) => {
  return (
    isOpen? (
        <div>
            <div>
                <h1 className='titulo-modal'>Editar Paciente</h1>
            </div>
        </div>
    ):(null)
            

  )
}

export default EditarAtendimento