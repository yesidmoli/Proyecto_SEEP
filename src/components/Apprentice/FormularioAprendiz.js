// FormularioAprendiz.js
import React, { useState, useEffect } from 'react';
import clienteAxios from '../../config/axios';
import Swal from 'sweetalert2';

const FormularioAprendiz = () => {
  const initialState = {
    ficha: '',
    nombres: '',
    apellidos: '',
    tipo_documento: '',
    numero_documento: '',
    fecha_expedicion: '',
    lugar_expedicion: '',
    fecha_nacimiento: '',
    sexo: '',
    direccion_domicilio: '',
    municipio: '',
    departamento: '',
    numero_celular1: '',
    numero_celular2: '',
    telefono_fijo: '',
    correo_principal: '',
    correo_secundario: '',
    finalizacion_etapa_lectiva: '',
    estado_aprobacion: '',
    empresa :'',
  };

  const [aprendiz, setAprendiz] = useState(initialState);
  const [aprendices, setAprendices] = useState([]);
  const [modoEdicion, setModoEdicion] = useState(false);
  const [idEditar, setIdEditar] = useState(null);

  useEffect(() => {
    const obtenerAprendices = async () => {
      try {
        const consultarApi = await clienteAxios.get('/aprendiz');
        setAprendices(consultarApi.data);
      } catch (error) {
        console.error('Error al obtener los aprendices:', error);
      }
    };

    obtenerAprendices();
  }, []); 

  const actualizarState = (e) => {
    setAprendiz({
      ...aprendiz,
      [e.target.name]: e.target.value,
    });
  };

  const enviarDatos = async (e) => {
    e.preventDefault();
  
    try {
      if (modoEdicion) {
        // Actualizar aprendiz existente
        await clienteAxios.put(`/aprendiz/${idEditar}`, aprendiz);
        Swal.fire('¡Éxito!', 'Aprendiz actualizado exitosamente', 'success');
      } else {
        // Crear nuevo aprendiz
        await clienteAxios.post('/aprendiz', aprendiz);
        Swal.fire('¡Éxito!', 'Aprendiz registrado exitosamente', 'success');
      }
  
      // Actualizar la lista de aprendices
      const response = await clienteAxios.get('/aprendiz');
      setAprendices(response.data);
  
      // Limpiar el formulario y restablecer el estado
      setAprendiz(initialState);
      setModoEdicion(false);
      setIdEditar(null);
    } catch (error) {
      // Manejar el error
      if (error.response && error.response.status === 404) {
        Swal.fire('¡Error!', 'Ficha no encontrada. Verifica el número de ficha', 'error');
      } else {
        console.error('Error al enviar el formulario:', error);
        Swal.fire('¡Error!', 'Hubo un error al procesar la solicitud', 'error');
      }
    }
  };

  const editarAprendiz = (id) => {
    const aprendizEditar = aprendices.find((a) => a._id === id);
    setAprendiz(aprendizEditar);
    setModoEdicion(true);
    setIdEditar(id);
  };

  const eliminarAprendiz = async (id) => {
    // Muestra una alerta de confirmación
    const confirmacion = await Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción no se puede deshacer',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    });
  
    // Si el usuario confirma, procede a eliminar el aprendiz
    if (confirmacion.isConfirmed) {
      try {
        await clienteAxios.delete(`/aprendiz/${id}`);
        const response = await clienteAxios.get('/aprendiz');
        setAprendices(response.data);
        Swal.fire('¡Éxito!', 'Aprendiz eliminado exitosamente', 'success');
      } catch (error) {
        console.error('Error al eliminar el aprendiz:', error);
        Swal.fire('¡Error!', 'Hubo un error al procesar la solicitud', 'error');
      }
    }
  };

  return (
    <div className='container'>
      <h2>Registro de Aprendices</h2>
      <form onSubmit={enviarDatos}>
        <label>Número de Ficha:</label>
        <input
          type="text"
          name="numeroFicha"
          value={aprendiz.numeroFicha}
          onChange={actualizarState}
        />
        <label>Nombres:</label>
        <input
          type="text"
          name="nombres"
          value={aprendiz.nombres}
          onChange={actualizarState}
        />
        <label>Apellidos:</label>
        <input
          type="text"
          name="apellidos"
          value={aprendiz.apellidos}
          onChange={actualizarState}
        />
        <label>Tipo de Documento:</label>
        <input
          type="text"
          name="tipoDocumento"
          value={aprendiz.tipoDocumento}
          onChange={actualizarState}
        />
        <label>Número de Documento:</label>
        <input
          type="text"
          name="numeroDocumento"
          value={aprendiz.numeroDocumento}
          onChange={actualizarState}
        />
        <label>Fecha de Expedición:</label>
        <input
          type="date"
          name="fechaExpedicion"
          value={aprendiz.fechaExpedicion}
          onChange={actualizarState}
        />
        <label>Lugar de Expedición:</label>
        <input
          type="text"
          name="lugarExpedicion"
          value={aprendiz.lugarExpedicion}
          onChange={actualizarState}
        />
        <label>Fecha de Nacimiento:</label>
        <input
          type="date"
          name="fechaNacimiento"
          value={aprendiz.fechaNacimiento}
          onChange={actualizarState}
        />
        <label>Sexo:</label>
        <input
          type="text"
          name="sexo"
          value={aprendiz.sexo}
          onChange={actualizarState}
        />
        <label>Dirección Domicilio:</label>
        <input
          type="text"
          name="direccionDomicilio"
          value={aprendiz.direccionDomicilio}
          onChange={actualizarState}
        />
        <label>Municipio:</label>
        <input
          type="text"
          name="municipio"
          value={aprendiz.municipio}
          onChange={actualizarState}
        />
        <label>Departamento:</label>
        <input
          type="text"
          name="departamento"
          value={aprendiz.departamento}
          onChange={actualizarState}
        />
        <label>Número de Celular 1:</label>
        <input
          type="text"
          name="numeroCelular1"
          value={aprendiz.numeroCelular1}
          onChange={actualizarState}
        />
        <label>Número de Celular 2:</label>
        <input
          type="text"
          name="numeroCelular2"
          value={aprendiz.numeroCelular2}
          onChange={actualizarState}
        />
        <label>Teléfono Fijo:</label>
        <input
          type="text"
          name="telefonoFijo"
          value={aprendiz.telefonoFijo}
          onChange={actualizarState}
        />
        <label>Correo Principal:</label>
        <input
          type="text"
          name="correoPrincipal"
          value={aprendiz.correoPrincipal}
          onChange={actualizarState}
        />
        <label>Correo Secundario:</label>
        <input
          type="text"
          name="correoSecundario"
          value={aprendiz.correoSecundario}
          onChange={actualizarState}
        />
        <label>Finalización Lectiva:</label>
        <input
          type="date"
          name="finalizacionLectiva"
          value={aprendiz.finalizacionLectiva}
          onChange={actualizarState}
        />
        <label>Estado de Aprobación:</label>
        <input
          type="text"
          name="estadoAprobacion"
          value={aprendiz.estadoAprobacion}
          onChange={actualizarState}
        />
     <div className='container-btn'>
        <button type="submit">{modoEdicion ? 'Editar' : 'Registrar'}</button>
        </div>
      </form>
    
      <section  id="listado-fichas" className='List-fichas'>
      <h2>Listado de Aprendices Registrados</h2>
      <ul className='lista-fichas'>
        {aprendices.map((a) => (
          <li key={a._id}>
            {a.nombres} - {a.apellidos} - {a.tipo_documento} - {a.numero_documento}
            <div className='btns-crud'>
            <button className='btn-editar' onClick={() => editarAprendiz(a._id)}>Editar</button>
            <button className='btn-delete' onClick={() => eliminarAprendiz(a._id)}>Eliminar</button>
            </div>
          </li>
        ))}
      </ul>
      </section>
    </div>
  );
};

export default FormularioAprendiz;
