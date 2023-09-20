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
    <div className='logo'>
      <img src="src\assets\Logo.svg" className='logo-img'/>
      <h1 className='name'>HealthySYNC</h1>
    </div>
    
    <div>
    <div className="container-botao">
      <button onClick={openDashboard} className='botao-menu'>
        <img src="src/assets/Dashboard.svg" className='botao-logo'/>
      </button>
      <span>Dashboard</span>
    </div>
      {isOpenDasboard && (
        <div className='modal'>
          <div className="modal-content">
            <Dashboard></Dashboard>
          </div>
        </div>
      )}
    </div>
    <div>
      <div className="container-botao" >
        <button onClick={openAtendimento} className='botao-menu'>
          <img src="src/assets/Atendimento.svg" alt="" className='botao-logo'/>
        </button>
        <span>Atendimento</span>
      </div>
      {isOpenAtendimento && (
        <div className='modal'>
          <div className="modal-content">
            <Atendimento></Atendimento>
          </div>
        </div>
      )}
    </div>
    <div>
      <div className="container-botao">
        <button onClick={openPaciente} className='botao-menu'>
        <img src="src/assets/Paciente.svg" alt="" className='botao-logo'/>
      </button>
      <span>Paciente</span>
      </div>
    
      {isOpenPaciente && (
        <div className='modal'>
          <div className="modal-content">
            <Paciente/>
          </div>
        </div>
      )}
    </div>
    <div>
      <div className="container-botao">
        <button onClick={openMedico} className='botao-menu'>
        <img src="src/assets/Medico.svg" alt="" className='botao-logo'/>
      </button>
      <span>Medico</span>
      </div>
      

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
