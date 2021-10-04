import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./pages/Login";
import Statistics from "./pages/Statistics";
import Donators from "./pages/Donators";
import Donations from "./pages/Donations";
import Unities from "./pages/Unities";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Login />
        </Route>

        <Route path="/estatisticas">
          <Statistics />
        </Route>

        <Route path="/doadores">
          <Donators />
        </Route>

        <Route path="/doacoes">
          <Donations />
        </Route>

        <Route path="/unidades">
          <Unities />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
