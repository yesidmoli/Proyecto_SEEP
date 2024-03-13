import React, { useState, useEffect } from "react";
import clienteAxios from "../../config/axios";
import FormularioFicha from "./FormularioFicha";
import Swal from "sweetalert2";
import * as XLSX from 'xlsx';

const ListaFichas = () => {
  const [fichas, setFichas] = useState([]);
  const [formularioFichas, setFormularioFichas] = useState(false);

  const editarFicha = (id) => {
    // Buscar la ficha por ID
    const fichaEditar = listaFichas.find((f) => f.id === id);
    // Establecer el estado con los datos de la ficha a editar
    Swal.fire({
      title: 'Editar ficha',
      html: `
      <input type="text" id="numero_ficha" class="swal2-input" value="${fichaEditar.numero_ficha}" placeholder="Número de ficha">
      <input type="text" id="nombre_programa" class="swal2-input" value="${fichaEditar.nombre_programa}" placeholder="Nombre del programa">
      <input type="text" id="nivel_formacion" class="swal2-input" value="${fichaEditar.nivel_formacion}" placeholder="Nivel de formación">
      <input type="text" id="horario_formacion" class="swal2-input" value="${fichaEditar.horario_formacion}" placeholder="Horario de formación">
    `,
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Guardar',
      cancelButtonText: 'Cancelar',
      preConfirm: async () => {
        // Obtener los valores actualizados del formulario
        const numeroFicha = Swal.getPopup().querySelector('#numero_ficha').value;
        const nombrePrograma = Swal.getPopup().querySelector('#nombre_programa').value;
        const nivelFormacion = Swal.getPopup().querySelector('#nivel_formacion').value;
        const horarioFormacion = Swal.getPopup().querySelector('#horario_formacion').value;
        const fichaEditada = {
          numero_ficha: numeroFicha,
          nombre_programa: nombrePrograma,
          nivel_formacion: nivelFormacion,
          horario_formacion: horarioFormacion,
        }
        await clienteAxios.put(`/api/fichas/${id}/`, fichaEditada)
        Swal.fire('¡Cambios guardados!', '', 'success');
        const consultarFicha = await clienteAxios.get('api/fichas/');
        setFichas(consultarFicha.data);
      }
    });
    
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
        await clienteAxios.delete(`/api/fichas/${id}/`);
  
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

  useEffect(() => {
    const obtenerFichas = async () => {
      try {
        const consultarApi = await clienteAxios.get("api/fichas/");
        setFichas(consultarApi.data);
      } catch (error) {
        console.error("Error al obtener las fichas:", error);
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
    const descargarExcel = () => {
      const columnas = [
        "Numero ficha",
        "Nombre del programa",
        "Nivel de formación",
        "Horario de formación",
        
      ];
      const NombresColumnas = fichas.results? fichas.map(ficha => ({
        "Numero ficha": ficha.numero_ficha,
        "Nombre del programa": ficha.nombre_programa,
        "Nivel de formación": ficha.nivel_formacion,
        "Horario de formación": ficha.horario_formacion,
        
      })) : [];
      const wb = XLSX.utils.book_new();
      const ws = XLSX.utils.json_to_sheet(NombresColumnas, { header: columnas });
  
      ws['!cols'] = [{ wpx: 80 }, { wpx: 100 }, { wpx: 100 }, { wpx: 120 }, { wpx: 120 }, { wpx: 120 }, { wpx: 140 }, { wpx: 140 }, { wpx: 140 }, { wpx: 140 }, { wpx: 80 }, { wpx: 140 }, { wpx: 140 }, { wpx: 120 }, { wpx: 120 }, { wpx: 120 }, { wpx: 120 }, { wpx: 140 }, { wpx: 140 }, { wpx: 200 }, { wpx: 140 }, { wpx: 140 }];
  
      XLSX.utils.book_append_sheet(wb, ws, 'Aprendices');
      XLSX.writeFile(wb, 'Lista_Aprendices.xlsx');
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
            <button id='btn-editar-fichas' onClick={() => editarFicha(ficha.id)}>Editar</button>
            <button id='btn-delete-fichas' onClick={() => eliminarFicha(ficha.id)}>Eliminar</button>
            </div>
        </ul>
        
        ))}
      </div>
      <button className='descargar-excel' onClick={descargarExcel}>Reporte de fichas</button>
    </div>
  );
};
export default ListaFichas;
