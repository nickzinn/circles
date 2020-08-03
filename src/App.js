import React from 'react';
import GameComponent from './GameComponent';
import { BouncingBall } from './sample/BouncingBall';
import { SpaceGame } from './sample/space/SpaceGame';

function App() {

  return (
      <GameComponent gameInitializer={new SpaceGame()} ></GameComponent>
  );

}

export default App;


