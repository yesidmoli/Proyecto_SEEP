// FormularioAprendiz.js
import React, { useState, useEffect } from "react";
import clienteAxios from "../../config/axios";
import Swal from "sweetalert2";
import "../layout/MainSection";
import "../layout/Header";
import Spinner from 'react-bootstrap/Spinner';
import FichaSelector from "../Fichas/FichaSelector";

const FormularioAprendiz = () => {

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
  const [idEditar, setIdEditar] = useState(null);

  const [enviandoDatos, setEnviandoDatos] = useState(false);

  

  useEffect(() => {
    const obtenerAprendices = async () => {
      try {
        const consultarApi = await clienteAxios.get("api/aprendices/");
        setAprendices(consultarApi.data);
      } catch (error) {
       
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
        // Crear nuevo aprendiz
        await clienteAxios.post("/api/aprendices/", aprendiz);
        Swal.fire("¡Éxito!", "Aprendiz registrado exitosamente", "success");
        setEnviandoDatos(false);
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

        setEnviandoDatos(false);
      } else {
        let errorMessage = "Se produjo un error al guardar:";
          if (error.response && error.response.data && error.response.data.error) {
            errorMessage += `\n- ${error.response.data.error}`;
          } else if (error.response && error.response.data && Array.isArray(error.response.data)) {
            errorMessage += error.response.data.map((error) => `\n- ${error}`).join('');
          } else {
            errorMessage += "\n- Ha ocurrido un error inesperado.";
          }
          Swal.fire("Error", errorMessage, "error");
        setEnviandoDatos(false);
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
        
        Swal.fire("¡Error!", "Hubo un error al procesar la solicitud", "error");
      }
    }
  };
  const FichaSeleccionada = (fichaId) => {
    setFichaSeleccionada(fichaId);
    setAprendiz({
      ...aprendiz,
      numero_ficha: fichaId,
    });
  };

  return (
    <div className="main-container">
      <header id="header">Formulario inicio etapa productiva</header>

      <div className="container cont-fichas  " >

        <div className="container-uno">
          <h2>Datos del Aprendiz</h2>
          <div className="form">
            <form onSubmit={enviarDatos}>
              <label>Número de Ficha: <p className="rojo-label">*</p></label>
              {/* <input
              min="0"
                type="number"
                name="numero_ficha"
                value={aprendiz.numero_ficha}
                onChange={actualizarState}
                required
              /> */}
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
                {/* <option value="PEP">Permiso Especial de Permanencia</option>
        <option value="RC">Registro Civil</option> */}
              </select>
              {/* <input
        type="text"
        name="tipo_documento"
        value={aprendiz.tipo_documento}
        onChange={actualizarState}
        required
      /> */}
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
                <option value="" disabled> Seleccione el sexo</option>
                <option value="Masculino" >Masculino</option>
                <option value="Femenino" >Femenino</option>
                <option value="No binario">No binario</option>

              </select>
              {/* <input
        type="text"
        name="sexo"
        value={aprendiz.sexo}
        onChange={actualizarState}
        required
      /> */}
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
              {/* <label>Estado de Aprobación:</label>
        <input
        placeholder="pediente"
          type="text"
          name="estado_aprobacion"
          value={aprendiz.estado_aprobacion}
          onChange={actualizarState}
          required
        /> */}
              <div className="datos-empresa">
                <h3 id="datos-emp">Datos de la empresa </h3>
                <p>(Si el aprendiz no cuenta con empresa coloque el numero 0)</p>
                <label>Nit: <p className="rojo-label">*</p></label>
                <input
                min="0"
                  type="number"
                  name="empresa.nit"
                  value={aprendiz.empresa.nit}
                  onChange={actualizarState}
                  required
                ></input>
                <label>Empresa: </label>
                <input
                  type="text"
                  name="empresa.razon_social"
                  value={aprendiz.empresa.razon_social}
                  onChange={actualizarState}
                ></input>
                <label>Jefe inmediato:</label>
                <input
                  type="text"
                  name="empresa.nombre_jefe_inmediato"
                  value={aprendiz.empresa.nombre_jefe_inmediato}
                  onChange={actualizarState}
                ></input>
                <label>Dirección:</label>
                <input
                  type="text"
                  name="empresa.direccion"
                  value={aprendiz.empresa.direccion}
                  onChange={actualizarState}
                ></input>
                <label>Correo:</label>
                <input
                  type="email"
                  name="empresa.correo"
                  value={aprendiz.empresa.correo}
                  onChange={actualizarState}
                ></input>
                <label>Telefono</label>
                <input
                min="0"
                  type="number"
                  name="empresa.telefono"
                  value={aprendiz.empresa.telefono}
                  onChange={actualizarState}
                ></input>
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
    </div>
  );
};

export default FormularioAprendiz;
