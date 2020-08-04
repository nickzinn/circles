import React from 'react';
import { render } from '@testing-library/react';
import App from './App';
import { MemoryRouter } from 'react-router-dom'

test('renders home path', () => {
  const { getByText } = render(<MemoryRouter><App /></MemoryRouter>);
  const linkElement = getByText('Circles');
  expect(linkElement).toBeInTheDocument();
});
