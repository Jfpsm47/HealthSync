import React, { useState } from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';
import axios from 'axios';

const EditarMedico = ({ isOpen, medico , onClose}) => {
  const [nome, setNome] = useState('')
  const [crm, setCrm] = useState('')
  const [especialidade, setEspecialidade] = useState('')

  const nomeRef = useRef(null)
  const crmRef = useRef(null)
  const especialidadeRef = useRef(null)

  useEffect(() => {
    setNome(medico.nome);
    setCrm(medico.crm)
    setEspecialidade(medico.especialidade)
  }, [medico]);

  const handleEditarMedico = async () => {
    console.log(nomeRef.current.value)
    console.log(crmRef.current.value)
    console.log(especialidadeRef.current.value)

    var novoMedico = {
      nome:(nomeRef.current.value),
      crm:(crmRef.current.value),
      especialidade:(especialidadeRef.current.value)
    }
    try {
      const response  = await axios.post(`http://localhost:8081/api/medico/editar/${medico.id}`,novoMedico)
      console.log(response)
    } catch (error) {
      console.log('erro na requisão',error) 
    }
    onClose()
  }
  return (
    isOpen && (
      <div className="editar">
        <div className="modal-content">
          <h1 className='titulo-editar'>Editar Médico</h1>
          <label className='label-editar'>Nome</label>
          <input  type='text' value={nome} onChange={(e) => setNome(e.target.value)} ref={nomeRef}></input>
          <br />
          <label className='label-editar'>CRM</label>
          <input type="text" value={crm} onChange={(e) => setCrm(e.target.value)} ref={crmRef} />
          <br />
          <label className='label-editar'>Especialidade</label>
          <input type="text" value={especialidade} onChange={(e) => setEspecialidade(e.target.value)} ref={especialidadeRef}/>

          <button onClick={() => handleEditarMedico()}>Salvar</button>
          <button onClick={() => onClose()}>X</button>
        </div>
      </div>
    )
  );
};

export default EditarMedico;
