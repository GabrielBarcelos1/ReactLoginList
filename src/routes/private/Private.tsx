import React, { useContext } from "react";

import { Route, Redirect, RouteProps } from "react-router-dom";
import StoreContext from "../../store/Context";

function RoutesPrivate({ component: Component, ...rest }: RouteProps) {
  const { token } = useContext(StoreContext);
  if (!Component) return null;
  return (
    <Route
      {...rest}
      render={(props) =>
        token ? <Component {...props} {...rest} /> : <Redirect to="/" />
      }
    />
  );
}

export default RoutesPrivate;
