import { expect } from 'vitest';
import { describe, it,vi } from 'vitest'
import { render,screen } from '@testing-library/react';

import About from '../src/About.tsx';
import '@testing-library/jest-dom'
import PerformanceTest from '../src/performance/PerformanceTest.tsx';
import TileMapEditor from '../src/performance/PerformanceTest.tsx';
import GameComponent from '../src/GameComponent.tsx';
import { SpaceGame } from '../src/sample/space/SpaceGame.ts';
import { BouncingBall } from '../src/sample/BouncingBall.ts';


describe('Component Tests', () => {
  it('renders the PerformanceTest component', () => {
    render(
      <PerformanceTest />
    )
    //expect(screen.getByText('Play Asteroids')).toBeInTheDocument();
  })
  it('renders the TileMapEditor component', () => {
    render(<TileMapEditor />)
    
  })
  it('renders the SpaceGame component', () => {
    render(<GameComponent gameInitializer={new SpaceGame()} />);
    
  })
  it('renders the BouncingBall component', () => {
    render(<GameComponent gameInitializer={new BouncingBall()} />)
    
  })
  it('renders the About component', () => {
    render(<About />)
    expect(screen.getByText(/Circles/i)).toBeInTheDocument();
  })
})