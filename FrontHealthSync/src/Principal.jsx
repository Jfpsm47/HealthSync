import { useEffect, useState } from 'react'
import Paciente from './components/Paciente/Paciente';
import Medico from './components/Medico/Medico';
import Atendimento from './components/Atendimento/Atendimento';
import Dashboard from './components/Dashboard';
import { useNavigate } from 'react-router-dom';
import { Alert } from 'react-bootstrap';


function Principal() {
  const navigate = useNavigate()
  const [retanguloAumentado1,setRetanguloAumentado1] = useState(true)
  const [retanguloAumentado2,setRetanguloAumentado2] = useState(false)
  const [retanguloAumentado3,setRetanguloAumentado3] = useState(false)
  const [retanguloAumentado4,setRetanguloAumentado4] = useState(false)

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

    setRetanguloAumentado1(true)

    setRetanguloAumentado2(false)
    setRetanguloAumentado3(false)
    setRetanguloAumentado4(false)

  };

const openAtendimento = () => {
    setIsOpenAtendimento(true);
    setIsOpenDashboard(false);  
    setIsOpenPaciente(false)
    setIsOpenMedico(false)

    setRetanguloAumentado2(true)

    setRetanguloAumentado1(false)
    setRetanguloAumentado3(false)
    setRetanguloAumentado4(false)
  };
  
  const openPaciente = () => {
    setIsOpenPaciente(true)
    setIsOpenAtendimento(false);
    setIsOpenDashboard(false);
    setIsOpenMedico(false)

    setRetanguloAumentado3(true)

    setRetanguloAumentado1(false)
    setRetanguloAumentado2(false)
    setRetanguloAumentado4(false)
  }

  const openMedico = () => {
    setIsOpenMedico(true)
    setIsOpenPaciente(false)
    setIsOpenAtendimento(false);
    setIsOpenDashboard(false);

    setRetanguloAumentado4(true)

    setRetanguloAumentado1(false)
    setRetanguloAumentado2(false)
    setRetanguloAumentado3(false)
  }

  return (
    <>
    <div className='logo'>
      <img src="src\assets\Logo.svg" className='logo-img'/>
      <h1 className='name'>HealthySYNC</h1>
    </div>

    <div>
    <div className="container-botao">
      <div className={`retangulo1 ${retanguloAumentado1 ? 'aumento1' : ''}`}>
      </div>
      <button onClick={openDashboard} className='botao-menu'>
        <img src="src/assets/Dashboard.svg" className='botao-logo'/>
      </button>
      <span className={`span-menu ${retanguloAumentado1 ? 'animado' : ''}`}>Dashboard</span>
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
        <div className={`retangulo2 ${retanguloAumentado2 ? 'aumento2' : ''}`} ></div>
        <button onClick={openAtendimento} className='botao-menu'>
          <img src="src/assets/Atendimento.svg" alt="" className='botao-logo'/>
        </button>
        <span className={`span-menu ${retanguloAumentado2 ? 'animado' : ''}`}>Atendimento</span>
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
      <div className={`retangulo3 ${retanguloAumentado3 ? 'aumento3' : ''}`} ></div>
        <button onClick={openPaciente} className='botao-menu'>
        <img src="src/assets/Paciente.svg" alt="" className='botao-logo'/>
      </button>
      <span className={`span-menu ${retanguloAumentado3 ? 'animado' : ''}`}>Paciente</span>
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
      <div className={`retangulo4 ${retanguloAumentado4 ? 'aumento4' : ''}`} ></div>
        <button onClick={openMedico} className='botao-menu'>
        <img src="src/assets/Medico.svg" alt="" className='botao-logo'/>
      </button>
      <span className={`span-menu ${retanguloAumentado4 ? 'animado' : ''}`}>Medico</span>
      </div>
      

      {isOpenMedico && (
        <div className='modal'>
          <div className="modal-content">
            <Medico></Medico>
          </div>
        </div>
      )}
    </div>
    
    <div className='container-botao'>
      <button onClick={() => handleLogout()} className='botao-menu'>
      <img src="src/assets/Logout.svg" alt="" className='logo-logout' />
    </button>
    <span className='span-menu'>Logout</span>
    </div>
    
    <div className='teste'></div>
    </>
  )
}

export default Principal
