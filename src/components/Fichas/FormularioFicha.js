import React, { useState, useEffect, Fragment } from 'react';
import clienteAxios from '../../config/axios';
import ListaFichas from './ListaFichas';
import '../../../src/css/formularioFichas.css'
import Swal from 'sweetalert2';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
//para la flecha de regreso
import '../../css/bitacoras.css';
import '../layout/Header';
import '../layout/MainSection';

import MainSection from '../layout/MainSection';
import Header from '../layout/Header';
import Apps from '../layout/menu/App';

import { useAuth } from '../context/AuthContext';

const FormularioFicha = ({history}) => {

  const token = localStorage.getItem('token')
  console.log("este es el token", token)

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

 

  useEffect(() => {
    // Lógica para obtener las fichas existentes 
    const obtenerFichas = async () => {
      try {
        const consultarFicha = await clienteAxios.get('/api/fichas/', {
          headers: {
              Authorization: `Token ${token}`,
          }
      });
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
        await clienteAxios.put(`/fichas/${idEditar}`, ficha, {
          headers: {
              Authorization: `Token ${token}`,
          }
      });
        Swal.fire('¡Éxito!', 'La ficha se actualizó correctamente.', 'success');
        
      } else {
        // Crear nueva ficha

        await clienteAxios.post('/api/fichas/', ficha, {
          headers: {
              Authorization: `Token ${token}`,
          }
      });
        Swal.fire('¡Éxito!', 'La ficha se registró correctamente.', 'success');
        // Redirigir a la sección de listado de fichas
        history.push('/#listado-fichas');

        
      }

      // Actualizar la lista de fichas
      const consultarFicha= await clienteAxios.get('api/fichas/', {
        headers: {
            Authorization: `Token ${token}`,
        }
    });
      setFichas(consultarFicha.data);

      // Limpiar el formulario y restablecer el estado
      setFicha(initialState);
      setModoEdicion(false);
      setIdEditar(null);
    } catch (error) {
      console.error('Error al enviar el formulario:', error);
      Swal.fire('Error', `Hubo un error al procesar la solicitud - ${error.response.data}`, 'error');
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
        const consultarFicha = await clienteAxios.get('api/fichas/', {
          headers: {
              Authorization: `Token ${token}`,
          }
      });
        setFichas(consultarFicha.data);
  
        // Mostrar mensaje de éxito
        Swal.fire('¡Éxito!', 'La ficha se eliminó correctamente.', 'success');
      }
    } catch (error) {
      console.error('Error al eliminar la ficha:', error);
      Swal.fire('Error', 'Hubo un error al procesar la solicitud.', 'error');
    }
  };
  const handleCargarFichas = () => {
    setListaFichas(true);
  }

  if (listaFichas) {
    return <ListaFichas />;
  }


  return (
    <Fragment>

     
      <Header />
      <MainSection />
      <Apps />
    <div className='container cont-fichas'>

    <div className='btn-fichas'>


    <Link to={"/nuevo-aprendiz"} aria-label="icon" className="iconLink ">
     <button id='registrar-aprendiz'>Registrar Aprendiz</button>
        </Link>
      <button className='listado-fichas' onClick={handleCargarFichas} >Listado de Fichas</button>

        
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
