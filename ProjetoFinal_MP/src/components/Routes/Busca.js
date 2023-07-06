import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";

const BuscaPage = () => {
  const { query } = useParams();
  const loggedInUser = localStorage.getItem("username");

  const [comments, setComments] = useState({});
  const [showFeedback, setShowFeedback] = useState({});
  const [likedBooks, setLikedBooks] = useState([]);
  const [dislikedBooks, setDislikedBooks] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  const handleCommentChange = (event, id) => {
    setComments((prevComments) => ({
      ...prevComments,
      [id]: event.target.value,
    }));
  };

  const handleShowFeedback = (id) => {
    setShowFeedback((prevShowFeedback) => ({
      ...prevShowFeedback,
      [id]: true,
    }));
  };

  const handleLike = (id) => {
    if (likedBooks.includes(id)) {
      setLikedBooks((prevLikedBooks) => prevLikedBooks.filter((bookId) => bookId !== id));
      localStorage.removeItem(`${loggedInUser}_bookFeedback_${id}`);
    } else {
      setLikedBooks((prevLikedBooks) => [...prevLikedBooks, id]);
      setDislikedBooks((prevDislikedBooks) => prevDislikedBooks.filter((bookId) => bookId !== id));
      localStorage.setItem(`${loggedInUser}_bookFeedback_${id}`, "like");
    }
  };

  const handleDislike = (id) => {
    if (dislikedBooks.includes(id)) {
      setDislikedBooks((prevDislikedBooks) => prevDislikedBooks.filter((bookId) => bookId !== id));
      localStorage.removeItem(`${loggedInUser}_bookFeedback_${id}`);
    } else {
      setDislikedBooks((prevDislikedBooks) => [...prevDislikedBooks, id]);
      setLikedBooks((prevLikedBooks) => prevLikedBooks.filter((bookId) => bookId !== id));
      localStorage.setItem(`${loggedInUser}_bookFeedback_${id}`, "dislike");
    }
  };

  const handleSubmitComment = (id) => {
    console.log(`Livro ${id} - Comentário: ${comments[id]}`);
    localStorage.setItem(`${loggedInUser}_bookComment_${id}`, comments[id]);
  };

  useEffect(() => {
    // Verificar se há feedback salvo no localStorage
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key.startsWith(`${loggedInUser}_bookFeedback_`)) {
        const id = key.split("_")[2];
        const feedback = localStorage.getItem(key);
        if (feedback === "like") {
          setLikedBooks((prevLikedBooks) => [...prevLikedBooks, id]);
        } else if (feedback === "dislike") {
          setDislikedBooks((prevDislikedBooks) => [...prevDislikedBooks, id]);
        }
      }
    }
  }, [loggedInUser]);

  useEffect(() => {
    // Fazer a busca de livros usando a API do Google Books
    const fetchBooks = async () => {
      try {
        const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}`);
        const data = await response.json();
        setSearchResults(data.items);
      } catch (error) {
        console.log("Erro na busca de livros:", error);
      }
    };

    fetchBooks();
  }, [query]);

  useEffect(() => {
    // Salvar o nome da obra no localStorage quando uma avaliação é feita
    for (const id of likedBooks.concat(dislikedBooks)) {
      if (searchResults.some((book) => book.id === id)) {
        const book = searchResults.find((book) => book.id === id);
        const { title } = book.volumeInfo;
        localStorage.setItem(`${loggedInUser}_bookName_${id}`, title);
      }
    }
  }, [likedBooks, dislikedBooks, searchResults, loggedInUser]);

  return (
    <div className="texto-branco">
      <h2>Resultados da busca por: {query}</h2>
      <ul>
        {searchResults.map((book) => {
          const { id, volumeInfo } = book;
          const { title, categories } = volumeInfo;

          return (
            <li key={id}>
              <h3>{title}</h3>
              <p>Categoria: {categories ? categories[0] : "N/A"}</p>
              {showFeedback[id] && (
                <>
                  <div>
                    <button
                      className={`like-button ${likedBooks.includes(id) ? "clicked" : ""}`}
                      onClick={() => handleLike(id)}
                    >
                      <FaThumbsUp />
                    </button>
                    <button
                      className={`dislike-button ${dislikedBooks.includes(id) ? "clicked" : ""}`}
                      onClick={() => handleDislike(id)}
                    >
                      <FaThumbsDown />
                    </button>
                  </div>
                  <textarea
                    className="comment-input"
                    placeholder="Deixe seu comentário"
                    value={comments[id] || ""}
                    onChange={(event) => handleCommentChange(event, id)}
                  ></textarea>
                  <button onClick={() => handleSubmitComment(id)} className="custom_button2">
                    Enviar
                  </button>
                </>
              )}
              {!showFeedback[id] && (
                <button onClick={() => handleShowFeedback(id)} className="custom_button2">
                  Mostrar feedback
                </button>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default BuscaPage;
