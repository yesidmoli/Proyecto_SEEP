import React, { Fragment, useEffect, useState } from "react";
import '../../css/documentos.css';
import VisualizarDocumentos from "./VisualizarDocumentos";
import Header from "../layout/Header";
import MainSection from "../layout/MainSection";
import Swal from "sweetalert2";
import clienteAxios from "../../config/axios";
import Apps from "../layout/menu/App";
import { useAuth } from "../context/AuthContext";

const Documentos = (props) => {

    const {id} = props.match.params;

    const {token} = useAuth()
    
    const [seleccion, setSeleccion] = useState('');
    const [mostrarCampoAdicional, setMostrarCampoAdicional] = useState(false);
    const [mostrarDocumentos, setMostrarDocumentos] = useState(false);
    const [datosForm, setDatosForm] = useState({
        "tipo_documento": '',
        "archivo": '',
        "is_bitacora": false,
        "aprendiz": id
    });
    const [documentos, setDocumentos] = useState([]);
    const opciones = ['Bitácora', 'Documento de identidad', 'Carta Laboral', 'Certificado Agencia Publica', 'Carnet Destruido', 'Prubas TyT'];
    const handleSeleccion = (e) => {
        const nuevaSeleccion = e.target.value;
        setSeleccion(nuevaSeleccion);

        // Determina si se debe mostrar el campo adicional
        setMostrarCampoAdicional(nuevaSeleccion === 'Bitácora');
        // Actualizar el estado de datosForm si no es una bitácora
        if (nuevaSeleccion !== 'Bitácora') {
          setDatosForm(prevState => ({
              ...prevState,
              tipo_documento: nuevaSeleccion
          }));
  }
    }

    const handleSeleccionBitacora = (event) => {
        const bitacoraSeleccionada = event.target.value;
        setDatosForm(prevState => ({
            ...prevState,
            tipo_documento: bitacoraSeleccionada,
            is_bitacora: true,
            
            bitacora: bitacoraSeleccionada
            
        }));
    };

    const handleSeleccionArchivo = (event) => {
      const archivo = event.target.files[0];
      setDatosForm(prevState => ({
          ...prevState,
          archivo: archivo
      }));
  };
  

    const handleCargarDocumentos = async () => {
      try {
          const response = await clienteAxios.post('api/documentacion-aprendiz/', datosForm, {
              headers: {
                  'Content-Type':  'multipart/form-data' 
              }
          });
  
          // Manejar la respuesta de la API
          console.log('Documento cargado con éxito:', response.data);
          Swal.fire('¡Éxito!', 'Registro Exitoso.', 'success');
          setMostrarDocumentos(true);

          fetchDocumentos();
  
          // // Actualizar el estado para mostrar el componente de VisualizarDocumentos
          // setMostrarDocumentos(true);
      } catch (error) {
          // Manejar errores
          console.error('Error al cargar el documento:', error);

          if (error.response && error.response.data.archivo) {
            // Si hay un mensaje de error específico sobre el archivo, muestra ese mensaje
            const errorMessage = error.response.data.archivo[0];
            Swal.fire('Error', errorMessage, 'error');
        } else {
            // Si no hay un mensaje específico, muestra un mensaje genérico de error
            Swal.fire('Error', 'Error al cargar el documento. Revise que no hayan campos vacios', 'error');
        }
      }
  }


   
        const fetchDocumentos = async () => {
            try {
              
                // Realizar la solicitud GET a la API con Axios, incluyendo el parámetro aprendiz_id y el token
                const response = await clienteAxios.get(`api/documentacion-aprendiz/?aprendiz_id=${id}`, {
                    headers: {
                        Authorization: `Token ${token}`
                    }
                });

                setDocumentos(response.data);
            } catch (error) {
                console.error("Error al obtener los documentos:", error);
            }
        };

        
   
    useEffect(() => {
        fetchDocumentos();
    }, [id]);
    
    return (
        <Fragment>
          <Apps />
            <Header />
            <div className="container cont-doc">
                <MainSection />
                <section className="document-container">
                    <h4>Cargue de Documentos</h4>

                    <form id="uploadForm"  encType="multipart/form-data">
                        <div className="input-doc">
                            <label htmlFor="title">Tipo Documental:</label>
                            <select value={seleccion} onChange={handleSeleccion}>
                                <option value="">Seleccione una opción</option>
                                {opciones.map((opcion) => (
                                    <option key={opcion} value={opcion}>
                                        {opcion}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {mostrarCampoAdicional && (
                            <div>
                                <label>Seleccione el número de bitácora</label>
                                <select value={datosForm.bitacora || ''} onChange={handleSeleccionBitacora}>
                                    <option value="">Seleccione una opción</option>
                                    <option value="Bitácora 1"> Bitácora 1</option>
                                    <option value="Bitácora 2"> Bitácora 2</option>
                                    <option value="Bitácora 3"> Bitácora 3</option>
                                    <option value="Bitácora 4"> Bitácora 4</option>
                                    <option value="Bitácora 5">Bitácora 5</option>
                                    <option value="Bitácora 6">Bitácora 6</option>
                                    <option value="Bitácora 7">Bitácora 7</option>
                                    <option value="Bitácora 8">Bitácora 8</option>
                                    <option value="Bitácora 9">Bitácora 9</option>
                                    <option value="Bitácora 10">Bitácora 10</option>
                                    <option value="Bitácora 11">Bitácora 11</option>
                                    <option value="Bitácora 12">Bitácora 12</option>
                                </select>
                                <a href="../../files/formato-bitacora.xlsx" download="formato-bitacora.xlsx">Descargar</a>
                            </div>
                        )}
                        <div className="input-doc">
                            <label htmlFor="file">Cargue Documento:</label>
                            <input className="file" type="file" id="file" name="file" required onChange={handleSeleccionArchivo} />
                        </div>
                        <div className="buttons">
                            <button id="subir" type="button" onClick={handleCargarDocumentos}>Cargar</button>
                        </div>
                    </form>
                </section>
                <VisualizarDocumentos documentos={documentos} />
            </div>
        </Fragment>
    )
};

export default Documentos;
