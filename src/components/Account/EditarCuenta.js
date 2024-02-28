import React, { useState } from 'react';
import '../../css/editarcuenta.css';
import '../layout/MainSection';
import '../layout/Header';

const EditarCuenta = ({ datosCuenta, guardarCambios }) => {

  const [nombres, setNombres] = useState(datosCuenta.nombres);
  const [apellidos, setApellidos] = useState(datosCuenta.apellidos);
  const [usuario, setUsuario] = useState(datosCuenta.usuario);
  const [correo, setCorreo] = useState(datosCuenta.correo);
  const [telefono, setTelefono] = useState(datosCuenta.telefono);

  const handleSubmit =  (e) => {
    e.preventDefault();

    const nuevosDatos = { nombres, apellidos, usuario, correo, telefono };
    guardarCambios(nuevosDatos); // Llama a la función en Cuentas para aplicar los cambios
  };
  return (
    <div className='container-info-cuenta2'>
      <h2>Editar datos</h2>
    <form className="grid-container" onSubmit={handleSubmit}>
      <div className='datos2'>
        <div className='div-datos'>
          <div>
        <label htmlFor="nombres" >Nombres:</label>
        <input
          className='nombres'
          type="text"
          id="nombres"
          value={nombres}
          onChange={(e) => setNombres(e.target.value)}
        />
          </div>
        </div>
      <div className='div-datos'>
        <div>
        <label htmlFor="apellidos" >Apellidos:</label>
        <input
          className='apellidos'
          type="text"
          id="apellidos"
          value={apellidos}
          onChange={(e) => setApellidos(e.target.value)}
        />
        </div>
      </div>
      <div className='div-datos'>
        <div>
        <label htmlFor="usuario" >Usuario:</label>
        <input
          className='usuario'
          type="text"
          id="usuario"
          value={usuario}
          onChange={(e) => setUsuario(e.target.value)}
        />
        </div>
      </div>
      <div className='div-datos'>
        <div>
        <label htmlFor="correo" >Correo:</label>
        <input
          className='correo'
          type="text"
          id="correo"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
        />
        </div>
      </div>
      <div className='div-datos'>
        <div>
        <label htmlFor="telefono" >Teléfono:</label>
        <input
          className='telefono'
          type="number"
          id="telefono"
          value={telefono}
          onChange={(e) => setTelefono(e.target.value)}
        />
        </div>
      </div>
      
      </div>
      <div className='btn-guardar'>
      <button className='guardar' type="submit">Guardar cambios</button>
    </div>
    </form>
    
    </div>
  );
};

export default EditarCuenta;
