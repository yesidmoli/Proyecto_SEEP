import React, { useState, useEffect } from "react";
import clienteAxios from "../../config/axios";
import FormularioFicha from "./FormularioFicha";
import Swal from "sweetalert2";
import { useAuth } from "../context/AuthContext";
import * as XLSX from 'xlsx';
import Header from "../layout/Header";
import MainSection from "../layout/MainSection";
import atras from '../../img/atras.png';
import { Link } from "react-router-dom";


const ListaFichas = () => {
  const [fichas, setFichas] = useState([]);
  const [formularioFichas, setFormularioFichas] = useState(false);
  const [busqueda, setBusqueda] = useState("");
  const [paginaActual, setPaginaActual] = useState(1);
  const [elementosPorPagina] = useState(10);

  const { token } = useAuth();

  const editarFicha = (id) => {
    const fichaEditar = listaFichas.find((f) => f.id === id);
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
        const numeroFicha = Swal.getPopup().querySelector('#numero_ficha').value;
        const nombrePrograma = Swal.getPopup().querySelector('#nombre_programa').value;
        const nivelFormacion = Swal.getPopup().querySelector('#nivel_formacion').value;
        const horarioFormacion = Swal.getPopup().querySelector('#horario_formacion').value;
        const fichaEditada = {
          numero_ficha: numeroFicha,
          nombre_programa: nombrePrograma,
          nivel_formacion: nivelFormacion,
          horario_formacion: horarioFormacion,
        };
        await clienteAxios.put(`/api/fichas/${id}/`, fichaEditada, {
          headers: {
            Authorization: `Token ${token}`,
          }
        });
        Swal.fire('¡Cambios guardados!', '', 'success');
        const consultarFicha = await clienteAxios.get('api/fichas/', {
          headers: {
            Authorization: `Token ${token}`,
          }
        });
        setFichas(consultarFicha.data);
      }
    });
  };

  const eliminarFicha = async (id) => {
    try {
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

      if (confirmacion.isConfirmed) {
        await clienteAxios.delete(`/api/fichas/${id}/`, {
          headers: {
            Authorization: `Token ${token}`,
          }
        });

        const consultarFicha = await clienteAxios.get('api/fichas/', {
          headers: {
            Authorization: `Token ${token}`,
          }
        });
        setFichas(consultarFicha.data);

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
        const consultarApi = await clienteAxios.get("api/fichas/", {
          headers: {
            Authorization: `Token ${token}`,
          }
        });
        setFichas(consultarApi.data);
      } catch (error) {
        console.error("Error al obtener las fichas:", error);
      }
    };

    obtenerFichas();
  }, []);

  const listaFichas = Array.isArray(fichas) ? fichas : [];
  const handleCargarFormulario = () => {
    setFormularioFichas(true);
  };

  const descargarExcel = () => {
    const columnas = [
      "Numero ficha",
      "Nombre del programa",
      "Nivel de formación",
      "Horario de formación",
    ];

    const NombresColumnas = listaFichas.map(ficha => ({
      "Numero ficha": ficha.numero_ficha,
      "Nombre del programa": ficha.nombre_programa,
      "Nivel de formación": ficha.nivel_formacion,
      "Horario de formación": ficha.horario_formacion,
    }));

    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(NombresColumnas, { header: columnas });

    ws['!cols'] = [{ wpx: 80 }, { wpx: 170 }, { wpx: 100 }, { wpx: 120 }, { wpx: 120 }];

    XLSX.utils.book_append_sheet(wb, ws, 'Fichas');
    XLSX.writeFile(wb, 'Lista_Fichas.xlsx');
  };

  
  if (formularioFichas) {
    return <FormularioFicha />;
  }

  const handleBuscar = (e) => {
    setBusqueda(e.target.value);
  };

  const fichasFiltradas = fichas.filter((ficha) => {
    return ficha.numero_ficha.includes(busqueda) || ficha.nombre_programa.toLowerCase().includes(busqueda.toLowerCase());
  });

  const indiceUltimoElemento = paginaActual * elementosPorPagina;
  const indicePrimerElemento = indiceUltimoElemento - elementosPorPagina;
  const fichasPaginadas = fichasFiltradas.slice(indicePrimerElemento, indiceUltimoElemento);
  const totalPaginas = Math.ceil(fichasFiltradas.length / elementosPorPagina);

  return (
    <>
      <Header />
      <MainSection />
      <Link to={"#"} aria-label="icon" className="btn-atras" onClick={handleCargarFormulario}>
        <img src={atras} alt="Atrás" />
        <b>Regresar</b>
      </Link>
      <div className="container lista-fichas">
        <div className="header-fichas">
          <input
            type="text"
            value={busqueda}
            onChange={handleBuscar}
            placeholder="Buscar ficha por número o nombre del programa"
          />
          <div>
            <button className='descargar-excel' onClick={descargarExcel}>Reporte Fichas</button>
            <button className='btn-add-ficha' onClick={handleCargarFormulario}> + Añadir Ficha</button>
          </div>
        </div>
        <div className="table-container">
          <table className="tabla-fichas">
            <thead>
              <tr>
                <th>NÚMERO DE FICHA</th>
                <th>NOMBRE DEL PROGRAMA</th>
                <th>NIVEL DE FORMACIÓN</th>
                <th>HORARIO DE FORMACIÓN</th>
                <th>ACCIONES</th>
              </tr>
            </thead>
            <tbody>
              {fichasPaginadas.map((ficha) => (
                <tr key={ficha.id}>
                  <td>{ficha.numero_ficha}</td>
                  <td>{ficha.nombre_programa}</td>
                  <td>{ficha.nivel_formacion}</td>
                  <td>{ficha.horario_formacion}</td>
                  <td>
                    <button className="boton-anterior" onClick={() => editarFicha(ficha.id)}>Editar</button>
                    {/* <button onClick={() => eliminarFicha(ficha.id)}>Eliminar</button> */}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="paginacion pagination-buttons">
        <span style={{fontSize: "13px"}} className="paginacion__numero">Página {paginaActual} de {totalPaginas}</span>
          <button
            className="paginacion__anterior boton-anterior"
            onClick={() => setPaginaActual(paginaActual - 1)}
            disabled={paginaActual === 1}
          >
            Anterior
          </button>
         
          <button
            className="paginacion__siguiente boton-siguiente"
            onClick={() => setPaginaActual(paginaActual + 1)}
            disabled={paginaActual === totalPaginas}
          >
            Siguiente
          </button>
        </div>
      </div>
    </>
  );
};

export default ListaFichas;
