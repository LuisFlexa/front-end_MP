import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './estilo.css';

/**
 * Componente que exibe uma lista de livros.
 *
 * Assertiva de entrada: Preferências do usuário.
 * Assertiva de saída: Uma lista de recomendações de livros de acordo com suas preferências.
 * 
 * Este componente busca dados dos livros de diferentes gêneros e exibe uma lista de livros.
 *
 * @returns {JSX.Element} O elemento JSX contendo a lista de livros.
 */
// U02 e U06
const BookList = () => {
  const [books, setBooks] = useState([]);
  const [error, setError] = useState('');
  const [visibleBooks, setVisibleBooks] = useState(8); // Quantidade inicial de livros visíveis
  const [totalBooks, setTotalBooks] = useState(0); // Total de livros disponíveis
  const [isLoading, setIsLoading] = useState(false); // Flag de carregamento

  useEffect(() => {
    /**
     * Função para buscar os dados dos livros.
     *
     * Esta função é executada ao montar o componente e busca dados dos livros de diferentes gêneros
     * usando a API do New York Times.
     */
    const fetchBooks = async () => {
      setIsLoading(true);
      const apiKey = 'GVGurX2a9F3WrELlA1y42Rz1l8yyAbZI';
      const genre1 = 'hardcover-fiction';
      const genre2 = 'hardcover-nonfiction';
      const genre3 = 'advice-how-to-and-miscellaneous';
      const genre4 = 'young-adult';

      const response1 = await fetch(
        `https://api.nytimes.com/svc/books/v3/lists/current/${genre1}.json?api-key=${apiKey}`
      );
      const data1 = await response1.json();

      const response2 = await fetch(
        `https://api.nytimes.com/svc/books/v3/lists/current/${genre2}.json?api-key=${apiKey}`
      );
      const data2 = await response2.json();

      const response3 = await fetch(
        `https://api.nytimes.com/svc/books/v3/lists/current/${genre3}.json?api-key=${apiKey}`
      );
      const data3 = await response3.json();

      const response4 = await fetch(
        `https://api.nytimes.com/svc/books/v3/lists/current/${genre4}.json?api-key=${apiKey}`
      );
      const data4 = await response4.json();

      if (response1.ok && response2.ok && response3.ok && response4.ok) {
        const bookList1 = data1.results.books.map((book) => ({
          title: book.title,
          author: book.author,
          image: book.book_image,
          genre: genre1,
          link: book.amazon_product_url,
        }));

        const bookList2 = data2.results.books.map((book) => ({
          title: book.title,
          author: book.author,
          image: book.book_image,
          genre: genre2,
          link: book.amazon_product_url,
        }));

        const bookList3 = data3.results.books.map((book) => ({
          title: book.title,
          author: book.author,
          image: book.book_image,
          genre: genre3,
          link: book.amazon_product_url,
        }));

        const bookList4 = data4.results.books.map((book) => ({
          title: book.title,
          author: book.author,
          image: book.book_image,
          genre: genre4,
          link: book.amazon_product_url,
        }));

        const combinedBookList = [];

        if (
          localStorage.getItem(localStorage.getItem('usuario') + 'preference' + 'romance') === 'yes' ||
          localStorage.getItem(localStorage.getItem('usuario') + 'preference' + 'drama') === 'yes' ||
          localStorage.getItem(localStorage.getItem('usuario') + 'preference' + 'comedy') === 'yes'
        ) {
          console.log('entra romance');
          combinedBookList.push(...bookList4);
        }

        if (
          localStorage.getItem(localStorage.getItem('usuario') + 'preference' + 'musical') === 'yes' ||
          localStorage.getItem(localStorage.getItem('usuario') + 'preference' + 'documentary') === 'yes'
        ) {
          console.log('entra motivacional');
          combinedBookList.push(...bookList3);
        }

        if (
          localStorage.getItem(localStorage.getItem('usuario') + 'preference' + 'animation') === 'yes' ||
          localStorage.getItem(localStorage.getItem('usuario') + 'preference' + 'fantasy') === 'yes' ||
          localStorage.getItem(localStorage.getItem('usuario') + 'preference' + 'comedy') === 'yes' ||
          localStorage.getItem(localStorage.getItem('usuario') + 'preference' + 'family') === 'yes'
        ) {
          console.log('entra nonfic');
          combinedBookList.push(...bookList2);
        }

        if (
          localStorage.getItem(localStorage.getItem('usuario') + 'preference' + 'thriller') === 'yes' ||
          localStorage.getItem(localStorage.getItem('usuario') + 'preference' + 'adventure') === 'yes' ||
          localStorage.getItem(localStorage.getItem('usuario') + 'preference' + 'sciencieFiction') === 'yes' ||
          localStorage.getItem(localStorage.getItem('usuario') + 'preference' + 'family') === 'yes' ||
          localStorage.getItem(localStorage.getItem('usuario') + 'preference' + 'horror') === 'yes' ||
          localStorage.getItem(localStorage.getItem('usuario') + 'preference' + 'crime') === 'yes'
        ) {
          console.log('entra ficc');
          combinedBookList.push(...bookList1);
        }

        setBooks(combinedBookList);
        setTotalBooks(combinedBookList.length);
        setIsLoading(false);
      } else {
        setError('Erro ao buscar os dados dos livros.');
        setIsLoading(false);
      }
    };

    fetchBooks();
  }, []);

  /**
   * Carrega mais livros para exibir.
   *
   * Esta função é chamada quando o usuário clica no botão "Carregar mais livros" para exibir mais livros.
   */
  const loadMoreBooks = () => {
    setVisibleBooks(visibleBooks + 8); // Aumenta a quantidade de livros visíveis
  };

  return (
    <div className="Container">
      <Link to="/Recomendações">
        <button className="btn-voltar">Voltar</button>
      </Link>
      <h1>BooksMatch</h1>
      <br></br>
      <ul className="BookList">
        {books.slice(0, visibleBooks).map((book, index) => (
          <li className="Book" key={index}>
            <a href={book.link} target="_blank" rel="noopener noreferrer"> {/* Utiliza a propriedade href para definir o link */}
              <img src={book.image} alt={book.title} />
              <br></br>
              <div>
                <span>{book.title}</span>
              </div>
              <p className="paragr">by {book.author}</p>
            </a>
          </li>
        ))}
      </ul>
      {visibleBooks < totalBooks && (
        <div className='botaoDiv'>
        <button className="btn-loadMore" onClick={loadMoreBooks} disabled={isLoading}>
          {isLoading ? 'Carregando...' : 'Carregar mais livros'}
        </button>
        </div>
      )}
    </div>
  );
};

export default BookList;
