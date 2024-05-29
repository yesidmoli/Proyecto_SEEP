import React, { useEffect, useState } from "react";
import clienteAxios from "../../config/axios";
import '../../css/documentos.css';
import { useAuth } from "../context/AuthContext";
import JSZip from 'jszip';
import Swal from "sweetalert2";
const VisualizarDocumentos = ({ documentos }) => {
    const [documentosConArchivo, setDocumentosConArchivo] = useState([]);

    useEffect(() => {
        const fetchDocumentosConArchivo = async () => {
            try {
                const documentosConArchivoTemp = await Promise.all(
                    documentos.map(async (documento) => {
                        try {
                            await clienteAxios.head(documento.archivo); // Realizamos una petición HEAD para verificar si el archivo existe
                            return documento;
                        } catch (error) {
                            // console.error('Error al verificar el archivo:', error);
                            return null; // Si hay un error, retornamos null
                        }
                    })
                );
                setDocumentosConArchivo(documentosConArchivoTemp.filter(doc => doc)); // Filtramos los documentos que no sean null
            } catch (error) {
                console.error('Error al obtener los documentos:', error);

            }
        };

        fetchDocumentosConArchivo();
    }, [documentos]);

    const comprimirArchivos = async () => {
        try {
            const zip = new JSZip();
            const archivosPromesas = documentosConArchivo.map(async documento => {
                const response = await clienteAxios.get(documento.archivo, {
                    responseType: 'arraybuffer'
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
            Swal.fire({
                icon: 'error',
                title: "Error al comprimir los archivos",
                text: "Intenta Nuevamente",
            });
        }
    };

    return (
        <div className="document-container">
            <h4>Documentación del Aprendiz</h4>
            <table id="documentTable" className="tabla-fichas">
                <thead className="thead">
                    <tr>
                        <th>Tipo Documental</th>
                        <th>Id</th>
                        <th>Descargar Archivo</th>
                    </tr>
                </thead>
                <tbody id="documentBody">
                    {documentosConArchivo.map((documento, index) => (
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
                <button onClick={comprimirArchivos}>Descargar ZIP</button>
            </div>
        </div>
    );
}

export default VisualizarDocumentos;
