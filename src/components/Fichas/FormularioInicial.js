import React, { useState, useEffect, Fragment } from "react";
import clienteAxios from "../../config/axios";
import Swal from "sweetalert2";
import "../layout/MainSection";
import "../layout/Header";
import AprendicesRegistrados from "./AprendicesRegistrados";

import MainSection from "../layout/MainSection";
import Apps from "../layout/menu/App";
import Header from "../layout/Header";
import { Link } from "react-router-dom";

import atras from '../../img/atras.png';
import Spinner from 'react-bootstrap/Spinner';
import FichaSelector from "./FichaSelector";

const FormularioInicial = () => {

  const [fichaSeleccionada, setFichaSeleccionada] = useState(null);
  const initialState = {
    numero_ficha: fichaSeleccionada,
    nombres: "",
    apellidos: "",
    tipo_documento: "",
    numero_documento: "",
    fecha_expedicion: "",
    lugar_expedicion: "",
    fecha_nacimiento: "",
    sexo: "",
    direccion_domicilio: "",
    municipio: "",
    departamento: "",
    numero_celular1: "",
    numero_celular2: "",
    telefono_fijo: "",
    correo_principal: "",
    correo_secundario: "",
    finalizacion_etapa_lectiva: "",
    estado_aprobacion: "pendiente",
    empresa: {
      nit: "",
      razon_social: "",
      nombre_jefe_inmediato: "",
      direccion: "",
      correo: "",
      telefono: "",
    },
  };

  const [aprendiz, setAprendiz] = useState(initialState);
  const [aprendices, setAprendices] = useState([]);
  const [modoEdicion, setModoEdicion] = useState(false);
  const [registroAprendices, setRegistroAprendices] = useState(false);
  const [idEditar, setIdEditar] = useState(null);
  const [enviandoDatos, setEnviandoDatos] = useState(false);

  console.log("aprendiz", aprendiz);
  useEffect(() => {
    const obtenerAprendices = async () => {
      try {
        const consultarApi = await clienteAxios.get("api/aprendices/");
        setAprendices(consultarApi.data);
      } catch (error) {
        console.error("Error al obtener los aprendices:", error);
      }
    };

    obtenerAprendices();
  }, []);

  const actualizarState = (e) => {
    const { name, value, type } = e.target;
  
    let newValue = value;
  
    // Validar campos de tipo 'number' para no permitir números negativos
    if (type === 'number') {
      newValue = value.replace(/[^0-9]/g, ''); // Remueve cualquier caracter que no sea un número
    }
  
    if (name.includes("empresa.")) {
      // Si el campo pertenece a 'empresa', actualiza ese campo específico
      const empresaField = name.split("empresa.")[1];
      setAprendiz({
        ...aprendiz,
        empresa: {
          ...aprendiz.empresa,
          [empresaField]: newValue, // Aplica el nuevo valor validado
        },
      });
    } else {
      // Si no es un campo de 'empresa', actualiza directamente en el nivel superior
      setAprendiz({
        ...aprendiz,
        [name]: newValue, // Aplica el nuevo valor validado
      });
    }
  };
  


  const enviarDatos = async (e) => {
    e.preventDefault();
    setEnviandoDatos(true);

    try {
      if (modoEdicion) {
        // Actualizar aprendiz existente
        await clienteAxios.put(`api/aprendices/${idEditar}`, aprendiz);
        Swal.fire("¡Éxito!", "Aprendiz actualizado exitosamente", "success");
      } else {
        try {
          // Crear nuevo aprendiz
          await clienteAxios.post("/api/aprendices/", aprendiz);
          Swal.fire("¡Éxito!", "Aprendiz registrado exitosamente", "success");
        } catch (error) {
          console.log("error", error);
          let errorMessage = "Se produjo un error al guardar:";
          if (error.response && error.response.data) {
            const data = error.response.data;
            if (data.error) {
              errorMessage += `\n- ${data.error}`;
            } else if (Array.isArray(data)) {
              errorMessage += data.map((error) => `\n- ${error}`).join('');
            } else {
              Object.keys(data).forEach(key => {
                if (Array.isArray(data[key])) {
                  data[key].forEach(message => {
                    errorMessage += ` ${message}`;
                  });
                } else {
                  errorMessage += `\n- ${key}: ${data[key]}`;
                }
              });
            }
          } else {
            errorMessage += "\n- Ha ocurrido un error inesperado.";
          }
          Swal.fire("Error", errorMessage, "error");
        }
      }

      // Actualizar la lista de aprendices
      const response = await clienteAxios.get("api/aprendices/");
      setAprendices(response.data);

      // Limpiar el formulario y restablecer el estado
      setModoEdicion(false);
      setIdEditar(null);
    } catch (error) {
      // Manejar el error
      if (error.response && error.response.status === 404) {
        Swal.fire(
          "¡Error!",
          "Ficha no encontrada. Verifica el número de ficha",
          "error"
        );
      } else {
        console.error("Error al enviar el formulario:", error);
        Swal.fire("¡Error!", "Hubo un error al procesar la solicitud", "error");
      }
    }
    setEnviandoDatos(false);
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
      title: "¿Estás seguro?",
      text: "Esta acción no se puede deshacer",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });

    // Si el usuario confirma, procede a eliminar el aprendiz
    if (confirmacion.isConfirmed) {
      try {
        await clienteAxios.delete(`api/aprendices/${id}`);
        const response = await clienteAxios.get("api/aprendices/");
        setAprendices(response.data);
        Swal.fire("¡Éxito!", "Aprendiz eliminado exitosamente", "success");
      } catch (error) {
        console.error("Error al eliminar el aprendiz:", error);
        Swal.fire("¡Error!", "Hubo un error al procesar la solicitud", "error");
      }
    }
  };

  const handleRegistroAprendices = () => {
    // Actualiza el estado para mostrar el componente de VisualizarDocumentos
    setRegistroAprendices(true);
  };

  if (registroAprendices) {
    // Si mostrarDocumentos es verdadero, renderiza el componente VisualizarDocumentos
    return <AprendicesRegistrados />;
  }

  const FichaSeleccionada = (fichaId) => {
    setFichaSeleccionada(fichaId);
    setAprendiz({
      ...aprendiz,
      numero_ficha: fichaId,
    });
  };

  return (
    <Fragment>
      <Header />
      <MainSection />
      <Apps />
      <div className="container cont-fichas">
        <Link to={"/fichas"} aria-label="icon" className="btn-atras">
          <img src={atras} alt="Atrás" />
          <b>Regresar</b>
        </Link>
        <div className='btn-fichas-aprendiz'>
        <Link  to={'/aprendices'} id="ver" className='btn listado-aprendices'  >Aprendices registrados</Link>
        </div>
        <div className="container-uno">
          <h2>Añadir Aprendiz</h2>
          <div className="form">
            <form onSubmit={enviarDatos}>
              <label>Número de Ficha: <p className="rojo-label">*</p></label>
              <div className="select-venta classN">
              <FichaSelector onAprendizSeleccionada={FichaSeleccionada} />
              </div>
              
              <label>Nombres: <p className="rojo-label">*</p></label>
              <input
                type="text"
                name="nombres"
                value={aprendiz.nombres}
                onChange={actualizarState}
                required
              />
              <label>Apellidos: <p className="rojo-label">*</p></label>
              <input
                type="text"
                name="apellidos"
                value={aprendiz.apellidos}
                onChange={actualizarState}
                required
              />
              <label>Tipo de Documento: <p className="rojo-label">*</p></label>
              <select name="tipo_documento" value={aprendiz.tipo_documento} onChange={actualizarState}>
                <option value="" disabled>Seleccione el tipo de documento</option>
                <option value="CC">Cédula de Ciudadanía</option>
                <option value="CE">Cédula de Extranjería</option>
                <option value="TI">Tarjeta de Identidad</option>
                <option value="PA">Pasaporte</option>
              </select>
              <label>Número de Documento: <p className="rojo-label">*</p></label>
              <input
              min="0"
                type="number"
                name="numero_documento"
                value={aprendiz.numero_documento}
                onChange={actualizarState}
                required
              />
              <label>Fecha de Expedición: <p className="rojo-label">*</p></label>
              <input
                id="fecha_exp"
                type="date"
                name="fecha_expedicion"
                value={aprendiz.fecha_expedicion}
                onChange={actualizarState}
                required
              />
              <label>Lugar de Expedición: <p className="rojo-label">*</p></label>
              <input
                type="text"
                name="lugar_expedicion"
                value={aprendiz.lugar_expedicion}
                onChange={actualizarState}
                required
              />
              <label>Fecha de Nacimiento: <p className="rojo-label">*</p></label>
              <input
                id="fecha-nac"
                type="date"
                name="fecha_nacimiento"
                value={aprendiz.fecha_nacimiento}
                onChange={actualizarState}
                required
              />
              <label>Genero: <p className="rojo-label">*</p></label>
              <select name="sexo" value={aprendiz.sexo} onChange={actualizarState} required>
                <option value="" disabled>Seleccione el sexo</option>
                <option value="Masculino">Masculino</option>
                <option value="Femenino">Femenino</option>
                <option value="No binario">No binario</option>
              </select>
              <label>Dirección Domicilio: <p className="rojo-label">*</p></label>
              <input
                type="text"
                name="direccion_domicilio"
                value={aprendiz.direccion_domicilio}
                onChange={actualizarState}
                required
              />
              <label>Municipio: <p className="rojo-label">*</p></label>
              <input
                type="text"
                name="municipio"
                value={aprendiz.municipio}
                onChange={actualizarState}
                required
              />
              <label>Departamento: <p className="rojo-label">*</p></label>
              <input
                type="text"
                name="departamento"
                value={aprendiz.departamento}
                onChange={actualizarState}
                required
              />
              <label>Número de Celular 1: <p className="rojo-label">*</p></label>
              <input
              min="0"
                type="number"
                name="numero_celular1"
                value={aprendiz.numero_celular1}
                onChange={actualizarState}
                required
              />
              <label>Número de Celular 2:</label>
              <input
              min="0"
                type="number"
                name="numero_celular2"
                value={aprendiz.numero_celular2}
                onChange={actualizarState}
              />
              <label>Teléfono Fijo:</label>
              <input
              min="0"
                type="number"
                name="telefono_fijo"
                value={aprendiz.telefono_fijo}
                onChange={actualizarState}
              />
              <label>Correo Principal: <p className="rojo-label">*</p></label>
              <input
                type="email"
                name="correo_principal"
                value={aprendiz.correo_principal}
                onChange={actualizarState}
                required
              />
              <label>Correo Secundario:</label>
              <input
                type="email"
                name="correo_secundario"
                value={aprendiz.correo_secundario}
                onChange={actualizarState}
              />
              <label>Finalización Lectiva: <p className="rojo-label">*</p></label>
              <input
                id="fin"
                type="date"
                name="finalizacion_etapa_lectiva"
                value={aprendiz.finalizacion_etapa_lectiva}
                onChange={actualizarState}
                required
              />
              <div className="datos-empresa">
                <h3 id="datos-emp">Datos de la empresa </h3>
                <p>(Si el aprendiz no cuenta con empresa coloque el número 0)</p>
                <label>Nit: <p className="rojo-label">*</p></label>
                <input
                min="0"
                  type="number"
                  name="empresa.nit"
                  value={aprendiz.empresa.nit}
                  onChange={actualizarState}
                  required
                />
                <label>Empresa: </label>
                <input
                  type="text"
                  name="empresa.razon_social"
                  value={aprendiz.empresa.razon_social}
                  onChange={actualizarState}
                />
                <label>Jefe inmediato:</label>
                <input
                  type="text"
                  name="empresa.nombre_jefe_inmediato"
                  value={aprendiz.empresa.nombre_jefe_inmediato}
                  onChange={actualizarState}
                />
                <label>Dirección:</label>
                <input
                  type="text"
                  name="empresa.direccion"
                  value={aprendiz.empresa.direccion}
                  onChange={actualizarState}
                />
                <label>Correo:</label>
                <input
                  type="email"
                  name="empresa.correo"
                  value={aprendiz.empresa.correo}
                  onChange={actualizarState}
                />
                <label>Teléfono:</label>
                <input
                 pattern="[0-9]*"
                min="0"
                  type="number"
                  name="empresa.telefono"
                  value={aprendiz.empresa.telefono}
                  onChange={actualizarState}
                />
                <div className="botones">
                  <button id="save">
                    {enviandoDatos ? (
                      <>
                        <Spinner animation="grow" size="sm" />
                        Enviando...
                      </>
                    ) : (
                      "Registrar"
                    )}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default FormularioInicial;
