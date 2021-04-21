import React from "react";
import { CameraPage } from "./pages/CameraPage";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.scss";
import { PokemonPage } from "./pages/PokemonPage";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            <CameraPage />
          </Route>
          <Route path="/pokemon-app">
            <PokemonPage />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
