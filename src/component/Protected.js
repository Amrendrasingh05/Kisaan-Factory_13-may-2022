import React from 'react';
import { Route,Redirect} from 'react-router-dom';

const ProtectedRoute = ({ component: Component, ...rest }) => {
  return (
    <Route {...rest} render={
      props => localStorage.getItem('auth-token')? <Component {...rest} {...props} />:<Redirect  to="/login" />
    } />
  )
}

export default ProtectedRoute;