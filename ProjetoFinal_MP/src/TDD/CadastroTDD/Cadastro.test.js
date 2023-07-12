// Cadastro.test.js
/* eslint-disable */
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Cadastro from './Cadastro';

test('submete o formulário com dados corretos', () => {
  const logSpy = jest.spyOn(console, 'log');

  const { getByLabelText, getByText } = render(<Cadastro />);

  const nomeInput = getByLabelText('Nome:');
  const emailInput = getByLabelText('Email:');
  const senhaInput = getByLabelText('Senha:');

  fireEvent.change(nomeInput, { target: { value: 'John Doe' } });
  fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
  fireEvent.change(senhaInput, { target: { value: 'senha123' } });

  fireEvent.click(getByText('Cadastrar'));

  expect(logSpy).toHaveBeenCalledWith(
    'Dados do formulário:',
    { nome: 'John Doe', email: 'john@example.com', senha: 'senha123' }
  );

  logSpy.mockRestore();
});
