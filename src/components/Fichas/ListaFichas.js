import React, { useState, useEffect } from "react";
import clienteAxios from "../../config/axios";
import FormularioFicha from "./FormularioFicha";

const ListaFichas = ({ editarFicha, eliminarFicha }) => {
  const [fichas, setFichas] = useState([]);
  const [formularioFichas, setFormularioFichas] = useState(false);
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
