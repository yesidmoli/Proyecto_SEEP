import React, { useState, useEffect, Fragment } from 'react'; // Importa Fragment también aquí
import './css/informacion_general.css';
import { Link } from 'react-router-dom';
function InformacionGeneral() {
  const [formData, setFormData] = useState({
    nombre: '',
    identificacion: '',
    // Agrega más campos aquí según sea necesario
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validarFormulario()) {
      try {
        const response = await fetch('URL_DE_TU_API_PARA_OBTENER_INFORMACION_GENERAL', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        if (response.ok) {
          const data = await response.json();
          // Aquí puedes manejar los datos obtenidos de la base de datos
          console.log('Información general obtenida:', data);
        } else {
          throw new Error('Error al obtener la información');
        }
      } catch (error) {
        console.error('Error:', error.message);
      }
    } else {
      alert("Por favor completa todos los campos antes de enviar el formulario.");
    }
  };

  const validarFormulario = () => {
    // Validación de campos obligatorios
    const { nombre, identificacion } = formData;
    if (nombre.trim() === "" || identificacion.trim() === "") {
      return false; // Si uno de los campos obligatorios está vacío, el formulario no es válido
    }
    return true; // Si todos los campos obligatorios están completos, el formulario es válido
  };

  // Este efecto se ejecutará solo una vez, al montar el componente
  useEffect(() => {
    // Aquí podrías hacer alguna operación inicial si es necesario
  }, []);

  return (
    <Fragment>
      <div className="containerGeneral">
        <h1 className="h1-titulo">1.Información General:</h1>
        <div className="module">
          <form onSubmit={handleSubmit}>
            <table>
              <thead>
                <tr>
                  <th>Regional:</th>
                  <td><textarea id="regional" name="regional" rows="2" value={formData.regional} onChange={handleChange}></textarea></td>
                  <th>Centro de Formación:</th>
                  <td><textarea id="centro" name="centro" rows="2" value={formData.centro} onChange={handleChange}></textarea></td>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th>Programa de Formación:</th>
                  <td><textarea id="programa" name="programa" rows="2" value={formData.programa} onChange={handleChange}></textarea></td>
                  <th>No. de Ficha:</th>
                  <td><textarea id="ficha" name="ficha" rows="2" value={formData.ficha} onChange={handleChange}></textarea></td>
                </tr>
              </tbody>
            </table>

            <h2 className="h2-titulo">Datos del Aprendiz</h2>
            <table>
              <tbody>
                <tr>
                  <th>Nombre:</th>
                  <td><textarea id="nombre" name="nombre" rows="2" value={formData.nombre} onChange={handleChange}></textarea></td>
                  <th>Identificación:</th>
                  <td><textarea id="identificacion" name="identificacion" rows="2" value={formData.identificacion} onChange={handleChange}></textarea></td>
                </tr>
                <tr>
                  <th>Teléfono:</th>
                  <td><textarea id="telefono" name="telefono" rows="2" value={formData.telefono} onChange={handleChange}></textarea></td>
                  <th>E-mail:</th>
                  <td><textarea id="email" name="email" rows="2" value={formData.email} onChange={handleChange}></textarea></td>
                </tr>
                <tr>
                  <th>Alternativa registrada en SOFIA plus:</th>
                  
                  <td colSpan="3"><textarea id="alternativa" name="alternativa" rows="2" value={formData.alternativa} onChange={handleChange}></textarea></td>
                </tr>
              </tbody>
            </table>

            <h2 className="h2-titulo">Ente Conformador</h2>
            <table>
              <tbody>
                <tr>
                  <th>Razón social Empresa:</th>
                  <td><textarea id="razon_social_empresa" name="razon_social_empresa" rows="2" value={formData.razon_social_empresa} onChange={handleChange}></textarea></td>
                  <th>Nit:</th>
                  <td><textarea id="nit" name="nit" rows="2" value={formData.nit} onChange={handleChange}></textarea></td>
                </tr>
                <tr>
                  <th>Dirección:</th>
                  <td><textarea id="direccion" name="direccion" rows="2" value={formData.direccion} onChange={handleChange}></textarea></td>
                  <th>Nombre del jefe inmediato del aprendiz:</th>
                  <td><textarea id="nombre_jefe" name="nombre_jefe" rows="2" value={formData.nombre_jefe} onChange={handleChange}></textarea></td>
                </tr>
                <tr>
                  <th>Cargo:</th>
                  <td><textarea id="cargo" name="cargo" rows="2" value={formData.cargo} onChange={handleChange}></textarea></td>
                  <th>Teléfono:</th>
                  <td><textarea id="telefono_empresa" name="telefono_empresa" rows="2" value={formData.telefono_empresa} onChange={handleChange}></textarea></td>
                </tr>
                <tr>
                  <th>E-mail:</th>
                  <td colSpan="3"><textarea id="email_empresa" name="email_empresa" rows="2" value={formData.email_empresa} onChange={handleChange}></textarea></td>
                </tr>
              </tbody>
            </table>
            <button className="guardar-informaciong">Guarda</button>
          </form>
          <Link to="/planeacion_EP" className="custom-button">Siguiente</Link>
        </div>
      </div>
    </Fragment>
  );
}

export default InformacionGeneral;