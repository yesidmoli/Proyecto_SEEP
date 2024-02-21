// PrivateRoute.js
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

//componentes
import InfoAprediz from '../Apprentice/InfoAprendiz';
const PrivateRoute = ({ component: Component, allowedRoles, ...rest })  => {
  const { token } = useAuth();
 const rol = localStorage.getItem('rol')
 const storedDatos = JSON.parse(localStorage.getItem('datosPerfil'));

  return (
    <Route
      {...rest}
      render={(props) => {
        if (!token) {
          return <Redirect to="/login" />;
        } else if (props.match.path === '/cuentas') {
          if (rol === 'aprendiz') {
            return <Redirect to={`/aprendiz/${storedDatos.id}/`} />;
          } else {
            return <Component {...props} />;
          }
        }
        if (props.match.path === '/') {
          if (rol === 'aprendiz') {
            return <Redirect to={'/perfil-aprendiz'} />;
          } else {
            return <Component {...props} />;
          }
        }
        if (props.match.path === '/documentos') {
          if (rol === 'aprendiz') {
            return <Redirect to={`/documentos-aprendiz/${storedDatos.id}/`} />;
          } else {
            return <Component {...props} />;
          }
        }
        
        else {
          return <Component {...props} />;
        }
      }}
    />
  );
};

export default PrivateRoute;

