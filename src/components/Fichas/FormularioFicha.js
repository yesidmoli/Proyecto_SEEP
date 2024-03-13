import React, { useState, useEffect, Fragment } from 'react';
import clienteAxios from '../../config/axios';
import ListaFichas from './ListaFichas';
import '../../../src/css/formularioFichas.css'
import Swal from 'sweetalert2';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import AprendicesRegistrados from './AprendicesRegistrados';
import '../../css/bitacoras.css';
import '../layout/Header';
import '../layout/MainSection';

import MainSection from '../layout/MainSection';
import Header from '../layout/Header';
import Apps from '../layout/menu/App';
const FormularioFicha = ({history}) => {



  const initialState = {
    numero_ficha: '',
    nombre_programa: '',
    nivel_formacion: '',
    horario_formacion: '',
  };

  const [ficha, setFicha] = useState(initialState);
  const [fichas, setFichas] = useState([]);
  const [modoEdicion, setModoEdicion] = useState(false);
  const [idEditar, setIdEditar] = useState(null);
  const [listaFichas, setListaFichas] = useState(false);
  const [registroAprendices, setRegistroAprendices] = useState(false);
  const [aprendiz, setAprendiz] = useState(false);
 

  useEffect(() => {
    // Lógica para obtener las fichas existentes 
    const obtenerFichas = async () => {
      try {
        const consultarFicha = await clienteAxios.get('/api/fichas/');
        setFichas(consultarFicha.data);
      } catch (error) {
        console.error('Error al obtener las fichas:', error);
      }
    };

    obtenerFichas();
  }, []); 

  const actualizarState = (e) => {
    setFicha({
      ...ficha,
      [e.target.name]: e.target.value,
    });
  };

  const enviarDatos = async (e) => {
    e.preventDefault();

    try {
      if (modoEdicion) {
        // Actualizar ficha existente
        await clienteAxios.put(`/fichas/${idEditar}`, ficha);
        Swal.fire('¡Éxito!', 'La ficha se actualizó correctamente.', 'success');
        
      } else {
        // Crear nueva ficha

        await clienteAxios.post('/api/fichas/', ficha);
        Swal.fire('¡Éxito!', 'La ficha se registró correctamente.', 'success');
        // Redirigir a la sección de listado de fichas
        history.push('/#listado-fichas');

        
      }

      // Actualizar la lista de fichas
      const consultarFicha= await clienteAxios.get('api/fichas/');
      setFichas(consultarFicha.data);

      // Limpiar el formulario y restablecer el estado
      setFicha(initialState);
      setModoEdicion(false);
      setIdEditar(null);
    } catch (error) {
      console.error('Error al enviar el formulario:', error);
      Swal.fire('Error', 'Hubo un error al procesar la solicitud.', 'error');
    }
  };
  
  

  const editarFicha = (id) => {
    // Buscar la ficha por ID
    const fichaEditar = fichas.find((f) => f._id === id);

    // Establecer el estado con los datos de la ficha a editar
    setFicha(fichaEditar);
    setModoEdicion(true);
    setIdEditar(id);
  };

  const eliminarFicha = async (id) => {
    try {
      // Mostrar ventana de confirmación
      const confirmacion = await Swal.fire({
        title: '¿Estás seguro?',
        text: 'La ficha será eliminada permanentemente.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar',
      });
  
      // Si el usuario confirma la eliminación, proceder con la solicitud de eliminación
      if (confirmacion.isConfirmed) {
        await clienteAxios.delete(`/fichas/${id}`);
  
        // Actualizar la lista de fichas después de eliminar
        const consultarFicha = await clienteAxios.get('api/fichas/');
        setFichas(consultarFicha.data);
  
        // Mostrar mensaje de éxito
        Swal.fire('¡Éxito!', 'La ficha se eliminó correctamente.', 'success');
      }
    } catch (error) {
      console.error('Error al eliminar la ficha:', error);
      Swal.fire('Error', 'Hubo un error al procesar la solicitud.', 'error');
    }
  };

  const agregarAprendiz = () => {
    Swal.fire({
      title: 'Agregar Aprendiz',
      html: `
        <div class="swal2-actions">
          <label class="swal2-label" for="nombres">Nombres:</label>
          <input type="text" id="nombres" class="swal2-input" placeholder="Nombres">
          <label class="swal2-label" for="apellidos">Apellidos:</label>
          <input type="text" id="apellidos" class="swal2-input" placeholder="Apellidos">
          <label class="swal2-label" for="numero_documento">Numero de documento:</label>
      <input type="text" id="numero_documento" class="swal2-input" placeholder="Numero de documento">
      <label class="swal2-label" for="numero_ficha">Numero de ficha:</label>
      <input type="text" id="numero_ficha" class="swal2-input" placeholder="Numero de ficha">
      <label class="swal2-label" for="tipo_documento">Tipo de documento:</label>
      <input type="text" id="tipo_documento" class="swal2-input" placeholder="Tipo de documento">
      <label class="swal2-label" for="fecha_expedicion">Fecha de expedicion:</label>
      <input type="date" id="fecha_expedicion" class="date-form-aprendiz" placeholder="Fecha de expedicion">
      <label class="swal2-label" for="lugar_expedicion">Lugar de expedicion:</label>
      <input type="text" id="lugar_expedicion" class="swal2-input" placeholder="Lugar de expedicion">
      <label class="swal2-label" for="fecha_nacimiento">Fecha de nacimiento:</label>
      <input type="date" id="fecha_nacimiento" class="date-form-aprendiz" placeholder="Fecha de nacimiento">
      <label class="swal2-label" for="sexo">Sexo:</label>
      <input type="text" id="sexo" class="swal2-input" placeholder="Sexo">
      <label class="swal2-label" for="direccion_domicilio">Dirección domicilio:</label>
      <input type="text" id="direccion_domicilio" class="swal2-input" placeholder="Domicilio">
      <label class="swal2-label" for="municipio">Municipio:</label>
      <input type="text" id="municipio" class="swal2-input" placeholder="Municipio">
      <label class="swal2-label" for="departamento">Departamento:</label>
      <input type="text" id="departamento" class="swal2-input" placeholder="Departamento">
      <label class="swal2-label" for="numero_celular1">Numero celular 1:</label>
      <input type="text" id="numero_celular1" class="swal2-input" placeholder="Celular 1">
      <label class="swal2-label" for="numero_celular2">Numero celular 2:</label>
      <input type="text" id="numero_celular2" class="swal2-input" placeholder="Celular 2">
      <label class="swal2-label" for="telefono_fijo">Telefono fijo:</label>
      <input type="text" id="telefono_fijo" class="swal2-input" placeholder="Telefono fijo">
      <label class="swal2-label" for="correo_principal">Correo principal:</label>
      <input type="email" id="correo_principal" class="email-form-aprendiz" placeholder="Correo principal">
      <label class="swal2-label" for="correo_secundario">Correo secundario:</label>
      <input type="email" id="correo_secundario" class="email-form-aprendiz" placeholder="Correo secundario">
      <label class="swal2-label" for="finalizacion_etapa_lectiva">Finalizacion etapa lectiva:</label>
      <input type="date" id="finalizacion_etapa_lectiva" class="date-form-aprendiz" placeholder="Finalizacion etapa lectiva">
      <label class="swal2-label" for="estado_aprobacion">Estado de aprobacion:</label>
      <input type="text" id="estado_aprobacion" class="swal2-input" placeholder="Estado aprobacion">
      <p>Datos de la empresa</p>
      <label class="swal2-label" for="nit">Nit:</label>
      <input type="text" id="nit" class="swal2-input" placeholder="Nit">
      <label class="swal2-label" for="razon_social">Razon social:</label>
      <input type="text" id="razon_social" class="swal2-input" placeholder="Razon social">
      <label class="swal2-label" for="nombre_jefe_inmediato">Nombre jefe inmediato:</label>
      <input type="text" id="nombre_jefe_inmediato" class="swal2-input" placeholder="Nombre jefe inmediato">
      <label class="swal2-label" for="correo">Correo:</label>
      <input type="email" id="correo" class="email-form-aprendiz" placeholder="Correo">
      <label class="swal2-label" for="telefono">Telefono:</label>
      <input type="text" id="telefono" class="swal2-input" placeholder="Telefono">
      <label class="swal2-label" for="direccion">Direccion:</label>
      <input type="text" id="direccion" class="swal2-input" placeholder="Direccion">
      </div>
        </div>
      `,
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Guardar',
      cancelButtonText: 'Cancelar',
      preConfirm: async () => {
        // Obtén los valores del formulario
        const nombres = Swal.getPopup().querySelector('#nombres').value;
        const apellidos = Swal.getPopup().querySelector('#apellidos').value;
        const numeroDocumento = Swal.getPopup().querySelector('#numero_documento').value;
        const tipoDocumento = Swal.getPopup().querySelector('#tipo_documento').value;
        const numeroFicha = Swal.getPopup().querySelector('#numero_ficha').value;
        const fechaExpedicion = Swal.getPopup().querySelector('#fecha_expedicion').value;
        const lugarExpedicion = Swal.getPopup().querySelector('#lugar_expedicion').value;
        const fechaNacimiento = Swal.getPopup().querySelector('#fecha_nacimiento').value;
        const sexo = Swal.getPopup().querySelector('#sexo').value;
        const direccionDomicilio = Swal.getPopup().querySelector('#direccion_domicilio').value;
        const municipio = Swal.getPopup().querySelector('#municipio').value;
        const departamento = Swal.getPopup().querySelector('#departamento').value;
        const numeroCelular1 = Swal.getPopup().querySelector('#numero_celular1').value;
        const numeroCelular2 = Swal.getPopup().querySelector('#numero_celular2').value;
        const telefonoFijo = Swal.getPopup().querySelector('#telefono_fijo').value;
        const correoPrincipal = Swal.getPopup().querySelector('#correo_principal').value;
        const correoSecundario = Swal.getPopup().querySelector('#correo_secundario').value;
        const finalizacionLectiva = Swal.getPopup().querySelector('#finalizacion_etapa_lectiva').value;
        const estadoAprobacion = Swal.getPopup().querySelector('#estado_aprobacion').value;
        const nit = Swal.getPopup().querySelector('#nit').value;
        const razonSocial = Swal.getPopup().querySelector('#razon_social').value;
        const nombreJefeInmediato = Swal.getPopup().querySelector('#nombre_jefe_inmediato').value;
        const correo = Swal.getPopup().querySelector('#correo').value;
        const telefono = Swal.getPopup().querySelector('#telefono').value;
        const direccion = Swal.getPopup().querySelector('#direccion').value;
        // Obten todos los demás valores del formulario
  
        // Crea el objeto del nuevo aprendiz
        const nuevoAprendiz = {
          nombres: nombres,
          apellidos: apellidos,
          numero_documento: numeroDocumento,
          numero_ficha: numeroFicha,
          tipo_documento: tipoDocumento,
          fecha_expedicion: fechaExpedicion,
          lugar_expedicion: lugarExpedicion,
          fecha_nacimiento: fechaNacimiento,
          sexo: sexo,
          direccion_domicilio: direccionDomicilio,
          municipio: municipio,
          departamento: departamento,
          numero_celular1: numeroCelular1,
          numero_celular2: numeroCelular2,
          telefono_fijo: telefonoFijo,
          correo_principal: correoPrincipal,
          correo_secundario: correoSecundario,
          finalizacion_etapa_lectiva: finalizacionLectiva,
          estado_aprobacion: estadoAprobacion,
          empresa:{
            nit: nit,
            razon_social: razonSocial,
            nombre_jefe_inmediato: nombreJefeInmediato,
            correo: correo,
            telefono: telefono,
            direccion: direccion,
          }
        
          // Agrega todos los demás campos del formulario aquí
        };
  
        // Envía el objeto a tu API para guardar el nuevo aprendiz
        try {
          const response = await clienteAxios.post('/api/aprendices/', nuevoAprendiz);
          // Maneja la respuesta o muestra un mensaje de éxito
          Swal.fire('¡Aprendiz agregado!', '', 'success');
          // Actualiza la lista de aprendices si es necesario
          // ...
        } catch (error) {
          console.error('Error al guardar el aprendiz:', error);
          // Muestra un mensaje de error si algo salió mal
          Swal.fire('Error', 'Hubo un error al procesar la solicitud.', 'error');
        }
      }
    });
  };
  
  const handleCargarFichas = () => {
    setListaFichas(true);
  }

  if (listaFichas) {
    return <ListaFichas />;
  }
  const handleRegistroAprendices = () => {
    // Actualiza el estado para mostrar el componente de VisualizarDocumentos
    setRegistroAprendices(true);
  }

  if (registroAprendices) {
    // Si mostrarDocumentos es verdadero, renderiza el componente VisualizarDocumentos
    return <AprendicesRegistrados />;
  }

  return (
    <Fragment>

     
      <Header />
      <MainSection />
      <Apps />
    <div className='main-container-form'>
    <div className='container cont-fichas'>

    <div className='btn-fichas'>


    
     <button id='registrar-aprendiz' onClick={() => agregarAprendiz(aprendiz.id)}>Registrar Aprendiz</button>
    
      <button className='listado-fichas' onClick={handleCargarFichas} >Listado de Fichas</button>
      
      <button className='listado-fichas' onClick={handleRegistroAprendices} >Listado de Aprendices</button>
        <Link to={"/"} className="flecha-regreso">
          <span className="flecha" >&#10094;</span>
        </Link>
        </div>
    </div>
    

    
    <div className='container-fichas'> 
      <h2>Añadir Ficha</h2>

      
      <form onSubmit={enviarDatos}>
        <label>Número de Ficha <p className="rojo-label">*</p></label>
        <input
          type="text"
          name="numero_ficha"
          value={ficha.numero_ficha}
          onChange={actualizarState}
        />

        <label>Nombre del Programa <p className="rojo-label">*</p></label>
        <input
          type="text"
          name="nombre_programa"
          value={ficha.nombre_programa}
          onChange={actualizarState}
        />

        <label>Nivel de Formación <p className="rojo-label">*</p></label>
        <input
          type="text"
          name="nivel_formacion"
          value={ficha.nivel_formacion}
          onChange={actualizarState}
        />

        <label>Horario de Formación <p className="rojo-label">*</p></label>
        <input
          type="text"
          name="horario_formacion"
          value={ficha.horario_formacion}
          onChange={actualizarState}
        />

        <div className='container-btn'>
        <button className='registrar-ficha' type="submit">{modoEdicion ? 'Actualizar' : 'Registrar'}</button>
        </div>
       
      </form>
    </div>
    </div>
    </Fragment>
  );
};

export default withRouter(FormularioFicha);
