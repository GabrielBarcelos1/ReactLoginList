import { BrowserRouter, Switch, Route } from "react-router-dom";
import Login from "../components/login/Login";
import AddItem from "../components/form/Form";
import List from "../components/list/List";
import RoutesPrivate from "./private/Private";
import Register from "../components/register/Register";

function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/register" component={Register} />
        <RoutesPrivate exact path="/add" component={AddItem} />
        <RoutesPrivate exact path="/list/:id" component={List} />
        <RoutesPrivate exact path="/edit/:id" component={AddItem} />
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;
