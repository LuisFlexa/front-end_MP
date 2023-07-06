import { getAuth } from "firebase/auth";
import { Link } from "react-router-dom";
import { addDoc, collection, limit, orderBy, query, serverTimestamp } from "firebase/firestore";
import { useRef, useState } from "react";
import { useAuthState, useSignInWithGoogle } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { app, databaseApp } from "../../services/firebaseConfig";
import './estilo.css';

const auth = getAuth(app);

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

export const ChatRoom = () => {
  const chatString = localStorage.getItem(localStorage.getItem('usuario'+'tipo'));
  console.log(localStorage.getItem(localStorage.getItem('usuario'+'tipo')));
  
  const dummy = useRef()
  const messagesRef = collection(databaseApp, chatString);
  const q = query(messagesRef, orderBy("createdAt"), limit(25));
  const [messages] = useCollectionData(q, { idField: "id" });

  const [formValue, setFormValue] = useState("");
  const sendMessage = async (e) => {
    e.preventDefault();
    const { photoURL, uid } = auth.currentUser;

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

export const SignIn = () => {
  const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);

  return <button className="btn-voltar" onClick={() => signInWithGoogle()}>logar com Google</button>;
};

export const SignOut = () => {
  return (
    <Link to="/home"><button className="btn-voltar">Sair</button></Link>
  );
};

export default App;
