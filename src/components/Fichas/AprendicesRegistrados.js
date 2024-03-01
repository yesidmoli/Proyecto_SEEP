import React, { useState, useEffect } from "react";
import clienteAxios from "../../config/axios";
import FormularioInicial from "./FormularioInicial";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const AprendicesRegistrados = ({ editarAprendiz, eliminarAprendiz }) => {
  const [aprendices, setAprendices] = useState([]);
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
  const listaAprendices = Array.isArray(aprendices.results)
    ? aprendices.results
    : [];

  const [formularioAprendiz, setFormularioAprendiz] = useState(false);

  const handleFormularioAprendiz = () => {
    setFormularioAprendiz(true);
  };
  if (formularioAprendiz) {
    return <FormularioInicial />;
  }
  return (
    <div className="container-reg">
      <header id="header">Lista de aprendices registrados</header>
      <div className="tabla-uno">
        <h1>Aprendices Registrados</h1>
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
            {listaAprendices.map((aprendiz) => (
              <tr key={aprendiz.id}>
                <td>{aprendiz.nombres}</td>
                <td>{aprendiz.apellidos}</td>
                <td>{aprendiz.numero_documento}</td>
                <td>{aprendiz.ficha.numero_ficha}</td>
                <td className="buttons-opciones">
                  <button onClick={() => editarAprendiz(aprendiz.id)}>
                    Editar
                  </button>
                  <button onClick={() => eliminarAprendiz(aprendiz.id)}>
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
            <tr className="btn-regr">
              <td colSpan="5">
                <button id="regresar" onClick={handleFormularioAprendiz}>
                  Regresar
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default AprendicesRegistrados;
