import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Login from './Login';
/* eslint-disable */
describe('Login', () => {
  it('deve atualizar o estado do email', () => {
    const { getByLabelText } = render(<Login />);
    const emailInput = getByLabelText('Email:');
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    expect(emailInput.value).toBe('test@example.com');
  });

  it('deve atualizar o estado da senha', () => {
    const { getByLabelText } = render(<Login />);
    const passwordInput = getByLabelText('Senha:');
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    expect(passwordInput.value).toBe('password123');
  });

  it('deve chamar a função de envio do formulário ao pressionar o botão', () => {
    const { getByLabelText, getByText } = render(<Login />);
    const emailInput = getByLabelText('Email:');
    const passwordInput = getByLabelText('Senha:');
    const submitButton = getByText('Entrar');

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(submitButton);

    // Incluir asserções adicionais para verificar se a função de envio do formulário foi chamada corretamente.
  });
});
