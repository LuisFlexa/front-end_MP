import React, { useState, useEffect } from "react";

function Historico() {
  const [historicoData, setHistoricoData] = useState([]);
  const loggedInUser = localStorage.getItem("username");

  useEffect(() => {
    const fetchData = () => {
      const historico = [];

      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);

        if (key.startsWith(`${loggedInUser}_bookFeedback_`)) {
          const id = key.split("_")[2];
          const feedback = localStorage.getItem(key);
          const comment = localStorage.getItem(`${loggedInUser}_bookComment_${id}`);
          const nomeDoLivro = localStorage.getItem(`${loggedInUser}_bookName_${id}`);

          historico.push({
            Obra: nomeDoLivro,
            Sua_Nota: feedback === "like" ? "Like" : "Dislike",
            Comentarios: comment,
            Id_do_Livro: id,
          });
        }
      }

      setHistoricoData(historico.reverse());
    };

    fetchData();
  }, [loggedInUser]);

  return (
    <div className="historico-table texto-branco">
      <h1>Histórico</h1>
      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>Obra</th>
              <th>Like/Dislike</th>
              <th>Comentários</th>
              <th>Id do Livro</th>
            </tr>
          </thead>
          <tbody>
            {historicoData.map((item, index) => (
              <tr key={index}>
                <td>{item.Obra}</td>
                <td>{item.Sua_Nota}</td>
                <td>{item.Comentarios}</td>
                <td>{item.Id_do_Livro}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Historico;
