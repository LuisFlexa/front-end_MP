import React from 'react';

function App() {
  const filmes = [
    { id: 1, titulo: 'Filme 1', genero: 'Ação' },
    { id: 2, titulo: 'Filme 2', genero: 'Comédia' },
    { id: 3, titulo: 'Filme 3', genero: 'Drama' },
  ];

  return (
    <div>
      <h1>Catálogo de Filmes</h1>
      <ul>
        {filmes.map((filme) => (
          <li key={filme.id}>
            <h3>{filme.titulo}</h3>
            <p>{filme.genero}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
