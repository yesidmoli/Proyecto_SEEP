import React from 'react';



import '../../../src/css/global.css'
import logo from '../../img/logo-blanco-seep.png';


const Header = () => {
  return (
    <header className="encabezado">
      <img className="logo" src={logo} alt="logo-SEEP" />
      <div>
        <h4>Bienvenido(a) (Usuario)</h4>
        <a className="cerrar-sesion" href="#">Cerrar sesión</a>
      </div>
    </header>
  );
}

export default Header;
