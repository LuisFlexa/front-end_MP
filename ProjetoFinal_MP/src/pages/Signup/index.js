import React, { useState } from "react";
import Input from "../../components/Input";
import * as C from "./styles";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

/**
 * Componente de cadastro.
 * 
 * Exibe um formulário de cadastro e gerencia o estado do cadastro do usuário.
 * 
 * Assertiva de entrada: Email, senha e confirmação de senha válidos.
 * Assertiva de saída: O usuário é cadastrado com sucesso.
 * 
 * @returns {JSX.Element} O elemento JSX contendo o formulário de cadastro.
 */
const Signup = () => {
  const [email, setEmail] = useState("");
  const [senhaConf, setEmailConf] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const { signup } = useAuth();

  /**
   * Manipula o cadastro do usuário.
   * 
   * É chamada quando o usuário clica no botão de cadastro. 
   * Valida os campos de entrada, realiza o cadastro do usuário e navega para a página de sucesso de cadastro.
   */
  const handleSignup = () => {
    if (!email | !senhaConf | !senha) {
      setError("Preencha todos os campos");
      return;
    } else if (senha !== senhaConf) {
      setError("As senhas não são iguais");
      return;
    }

    const tt = "OMG"
    const res = signup(email, senha);

    if (res) {
      setError(res);
      return;
    }

    navigate("/SucessoCadastro");
  };

  return (
    <C.Container>
      <C.Label>CADASTRO</C.Label>
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
        <Input
          type="password"
          placeholder="Confirme sua Senha"
          value={senhaConf}
          onChange={(e) => [setEmailConf(e.target.value), setError("")]}
        />
        <C.labelError>{error}</C.labelError>
        <button className="btn" onClick={handleSignup}>Registre-se</button>
        <C.LabelSignin>
          Já tem uma conta?
          <C.Strong>
            <Link to="/login">&nbsp;Entre</Link>
          </C.Strong>
        </C.LabelSignin>
      </C.Content>
    </C.Container>
  );
};

export default Signup;
