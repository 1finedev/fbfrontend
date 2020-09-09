import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { Spinner } from "reactstrap";
export const ProtectedRoute = ({ component: Component, ...rest }) => {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <Route
      {...rest}
      render={(props) => {
        switch (isAuthenticated) {
          case null:
            return <Spinner />;
          case false:
            return (
              <Redirect
                to={{
                  pathname: "/login",
                  state: {
                    from: props.location,
                  },
                }}
              />
            );
          case true:
            return <Component {...props} />;
          default:
            return <p>Unable to render page.. Contact webmaster</p>;
        }
      }}
    />
  );
};
