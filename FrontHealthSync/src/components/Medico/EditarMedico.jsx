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

  const [erroNome,setErroNome] = useState('')
  const [erroCRM,setErroCRM] = useState('')
  const [erroEspec,setErroEspec] = useState('')



  useEffect(() => {
    setNome(medico.nome);
    setCrm(medico.crm)
    setEspecialidade(medico.especialidade)
  }, [medico]);

  const handleEditarMedico = async () => {
    console.log(nomeRef.current.value)
    console.log(crmRef.current.value)
    console.log(especialidadeRef.current.value)

    var nome = nomeRef.current.value
    var crm = crmRef.current.value
    var especialidade = especialidadeRef.current.value
    const errors = [];
      
    if(!/^[a-zA-ZÀ-ÖØ-öø-ÿ\s]+$/.test(nome)){
      if(nome === ''){
        errors[0] = ("Por favor preencha o campo nome!")

      }else{
        errors[0] = ("Digite um nome válido!")
      }
    }
    if(!/^\d{8}-[1-9]$/.test(crm)){
      if(crm === ''){
        errors[1] = ("Por favor preencha o campo CRM!")
      }else{
        errors[1] = ("Digite um CRM válido (XXXXXXXX-X)!")
      }
    }
    if(!/^[a-zA-ZÀ-ÖØ-öø-ÿ\s]+$/.test(especialidade)){
      if(especialidade === ''){
        errors[2] = ('Por favor preencha o campo especialidade!')
      }else{
        errors[2] = ("Digite uma especialidade válida!")
      }
    }

    if(errors.length > 0){
      setErroNome(errors[0])
      setErroCRM(errors[1])
      setErroEspec(errors[2])
      const messageErros =  errors.join("\n")
      console.log(messageErros)
    }else{
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

    
  }
  const closeEditarMedico = () => {
    setErroNome('')
    setErroCRM('')
    setErroEspec('')
    onClose()
  }
  return (
    isOpen && (
      <div className="editar">
        <div className="modal-content">
          <h1 className='titulo-editar-medico'>Editar Médico</h1>
          <div className='all-inputs-editar-medico'>
            <div className='input-container-editar-medico'>
            <label className='label-editar-medico'>Nome</label>
            <br />
            <input  type='text' value={nome} onChange={(e) => setNome(e.target.value)} className='input-editar' ref={nomeRef}></input>
            <br />
            <span className='span-error'>{erroNome}</span>
            </div>
            
            <div className='input-container-editar-medico'>
              <label className='label-editar-medico'>CRM</label>
              <br />
              <input type="text" value={crm} onChange={(e) => setCrm(e.target.value)} className='input-editar' ref={crmRef} />
              <br />
              <span className='span-error'>{erroCRM}</span>
            </div>
            
            <div className='input-container-editar-medico'>
              <label className='label-editar-medico-espc'>Especialidade</label>
              <br />
              <input type="text" value={especialidade} onChange={(e) => setEspecialidade(e.target.value)} className='input-editar' ref={especialidadeRef}/>
              <br />
              <span className='span-error'>{erroEspec}</span>
            </div>
            
            <button onClick={() => handleEditarMedico()} className='botao-editar-medico'>Salvar</button>
          </div>
          <img src="src/assets/Close-white.svg" alt="" className='close-paciente' onClick={() => closeEditarMedico()}/>
        </div>
      </div>
    )
  );
};

export default EditarMedico;
