import React, { useState } from "react";
import "./App.css";
import Logo from "./components/imgs/Logo.png";
import { Link, BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { FaUser } from 'react-icons/fa';
import { BsSearch } from 'react-icons/bs';
import Historico from "./components/Routes/Historico.js";
import Contato from "./components/Routes/Contato.js";
import Login from "./pages/Signin";
import Perfil1 from "./components/Routes/Perfil1.js";
import Busca from "./components/Routes/Busca.js";
import Escolha from "./components/Routes/Escolha.js";
import Cadastro from "./pages/Signup";
import Home from "./pages/Home";
import { AuthProvider } from "./contexts/auth";
import useAuth from "./hooks/useAuth";
import MoviesMatch from "./pages/MoviesMatch";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Details from "./pages/Details";
import Prefere from "./pages/Prefere";
import Chat from "./pages/ChatRoom1";
import BookList from "./pages/BooksMatchV2";
import SucessoCadastro from "./pages/SucessoCadastro";
import { auth } from "./services/firebaseConfig";
import {useAuthState, useSignInWithGoogle} from "react-firebase-hooks/auth";

export const Autent = () => {
  const [SignInWithGoogle] = useSignInWithGoogle(auth);
  return (
      <button className="prefereButton" onClick={() => SignInWithGoogle()}>
          Logar Com Google<br></br> 
          para usar ChatMatch
      </button>
  );
};

export default function App() {

  const [user] = useAuthState(auth);

  const Private = ({ Item }) => {
    const { signed } = useAuth();
  
    return signed > 0 ? <Item /> : <Signin />;
  };

  const isLoggedIn = !!localStorage.getItem("loggedIn");

  const handleLogout = () => {
    localStorage.removeItem("loggedIn");
    window.location.href = "/Home";
  };

  const { signout } = useAuth();

  return (
    <Router>
      <div className="App">
        <div className="topo">
          {isLoggedIn ? (
            <>
              <Link to="/perfil" className="link_perfil">
                Perfil
                <FaUser className="icone_perfilA" />
              </Link>
              <Link to="/Login">
                <button className="custom_buttonS" onClick={() => { handleLogout(); auth.signOut(); signout(); }}>
                  Sair
                </button>
              </Link>
              <div className="topoE">
                <Link to="/prefere">
                  <button className="prefereButton">Editar Preferências</button>
                </Link>
                {user ? <Link to="/ChatRoom1"><button className="prefereButton">ChatMatch</button></Link> : <Autent />}
              </div>
            </>
          ) : (
            <>
              <LoginButton />
              <SignupButton />
            </>
          )}
        </div>
        <div className="topoS">
          <ButtonBusca />
        </div>
        <MyButton />
        <h1 className="TextoSite">BookWise</h1>
        <div className="caixa_botoes">
          <CustomButton to="/Home" label="Página Inicial" />
          <CustomButton to="/Recomendações" label="Recomendações" />
          <CustomButton to="/Historico" label="Historico" />
          <CustomButton to="/Contato" label="Contato" />
        </div>
        <AuthProvider>
        <Routes>
          <Route path="/Home" element={<Home />} />
          <Route path="/Historico" element={isLoggedIn ? <Historico /> : <Login /> }/>
          <Route path="/Recomendações" element={isLoggedIn ? <Escolha /> : <Login />} />
          <Route path="/Contato" element={<Contato />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Cadastro" element={<Cadastro />} />
          <Route path="/perfil" element={isLoggedIn ? <Perfil1 /> : <Login />} />
          <Route path="/busca/:query" element={isLoggedIn ? <Busca /> : <Login />} />
          <Route exact path="/home" element={<Private Item={Home} />} />
          <Route path="/" element={<Home />} />
          <Route exact path="/Cadastro" element={<Signup />} />
          <Route exact path="/details/:id" element={<Private Item={Details} />} />
          <Route exact path="/prefere" element={<Private Item={Prefere} />} />
          <Route exact path="/MoviesMatch" element={<Private Item={MoviesMatch} />} />
          <Route exact path="/ChatRoom1" element={<Private Item={Chat} />} />
          <Route exact path="/BooksMatch" element={<Private Item={BookList} />} />
          <Route exact path="/SucessoCadastro" element={<SucessoCadastro />} />
          <Route path="/Login" element={<Signin />} />
        </Routes>
        </AuthProvider>
      </div>
    </Router>
    
  );
}

function LoginButton() {
  return (
    <Link to="/Login" className="link_login">
      <FaUser className="icone_perfil" />
      Log In
    </Link>
  );
}

function SignupButton() {
  return (
    <Link to="/Cadastro" className="link_cadastro">
      Cadastro
    </Link>
  );
}

function MyButton() {
  return (
    <Link to="/Home">
      <button className="botao_Logo">
        <img src={Logo} alt="logo" style={{ width: 146, height: 133 }} />
      </button>
    </Link>
  );
}

function CustomButton({ to, label }) {
  return (
    <Link to={to}>
      <button className="custom_button">{label}</button>
    </Link>
  );
}

function ButtonBusca() {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      navigate(`/busca/${searchValue}`);
    }
  };

  const handleSearchInputChange = (event) => {
    setSearchValue(event.target.value);
  };

  return (
    <div className="divBusca">
      <input
        type="text"
        className="txtBusca"
        placeholder="Buscar..."
        value={searchValue}
        onChange={handleSearchInputChange}
        onKeyPress={handleKeyPress}
      />
      <BsSearch className="topoA" />
    </div>
  );
}
