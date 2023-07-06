import { Navigate } from 'react-router-dom';
import './estilo.css';
import Livros from "../../components/imgs/livros.png";

/**
 * @brief Componente que representa a página inicial do menu.
 * @returns {JSX.Element} Componente da página inicial do menu.
 */
const MenuHome = () => {

    /**
     * @const usuario
     * @brief Variável que armazena o nome do usuário.
     * @type {string}
     */
    const usuario = localStorage.getItem(localStorage.getItem('usuario') + 'preference' + 'action');
    
    /**
     * @brief Verifica se o usuário está autenticado e redireciona para a página de preferências, se necessário.
     * @returns {JSX.Element} Componente Navigate do React Router para redirecionamento.
     */
    if (!usuario) {
        return <Navigate to="/prefere" />;
    }

    const tipoUsuario = ["", "", "", "", ""];
    if (localStorage.getItem(localStorage.getItem('usuario') + 'preference' + 'action') === "yes" || 
    localStorage.getItem(localStorage.getItem('usuario') + 'preference' + 'crime') === "yes" || 
    localStorage.getItem(localStorage.getItem('usuario') + 'preference' + 'adventure') === "yes" ||
    localStorage.getItem(localStorage.getItem('usuario') + 'preference' + 'scienceFiction') === "yes"
    ){
      tipoUsuario[0] = "A";
    }

    if (localStorage.getItem(localStorage.getItem('usuario') + 'preference' + 'romance') === "yes" || 
    localStorage.getItem(localStorage.getItem('usuario') + 'preference' + 'drama') === "yes"
    ){
      tipoUsuario[1] = "B";
    }

    if (localStorage.getItem(localStorage.getItem('usuario') + 'preference' + 'family') === "yes" || 
    localStorage.getItem(localStorage.getItem('usuario') + 'preference' + 'fantasy') === "yes" || 
    localStorage.getItem(localStorage.getItem('usuario') + 'preference' + 'comedy') === "yes" ||
    localStorage.getItem(localStorage.getItem('usuario') + 'preference' + 'animation') === "yes"
    ){
      tipoUsuario[2] = "C";
    }

    if (localStorage.getItem(localStorage.getItem('usuario') + 'preference' + 'musical') === "yes" || 
    localStorage.getItem(localStorage.getItem('usuario') + 'preference' + 'documentary') === "yes"
    ){
      tipoUsuario[3] = "D";
    }

    localStorage.setItem(localStorage.getItem('usuario'+'tipo'), ' ');
    if (tipoUsuario[0] == "A") {localStorage.setItem(localStorage.getItem('usuario'+'tipo'), "A" + localStorage.getItem(localStorage.getItem('usuario'+'tipo')));}
    if (tipoUsuario[1] == "B") {localStorage.setItem(localStorage.getItem('usuario'+'tipo'), "B" + localStorage.getItem(localStorage.getItem('usuario'+'tipo')));}
    if (tipoUsuario[2] == "C") {localStorage.setItem(localStorage.getItem('usuario'+'tipo'), "C" + localStorage.getItem(localStorage.getItem('usuario'+'tipo')));}
    if (tipoUsuario[3] == "D") {localStorage.setItem(localStorage.getItem('usuario'+'tipo'), "D" + localStorage.getItem(localStorage.getItem('usuario'+'tipo')));}
    
    console.log(localStorage.getItem(localStorage.getItem('usuario'+'tipo')));

    return (
      <div className="home-container">
      <div className="content">
        <h1>Bem-vindo ao BookWise</h1>
        <p className='paragraph'>
        O BookWise é um site onde você pode encontrar pessoas com gostos
          similares para conversar sobre filmes, livros e muito mais. Se você
          adora compartilhar suas recomendações e discutir suas paixões
          culturais, este é o lugar perfeito para você.
        </p>
        <p className='paragraph'>
        Nosso objetivo é criar uma comunidade de amantes da cultura,
          proporcionando um ambiente divertido e acolhedor para trocar ideias,
          fazer novas amizades e expandir seus horizontes culturais.
        </p>
        <p className='paragraph'>
        O ChatMatch foi feito para todos os aficionados por cinema, literatura
          e entretenimento em geral. Não importa se você é um fã de filmes de
          ação, um devorador de livros de suspense ou um amante de animações,
          aqui você encontrará pessoas com interesses semelhantes aos seus.
        </p>
        <p className='paragraph'>
        Então, não perca mais tempo! Cadastre-se, explore nossos recursos e
          comece a conversar com pessoas que compartilham sua paixão pela
          cultura.
        </p>
      </div>
      <div className="side-images-right">
        <img src={Livros} alt="Image 1" />
      </div>
      <div className="side-images-left">
        <img src={Livros} alt="Image 2" />
      </div>
      <div className="footer">
        <p>Entre em contato conosco:</p>
        <p>Telefone: (00) 1234-5678</p>
        <p>Email: contato@exemplo.com</p>
      </div>
    </div>
  );
};

export default MenuHome;