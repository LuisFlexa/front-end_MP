import { getAuth } from "firebase/auth";
import { Link } from "react-router-dom";
import { addDoc, collection, limit, orderBy, query, serverTimestamp } from "firebase/firestore";
import { useRef, useState } from "react";
import { useAuthState, useSignInWithGoogle } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { app, databaseApp } from "../../services/firebaseConfig";
import './estilo.css';

const auth = getAuth(app);

/**
 * Componente principal da aplicação.
 *
 * Este componente renderiza o cabeçalho, o conteúdo principal (ChatRoom ou SignIn) e gerencia o estado de autenticação do usuário.
 *
 * @returns {JSX.Element} O elemento JSX contendo o componente principal da aplicação.
 */
// U04
export const App = () => {
  const [user] = useAuthState(auth);
  return (
    <div className='App'>
      <header>
         <h1>ChatMatch</h1>
        <SignOut />
      </header>
      <section>{user ? <ChatRoom /> : <SignIn />}</section>
    </div>
  );
};

/**
 * Componente que exibe a sala de chat.
 *
 * Este componente busca mensagens da sala de chat, permite enviar mensagens e renderiza as mensagens na tela.
 *
 * @returns {JSX.Element} O elemento JSX contendo a sala de chat.
 */
export const ChatRoom = () => {
  const chatString = localStorage.getItem(localStorage.getItem('usuariotipo'));
  console.log(localStorage.getItem(localStorage.getItem('usuariotipo')));
  
  const dummy = useRef()
  const messagesRef = collection(databaseApp, chatString);
  const q = query(messagesRef, orderBy("createdAt"), limit(25));
  const [messages] = useCollectionData(q, { idField: "id" });

  const [formValue, setFormValue] = useState("");

  /**
   * Envia uma mensagem.
   *
   * Esta função é chamada quando o usuário envia uma mensagem no formulário. Ela adiciona a mensagem
   * ao banco de dados e limpa o campo de entrada de mensagens.
   *
   * @param {Object} e - Evento do formulário.
   */
  const sendMessage = async (e) => {
    e.preventDefault();
    const { photoURL, uid } = auth.currentUser;
/* eslint-disable */
    await addDoc(messagesRef, {
      text: formValue,
      uid,
      photoURL,
      createdAt: serverTimestamp()
    });
    setFormValue('')
    dummy.current.scrollIntoView({behavior: 'smooth'})
  };

  return (
    <>
      <main className="man">
        {messages &&
          messages.map((msg, index) => <ChatMessage key={index} message={msg} />)}
          <div ref={dummy}></div>
      </main>
      <form className="fom" onSubmit={sendMessage}>
        <input className="inp"
          type="text"
          value={formValue}
          onChange={(e) => setFormValue(e.target.value)}
        />
        <button className="btn1" type="submit"  disabled={!formValue}>Enviar</button>
      </form>
    </>
  );
};

/**
 * Componente que representa uma mensagem de chat.
 *
 * Este componente renderiza uma mensagem de chat com o texto e a imagem do remetente.
 *
 * @param {Object} props - Propriedades do componente.
 * @param {string} props.text - O texto da mensagem.
 * @param {string} props.uid - O ID do remetente da mensagem.
 * @param {string} props.photoURL - A URL da foto do remetente.
 * @returns {JSX.Element} O elemento JSX contendo a mensagem de chat.
 */
export const ChatMessage = (props) => {
  const { text, uid, photoURL } = props.message;

  const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received';
  return (
    <div className={`message ${messageClass}`}>
      <img className="photo" src={photoURL || 'https://cdn-icons-png.flaticon.com/512/711/711769.png'} />
      <p className="paragraph">{text}</p>
    </div>
  );
};

/**
 * Componente de autenticação do usuário.
 *
 * Este componente renderiza um botão para fazer login com o Google.
 *
 * @returns {JSX.Element} O elemento JSX contendo o componente de autenticação do usuário.
 */
export const SignIn = () => {
  const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);

  return <button className="btn-voltar" onClick={() => signInWithGoogle()}>logar com Google</button>;
};

/**
 * Componente de logout do usuário.
 *
 * Este componente renderiza um botão para fazer logout e redirecionar o usuário para a página inicial.
 *
 * @returns {JSX.Element} O elemento JSX contendo o componente de logout do usuário.
 */
export const SignOut = () => {
  return (
    <Link to="/home"><button className="btn-voltar">Sair</button></Link>
  );
};

export default App;
