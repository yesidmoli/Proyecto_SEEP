import React, { useState, useEffect } from "react";
import clienteAxios from "../../config/axios";
import FormularioInicial from "./FormularioInicial";
import Swal from "sweetalert2";
import Header from "../layout/Header";
import MainSection from "../layout/MainSection";
import * as XLSX from 'xlsx';
import atras from '../../img/atras.png'
import { Link } from "react-router-dom";
import ListaAprendices from "./ListaAprendices";
import Apps from "../layout/menu/App";
import { useAuth } from "../context/AuthContext";
const AprendicesRegistrados = () => {
  const [aprendices, setAprendices] = useState([]);

 

  const [formularioAprendiz, setFormularioAprendiz] = useState(false);

  const [busqueda, setBusqueda] = useState("");

  const {token} = useAuth()

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
  }, []);
  const listaAprendices = Array.isArray(aprendices)
    ? aprendices
    : [];
  
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
      confirmButtonText: 'Guardar',
      cancelButtonText: 'Cancelar',
      preConfirm: async () => {
        // Obtener los valores actualizados del formulario
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


        const aprendizEditado = {
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
          empresa: {
            nit: nit,
            razon_social: razonSocial,
            nombre_jefe_inmediato: nombreJefeInmediato,
            correo: correo,
            telefono: telefono,
            direccion: direccion,
          }
        }
        await clienteAxios.put(`/api/aprendices/${id}/`, aprendizEditado, {
          headers: {
              Authorization: `Token ${token}`
          }
      });
        Swal.fire('¡Cambios guardados!', '', 'success');
        const consultarAprendiz = await clienteAxios.get('/api/aprendices/', {
          headers: {
              Authorization: `Token ${token}`
          }
      });
        setAprendices(consultarAprendiz.data.results);
      }
    });

  };
  const eliminarAprendiz = async (id) => {
    try {
      // Mostrar ventana de confirmación
      const confirmacion = await Swal.fire({
        title: '¿Estás seguro?',
        text: 'El aprendiz será eliminado permanentemente.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar',
      });

      // Si el usuario confirma la eliminación, proceder con la solicitud de eliminación
      if (confirmacion.isConfirmed) {
        await clienteAxios.delete(`/api/aprendices/${id}/`, {
          headers: {
              Authorization: `Token ${token}`
          }
      });

        // Actualizar la lista de fichas después de eliminar
        const consultarAprendiz = await clienteAxios.get('api/aprendices/', {
          headers: {
              Authorization: `Token ${token}`
          }
      });
        setAprendices(consultarAprendiz.data.results);

        // Mostrar mensaje de éxito
        Swal.fire('¡Éxito!', 'El aprendiz se eliminó correctamente.', 'success');
      }
    } catch (error) {
      console.error('Error al eliminar el aprendiz:', error);
      Swal.fire('Error', 'Hubo un error al procesar la solicitud.', 'error');
    }
  };




  const handleFormularioAprendiz = () => {
    setFormularioAprendiz(true);
  };
  const descargarExcel = () => {
    const columnas = [
      "Visitas",
      "Empresa",
      "Ficha",
      "Nombres",
      "Apellidos",
      "Tipo de documento",
      "Número de documento",
      "Fecha de expedición",
      "Lugar de expedición",
      "Fecha de nacimiento",
      "Sexo",
      "Dirección domicilio",
      "Municipio",
      "Departamento",
      "Número de celular 1",
      "Número de celular 2",
      "Teléfono fijo",
      "Correo principal",
      "Correo secundario",
      "Finalización etapa lectiva",
      "Estado de aprobación"
    ];
    const NombresColumnas = aprendices.map(aprendiz => ({
      "Visitas": aprendiz.visitas,
      "Empresa": aprendiz.empresa.razon_social,
      "Ficha": aprendiz.ficha.numero_ficha,
      "Nombres": aprendiz.nombres,
      "Apellidos": aprendiz.apellidos,
      "Tipo de documento": aprendiz.tipo_documento,
      "Número de documento": aprendiz.numero_documento,
      "Fecha de expedición": aprendiz.fecha_expedicion,
      "Lugar de expedición": aprendiz.lugar_expedicion,
      "Fecha de nacimiento": aprendiz.fecha_nacimiento,
      "Sexo": aprendiz.sexo,
      "Dirección domicilio": aprendiz.direccion_domicilio,
      "Municipio": aprendiz.municipio,
      "Departamento": aprendiz.departamento,
      "Número de celular 1": aprendiz.numero_celular1,
      "Número de celular 2": aprendiz.numero_celular2,
      "Teléfono fijo": aprendiz.telefono_fijo,
      "Correo principal": aprendiz.correo_principal,
      "Correo secundario": aprendiz.correo_secundario,
      "Finalización etapa lectiva": aprendiz.finalizacion_etapa_lectiva,
      "Estado de aprobación": aprendiz.estado_aprobacion,
    }));
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(NombresColumnas, { header: columnas });

    ws['!cols'] = [{ wpx: 80 }, { wpx: 100 }, { wpx: 100 }, { wpx: 120 }, { wpx: 120 }, { wpx: 120 }, { wpx: 140 }, { wpx: 140 }, { wpx: 140 }, { wpx: 140 }, { wpx: 80 }, { wpx: 140 }, { wpx: 140 }, { wpx: 120 }, { wpx: 120 }, { wpx: 120 }, { wpx: 120 }, { wpx: 140 }, { wpx: 140 }, { wpx: 200 }, { wpx: 140 }, { wpx: 140 }];

    XLSX.utils.book_append_sheet(wb, ws, 'Aprendices');
    XLSX.writeFile(wb, 'Lista_Aprendices.xlsx');
  }
  if (formularioAprendiz) {
    return <FormularioInicial />;
  }

  const handleBuscar = (e) => {
    setBusqueda(e.target.value);
  };

  const aprendicesFiltrados = aprendices.filter((aprendiz) => {
    // Filtra las fichas cuyo número de ficha o nombre del programa coincidan con el término de búsqueda
    return aprendiz.numero_documento.includes(busqueda) || aprendiz.nombres.toLowerCase().includes(busqueda.toLowerCase()) || aprendiz.apellidos.toLowerCase().includes(busqueda.toLowerCase());;
  });

  
  return (
    <>
      <Header />
      <MainSection />
      <Apps />
      <div className="container  container-reg">

        <div style={{ "cursor": "pointer" }} aria-label="icon" className=" btn-atras" onClick={handleFormularioAprendiz}>
          <img src={atras}></img>

          <b>Regresar</b>
        </div>

        <div className="tabla-uno">
          {/* <h1 style={{ "textAlign": "center", "borderBottom": "1px solid #ccc" }}>Aprendices Registrados</h1> */}
          {/* <div className="btn-regr">
             <button id="regresar" onClick={handleFormularioAprendiz}>
                  Regresar
                </button>
          
          </div> */}
          <div className="header-fichas header-fichas__aprendiz">

            <input
              type="text"
              value={busqueda}
              onChange={handleBuscar}
              placeholder="Buscar aprendiz por número documento o nombre"
            />
            <div>
              <button className=' btn descargar-excel' onClick={descargarExcel}>Reporte de aprendices</button>

              <button className=' btn btn-add-ficha' onClick={handleFormularioAprendiz} > + Añadir Aprendiz</button>
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
                {aprendicesFiltrados.map((aprendiz) => (
                  <tr key={aprendiz.id}>
                    <td>{aprendiz.nombres}</td>
                    <td>{aprendiz.apellidos}</td>
                    <td>{aprendiz.numero_documento}</td>
                    <td>{aprendiz.ficha.numero_ficha}</td>
                    <td className="buttons-opciones">
                      <button id="editar-aprendiz" onClick={() => editarAprendiz(aprendiz.id)}>
                        Editar
                      </button>
                      <button id="eliminar-aprendiz" onClick={() => eliminarAprendiz(aprendiz.id)}>
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
                <tr>
                  <td colSpan="5">
                    <div className="btn-regr">
                      {/* <button id="regresar" onClick={handleFormularioAprendiz}>
                  Regresar
                </button> */}
                      {/* <button className='descargar-excel' onClick={descargarExcel}>Reporte de aprendices</button> */}
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};
export default AprendicesRegistrados;
