import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'; // Fix import from 'react-router' to 'react-router-dom'
import { Home } from './Home';
import PerformanceTest from './performance/PerformanceTest';
import TileMapEditor from './editor/TileMapEditor';
import About from './About';
import GameComponent from './GameComponent';
import { SpaceGame } from './sample/space/SpaceGame';
import { BouncingBall } from './sample/BouncingBall';
import React from 'react';

// Create these wrapper components to lazy load game initializers
const SpaceGameComponent = () => <GameComponent gameInitializer={new SpaceGame()} />;
const BouncingBallComponent = () => <GameComponent gameInitializer={new BouncingBall()} />;

export default function App() {
  return (
    <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/performance" element={<PerformanceTest />} />
        <Route path="/editor" element={<TileMapEditor />} />
        <Route path="/space" element={<SpaceGameComponent />} />
        <Route path="/ball" element={<BouncingBallComponent />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
    </React.StrictMode>
  );
}