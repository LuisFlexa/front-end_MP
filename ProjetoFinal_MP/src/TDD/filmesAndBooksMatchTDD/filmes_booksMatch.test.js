import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './filmes_booksMatch';

test('renderiza a página de catálogo de filmes', () => {
  render(<App />);
  const titulo = screen.queryByText(/Catálogo de Filmes/i);
  expect(titulo).toBeInTheDocument();

  const filmes = screen.getAllByRole('listitem');
  expect(filmes).toHaveLength(3);
});

test('renderiza as informações corretas dos filmes', () => {
  render(<App />);
  const filmes = screen.getAllByRole('listitem');

  expect(filmes[0]).toHaveTextContent('Filme 1');
  expect(filmes[0]).toHaveTextContent('Ação');

  expect(filmes[1]).toHaveTextContent('Filme 2');
  expect(filmes[1]).toHaveTextContent('Comédia');

  expect(filmes[2]).toHaveTextContent('Filme 3');
  expect(filmes[2]).toHaveTextContent('Drama');
});
