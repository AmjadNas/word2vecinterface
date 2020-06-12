import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import LogInDialog from '../main components/LogInDialog';
import App from '../main components/App';
import Service from '../Service';

const PrivateRoute = ({ ...rest }) => {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        Service.isLogged() ? (
          <App />
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

const AppRouter = () => {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Switch>
        <PrivateRoute exact path="/" />
        <Route exact path="/login" component={LogInDialog} />
        {/* <Route exact path="/home" component={App} /> */}
      </Switch>
    </BrowserRouter>
  );
};

export default AppRouter;
