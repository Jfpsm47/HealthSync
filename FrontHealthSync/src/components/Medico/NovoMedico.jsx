import React from 'react'
import { useRef } from 'react'
import axios from 'axios'
import ReactInputMask from 'react-input-mask'
const NovoMedico = ({isOpen,onClose}) => {
    const nomeref = useRef(null)
    const crmref = useRef(null)
    const especref = useRef(null)

    const Input = (props) => (
      <InputMask mask="99999-999" value={props.value} onChange={props.onChange} />
    );

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
              <div className='cadastro-medico'>
              <h1 className='titulo-cadastro'>Cadastrar Médico</h1>
                  <label>Nome</label>
                  <input type='text' ref={nomeref} className='input-cadastrar'></input>
                  <br />
                  <label>CRM</label>
                  <input type='text' ref={crmref} className='input-cadastrar'></input>
                  <br />
                  <label>Especialidade</label>
                  <input type='text' ref={especref} className='input-cadastrar'></input>
                  <br />
                  <button className='botao-cadastrar' onClick={() => handleCadastrarMedico()}>Cadastrar</button>
              </div>
                
                <button onClick={() => onClose()}>X</button>
            </div>
        </div>
    )
  )
}

export default NovoMedico