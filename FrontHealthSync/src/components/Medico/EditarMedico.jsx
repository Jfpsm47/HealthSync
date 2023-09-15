import React, { useState } from 'react';

const EditarMedico = ({ isOpen, medico }) => {
    const [nomeMedico, setNomeMedico] = useState(medico.nome)
  return (
    isOpen && (
      <div className="editar">
        <div className="modal-content">
          <h1 className='titulo-editar'>Editar Médico {nomeMedico}</h1>

          <label></label>
          <input  type='text' value={nomeMedico}></input>

        </div>
      </div>
    )
  );
};

export default EditarMedico;
