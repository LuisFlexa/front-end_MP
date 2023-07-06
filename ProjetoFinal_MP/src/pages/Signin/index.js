import React, { useState } from "react";
import Input from "../../components/Input";
import * as C from "./styles";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

/**
 * @brief Componente de login.
 *
 * Este componente exibe um formulário de login e gerencia o estado do login do usuário.
 */
const Signin = () => {
  const { signin } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");

  /**
   * @brief Manipula o login do usuário.
   *
   * Esta função é chamada quando o usuário clica no botão de login. Ela valida os campos de entrada,
   * realiza o login do usuário e navega para a página principal.
   */
  const handleLogin = () => {
    if (!email | !senha) {
      setError("Preencha todos os campos");
      return;
    }

    const res = signin(email, senha);

    if (res) {
      setError(res);
      return;
    }

    const userToken = localStorage.getItem("user_token");
    localStorage.setItem('usuario', JSON.parse(userToken).email);
    localStorage.setItem("loggedIn", "true");

    // Atualiza a página após 1 segundo
    setTimeout(() => {
      window.location.reload();
    }, 1000);
    navigate("/home");
  };

  return (
    <C.Container>
      <C.Label>LOGIN</C.Label>
      <C.Content>
        <Input
          type="email"
          placeholder="Digite seu E-mail"
          value={email}
          onChange={(e) => [setEmail(e.target.value), setError("")]}
        />
        <Input
          type="password"
          placeholder="Digite sua Senha"
          value={senha}
          onChange={(e) => [setSenha(e.target.value), setError("")]}
        />
        <C.labelError>{error}</C.labelError>
        <button className="btn" onClick={handleLogin}>Login</button>
        <C.LabelSignup>
          Não tem uma conta?
          <C.Strong>
            <Link to="../Cadastro">&nbsp;Registre-se</Link>
          </C.Strong>
        </C.LabelSignup>
      </C.Content>
    </C.Container>
  );
};

export default Signin;
