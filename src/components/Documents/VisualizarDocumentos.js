import React, { useEffect, useState } from "react";
import clienteAxios from "../../config/axios";
import '../../css/documentos.css';
import { useAuth } from "../context/AuthContext";
import JSZip from 'jszip';
const VisualizarDocumentos = ({ id_aprendiz }) => {
    const [documentos, setDocumentos] = useState([]);

    const {token} = useAuth()
    useEffect(() => {
        const fetchDocumentos = async () => {
            try {
              
                // Realizar la solicitud GET a la API con Axios, incluyendo el parámetro aprendiz_id y el token
                const response = await clienteAxios.get(`api/documentacion-aprendiz/?aprendiz_id=${id_aprendiz}`, {
                    headers: {
                        Authorization: `Token ${token}`
                    }
                });

                setDocumentos(response.data);
            } catch (error) {
                console.error("Error al obtener los documentos:", error);
            }
        };

        fetchDocumentos();
    }, [id_aprendiz]);

    const comprimirArchivos = async () => {
      try {
          const zip = new JSZip();
          const archivosPromesas = documentos.map(async documento => {
              const response = await clienteAxios.get(documento.archivo, {
                  responseType: 'arraybuffer' // Indicamos que la respuesta debe ser tratada como un array de bytes
              });
              zip.file(documento.tipo_documento, response.data);
          });

          await Promise.all(archivosPromesas);

          const contenidoZip = await zip.generateAsync({ type: 'blob' });

          const url = window.URL.createObjectURL(contenidoZip);
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', 'archivos_comprimidos.zip');
          document.body.appendChild(link);
          link.click();

          link.parentNode.removeChild(link);
          window.URL.revokeObjectURL(url);
      } catch (error) {
          console.error('Error al comprimir archivos:', error);
      }
  };


    return (
        <div class="document-container">
            <h4>Documentación del Aprendiz</h4>
            <table id="documentTable">
                <thead className="thead">
                    <tr>
                        <th>Tipo Documental</th>
                        <th>Identificador Documento</th>
                        <th>Descargar Archivo</th>
                    </tr>
                </thead>
                <tbody id="documentBody">
                    {documentos.map((documento, index) => (
                        <tr key={index}>
                            <td>{documento.tipo_documento}</td>
                            <td>{documento.id}</td>
                            <td>
                                <a href={documento.archivo} download>{documento.tipo_documento}</a>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="button btn-2">
                <button onClick={comprimirArchivos}>Descargar ZiP</button>
            </div>
            {/* <div className="button">
                <button id="regresar">Regresar</button>
            </div> */}
        </div>
    );
}

export default VisualizarDocumentos;
