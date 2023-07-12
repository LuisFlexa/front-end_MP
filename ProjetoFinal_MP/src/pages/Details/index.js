import { useEffect, useState } from 'react'
import {Link, useParams} from 'react-router-dom'
import { Container } from './styles'

/**
 * Componente de detalhes do filme.
 *
 * Assertiva de entrada: Filme selecionado pelo usuário.
 * Assertiva de saída: Uma sinopse do filme.
 * 
 * Este componente busca os detalhes de um filme com base no ID fornecido e exibe as informações do filme na tela.
 *
 * @returns {JSX.Element} O elemento JSX contendo as informações detalhadas do filme.
 */
function Details(){
    const { id } = useParams()
    const [movie, setMovie] = useState([])
    const image_path = 'https://image.tmdb.org/t/p/w500'

    useEffect(() => {
        /**
         * Busca os detalhes do filme.
         *
         * Esta função é executada ao montar o componente e busca os detalhes do filme com base no ID fornecido.
         */
        fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=d6921ce6a56573002e9180ba12b4f5a0&language=pt-BR`)
            .then(response => response.json())
            .then(data => {

                const movie = {
                    id,
                    title: data.title,
                    sinopse: data.overview,
                    image: `${image_path}${data.poster_path}`,
                    releaseDate: data.release_date
                }
                console.log("HEHE")
                console.log(movie)
                setMovie(movie)
            })
    }, [id] )

    return (
        <Container>
            <div className="page-wrapper">
                <img src={movie.image} alt={movie.sinopse}/>
                <div className="details">
                    <h1><b>{movie.title}</b></h1>
                    <br></br><br></br>

                    <span><b>Sinope: </b> {movie.sinopse}</span>
                    <br></br><br></br>

                    <span className='release-date'>Release date: {movie.releaseDate}</span>
                    <br></br><br></br><br></br>
                    <Link to="/MoviesMatch"><button>Voltar</button></Link>
                    
                </div>
            </div>
        </Container>
    )
}

export default Details