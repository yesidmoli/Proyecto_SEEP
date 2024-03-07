import { Fragment, useState } from "react";
import './css/planeacionEP.css';
import { Link } from 'react-router-dom';


function PlaneacionEP() {
    const [formData, setFormData] = useState({
      actividades: '',
      EvidenciaDeAprendizaje: '',
      relaccionEvidencias: '',
      observaciones: '',
      firmaConformador: '',
      firmaAprendiz: '',
      firmaInstructor: ''
    });
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData(prevState => ({
        ...prevState,
        [name]: value
      }));
    };
  
    const guardarDatos = () => {
      console.log("Actividades: ", formData.actividades);
      console.log("Evidencia de Aprendizaje: ", formData.EvidenciaDeAprendizaje);
      console.log("Relación de Evidencias: ", formData.relaccionEvidencias);
      console.log("Observaciones: ", formData.observaciones);
      console.log("Firma del Conformador: ", formData.firmaConformador);
      console.log("Firma del Aprendiz: ", formData.firmaAprendiz);
      console.log("Firma del Instructor: ", formData.firmaInstructor);
  
      // Aquí podrías hacer lo que necesites con estos datos, por ejemplo, enviarlos a través de una solicitud AJAX a un servidor
      // También puedes agregar lógica adicional, como la validación de los campos antes de enviarlos
    };
  
  return (
    <Fragment>
     <div className="container_paneacionEP">
     <h1 className="h1-planeacion">2. PLANEACIÓN ETAPA PRODUCTIVA</h1>
     <h2 className="h2-planeacion">CONCRETACIÓN PLAN DE TRABAJO DURANTE LA ETAPA PRODUCTIVA DEL APRENDIZ</h2>

            <form id="planForm">
                <table>
                    <thead>
                        <tr>
                            <th>Actividades a Desarrollar <p>Relacione las actividades que el aprendiz va a realizar.
                            (Estas deben corresponder al perfil del egresado establecido por el programa de formación que el aprendiz está desarrollando).</p></th>
                            <th>Evidencia de Aprendizaje</th>
                            <th>Relación de Evidencias Lugar,Fecha</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><textarea id="actividades1" name="actividades" rows="4" required onChange={handleChange}></textarea></td>
                            <td><textarea id="EvidenciaDeAprendizaje1" name="EvidenciaDeAprendizaje" rows="2" required onChange={handleChange}></textarea></td>
                            <td><textarea id="relaccion-evidencias1" name="relaccionEvidencias" rows="2" required onChange={handleChange}></textarea></td>
                        </tr>
                        <tr id="Observaciones">
                            <th colSpan="3">Observaciones</th>
                        </tr>
                        <tr>
                            <td colSpan="3"><textarea id="observaciones" name="observaciones" rows="2" onChange={handleChange}></textarea></td> 
                        </tr>
                        <tr>
                          <td colSpan="3">
                            <table id="tablaFirmas">
                                <tbody>
                                  <tr>
                                      <th id="NombreFirmaConformador">Nombre y Firma del Ente Conformador</th>
                                      <th id="FirmaAprendiz">Firma del Aprendiz</th>
                                      <th id="NombreFirmaInstructor">Nombre y Firma Instructora de Seguimiento</th>
                                  </tr>
                                  <tr>
                                      <td><textarea id="firmaConformador" name="firmaConformador" rows="2" onChange={handleChange}></textarea></td>
                                      <td><textarea id="firmaAprendiz" name="firmaAprendiz" rows="2" onChange={handleChange}></textarea></td>
                                      <td><textarea id="firmaInstructor" name="firmaInstructor" rows="2" onChange={handleChange}></textarea></td> 
                                  </tr>
                                </tbody>
                            </table>
                          </td>
                        </tr>
                    </tbody>
                </table>
                <button type="button" id="guardar-planeacionep" onClick={guardarDatos}>Guardar</button>
            </form>
            <Link to="/seguimiento_EP" className="custom-button">Siguiente</Link>
        </div>
        </Fragment>
    )
}
export default PlaneacionEP;