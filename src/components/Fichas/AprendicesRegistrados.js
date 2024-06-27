import React, { useState, useEffect } from "react";
import clienteAxios from "../../config/axios";
import FormularioInicial from "./FormularioInicial";
import Swal from "sweetalert2";
import Header from "../layout/Header";
import MainSection from "../layout/MainSection";
import * as XLSX from 'xlsx';
import atras from '../../img/atras.png';
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Apps from "../layout/menu/App";
import { useHistory } from "react-router-dom";

const AprendicesRegistrados = () => {
  const [aprendices, setAprendices] = useState([]);
  const [formularioAprendiz, setFormularioAprendiz] = useState(false);
  const [busqueda, setBusqueda] = useState("");
  const { token } = useAuth();

  const [paginaActual, setPaginaActual] = useState(1);
  const elementosPorPagina = 10; // Número de elementos por página

  const history = useHistory()
  useEffect(() => {
    const obtenerAprendices = async () => {
      try {
        const consultarApi = await clienteAxios.get("api/aprendices/", {
          headers: {
              Authorization: `Token ${token}`
          }
      });
        if (Array.isArray(consultarApi.data.results)) {
          setAprendices(consultarApi.data.results);
        } else {
          console.error("Los datos de los aprendices no son un array:", consultarApi.data.results);
        }
      } catch (error) {
        console.error("Error al obtener los aprendices:", error);
      }
    };
    obtenerAprendices();
  }, [token]);

  const listaAprendices = Array.isArray(aprendices) ? aprendices : [];

  const editarAprendiz = (id) => {
    const aprendizEditar = listaAprendices.find((f) => f.id === id);

    Swal.fire({
      title: 'Editar Aprendiz',
      html: `
      <div class="swal2-actions">
      <label class="swal2-label" for="nombres">Nombres:</label>
      <input type="text" id="nombres" class="swal2-input" value="${aprendizEditar.nombres}" placeholder="Nombres">
      <label class="swal2-label" for="apellidos">Apellidos:</label>
      <input type="text" id="apellidos" class="swal2-input" value="${aprendizEditar.apellidos}" placeholder="Apellidos">
      <label class="swal2-label" for="numero_documento">Numero de documento:</label>
      <input type="text" id="numero_documento" class="swal2-input" value="${aprendizEditar.numero_documento}" placeholder="Numero de documento">
      <label class="swal2-label" for="numero_ficha">Numero de ficha:</label>
      <input type="text" id="numero_ficha" class="swal2-input" value="${aprendizEditar.ficha.numero_ficha}" placeholder="Numero de ficha">
      <label class="swal2-label" for="tipo_documento">Tipo de documento:</label>
      <input type="text" id="tipo_documento" class="swal2-input" value="${aprendizEditar.tipo_documento}" placeholder="Tipo de documento">
      <label class="swal2-label" for="fecha_expedicion">Fecha de expedicion:</label>
      <input type="date" id="fecha_expedicion" class="date-form-aprendiz" value="${aprendizEditar.fecha_expedicion}" placeholder="Fecha de expedicion">
      <label class="swal2-label" for="lugar_expedicion">Lugar de expedicion:</label>
      <input type="text" id="lugar_expedicion" class="swal2-input" value="${aprendizEditar.lugar_expedicion}" placeholder="Lugar de expedicion">
      <label class="swal2-label" for="fecha_nacimiento">Fecha de nacimiento:</label>
      <input type="date" id="fecha_nacimiento" class="date-form-aprendiz" value="${aprendizEditar.fecha_nacimiento}" placeholder="Fecha de nacimiento">
      <label class="swal2-label" for="sexo">Sexo:</label>
      <input type="text" id="sexo" class="swal2-input" value="${aprendizEditar.sexo}" placeholder="Sexo">
      <label class="swal2-label" for="direccion_domicilio">Dirección domicilio:</label>
      <input type="text" id="direccion_domicilio" class="swal2-input" value="${aprendizEditar.direccion_domicilio}" placeholder="Domicilio">
      <label class="swal2-label" for="municipio">Municipio:</label>
      <input type="text" id="municipio" class="swal2-input" value="${aprendizEditar.municipio}" placeholder="Municipio">
      <label class="swal2-label" for="departamento">Departamento:</label>
      <input type="text" id="departamento" class="swal2-input" value="${aprendizEditar.departamento}" placeholder="Departamento">
      <label class="swal2-label" for="numero_celular1">Numero celular 1:</label>
      <input type="text" id="numero_celular1" class="swal2-input" value="${aprendizEditar.numero_celular1}" placeholder="Celular 1">
      <label class="swal2-label" for="numero_celular2">Numero celular 2:</label>
      <input type="text" id="numero_celular2" class="swal2-input" value="${aprendizEditar.numero_celular2}" placeholder="Celular 2">
      <label class="swal2-label" for="telefono_fijo">Telefono fijo:</label>
      <input type="text" id="telefono_fijo" class="swal2-input" value="${aprendizEditar.telefono_fijo}" placeholder="Telefono fijo">
      <label class="swal2-label" for="correo_principal">Correo principal:</label>
      <input type="email" id="correo_principal" class="email-form-aprendiz" value="${aprendizEditar.correo_principal}" placeholder="Correo principal">
      <label class="swal2-label" for="correo_secundario">Correo secundario:</label>
      <input type="email" id="correo_secundario" class="email-form-aprendiz" value="${aprendizEditar.correo_secundario}" placeholder="Correo secundario">
      <label class="swal2-label" for="finalizacion_etapa_lectiva">Finalizacion etapa lectiva:</label>
      <input type="date" id="finalizacion_etapa_lectiva" class="date-form-aprendiz" value="${aprendizEditar.finalizacion_etapa_lectiva}" placeholder="Finalizacion etapa lectiva">
      <label class="swal2-label" for="estado_aprobacion">Estado de aprobación:</label>
      <select id="estado_aprobacion" class="swal2-input">
          <option value="">Seleccione un estado</option>
          <option value="aprobado" ${aprendizEditar.estado_aprobacion === "aprobado" ? "selected" : ""}>Aprobado</option>
          <option value="pendiente" ${aprendizEditar.estado_aprobacion === "pendiente" ? "selected" : ""}>Pendiente</option>
        </select>
      <p>Datos de la empresa</p>
      <label class="swal2-label" for="nit">Nit:</label>
      <input type="text" id="nit" class="swal2-input" value="${aprendizEditar.empresa.nit}" placeholder="Nit">
      <label class="swal2-label" for="razon_social">Razon social:</label>
      <input type="text" id="razon_social" class="swal2-input" value="${aprendizEditar.empresa.razon_social}" placeholder="Razon social">
      <label class="swal2-label" for="nombre_jefe_inmediato">Nombre jefe inmediato:</label>
      <input type="text" id="nombre_jefe_inmediato" class="swal2-input" value="${aprendizEditar.empresa.nombre_jefe_inmediato}" placeholder="Nombre jefe inmediato">
      <label class="swal2-label" for="correo">Correo:</label>
      <input type="email" id="correo" class="email-form-aprendiz" value="${aprendizEditar.empresa.correo}" placeholder="Correo">
      <label class="swal2-label" for="telefono">Telefono:</label>
      <input type="text" id="telefono" class="swal2-input" value="${aprendizEditar.empresa.telefono}" placeholder="Telefono">
      <label class="swal2-label" for="direccion">Direccion:</label>
      <input type="text" id="direccion" class="swal2-input" value="${aprendizEditar.empresa.direccion}" placeholder="Direccion">
      </div>
    `,
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Guardar cambios',
      cancelButtonText: 'Cancelar',
      preConfirm: () => {
        const nombres = document.getElementById("nombres").value;
        const apellidos = document.getElementById("apellidos").value;
        const numero_documento = document.getElementById("numero_documento").value;
        const numero_ficha = document.getElementById("numero_ficha").value;
        const tipo_documento = document.getElementById("tipo_documento").value;
        const fecha_expedicion = document.getElementById("fecha_expedicion").value;
        const lugar_expedicion = document.getElementById("lugar_expedicion").value;
        const fecha_nacimiento = document.getElementById("fecha_nacimiento").value;
        const sexo = document.getElementById("sexo").value;
        const direccion_domicilio = document.getElementById("direccion_domicilio").value;
        const municipio = document.getElementById("municipio").value;
        const departamento = document.getElementById("departamento").value;
        const numero_celular1 = document.getElementById("numero_celular1").value;
        const numero_celular2 = document.getElementById("numero_celular2").value;
        const telefono_fijo = document.getElementById("telefono_fijo").value;
        const correo_principal = document.getElementById("correo_principal").value;
        const correo_secundario = document.getElementById("correo_secundario").value;
        const finalizacion_etapa_lectiva = document.getElementById("finalizacion_etapa_lectiva").value;
        const estado_aprobacion = document.getElementById("estado_aprobacion").value;
        const nit = document.getElementById("nit").value;
        const razon_social = document.getElementById("razon_social").value;
        const nombre_jefe_inmediato = document.getElementById("nombre_jefe_inmediato").value;
        const correo = document.getElementById("correo").value;
        const telefono = document.getElementById("telefono").value;
        const direccion = document.getElementById("direccion").value;

        return {
          nombres,
          apellidos,
          numero_documento,
          numero_ficha,
          tipo_documento,
          fecha_expedicion,
          lugar_expedicion,
          fecha_nacimiento,
          sexo,
          direccion_domicilio,
          municipio,
          departamento,
          numero_celular1,
          numero_celular2,
          telefono_fijo,
          correo_principal,
          correo_secundario,
          finalizacion_etapa_lectiva,
          estado_aprobacion,
          empresa: {
            nit,
            razon_social,
            nombre_jefe_inmediato,
            correo,
            telefono,
            direccion
          }
        };
      }
    }).then((result) => {
      if (result.isConfirmed) {
        const aprendizActualizado = result.value;

        const confirmarEdicion = async () => {
          try {
            const response = await clienteAxios.put(`api/aprendices/${id}/`, aprendizActualizado, {
              headers: {
                Authorization: `Token ${token}`
              }
            });

            if (response.status === 200 || response.status === 201) {
              Swal.fire("¡Actualizado!", "El aprendiz ha sido actualizado correctamente.", "success");
              setAprendices(aprendices.map((f) => (f.id === id ? { ...f, ...aprendizActualizado } : f)));
            } else {
              throw new Error("Error al actualizar el aprendiz");
            }
          } catch (error) {
            Swal.fire("Error", "Hubo un problema al actualizar el aprendiz. Por favor, intenta nuevamente.", "error");
            console.error("Error al actualizar el aprendiz:", error);
          }
        };
        confirmarEdicion();
      }
    });
  };

  const eliminarAprendiz = (id) => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "¡No podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        const confirmarEliminacion = async () => {
          try {
            await clienteAxios.delete(`api/aprendices/${id}/`, {
              headers: {
                Authorization: `Token ${token}`
              }
            });
            Swal.fire("¡Eliminado!", "El aprendiz ha sido eliminado.", "success");
            setAprendices(aprendices.filter((f) => f.id !== id));
          } catch (error) {
            Swal.fire("Error", "Hubo un problema al eliminar el aprendiz. Por favor, intenta nuevamente.", "error");
            console.error("Error al eliminar el aprendiz:", error);
          }
        };
        confirmarEliminacion();
      }
    });
  };

  const handleFormularioAprendiz = () => {
    setFormularioAprendiz(true);
  };

  const handleBuscar = (e) => {
    setBusqueda(e.target.value);
  };

  const aprendicesFiltrados = listaAprendices.filter((aprendiz) => {
    return (
      aprendiz.numero_documento.includes(busqueda) || 
      aprendiz.nombres.toLowerCase().includes(busqueda.toLowerCase()) || 
      aprendiz.apellidos.toLowerCase().includes(busqueda.toLowerCase())
    );
  });

  const indiceUltimoElemento = paginaActual * elementosPorPagina;
  const indicePrimerElemento = indiceUltimoElemento - elementosPorPagina;
  const aprendicesPaginados = aprendicesFiltrados.slice(indicePrimerElemento, indiceUltimoElemento);

  const cambiarPagina = (numeroPagina) => setPaginaActual(numeroPagina);

  const descargarExcel = () => {
    const datosDescargar = aprendicesFiltrados.map(aprendiz => ({
      Nombres: aprendiz.nombres,
      Apellidos: aprendiz.apellidos,
      Documento: aprendiz.numero_documento,
      "Numero de ficha": aprendiz.ficha.numero_ficha,
      "Tipo de documento": aprendiz.tipo_documento,
      "Fecha de expedicion": aprendiz.fecha_expedicion,
      "Lugar de expedicion": aprendiz.lugar_expedicion,
      "Fecha de nacimiento": aprendiz.fecha_nacimiento,
      Sexo: aprendiz.sexo,
      "Direccion domicilio": aprendiz.direccion_domicilio,
      Municipio: aprendiz.municipio,
      Departamento: aprendiz.departamento,
      "Numero celular 1": aprendiz.numero_celular1,
      "Numero celular 2": aprendiz.numero_celular2,
      "Telefono fijo": aprendiz.telefono_fijo,
      "Correo principal": aprendiz.correo_principal,
      "Correo secundario": aprendiz.correo_secundario,
      "Finalizacion etapa lectiva": aprendiz.finalizacion_etapa_lectiva,
      "Estado de aprobacion": aprendiz.estado_aprobacion,
      Nit: aprendiz.empresa.nit,
      "Razon social": aprendiz.empresa.razon_social,
      "Nombre jefe inmediato": aprendiz.empresa.nombre_jefe_inmediato,
      Correo: aprendiz.empresa.correo,
      Telefono: aprendiz.empresa.telefono,
      Direccion: aprendiz.empresa.direccion,
    }));

    const hojaCalculo = XLSX.utils.json_to_sheet(datosDescargar);
    const libro = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(libro, hojaCalculo, 'Aprendices');
    XLSX.writeFile(libro, 'aprendices.xlsx');
  };

  const totalPaginas = Math.ceil(aprendicesFiltrados.length / elementosPorPagina);


  return (
    <>
      <Header />
      <MainSection />
      <Apps />
      <div className="container  container-reg">

        <div style={{ "cursor": "pointer" }} aria-label="icon" className=" btn-atras" onClick={() => history.goBack()}>
          <img src={atras}></img>
          <b>Regresar</b>
        </div>

        <div className="tabla-uno">
          <div className="header-fichas header-fichas__aprendiz">
            <input
              type="text"
              value={busqueda}
              onChange={handleBuscar}
              placeholder="Buscar aprendiz por número documento o nombre"
            />
            <div>
              <button className='btn descargar-excel' onClick={descargarExcel}>Reporte de aprendices</button>
              <button className='btn btn-add-ficha' onClick={handleFormularioAprendiz}> + Añadir Aprendiz</button>
            </div>
          </div>

          <div className="tabla-scroll tabla-fichas">
            <table className="tabla-reg">
              <thead>
                <tr>
                  <th>Nombres</th>
                  <th>Apellidos</th>
                  <th>Documento</th>
                  <th>Numero de ficha</th>
                  <th>Opciones</th>
                </tr>
              </thead>
              <tbody>
                {aprendicesPaginados.map((aprendiz) => (
                  <tr key={aprendiz.id}>
                    <td>{aprendiz.nombres}</td>
                    <td>{aprendiz.apellidos}</td>
                    <td>{aprendiz.numero_documento}</td>
                    <td>{aprendiz.ficha.numero_ficha}</td>
                    <td className="buttons-opciones">
                      <button className="boton-anterior" id="editar-aprendiz" onClick={() => editarAprendiz(aprendiz.id)}>
                        Editar
                      </button>
                      {/* <button id="eliminar-aprendiz" onClick={() => eliminarAprendiz(aprendiz.id)}>
                        Eliminar
                      </button> */}
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
              onClick={() => cambiarPagina(paginaActual - 1)}
              disabled={paginaActual === 1}
            >
              Anterior
            </button>
           
            <button
              className="paginacion__siguiente boton-siguiente"
              onClick={() => cambiarPagina(paginaActual + 1)}
              disabled={indiceUltimoElemento >= aprendicesFiltrados.length}
            >
              Siguiente
            </button>
          </div>
        </div>

        {/* {formularioAprendiz && <FormularioInicial />} */}
      </div>
    </>
  );
};

export default AprendicesRegistrados;
