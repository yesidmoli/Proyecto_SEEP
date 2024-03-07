import React, {Fragment, useState} from "react";
import '../../css/stylecuenta.css';
import EditarCuenta from "./EditarCuenta";
import Header from "../layout/Header";
import MainSection from "../layout/MainSection";
import da from "date-fns/locale/da/index.js";
import Apps from "../layout/menu/App";
const PerfilAprendiz = () => {
  const [mostrarEdicion, setMostrarEdicion] = useState(false);
  
  //traemos los datos del localstore
  const storedDatos = JSON.parse(localStorage.getItem('datosPerfil'));
  const rol = localStorage.getItem('rol')

  //Datos vacios
  const [datosCuenta, setDatosCuenta] = useState ({
    nombres: storedDatos.nombres,
    apellidos: storedDatos.apellidos,
    usuario: rol,
    correo: storedDatos.correo_principal,
    telefono: storedDatos.numero_celular1
  });
  const [datosModificados, setDatosModificados] = useState(null);

  const mostrarInterfazEdicion = () =>{
    setMostrarEdicion(true);
  };
  // Función para aplicar los cambios y actualizar los datos en Cuentas
  const guardarCambios = (nuevosDatos) => {
    setDatosCuenta(nuevosDatos);
    setDatosModificados(null); // Reinicia los datos modificados
    setMostrarEdicion(false); // Oculta la interfaz de edición
  };
    return (
      <Fragment>
        <Apps />
        <Header />
        <main className="container">
          <MainSection />
      <div className="container-info-cuenta">
        {/* aqui mostrará el nombre que el usuario ingrese */}
        <h1 className="nombre-usuario">Hola, {storedDatos.nombres}  {storedDatos.apellidos}</h1>
        <h1 className="bienvenido">Bienvenido al SEEP</h1>
        <div className="datos">
          {mostrarEdicion ? (
            <EditarCuenta datosCuenta={datosCuenta} guardarCambios={guardarCambios}/>
          ) : (
          <>
            {/* aqui trae los datos ingresados o editados */}
            <h2 className="titulo">Datos de la cuenta</h2>
            <p className="h3">Nombres: {datosCuenta.nombres}</p>
            <p className="h3">Apellidos: {datosCuenta.apellidos}</p>
            <p className="h3">Usuario: {datosCuenta.usuario}</p>
            <p className="h3">Correo electrónico: {datosCuenta.correo}</p>
            <p className="h3">Teléfono: {datosCuenta.telefono}</p>
            {/* <center><button className="btn-modificar btns" onClick={mostrarInterfazEdicion}>Modificar Datos</button></center> */}
            </>
          )}
        </div>
      </div>
      </main>
      </Fragment>
    );
  };
export default PerfilAprendiz;