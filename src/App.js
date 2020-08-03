import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Pokedex from './components/Pokedex';
import Pokemon from './components/Pokemon';

const App = () => (
  <Switch>
    <Route exact path='/' render={(props) => <Pokedex {...props} />} />
    <Route
      exact
      path='/:pokemonId'
      render={(props) => <Pokemon {...props} />}
    />
  </Switch>
);

export default App;
