import React, { Fragment, useState } from 'react';
import './css/evaluacionEP.css';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import SignaturePad from 'react-signature-canvas';

function EvaluacionEP() {
    const [formData, setFormData] = useState({
        juicio: 'seleccionar',
        reconocimientos: 'seleccionar',
        observaciones: '',
        firmaConformador: '',
        firmaAprendiz: '',
        firmaInstructor: '',
        fechaElaboracion: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const guardarDatos = () => {
        console.log("Juicio de Elaboración: ", formData.juicio);
        console.log("Reconocimientos Especiales del Desempeño: ", formData.reconocimientos);
        console.log("Observaciones Especificadas: ", formData.observaciones);
        console.log("Firma del Conformador: ", formData.firmaConformador);
        console.log("Firma del Aprendiz: ", formData.firmaAprendiz);
        console.log("Firma del Instructor: ", formData.firmaInstructor);
        console.log("Fecha de Elaboración: ", formData.fechaElaboracion);
        // Aquí puedes realizar acciones adicionales, como enviar los datos a través de una solicitud AJAX
    };

    return (
        <Fragment>
            <div className="container_evaluacionEP">
                <h2 className="h2-evaluacion">Observaciones del Aprendiz:</h2>
                <div className="module">
                    <h1 className="h1-evaluacion">4. EVALUACIÓN ETAPA PRODUCTIVA</h1>
                    <table>
                        <thead>
                            <tr>
                                <th>JUICIO DE ELABORACIÓN:</th>
                                <td>
                                    <select name="juicio" value={formData.juicio} onChange={handleChange} required>
                                        <option key="seleccionar" value="seleccionar">seleccionar</option>
                                        <option key="aprobado" value="aprobado">APROBADO</option>
                                        <option key="no_aprobado" value="no aprobado">NO APROBADO</option>
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <th>RECONOCIMIENTOS ESPECIALES DEL DESEMPEÑO:</th>
                                <td>
                                    <select name="reconocimientos" value={formData.reconocimientos} onChange={handleChange} required>
                                        <option key="seleccionar" value="seleccionar">seleccionar</option>
                                        <option key="si" value="si">SI</option>
                                        <option key="no" value="no">NO</option>
                                    </select>
                                </td>
                            </tr>
                            <tr id="Observaciones">
                                <th colSpan="2">Especificar cuáles:</th>
                            </tr>
                            <tr>
                                <td colSpan="2"><textarea name="observaciones" rows="2" value={formData.observaciones} onChange={handleChange}></textarea></td>
                            </tr>
                            <tr>
                                <th>Ciudad y fecha de elaboración:</th>
                                <td><input type="date" name="fechaElaboracion" value={formData.fechaElaboracion} onChange={handleChange} /></td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td colSpan="2">
                                    <button type="button" id="guardar-evaluacionep" onClick={guardarDatos}>Guardar</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <table id="tablaFirmas">
                        <tbody>
                            <tr>
                                <th>Nombre y Firma del Ente Conformador</th>
                                <th>Firma del Aprendiz</th>
                                <th>Nombre y Firma Instructora de Seguimiento</th>
                            </tr>
                            <tr>
                                <td><textarea name="firmaConformador" rows="2" value={formData.firmaConformador} onChange={handleChange}></textarea></td>
                                <td><textarea name="firmaAprendiz" rows="2" value={formData.firmaAprendiz} onChange={handleChange}></textarea></td>
                                <td><textarea name="firmaInstructor" rows="2" value={formData.firmaInstructor} onChange={handleChange}></textarea></td>
                            </tr>
                            <tr>
                                <td colSpan="3">
                                    <Popup modal trigger={<button>Firma aquí</button>}>
                                        {close => (
                                            <div>
                                                <SignaturePad />
                                                <button onClick={close}>Cerrar</button>
                                            </div>
                                        )}
                                    </Popup>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </Fragment>
    );
}

export default EvaluacionEP;
