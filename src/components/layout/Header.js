import React from 'react';


import { useAuth } from '../context/AuthContext';
import { useHistory } from 'react-router-dom';
import '../../../src/css/global.css'
import logo from '../../img/seep-logo-verde-2.png';


const Header = () => {

  const {logout} = useAuth()
  const history = useHistory();
    const handleLogout = async () => {
        await logout()
        history.push("/login");
      };
  let nombre = ''
  let apellidos = ''
  // Verificar si los datos de perfil de usuario están disponibles en el localStorage
if (localStorage.getItem('datosPerfil')) {
  // Recuperar los datos de perfil de usuario del localStorage
  const storedDatos = JSON.parse(localStorage.getItem('datosPerfil'));

  // Obtener el id del objeto storedDatos
  nombre = storedDatos.nombres;
   apellidos = storedDatos.apellidos;

  // Usar el id según sea necesario
 
} else {
  console.log('No se encontraron datos de perfil de usuario en el localStorage.');
}

  return (
    <header className="encabezado">
      <img className="logo" src={logo} alt="logo-SEEP" />
      <div className='mensaje-bienvenida'>
        <h4>Bienvenido(a) {nombre} {apellidos}</h4>
        <a onClick={handleLogout} className="cerrar-sesion" href="#">Cerrar sesión</a>
      </div>
    </header>
  );
}

export default Header;
