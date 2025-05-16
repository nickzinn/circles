import React from "react";
import {
  HashRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import GameComponent from './gamecontainer/GameComponent';
import { BouncingBall } from './sample/BouncingBall';
import { SpaceGame } from './sample/space/SpaceGame';
import { Home } from './Home';

export default function App() {
  return (
    <Router hashType='noslash'>
        <Switch>
          <Route path="/space">
          <GameComponent gameInitializer={new SpaceGame()} ></GameComponent>
          </Route>
          <Route path="/ball">
          <GameComponent gameInitializer={new BouncingBall()} ></GameComponent>
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
    </Router>
  );
}