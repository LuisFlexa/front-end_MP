import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import * as C from "./styles";
import './estilo.css';

const Movies = () => {
  const { signout } = useAuth();
  const navigate = useNavigate();

  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState({});
  const image_path = 'https://image.tmdb.org/t/p/w500';

  useEffect(() => {
    fetchPopularMovies();
  }, []);

  const fetchPopularMovies = () => {
    fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=d6921ce6a56573002e9180ba12b4f5a0&language=en-US&page=1`
    )
      .then((response) => response.json())
      .then((data) => setMovies(data.results));
  };

  const fetchMoreMovies = () => {
    const nextPage = movies.length / 20 + 1; // Obtém o número da próxima página
    fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=d6921ce6a56573002e9180ba12b4f5a0&language=en-US&page=${nextPage}`
    )
      .then((response) => response.json())
      .then((data) => setMovies((prevMovies) => [...prevMovies, ...data.results]));
  };

  useEffect(() => {
    fetchGenres();
  }, []);

  const fetchGenres = () => {
    fetch(
      'https://api.themoviedb.org/3/genre/movie/list?api_key=d6921ce6a56573002e9180ba12b4f5a0&language=en-US'
    )
      .then((response) => response.json())
      .then((data) => {
        const genreMap = {};
        data.genres.forEach((genre) => {
          genreMap[genre.id] = genre.name;
        });
        setGenres(genreMap);
      });
  };

  const getGenreName = (genreIds) => {
    if (genreIds) {
      const genreNames = genreIds.map((genreId) => genres[genreId]);
      return genreNames.join(", ");
    }
    return "";
  };

  const filterMoviesByGenres = (movies, genreNames) => {
    return movies.filter((movie) => {
      const movieGenres = movie.genre_ids.map((genreId) => genres[genreId]);
      return genreNames.some((genreName) => movieGenres.includes(genreName));
    });
  };


  const generos = [""];
  console.log(localStorage.getItem('usuario'));
  console.log(localStorage.getItem(localStorage.getItem('usuario') + 'preference' + 'action'));
  if (localStorage.getItem(localStorage.getItem('usuario') + 'preference' + 'action') === "yes") { generos.push("Action");}
  if (localStorage.getItem(localStorage.getItem('usuario') + 'preference' + 'romance') === "yes") { generos.push("Romance");}
  if (localStorage.getItem(localStorage.getItem('usuario') + 'preference' + 'drama') === "yes") { generos.push("Drama");}
  if (localStorage.getItem(localStorage.getItem('usuario') + 'preference' + 'crime') === "yes") { generos.push("Crime");}
  if (localStorage.getItem(localStorage.getItem('usuario') + 'preference' + 'adventure') === "yes") { generos.push("Adventure");}
  if (localStorage.getItem(localStorage.getItem('usuario') + 'preference' + 'family') === "yes") { generos.push("Family");}
  if (localStorage.getItem(localStorage.getItem('usuario') + 'preference' + 'horror') === "yes") { generos.push("Horror");}
  if (localStorage.getItem(localStorage.getItem('usuario') + 'preference' + 'scienceFiction') === "yes") { generos.push("Science Fiction");}
  if (localStorage.getItem(localStorage.getItem('usuario') + 'preference' + 'comedy') === "yes") { generos.push("Comedy");}
  if (localStorage.getItem(localStorage.getItem('usuario') + 'preference' + 'animation') === "yes") { generos.push("Animation");}
  if (localStorage.getItem(localStorage.getItem('usuario') + 'preference' + 'fantasy') === "yes") { generos.push("Fantasy");}
  if (localStorage.getItem(localStorage.getItem('usuario') + 'preference' + 'thriller') === "yes") { generos.push("Thriller");}
  if (localStorage.getItem(localStorage.getItem('usuario') + 'preference' + 'documentary') === "yes") { generos.push("Documentary");}
  if (localStorage.getItem(localStorage.getItem('usuario') + 'preference' + 'musical') === "yes") { generos.push("Musical");}
  

  const filteredMovies = filterMoviesByGenres(movies, generos);

  return (
    <div className="page-wrapper">
    <C.Container>
      <Link to="/Recomendações"><button className="btn-voltar">Voltar</button></Link>
      <h1>Movies</h1>
      <C.MovieList>
        {filteredMovies.map((movie) => (
          <C.Movie key={movie.id}>
            <Link to={`/details/${movie.id}`}>
              <img src={`${image_path}${movie.poster_path}`} alt={movie.title} />
            </Link>
            <span>{movie.title}</span>
          </C.Movie>
        ))}
      </C.MovieList>
      <div className="botaoDiv">
        <button className="btn-loadMore" onClick={fetchMoreMovies}>Carregar mais filmes</button>
      </div>
    </C.Container>
    </div>
  );
};

export default Movies;
