// Login.js
import React, { Fragment, useState } from 'react';
import Axios from '../../config/axios';
import '../../css/stylelogin.css'
import '../../css/global.css'
// import cditi from '../../img/cditi-logo.svg'
import cditi from '../../img/cditi-logo-v2.svg'
// import logoSeep from '../../img/logo.png'
import logoSeep from '../../img/seep-logo-verde.svg'
import { useAuth } from '../context/AuthContext';
import { useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';

import ChangePasswordPopup from './ChangePasswordPopup';
const Login = () => {
  const history = useHistory();
  const { login } = useAuth();

  const [datos, dataLogin] = useState({
    "rol": "",
    "documento": "",
    "password": ""
  })

  const [showChangePasswordPopup, setShowChangePasswordPopup] = useState(false); // Estado para controlar la visibilidad del popup
  // const [documento, setDocumento] = useState('');
  // const [password, setPassword] = useState('');
  // const [rol, setRol] = useState('');


  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      // Realizar una solicitud al backend para autenticar al usuario y obtener el token
      const response = await Axios.post('/api/user-token/', datos);

      // Obtener el token del cuerpo de la respuesta
      const newToken = response.data.token;
      const newDatos = response.data.user_profile
      const newRol = response.data.rol
      const mustChangePassword = response.data.must_change_password;

      localStorage.setItem('token', newToken);
      // Guardar los datos de perfil de usuario en el localStorage
      localStorage.setItem('datosPerfil', JSON.stringify(newDatos));

      //guardamos el rol en el localstore
      localStorage.setItem('rol', newRol)

      //guardanmos 
      localStorage.setItem('mustChangePassword', mustChangePassword);

     

      // Recuperar los datos de perfil de usuario del localStorage
      // const storedDatos = JSON.parse(localStorage.getItem('datosPerfil'));

      // // Obtener el id del objeto storedDatos
      // const storedUserId = storedDatos.id;


      // Llamar a la función de login del contexto con el nuevo token
      login(newToken);
       // Si debe cambiar la contraseña, redirigir al usuario a la página correspondiente
       if (mustChangePassword) {
        history.push('/update-password/');
      } else {
        history.push('/');
      }

    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      Swal.fire({
        icon: 'error',
        title: error.response.data.non_field_errors,
        text: "Por favor, verifica los datos ingresados",
      });
    }
  };
  const actualizarState = (e) => {
    dataLogin({
      ...datos,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <Fragment>

      <header class="encabezado-login">
        <img className='seep-img' src={logoSeep} alt="logo-SEEP" />
        <img className='cditi-img' src={cditi} alt="logo-CDITI" />
      </header>

      <main class="login-container">

        <a href="https://proyect-seep-46bb6469e324.herokuapp.com/admin/" className="login-admin btn btn-success" >
          USUARIO ADMIN
        </a>


        <form class="form-login" onSubmit={handleLogin}>
          <h1 class="titulo-login" >Iniciar sesión</h1>
          <label for="acount-type">Seleccione tipo de usuario</label>
          <select value={datos.rol} onChange={actualizarState} class="input-login" id="acount-type" name="rol">
            <option selected hidden>Seleccione una opción</option>
            <option value="aprendiz" >Aprendiz</option>
            {/* <option value="admin">Administrador</option> */}
            <option value="instructor">Instructor</option>
          </select>
          <label for="numeroId">N° Identificación:</label>
          <input class="input-login" placeholder="N° Identificación" name="documento" id="numeroId" value={datos.documento} onChange={actualizarState} />

          <label for="contraseña">Contraseña:</label>
          <input class="input-login" type="password" placeholder="Contraseña" name="password" id="contraseña" value={datos.password} onChange={actualizarState} />

          <Link class="recupera-contraseña" to="/password/reset/">Recuperar contraseña</Link>
          <center className='btn-login'><button class="btns " > Iniciar Sesión </button></center>
        </form>

      </main>
      {/* Popup para cambiar la contraseña */}
      {showChangePasswordPopup && (
        <ChangePasswordPopup onClose={() => setShowChangePasswordPopup(false)} />
      )}
    </Fragment>

  );
};

export default Login;
