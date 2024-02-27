import React, {useState} from "react";
import '../../css/styleaprendiz.css';

const DatosEmpresa = () =>{
    const [datosEmpresa, setDatosEmpresa] = useState({
        empresa: "",
        nit: "",
        nombre_jefe_inmediato: "",
        direccion: "",
        correo: "",
        telefono: "",
      });
    
      const actualizarDatos = (e) => {
        setDatosEmpresa({
          ...datosEmpresa,
          [e.target.name]: e.target.value,
        });
      };
    
      const guardarDatos = (e) => {
        e.preventDefault();
        // Aquí puedes realizar acciones adicionales antes de guardar si es necesario
        console.log("Datos a guardar:", datosEmpresa);
        // Luego, puedes enviar estos datos al servidor si es necesario
      };
    return(
        <div>
            
            <header id='header'>Formulario inicial</header>
        <div className="contenedor-dos">
           <form className="form-dos">
            <h1>Datos de la empresa</h1>
            <label>Empresa:</label>
            <input 
            type="text"
            name="empresa"
            value={datosEmpresa.empresa}
            onChange={actualizarDatos}>
            </input>
            <label>NIT:</label>
            <input 
            type="text"
            name="nit"
            value={datosEmpresa.nit}
            onChange={actualizarDatos}>   
            </input>
            <label>Jefe inmediato:</label>
            <input 
            type="text"
            name="nombre_jefe_inmediato"
            value={datosEmpresa.nombre_jefe_inmediato}
            onChange={actualizarDatos}
            >
            </input>
            <label>Dirección:</label>
            <input 
            type="text"
            name="direccion"
            value={datosEmpresa.direccion}
            onChange={actualizarDatos}>
            </input>
            <label>Correo:</label>
            <input 
            type="text"
            name="correo"
            value={datosEmpresa.correo}
            onChange={actualizarDatos}>
            </input>
            <label>Telefono</label>
            <input
            type="text"
            name="telefono"
            value={datosEmpresa.telefono}
            onChange={actualizarDatos}>
            </input>
            <button type="submit" id="save">Guardar</button>
            </form> 
        </div>
        </div>
    );
};

export default DatosEmpresa;