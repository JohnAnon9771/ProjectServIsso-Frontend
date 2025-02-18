import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
// BrowserRouter -> Versão do Router pra browser/entender a url e manipula-la
//Route -> define uma rota
//Switch -> N deixa mais de uma rota ser chamada ao mesmo tempo
//Redirect -> redirecionamento
import { isAuthenticated } from "./services/auth";
import SignUp from "./pages/SignUp/index";
import Login from "./pages/Login/index";
import Home from "./pages/Home/index";
import Admin from "./pages/Admin/index";
import Profile from "./pages/Profile";

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: "/", state: { from: props.location } }} />
      )
    }
  />
);

function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={SignUp} />
        <Route path="*" component={() => "Page Not Found"} />
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;
