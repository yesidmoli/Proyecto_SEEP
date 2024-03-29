// import React, { Fragment, useState } from 'react';
// import './css/evaluacionEP.css';
// import Popup from 'reactjs-popup';
// import 'reactjs-popup/dist/index.css';
// import SignaturePad from 'react-signature-canvas';

// function EvaluacionEP() {
//     const [formData, setFormData] = useState({
//         juicio: 'seleccionar',
//         reconocimientos: 'seleccionar',
//         observaciones: '',
//         firmaConformador: '',
//         firmaAprendiz: '',
//         firmaInstructor: '',
//         fechaElaboracion: ''
//     });

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData(prevState => ({
//             ...prevState,
//             [name]: value
//         }));
//     };

//     const guardarDatos = () => {
//         console.log("Juicio de Elaboración: ", formData.juicio);
//         console.log("Reconocimientos Especiales del Desempeño: ", formData.reconocimientos);
//         console.log("Observaciones Especificadas: ", formData.observaciones);
//         console.log("Firma del Conformador: ", formData.firmaConformador);
//         console.log("Firma del Aprendiz: ", formData.firmaAprendiz);
//         console.log("Firma del Instructor: ", formData.firmaInstructor);
//         console.log("Fecha de Elaboración: ", formData.fechaElaboracion);
//         // Aquí puedes realizar acciones adicionales, como enviar los datos a través de una solicitud AJAX
//     };

//     return (
//         <Fragment>
//             <div className="container_evaluacionEP">
//                 <h2 className="h2-evaluacion">Observaciones del Aprendiz:</h2>
//                 <div className="module">
//                     <h1 className="h1-evaluacion">4. EVALUACIÓN ETAPA PRODUCTIVA</h1>
//                     <table>
//                         <thead>
//                             <tr>
//                                 <th>JUICIO DE ELABORACIÓN:</th>
//                                 <td>
//                                     <select name="juicio" value={formData.juicio} onChange={handleChange} required>
//                                         <option key="seleccionar" value="seleccionar">seleccionar</option>
//                                         <option key="aprobado" value="aprobado">APROBADO</option>
//                                         <option key="no_aprobado" value="no aprobado">NO APROBADO</option>
//                                     </select>
//                                 </td>
//                             </tr>
//                             <tr>
//                                 <th>RECONOCIMIENTOS ESPECIALES DEL DESEMPEÑO:</th>
//                                 <td>
//                                     <select name="reconocimientos" value={formData.reconocimientos} onChange={handleChange} required>
//                                         <option key="seleccionar" value="seleccionar">seleccionar</option>
//                                         <option key="si" value="si">SI</option>
//                                         <option key="no" value="no">NO</option>
//                                     </select>
//                                 </td>
//                             </tr>
//                             <tr id="Observaciones">
//                                 <th colSpan="2">Especificar cuáles:</th>
//                             </tr>
//                             <tr>
//                                 <td colSpan="2"><textarea name="observaciones" rows="2" value={formData.observaciones} onChange={handleChange}></textarea></td>
//                             </tr>
//                             <tr>
//                                 <th>Ciudad y fecha de elaboración:</th>
//                                 <td><input type="date" name="fechaElaboracion" value={formData.fechaElaboracion} onChange={handleChange} /></td>
//                             </tr>
//                         </thead>

//                     </table>
//                     <table id="tablaFirmas">
//                         <tbody>
//                             <tr>
//                                 <th>Nombre y Firma del Ente Conformador</th>
//                                 <th>Firma del Aprendiz</th>
//                                 <th>Nombre y Firma Instructora de Seguimiento</th>
//                             </tr>
//                             <tr>
//                                 <td><textarea name="firmaConformador" rows="2" value={formData.firmaConformador} onChange={handleChange}></textarea></td>
//                                 <td><textarea name="firmaAprendiz" rows="2" value={formData.firmaAprendiz} onChange={handleChange}></textarea></td>
//                                 <td><textarea name="firmaInstructor" rows="2" value={formData.firmaInstructor} onChange={handleChange}></textarea></td>
//                             </tr>
//                             {/* <tr>
//                                 <td colSpan="3">
//                                     <Popup modal trigger={<button>Firma aquí</button>}>
//                                         {close => (
//                                             <div>
//                                                 <SignaturePad />
//                                                 <button onClick={close}>Cerrar</button>
//                                             </div>
//                                         )}
//                                     </Popup>
//                                 </td>
//                             </tr> */}
//                         </tbody>
//                         <tbody>
//                             <tr>
//                                 <td colSpan="2">
//                                     <button type="button" id="guardar-evaluacionep" onClick={guardarDatos}>Guardar</button>
//                                 </td>
//                             </tr>
//                         </tbody>
//                     </table>
//                 </div>
//             </div>
//         </Fragment>
//     );
// }

// export default EvaluacionEP;
import React, { Fragment, useEffect, useState } from 'react';
import './css/evaluacionEP.css';
import 'reactjs-popup/dist/index.css';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import SignatureCanvas from "react-signature-canvas";
import { useFormContext } from './FormProvide';



function EvaluacionEP({ goToNextComponent, data }) {

    const { formData: { evaluacion: contextFormData }, updateFormData } = useFormContext();// Renombramos el formData del contexto para evitar conflictos

    const [formData, setFormData] = useState({
        juicio_evaluacion: '',
        reconocimientos_especiales: '',
        reconocimientos: '',
        observaciones: '',
        nombre_enteconformador: "",
        firma_enteconformador: "",
        firma_aprendiz: "",
        nombre_instructor: "",
        firma_instructor: ""
    });

    console.log("datos evaluacion", formData)


    useEffect(() => {
        if (contextFormData) {

            setFormData(contextFormData);
        }
        // Actualizamos el estado local con los datos del contexto
    }, [contextFormData]);


    const [signatureRef, setSignatureRef] = useState(null);
    const [aprendizRef, setAprendizSignatureRef] = useState(null);
    const [instructorRef, setInstructorSignatureRef] = useState(null);

    const clearSignature = (ref) => {
        ref.clear();

    };

    const saveSignature = (ref, fieldName) => {
        const signatureImage = ref.getTrimmedCanvas().toDataURL("image/png");
        // console.log("Signature Image:", signatureImage);
        setFormData((prevState) => ({ ...prevState, [fieldName]: signatureImage }));
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };


    const handleAgregarReconocimiento = () => {
        if (formData.nuevoReconocimiento.trim() !== "") {
            setFormData(prevState => ({
                ...prevState,
                reconocimientos_detalle: prevState.reconocimientos_detalle ? prevState.reconocimientos_detalle + '-' + formData.nuevoReconocimiento : formData.nuevoReconocimiento,
                nuevoReconocimiento: ''
            }));
        }
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            handleAgregarReconocimiento();
        }
    };

    const guardarDatos = () => {

        goToNextComponent(formData)
        updateFormData('evaluacion', formData)


    };
    const handleEliminarReconocimiento = (index) => {
        const reconocimientosArray = formData.reconocimientos_detalle.split('-');
        reconocimientosArray.splice(index, 1);
        setFormData(prevState => ({
            ...prevState,
            reconocimientos_detalle: reconocimientosArray.join('-')
        }));
    };

    return (
        <Fragment>
            <div className="container container_evaluacionEP">

                <div className="module">
                    <h1 className="h1-evaluacion">4. EVALUACIÓN ETAPA PRODUCTIVA</h1>
                    <table>
                        <thead>
                            <tr>
                                <th>JUICIO DE ELABORACIÓN:</th>
                                <td>
                                    <select name="juicio_evaluacion" value={formData.juicio_evaluacion} onChange={handleChange} required>
                                        <option key="seleccionar" value="seleccionar">seleccionar</option>
                                        <option key="aprobado" value="aprobado">APROBADO</option>
                                        <option key="no_aprobado" value="no aprobado">NO APROBADO</option>
                                    </select>
                                </td>
                            </tr>


                            <tr>
                                <th>RECONOCIMIENTOS ESPECIALES SOBRE EL  DESEMPEÑO:</th>
                                <td>
                                    <select name="reconocimientos_especiales" value={formData.reconocimientos_especiales} onChange={handleChange} required>
                                        <option key="seleccionar" value="seleccionar">seleccionar</option>
                                        <option key="si" value="true">SI</option>
                                        <option key="no" value="false">NO</option>
                                    </select>
                                </td>
                            </tr>



                            <tr>
                                <td>Especificar cuáles :</td>
                            </tr>
                            <td>
                                <input
                                    type="text"
                                    value={formData.nuevoReconocimiento}
                                    onChange={handleChange}
                                    name="nuevoReconocimiento"
                                />
                                <button onClick={handleAgregarReconocimiento}>Añadir Reconocimiento</button>
                            </td>

                            {formData.reconocimientos_detalle && (
                                <tr>
                                    <td colSpan="2">
                                        <strong>Reconocimientos:</strong>
                                        <ul>
                                            {formData.reconocimientos_detalle.split('-').map((reconocimiento, index) => (
                                                <li className='reconocimientos-lista' key={index}>{reconocimiento}
                                                    <td>
                                                        <button onClick={() => handleEliminarReconocimiento(index)}>Eliminar</button>
                                                    </td>
                                                </li>
                                            ))}

                                        </ul>

                                    </td>
                                </tr>
                            )}
                            {/* <tr>
                                <th>Ciudad y fecha de elaboración:</th>
                                <td><input type="date" name="fechaElaboracion" value={formData.fechaElaboracion} onChange={handleChange} /></td>
                            </tr> */}
                        </thead>

                    </table>
                    <div className="camp-firma">
                        <div className="nombre-ente">
                            <label> <h5>Nombre y firma del ente Conformador</h5></label>
                            <input placeholder="Nombre ente conformador" name="nombre_enteconformador" className="input-planeacion" value={formData.nombre_enteconformador} onChange={handleChange}></input>
                        </div>

                        <div className="campo-firma-planeacion">

                            <section className="img-signature">
                                {formData.firma_enteconformador ? (
                                    <img
                                        src={formData.firma_enteconformador}
                                        alt="Firma del Ente Conformador"
                                        style={{
                                            display: "block",
                                            margin: "0 auto",

                                            width: "100%",
                                            height: "100%"
                                        }}
                                    />
                                ) : null}
                            </section>

                            <Popup trigger={<button type="button">Firmar</button>} modal>
                                {(close) => (
                                    <div className="popup campo-firma">
                                        <section className="head-signature">
                                            <button className="close" onClick={close}>
                                                &times;
                                            </button>

                                            <h2>Firma ente Conformador</h2>
                                            <i class="bi bi-trash3-fill" onClick={() => clearSignature(signatureRef)}></i>
                                        </section>

                                        <SignatureCanvas
                                            penColor="black"
                                            canvasProps={{ width: 590, height: 246, className: "signature-canvas" }}
                                            ref={(ref) => setSignatureRef(ref)}
                                            minWidth={1}
                                            maxWidth={1}
                                            velocityFilterWeight={0.1}
                                        />

                                        <div className="btn-guardar-firma">
                                            <button className="btn btn-success " onClick={() => { saveSignature(signatureRef, "firma_enteconformador"); close(); }}>
                                                Guardar Firma
                                            </button>
                                        </div>



                                    </div>
                                )}
                            </Popup>
                        </div>
                    </div>
                    <div className="camp-firma">
                        <div className="nombre-aprendiz">
                            <label><h5>Firma del Aprendiz</h5></label>
                        </div>

                        <div className="campo-firma-planeacion">
                            <section className="img-signature">
                                {formData.firma_aprendiz ? (
                                    <img
                                        src={formData.firma_aprendiz}
                                        alt="Firma del Aprendiz"
                                        style={{
                                            display: "block",
                                            margin: "0 auto",
                                            width: "100%",
                                            height: "100%"
                                        }}
                                    />
                                ) : null}
                            </section>

                            <Popup trigger={<button type="button">Firmar</button>} modal>
                                {(close) => (
                                    <div className="popup campo-firma">
                                        <section className="head-signature">
                                            <button className="close" onClick={close}>
                                                &times;
                                            </button>
                                            <h2>Firma del Aprendiz</h2>
                                            <i className="bi bi-trash3-fill" onClick={() => clearSignature(aprendizRef)}></i>
                                        </section>

                                        <SignatureCanvas
                                            penColor="black"
                                            canvasProps={{ width: 590, height: 246, className: "signature-canvas" }}
                                            ref={(ref) => setAprendizSignatureRef(ref)}
                                            minWidth={1}
                                            maxWidth={1}
                                            velocityFilterWeight={0.1}
                                        />

                                        <div className="btn-guardar-firma">
                                            <button className="btn btn-success" onClick={() => { saveSignature(aprendizRef, "firma_aprendiz"); close(); }}>
                                                Guardar Firma
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </Popup>
                        </div>
                    </div>
                    <div className="camp-firma">
                        <div className="nombre-instructor">
                            <label><h5>Nombre y firma del Instructor</h5></label>
                            <input
                                name="nombre_instructor"
                                value={formData.nombre_instructor} onChange={handleChange}
                                placeholder="Nombre del Instructor"
                                className="input-planeacion"
                            />
                        </div>

                        <div className="campo-firma-planeacion">
                            <section className="img-signature">
                                {formData.firma_instructor ? (
                                    <img
                                        src={formData.firma_instructor}
                                        alt="Firma del Instructor"
                                        style={{
                                            display: "block",
                                            margin: "0 auto",
                                            width: "100%",
                                            height: "100%"
                                        }}
                                    />
                                ) : null}
                            </section>

                            <Popup trigger={<button type="button">Firmar</button>} modal>
                                {(close) => (
                                    <div className="popup campo-firma">
                                        <section className="head-signature">
                                            <button className="close" onClick={close}>
                                                &times;
                                            </button>
                                            <h2>Firma del Instructor</h2>
                                            <i className="bi bi-trash3-fill" onClick={() => clearSignature(instructorRef)}></i>
                                        </section>

                                        <SignatureCanvas
                                            penColor="black"
                                            canvasProps={{ width: 590, height: 246, className: "signature-canvas" }}
                                            ref={(ref) => setInstructorSignatureRef(ref)}
                                            minWidth={1}
                                            maxWidth={1}
                                            velocityFilterWeight={0.1}
                                        />

                                        <div className="btn-guardar-firma">
                                            <button className="btn btn-success" onClick={() => { saveSignature(instructorRef, "firma_instructor"); close(); }}>
                                                Guardar Firma
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </Popup>
                        </div>
                    </div>

                    <button type="button" id="guardar-evaluacionep" onClick={guardarDatos}>Guardar</button>
                </div>
            </div>
        </Fragment>
    );
}

export default EvaluacionEP;
