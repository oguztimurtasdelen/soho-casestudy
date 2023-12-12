// src/components/PrivateRoute.js
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import authenticationService from '../../services/admin/authenticationService';

const PrivateRoute = ({ component: Component, ...rest }) => (
  
  <Route
    {...rest}
    render={(props) =>
        authenticationService.isAuthenticated() ? (
          
        <Component {...props} />
      ) : (
        <Redirect to="/admin/login" />
      )
    }
  />
);

export default PrivateRoute;
