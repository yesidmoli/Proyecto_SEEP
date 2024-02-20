import React, {useState} from "react";
import '../../css/stylecuenta.css';
import '../layout/Header';
import '../layout/MainSection';
import EditarCuenta from "./EditarCuenta";

const Cuentas = () => {
  const [mostrarEdicion, setMostrarEdicion] = useState(false);
  
  //Datos vacios
  const [datosCuenta, setDatosCuenta] = useState ({
    nombres: '',
    apellidos: '',
    usuario: '',
    correo: '',
    telefono: ''
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
      <div className="container-info-cuenta">
        {/* aqui mostrará el nombre que el usuario ingrese */}
        <h1 className="nombre-usuario">Hola, {datosCuenta.nombres} {datosCuenta.apellidos}</h1>
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
            
            <center><button className="btn-modificar btns" onClick={mostrarInterfazEdicion}>Modificar Datos</button></center>
            </>
          )}
        </div>
      </div>
    );
  };
export default Cuentas;