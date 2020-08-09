import React from 'react';
import { render } from '@testing-library/react';
import App from './App';
import GameComponent from './gamecontainer/GameComponent';
import { BouncingBall } from './sample/BouncingBall';
import { SpaceGame } from './sample/space/SpaceGame';
import { Home } from './Home';
import { MemoryRouter } from 'react-router-dom'

test('renders home path', () => {
  const { getByText } = render(<MemoryRouter initialEntries={["/"]}><App /></MemoryRouter>);
  const linkElement = getByText('Circles');
  expect(linkElement).toBeInTheDocument();
});


test('renders bouncing balls', () => {
  const { getByText } = render(<MemoryRouter><GameComponent gameInitializer={new BouncingBall()} ></GameComponent></MemoryRouter>);
  const linkElement = getByText('Circles');
  expect(linkElement).toBeInTheDocument();
});


test('renders space game', () => {
  const { getByText } = render(<MemoryRouter><GameComponent gameInitializer={new SpaceGame()} ></GameComponent></MemoryRouter>);
  const linkElement = getByText('Circles');
  expect(linkElement).toBeInTheDocument();
});

test('renders Home', () => {
  const { getByText } = render( <MemoryRouter><Home /></MemoryRouter>);
  const linkElement = getByText('Circles');
  expect(linkElement).toBeInTheDocument();
});