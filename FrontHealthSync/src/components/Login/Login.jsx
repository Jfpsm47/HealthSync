import {  useState  } from "react";
import * as Components from "./LoginEstilo";
import "./login.css";
import { useRef } from "react";

function Login() {
  const [signIn, toggle] = useState(true);
  
  const usernameRef = useRef(null)

  
  return (
    <div className="LoginBody">
    <Components.Container>
        <Components.SignUpContainer signingIn={signIn}>
          <Components.Form>
            <Components.Title>Crie sua conta</Components.Title>
            <Components.Input type="text" placeholder="UsuarioCadastro" id="NomeCadastro" required/>
            <Components.Input type="email" placeholder="EmailCadastro" id="EmailCadastro" required/>
            <Components.Input type="password" placeholder="SenhaCadastro" id="SenhaCadastro" required/>
            <Components.Input type="password" placeholder="ConfirmarSenhaCadastro" id="SenhaConfirmarCadastro" required/>
            <Components.Button>Cadastrar</Components.Button>
          </Components.Form>
        </Components.SignUpContainer>
        <Components.SignInContainer signingIn={signIn}>
          <Components.Form>
            <Components.Title>Entrar</Components.Title>
            <Components.Input type="email" placeholder="EmailLogin"/>
            <Components.Input type="password" placeholder="SenhaLogin" />
            <Components.Button>Entrar</Components.Button>
          </Components.Form>
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
