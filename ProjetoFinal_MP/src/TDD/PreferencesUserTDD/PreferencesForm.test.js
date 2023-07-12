import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import PreferencesForm from './PreferencesForm';
/* eslint-disable */
describe('PreferencesForm', () => {
  it('submits the form with the provided data', () => {
    const handleSubmit = jest.fn();
    const { getByLabelText, getByText } = render(
      <PreferencesForm onSubmit={handleSubmit} />
    );

    fireEvent.change(getByLabelText('Name:'), { target: { value: 'John' } });
    fireEvent.change(getByLabelText('Age:'), { target: { value: '25' } });
    fireEvent.change(getByLabelText('Interests:'), {
      target: { value: 'React, JavaScript' },
    });
    fireEvent.click(getByText('Submit'));

    expect(handleSubmit).toHaveBeenCalledWith({
      name: 'John',
      age: '25',
      interests: 'React, JavaScript',
    });
  });
});
