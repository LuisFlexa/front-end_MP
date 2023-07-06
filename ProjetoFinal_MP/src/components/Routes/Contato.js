import React, { useState } from "react";
import './contato.css';

const Contato = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Aqui você pode adicionar o código para enviar o formulário por e-mail usando um serviço de backend
    // Por exemplo, você pode fazer uma requisição POST para uma API que processa o envio do formulário

    // Após o envio do formulário, você pode limpar os campos ou exibir uma mensagem de sucesso
    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <div className="contact-container">
      <h1>Entre em contato</h1>
      <form className="contact-form" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Nome:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="email">E-mail:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="message">Mensagem:</label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          ></textarea>
        </div>
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
};

export default Contato;
