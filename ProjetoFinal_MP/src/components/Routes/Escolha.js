import React from "react";
import { Link } from "react-router-dom";
import './Escolha.css';

function EscolherPagina() {
  return (
    <div className="container">
      <h1>Escolha uma opção:</h1>
      <div className="button-container">
        <Link to="/moviesmatch">
          <button>Ir para MoviesMatch</button>
        </Link>
        <Link to="/BooksMatch">
          <button>Ir para BooksMatch</button>
        </Link>
      </div>
    </div>
  );
}

export default EscolherPagina;