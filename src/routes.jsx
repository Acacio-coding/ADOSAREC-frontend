import React from "react";
import { Route, Switch, useHistory } from "react-router";

import Login from "./Pages/Login";

import Statistics from "./Pages/Statistics";

import Donators from "./Pages/Donators";
import RegisterD from "./Pages/Donators/Register";
import DetailsD from "./Pages/Donators/Details";
import EditD from "./Pages/Donators/Edit";

import Donations from "./Pages/Donations";
import RegisterDo from "./Pages/Donations/Register";
import EditDonation from "./Pages/Donations/Edit";

import Unities from "./Pages/Unities";
import RegisterU from "./Pages/Unities/Register";
import DetailsU from "./Pages/Unities/Details";
import EditU from "./Pages/Unities/Edit";

const CustomRoute = ({ isPrivate, ...rest }) => {
  const history = useHistory();
  const token = localStorage.getItem("token");

  if (isPrivate && !token) {
    history.push("/");
  }

  return <Route {...rest} />;
};

const Routes = () => {
  return (
    <Switch>
      <CustomRoute exact path="/" component={Login} />

      <CustomRoute isPrivate path="/estatisticas" component={Statistics} />

      <CustomRoute isPrivate path="/doadores" component={Donators} />
      <CustomRoute isPrivate path="/registrar_doador" component={RegisterD} />
      <CustomRoute isPrivate path="/detalhes_doador" component={DetailsD} />
      <CustomRoute isPrivate path="/editar_doador" component={EditD} />

      <CustomRoute isPrivate path="/doacoes" component={Donations} />
      <CustomRoute isPrivate path="/registrar_doacao" component={RegisterDo} />
      <CustomRoute isPrivate path="/editar_doacao" component={EditDonation} />

      <CustomRoute isPrivate path="/unidades" component={Unities} />
      <CustomRoute isPrivate path="/registrar_unidade" component={RegisterU} />
      <CustomRoute isPrivate path="/detalhes_unidade" component={DetailsU} />
      <CustomRoute isPrivate path="/editar_unidade" component={EditU} />
    </Switch>
  );
};

export default Routes;
