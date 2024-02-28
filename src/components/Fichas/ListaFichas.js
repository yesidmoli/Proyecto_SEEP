import React, { useState, useEffect } from "react";
import clienteAxios from "../../config/axios";
import FormularioFicha from "./FormularioFicha";

const ListaFichas = ({ editarFicha, eliminarFicha }) => {
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

    obtenerFichas();
  }, []);
  const listaFichas = Array.isArray(fichas.results)
    ? fichas.results
    : [];
  return (
    <div className="lista-fichas">
      <header className="encabezado-fichas">Fichas registradas</header>
      <div className="contenedor-fichas">
        <h3>Lista de Fichas</h3>
        {listaFichas.map((fichas) => (
        <ul key={fichas.id}>
          <li>{fichas.numero_ficha}</li>
          <li>{fichas.nombre_programa}</li>
          <li>{fichas.nivel_formacion}</li>
          <li>{fichas.horario_formacion}</li>
          <div className='btns-crud'>
            <button className='btn-editar' onClick={() => editarFicha(fichas._id)}>Editar</button>
            <button className='btn-delete' onClick={() => eliminarFicha(fichas._id)}>Eliminar</button>
            </div>
        </ul>
        
        ))}
      </div>
    </div>
  );
};
export default ListaFichas;
