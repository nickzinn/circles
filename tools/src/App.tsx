import * as React from 'react';
import { BrowserRouter, Routes, Route } from "react-router";
import {Home} from './Home.tsx';
import PerformanceTest from './performance/PerformanceTest.tsx';
import TileMapEditor from './editor/TileMapEditor.tsx';

import About from './About.tsx';

export default function App() {
  return (
    <React.StrictMode>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/performance" element={<PerformanceTest />} />
      <Route path="/editor" element={<TileMapEditor />} />
{/*       <Route path="/space" element={<App />} />
      <Route path="/balls" element={<App />} /> 
 */}
       <Route path="/about" element={<About />} />
    </Routes>
  </BrowserRouter>
    </React.StrictMode>
  );
}
