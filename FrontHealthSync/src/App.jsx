import { useState } from 'react'
import Paciente from './components/Paciente';
import ReactModal from 'react-modal';

function App() {
  const [isOpenDasboard, setIsOpenDashboard] = useState(true);
  const [isOpenAtendimento, setIsOpenAtendimento] = useState(false);
  const [isOpenPaciente, setIsOpenPaciente] = useState(false)
  const [isOpenMedico, setIsOpenMedico] = useState(false)

  const openDashboard = () => {
    setIsOpenDashboard(true);
    setIsOpenAtendimento(false);
    setIsOpenPaciente(false)
    setIsOpenMedico(false)

  };

const openAtendimento = () => {
    setIsOpenAtendimento(true);
    setIsOpenDashboard(false);  
    setIsOpenPaciente(false)
    setIsOpenMedico(false)
  };
  
  const openPaciente = () => {
    setIsOpenPaciente(true)
    setIsOpenAtendimento(false);
    setIsOpenDashboard(false);
    setIsOpenMedico(false)
  }

  const openMedico = () => {
    setIsOpenMedico(true)
    setIsOpenPaciente(false)
    setIsOpenAtendimento(false);
    setIsOpenDashboard(false);
  }


 
  return (
    <>
    <h1>Teste</h1>
    <div>
      <button onClick={openDashboard}>Dashboard</button>

      {isOpenDasboard && (
        <div className='modal'>
          <div className="modal-content">
            <h2>Dashboard</h2>
            <p>Conteúdo do modal aqui.</p>
          </div>
        </div>
      )}
    </div>
    <div>
      <button onClick={openAtendimento}>Atendimento</button>

      {isOpenAtendimento && (
        <div className='modal'>
          <div className="modal-content">
            <h2>Atendimento</h2>
            <p>Conteúdo do modal aqui.</p>
          </div>
        </div>
      )}
    </div>
    <div>
      <button onClick={openPaciente}>Paciente</button>

      {isOpenPaciente && (
        <div className='modal'>
          <div className="modal-content">
            <Paciente/>
          </div>
        </div>
      )}
    </div>
    <div>
      <button onClick={openMedico}>Médico</button>

      {isOpenMedico && (
        <div className='modal'>
          <div className="modal-content">
            <h2>Médico</h2>
            <p>Conteúdo do modal aqui.</p>
          </div>
        </div>
      )}
    </div>
    </>
  )
}

export default App
