import { BrowserRouter, Switch, Route } from "react-router-dom";
import Login from "../components/login/Login";
import AddItem from "../components/form/Form";
import List from "../components/list/List";
import RoutesPrivate from "./private/Private";

function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Login} />
        <RoutesPrivate exact path="/add" component={AddItem} />
        <RoutesPrivate exact path="/list" component={List} />
        <RoutesPrivate exact path="/edit/:id" component={AddItem} />
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;
