import React from "react";
import '../../css/bitacoras.css';
import VisualizarDocumentos from "./VisualizarDocumentos";
import { useState } from "react";


const Bitacoras = () => {
    const [seleccion, setSeleccion] = useState('');
    const [mostrarCampoAdicional, setMostrarCampoAdicional] = useState(false);
    const [mostrarDocumentos, setMostrarDocumentos] = useState(false);

    const opciones = ['Bitacoras', 'Documento de identidad'];

    const handleSeleccion = (e) => {
        const nuevaSeleccion = e.target.value;
        setSeleccion(nuevaSeleccion);

        // Determina si se debe mostrar el campo adicional
        setMostrarCampoAdicional(nuevaSeleccion === 'Bitacoras');
        

    }
    const handleCargarDocumentos = () => {
      // Actualiza el estado para mostrar el componente de VisualizarDocumentos
      setMostrarDocumentos(true);
    }
  
    if (mostrarDocumentos) {
      // Si mostrarDocumentos es verdadero, renderiza el componente VisualizarDocumentos
      return <VisualizarDocumentos />;
    }
    
  
    return (
      <div class="container">
      <h2>Subir Documentación</h2>
      <form id="uploadForm" action="#" onsubmit="return uploadDocument()">
        <label for="title">Tipo de documento:</label>
        <select value={seleccion} onChange={handleSeleccion}>
        <option value="">Seleccione una opción</option>
        {opciones.map((opcion) => (
          <option key={opcion} value={opcion}>
            {opcion}
          </option>
        ))}
      </select>
      {mostrarCampoAdicional && (
        <div>
            <label>Seleccione el número de bitácora</label>
          <select>
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
            <option>6</option>
            <option>7</option>
            <option>8</option>
            <option>9</option>
            <option>10</option>
            <option>11</option>
            <option>12</option>
          </select>
        <a href="../../files/formato-bitacora.xlsx" download="formato-bitacora.xlsx">Descargar</a>

        </div>
      )}
        <label for="file">Archivo adjunto:</label>
        <input type="file" id="file" name="file" required/>
        <label for="date">Fecha:</label>
        <input type="date" id="date" name="date" required/>
        <div className="buttons">
        <button id="subir" type="submit">Subir</button>
        <button id="cargar" onClick={handleCargarDocumentos}>Documentos cargados</button>
        </div>
        </form>
    </div>
    )
  };

export default Bitacoras;