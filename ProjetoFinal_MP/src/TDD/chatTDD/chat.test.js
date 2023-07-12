import { render, screen, fireEvent } from '@testing-library/react';
import App from './chat';
/* eslint-disable */
test('renderiza a página de chat', () => {
  render(<App />);
  const titulo = screen.queryByText(/Chat/i);
  expect(titulo).toBeTruthy();

  const listaMensagens = screen.queryByRole('list');
  expect(listaMensagens).toBeTruthy();

  const inputMensagem = screen.queryByRole('textbox');
  expect(inputMensagem).toBeTruthy();

  const botaoEnviar = screen.queryByRole('button', { name: /Enviar/i });
  expect(botaoEnviar).toBeTruthy();
});

test('adiciona uma nova mensagem ao chat', () => {
  render(<App />);
  const inputMensagem = screen.getByRole('textbox');
  const botaoEnviar = screen.getByRole('button', { name: /Enviar/i });

  fireEvent.change(inputMensagem, { target: { value: 'Olá!' } });
  fireEvent.click(botaoEnviar);

  const mensagemAdicionada = screen.queryByText('Olá!');
  expect(mensagemAdicionada).toBeTruthy();
});

test('não adiciona uma mensagem vazia ao chat', () => {
  render(<App />);
  const inputMensagem = screen.getByRole('textbox');
  const botaoEnviar = screen.getByRole('button', { name: /Enviar/i });

  fireEvent.change(inputMensagem, { target: { value: ' ' } });
  fireEvent.click(botaoEnviar);

  const mensagemAdicionada = screen.queryByText(' ');
  expect(mensagemAdicionada).toBeNull();
});
