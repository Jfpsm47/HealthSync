import {  useState  } from "react";
import * as Components from "./LoginEstilo";
import "./login.css";
import { useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [signIn, toggle] = useState(true);
  
  const navigate = useNavigate()

  const usernameRef = useRef(null)
  const emailRef = useRef(null)
  const senha1Ref = useRef(null)
  const senha2Ref = useRef(null)

  const emailLoginRef = useRef(null)
  const senhaLoginRef  =useRef(null)

  const errors = [];

  const handleCadastrar = async () => {
    var username = usernameRef.current.value
    var email = emailRef.current.value
    var senha1 = senha1Ref.current.value
    var senha2 = senha2Ref.current.value

    if (senha1Ref.current.value === senha2Ref.current.value) {
      const usuario = {
        login:(usernameRef.current.value),
        email:(emailRef.current.value),
        senha:(senha1Ref.current.value)
      }
      console.log(usuario)

      try {
        const response  = await axios.post('http://localhost:8081/auth/register',usuario)
        console.log(response)
        toggle(true)
      } catch (error) {
        console.log('erro na requisão',error)
        alert(error.response.data)
      }
    } else {
      alert("As senhas não são as mesmas")
      senha1Ref.current.value = null
      senha2Ref.current.value = null
    }
  };
  const handleEntrar = async () => {
    const usuario = {
      email:(emailLoginRef.current.value),
      senha:(senhaLoginRef.current.value)
    }
    console.log(usuario)
    try {
      const response  = await axios.post('http://localhost:8081/auth/login',usuario)
      console.log(response.data)
      sessionStorage.setItem('token',response.data) 
      if(sessionStorage.getItem("token") != null ){
        console.log("Chegou aqui!!!");
        navigate("/principal")
        
      }
    } catch (error) {
      console.log('erro na requisão',error)
      alert(error.response.data)
    }

  }

  return (
    <div className="LoginBody">
    <Components.Container>
        <Components.SignUpContainer signingIn={signIn}>
          <Components.Formulario>
            <Components.Title>Crie sua conta</Components.Title>
            <Components.Input type="text" placeholder="UsuarioCadastro" id="NomeCadastro" ref={usernameRef} required/>
            <Components.Input type="email" placeholder="EmailCadastro" id="EmailCadastro" ref={emailRef} required/>
            <Components.Input type="password" placeholder="SenhaCadastro" id="SenhaCadastro" ref={senha1Ref} required/>
            <Components.Input type="password" placeholder="ConfirmarSenhaCadastro" id="SenhaConfirmarCadastro" ref={senha2Ref} required/>
            <Components.Button onClick={() => handleCadastrar()}>Cadastrar</Components.Button>
          </Components.Formulario>
        </Components.SignUpContainer>
        <Components.SignInContainer signingIn={signIn}>
          <Components.Formulario>
            <Components.Title>Entrar</Components.Title>
            <Components.Input type="email" placeholder="EmailLogin" ref={emailLoginRef}/>
            <Components.Input type="password" placeholder="SenhaLogin" ref={senhaLoginRef} />
            <Components.Button onClick={() => handleEntrar()}>Entrar</Components.Button>
          </Components.Formulario>
        </Components.SignInContainer>
        <Components.OverlayContainer signingIn={signIn}>
          <Components.Overlay signingIn={signIn}>
            <Components.LeftOverlayPanel signingIn={signIn}>
              <Components.Title>Já tem conta?</Components.Title>
              <Components.Paragraph>
                Entre com sua Conta, Faça Login
              </Components.Paragraph>
              <Components.GhostButton onClick={() => toggle(true)}>
                Entrar
              </Components.GhostButton>
            </Components.LeftOverlayPanel>
            <Components.RightOverlayPanel signingIn={signIn}>
              <Components.Title>Olá, Amigo!</Components.Title>
              <Components.Paragraph>
                Insira seus dados pessoais e comece sua jornada conosco
              </Components.Paragraph>
              <Components.GhostButton onClick={() => toggle(false)}>
                Cadastrar
              </Components.GhostButton>
            </Components.RightOverlayPanel>
          </Components.Overlay>
        </Components.OverlayContainer>
      </Components.Container>
    </div>
  );
}
export default Login;