import React, { useState, useEffect } from "react";
import clienteAxios from "../../config/axios";
import FormularioFicha from "./FormularioFicha";

const ListaFichas = ({ editarFicha, eliminarFicha }) => {
  const [fichas, setFichas] = useState([]);
  const [formularioFichas, setFormularioFichas] = useState(false);
  const [ficha, setFicha] = useState(initialState);
  const [fichas, setFichas] = useState([]);

  useEffect(() => {
    const obtenerFichas = async () => {
      try {
        const consultarApi = await clienteAxios.get("api/fichas/");
        setFichas(consultarApi.data);
      } catch (error) {
        console.error("Error al obtener las fichas:", error);
      }
    };
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

    obtenerFichas();
  }, []);
  const listaFichas = Array.isArray(fichas)
    ? fichas
    : [];
    const handleCargarFormulario = () => {
      setFormularioFichas(true);
    }
  
    if (formularioFichas) {
      return <FormularioFicha />;
    }
  return (
    <div className="lista-fichas">
      <header className="encabezado-fichas">Fichas registradas</header>
      <div className="contenedor-fichas">
        <div className="title-button">
        <h3>Lista de Fichas</h3>
        <button id="regresar-registro" onClick={handleCargarFormulario}>Regresar</button>
        </div>
        {listaFichas.map((ficha) => (
        <ul key={ficha.id}>
          <li>{ficha.numero_ficha}</li>
          <li>{ficha.nombre_programa}</li>
          <li>{ficha.nivel_formacion}</li>
          <li>{ficha.horario_formacion}</li>
          <div className='btns-crud'>
            <button id='btn-editar-fichas' onClick={() => editarFicha(ficha._id)}>Editar</button>
            <button id='btn-delete-fichas' onClick={() => eliminarFicha(ficha._id)}>Eliminar</button>
            </div>
        </ul>
        
        ))}
      </div>
    </div>
  );
};
export default ListaFichas;
