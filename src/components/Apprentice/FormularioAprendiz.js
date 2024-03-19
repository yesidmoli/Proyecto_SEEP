// FormularioAprendiz.js
import React, { useState, useEffect } from "react";
import clienteAxios from "../../config/axios";
import Swal from "sweetalert2";
import "../layout/MainSection";
import "../layout/Header";

const FormularioAprendiz = () => {
  const initialState = {
    numero_ficha: "",
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
    estado_aprobacion: "",
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
    const { name, value } = e.target;
    if (name.includes("empresa.")) {
      // Si el campo pertenece a 'empresa', actualiza ese campo específico
      const empresaField = name.split("empresa.")[1];
      setAprendiz({
        ...aprendiz,
        empresa: {
          ...aprendiz.empresa,
          [empresaField]: value,
        },
      });
    } else {
      // Si no es un campo de 'empresa', actualiza directamente en el nivel superior
      setAprendiz({
        ...aprendiz,
        [name]: value,
      });
    }
  };

  const enviarDatos = async (e) => {
    e.preventDefault();
  

    try {
      if (modoEdicion) {
        // Actualizar aprendiz existente
        await clienteAxios.put(`api/aprendices/${idEditar}`, aprendiz);
        Swal.fire("¡Éxito!", "Aprendiz actualizado exitosamente", "success");
      } else {
        // Crear nuevo aprendiz
        await clienteAxios.post("/api/aprendices/", aprendiz);
        Swal.fire("¡Éxito!", "Aprendiz registrado exitosamente", "success");
      }

      // Actualizar la lista de aprendices
      const response = await clienteAxios.get("api/aprendices/");
      setAprendices(response.data);

      // Limpiar el formulario y restablecer el estado
      setAprendiz(initialState);
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

  return (
    <div className="main-container">
      <header id="header">Formulario inicio etapa productiva</header>

      <div className="container-uno">
        <h2>Datos del Aprendiz</h2>
        <div className="form">
          <form onSubmit={enviarDatos}>
            <label>Número de Ficha <p className="rojo-label">*</p></label>
            <input
              type="text"
              name="numero_ficha"
              value={aprendiz.numero_ficha}
              onChange={actualizarState}
              required
            />
            <label>Nombres <p className="rojo-label">*</p></label>
            <input
              type="text"
              name="nombres"
              value={aprendiz.nombres}
              onChange={actualizarState}
              required
            />
            <label>Apellidos <p className="rojo-label">*</p></label>
            <input
              type="text"
              name="apellidos"
              value={aprendiz.apellidos}
              onChange={actualizarState}
              required
            />
            <label>Tipo de Documento <p className="rojo-label">*</p></label>
            <input
              type="text"
              name="tipo_documento"
              value={aprendiz.tipo_documento}
              onChange={actualizarState}
              required
            />
            <label>Número de Documento <p className="rojo-label">*</p></label>
            <input
              type="text"
              name="numero_documento"
              value={aprendiz.numero_documento}
              onChange={actualizarState}
              required
            />
            <label>Fecha de Expedición <p className="rojo-label">*</p></label>
            <input
              id="fecha_exp"
              type="date"
              name="fecha_expedicion"
              value={aprendiz.fecha_expedicion}
              onChange={actualizarState}
              required
            />
            <label>Lugar de Expedición <p className="rojo-label">*</p></label>
            <input
              type="text"
              name="lugar_expedicion"
              value={aprendiz.lugar_expedicion}
              onChange={actualizarState}
              required
            />
            <label>Fecha de Nacimiento <p className="rojo-label">*</p></label>
            <input
              id="fecha-nac"
              type="date"
              name="fecha_nacimiento"
              value={aprendiz.fecha_nacimiento}
              onChange={actualizarState}
              required
            />
            <label>Sexo <p className="rojo-label">*</p></label>
            <input
              type="text"
              name="sexo"
              value={aprendiz.sexo}
              onChange={actualizarState}
              required
            />
            <label>Dirección Domicilio <p className="rojo-label">*</p></label>
            <input
              type="text"
              name="direccion_domicilio"
              value={aprendiz.direccion_domicilio}
              onChange={actualizarState}
              required
            />
            <label>Municipio <p className="rojo-label">*</p></label>
            <input
              type="text"
              name="municipio"
              value={aprendiz.municipio}
              onChange={actualizarState}
              required
            />
            <label>Departamento <p className="rojo-label">*</p></label>
            <input
              type="text"
              name="departamento"
              value={aprendiz.departamento}
              onChange={actualizarState}
              required
            />
            <label>Número de Celular 1 <p className="rojo-label">*</p></label>
            <input
              type="text"
              name="numero_celular1"
              value={aprendiz.numero_celular1}
              onChange={actualizarState}
              required
            />
            <label>Número de Celular 2:</label>
            <input
              type="text"
              name="numero_celular2"
              value={aprendiz.numero_celular2}
              onChange={actualizarState}
            />
            <label>Teléfono Fijo:</label>
            <input
              type="text"
              name="telefono_fijo"
              value={aprendiz.telefono_fijo}
              onChange={actualizarState}
            />
            <label>Correo Principal <p className="rojo-label">*</p></label>
            <input
              type="text"
              name="correo_principal"
              value={aprendiz.correo_principal}
              onChange={actualizarState}
              required
            />
            <label>Correo Secundario:</label>
            <input
              type="text"
              name="correo_secundario"
              value={aprendiz.correo_secundario}
              onChange={actualizarState}
            />
            <label>Finalización Lectiva <p className="rojo-label">*</p></label>
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
            placeholder="Pendiente"
              type="text"
              name="estado_aprobacion"
              value={aprendiz.estado_aprobacion}
              onChange={actualizarState}
              required
            /> */}
            <div className="datos-empresa">
              <h3 id="datos-emp">Datos de la empresa</h3>
              <label>Nit <p className="rojo-label">*</p></label>
              <input
                type="text"
                name="empresa.nit"
                value={aprendiz.empresa.nit}
                onChange={actualizarState}
                required
              ></input>
              <label>Empresa </label>
              <input
                type="text"
                name="empresa.razon_social"
                value={aprendiz.empresa.razon_social}
                onChange={actualizarState}
                required
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
                type="text"
                name="empresa.correo"
                value={aprendiz.empresa.correo}
                onChange={actualizarState}
              ></input>
              <label>Telefono</label>
              <input
                type="text"
                name="empresa.telefono"
                value={aprendiz.empresa.telefono}
                onChange={actualizarState}
              ></input>
              <div className="btn-save">
                <button type="submit" id="save">             
                Registrar
              </button>
              </div>
            </div>
          </form>
        </div>

        {/* <section id="listado-fichas" className="List-fichas">
          <h2>Listado de Aprendices Registrados</h2>
          <ul className="lista-fichas">
            {Array.isArray(aprendices) &&
              aprendices.map((a) => (
                <li key={a._id}>
                  {a.nombres} - {a.apellidos} - {a.tipo_documento} -{" "}
                  {a.numero_documento}
                  <div className="btns-crud">
                    <button
                      className="btn-editar"
                      onClick={() => editarAprendiz(a._id)}
                    >
                      Editar
                    </button>
                    <button
                      className="btn-delete"
                      onClick={() => eliminarAprendiz(a._id)}
                    >
                      Eliminar
                    </button>
                  </div>
                </li>
              ))}
          </ul>
        </section> */}
      </div>
    </div>
  );
};

export default FormularioAprendiz;
