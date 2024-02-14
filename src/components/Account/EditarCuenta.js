import React, { useState } from 'react';
import '../../css/editarcuenta.css';

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
    <form onSubmit={handleSubmit}>
      <div className='datos2'>
        <h2>Editar datos</h2>
        <label htmlFor="nombres">Nombres:</label>
        <input
          type="text"
          id="nombres"
          value={nombres}
          onChange={(e) => setNombres(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="apellidos">apellidos:</label>
        <input
          type="text"
          id="apellidos"
          value={apellidos}
          onChange={(e) => setApellidos(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="usuario">usuario:</label>
        <input
          type="text"
          id="usuario"
          value={usuario}
          onChange={(e) => setUsuario(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="correo">correo:</label>
        <input
          type="text"
          id="correo"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="telefono">telefono:</label>
        <input
          type="number"
          id="telefono"
          value={telefono}
          onChange={(e) => setTelefono(e.target.value)}
        />
      </div>
      <button className='guardar' type="submit">Guardar cambios</button>
    </form>
    </div>
  );
};

export default EditarCuenta;
