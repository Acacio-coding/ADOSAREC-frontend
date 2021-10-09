import React from "react";
import { Switch, Route, useHistory } from "react-router";
import Donators from "./Components/Donators/Donators";
import Login from "./Components/Login/Login";
import Statistics from "./Components/Statistics/Statistics";
import Donations from "./Components/Donations/Donations";
import Unities from "./Components/Unities/Unities";
import RegisterDonators from "./Components/Donators/Register/RegisterDonators";
import EditDonators from "./Components/Donators/Edit/EditDonators";
import RegisterDonations from "./Components/Donations/Register/RegisterDonations";
import EditDonations from "./Components/Donations/Edit/EditDonations";

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
      <CustomRoute
        isPrivate
        path="/doadores_registrar"
        component={RegisterDonators}
      />
      <CustomRoute isPrivate path="/doadores_editar" component={EditDonators} />
      <CustomRoute isPrivate path="/doacoes" component={Donations} />
      <CustomRoute
        isPrivate
        path="/doacoes_registrar"
        component={RegisterDonations}
      />
      <CustomRoute isPrivate path="/doacoes_editar" component={EditDonations} />
      <CustomRoute isPrivate path="/unidades" component={Unities} />
    </Switch>
  );
};

export default Routes;