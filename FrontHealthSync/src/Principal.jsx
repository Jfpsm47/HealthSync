import { useEffect, useState } from 'react'
import Paciente from './components/Paciente/Paciente';
import Medico from './components/Medico/Medico';
import Atendimento from './components/Atendimento/Atendimento';
import Dashboard from './components/Dashboard';
import { useNavigate } from 'react-router-dom';

function Principal() {
  const navigate = useNavigate()

  useEffect(() => {
    if(sessionStorage.getItem("token") === null){
      console.log("Usuario não autenticado!!!")
      navigate("/")
    }
  },[])

  const handleLogout = () => {
    sessionStorage.clear()
    navigate("/")
  }
    
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
    <img src="src\assets\36361.png" className='logo'/>
    <h1 className='name'>HealthySYNC</h1>
    <div>
      <button onClick={openDashboard}>Dashboard</button>

      {isOpenDasboard && (
        <div className='modal'>
          <div className="modal-content">
            <Dashboard></Dashboard>
          </div>
        </div>
      )}
    </div>
    <div>
      <button onClick={openAtendimento}>Atendimento</button>

      {isOpenAtendimento && (
        <div className='modal'>
          <div className="modal-content">
            <Atendimento></Atendimento>
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
            <Medico></Medico>
          </div>
        </div>
      )}
    </div>
    <button onClick={() => handleLogout()}>Logout</button>
    </>
  )
}

export default Principal
