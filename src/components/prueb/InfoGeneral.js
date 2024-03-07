import React, { useEffect, useState } from 'react';
import './style.css';
import siga from './siga.png'
import { useFormContext } from '../FormatoESP/FormProvide';
import clienteAxios from '../../config/axios';
import { useParams } from "react-router-dom";
const ImagenPlaneacion = (id) => {

  // const {formData, updateFormData } = useFormContext();
  // console.log("esto es lo que llego del contexto", formData.seguimiento)
  const [formData, setFormData] = useState([]); // Estado para almacenar los datos de la API


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await clienteAxios.get(`/api/formato/?aprendiz_id=${1}`);
        const responseData = response.data;

        if (responseData.length > 0) {
          const data = responseData[0];
          setFormData(data); // Actualiza el estado formData con los datos obtenidos de la API
          console.log("la dat", data);
          console.log("evaluacion", data.evaluacion)
        }
      } catch (error) {
        console.error('Error al obtener los datos de la API:', error);
      }
    };

    fetchData();
  }, [id]); //

  return (
    <section>
      <div className="imagen-planeacion">
        <div className='hearder-formato'>
          <img src={siga} />
          <h4>Formato Planeación, Seguimiento y Evaluación Etapa Productiva</h4>
        </div>


        <div className="informacion-general">
          <h2 className='info-titulo'> <i>1. INFORMACIÓN GENERAL </i> </h2>
          <ul>
            <li className='regional'>
              <label for="regional">Regional:</label>
              <input type="text" id="regional" name="regional" />
            </li>
            <li className='centro'>
              <label for="centro-formacion">Centro de Formación:</label>
              <input type="text" id="centro-formacion" name="centro-formacion" />
            </li>
            <li>
              <label for="programa-formacion">Programa de Formación:</label>
              <input type="text" id="programa-formacion" name="programa-formacion" />
            </li>
            <li>
              <label for="numero-ficha">No. de Ficha:</label>
              <input type="text" id="numero-ficha" name="numero-ficha" />
            </li>
          </ul>
        </div>
        <div className="datos-aprendiz">
          <h5>Datos del Aprendiz</h5>
          <ul>
            <li>
              <label for="nombre">Nombre:</label>
              {/* <input type="text" id="nombre" name="nombre"  value={"Yesid Molina"}/> */}
              <h6>Yesid Molina</h6>
            </li>
            <li>
              <label for="identificacion">Identificación:</label>
              <input type="text" id="identificacion" name="identificacion" />
            </li>
            <li>
              <label for="telefono">Teléfono:</label>
              <input type="text" id="telefono" name="telefono" />
            </li>
            <li>
              <label for="email">E-mail:</label>
              <input type="email" id="email" name="email" />
            </li>
            <li>
              <label for="email">Alternativa registrada en sofia plus:</label>
              <input type="email" id="email" name="email" />
            </li>
          </ul>
        </div>
        <div className="ente-coformador">
          <h5>Ente Coformador</h5>
          <ul>
            <li>
              <label for="razon-social">Razón social:</label>
              <input type="text" id="razon-social" name="razon-social" />
            </li>
            <li>
              <label for="nombre-empresa">Nombre del Ente Coformador:</label>
              <input type="text" id="nombre-empresa" name="nombre-empresa" />
            </li>
            <li>
              <label for="nombre-jefe">Nombre del Jefe Inmediato del Aprendiz:</label>
              <input type="text" id="nombre-jefe" name="nombre-jefe" />
            </li>
            <li>
              <label for="cargo-jefe">Cargo:</label>
              <input type="text" id="cargo-jefe" name="cargo-jefe" />
            </li>
            <li>
              <label for="telefono-jefe">Teléfono:</label>
              <input type="text" id="telefono-jefe" name="telefono-jefe" />
            </li>
            <li>
              <label for="email-jefe">E-mail:</label>
              <input type="email" id="email-jefe" name="email-jefe" />
            </li>
          </ul>
        </div>


        <div className="planeacion">
          
          <h2 className='info-titulo titulo2'><i>2. PLANEACIÓN ETAPA PRODUCTIVA</i></h2>
          <h4 className="h4-planeacion">CONCERTACIÓN PLAN DE TRABAJO DE LA ETAPA PRODUCTIVA</h4>

          <table className="table-planeacion">
            <thead>
              <tr>
                <th className="actividad-titulo">ACTIVIDADES A DESARROLLAR
                  <h6><i>Relacionar funciones o actividades que respondan al resultado de aprendizaje de la Etapa Productiva y al Perfil del egresado establecido en el programa de formación.</i></h6>

                </th>
                <th className="td-evidencia">EVIDENCIAS DE APRENDIZAJE</th>
                <th className="recolecta-evidencia">RECOLECCIÓN DE EVIDENCIAS
                  <tr className="fecha-lugar">
                    <th>Fecha</th>
                    <th>Lugar</th>
                  </tr>

                </th>
              </tr>
            </thead>
            <tbody>
              {formData.planeacion && formData.planeacion.actividades && formData.planeacion.actividades.map((actividad, index) => (
                <tr key={index} className="table-tr-planeacion">
                  <td>{actividad.nombre_actividad}</td>
                  <td className="campo-check-actividades"><input type="checkbox" className="input-check-tabla" checked={actividad.tiene_evidencia_aprendizaje} /></td>
                  <td className="fecha-lugar-evidencia">
                    <tr>
                      <th>{actividad.fecha_recoleccion_evidencia}</th>
                      <th>{actividad.lugar_recoleccion_evidencia}</th>
                    </tr>
                  </td>
                </tr>
              ))}


            </tbody>
          </table>
          <div className="observaciones-planeacion">
            <h5>OBSERVACIONES:</h5>
            <textarea>{formData.planeacion?.observaciones ?? ""}</textarea>
          </div>

          <div className="firmas-planeacion">
            <div className="camp-firma-planeacion">

              <img className="imagen-firma" alt="firma" src={formData.planeacion?.firma_enteconformador ?? ""} />
              <h6>{formData.planeacion?.nombre_enteconformador ?? ""}</h6>
              <label>Nombre y Firma del ente Coformador:</label>

            </div>
            <div className="camp-firma-planeacion">

              <img className="imagen-firma" alt="firma" src={formData.planeacion?.firma_aprendiz ?? ""} />
              <label>Firma del Aprendiz:</label>
            </div>
            <div className="camp-firma-planeacion">

              <img className="imagen-firma" alt="firma" src={formData.planeacion?.firma_instructor ?? ""} />
              <h6>{formData.planeacion?.nombre_instructor ?? ""}</h6>

              <label>Nombre y firma Funcionario SENA:</label>
            </div>
          </div>
        </div>

        <div className='seguimiento'>

          <h2 className='titulo-seguimiento'> <i>3. SEGUIMIENTO ETAPA PRODUCTIVA </i> </h2>


          <div className='tipo-informe'>

            <div className='informe borde-right'>
              <h6 className='borde-right'><strong>TIPO INFORME</strong></h6>

              <section>

                <div className='parcial margin-botton'><h6 > Parcial:</h6>
                  <input className='input-check' type="checkbox" name="opcion1" value="opcion1"
                    checked={formData.seguimiento && formData.seguimiento.tipo_informe === 'Parcial'}
                  ></input>
                </div>

                <div className='parcial'><h6>Final:</h6>
                  <input className='input-check' type="checkbox" name="opcion2" value="opcion2"
                    checked={formData.seguimiento && formData.seguimiento.tipo_informe === 'Final'}></input>
                </div>


              </section>
            </div>

            <div className='informe'>

              <h6 className='borde-right'><strong>PERÍODO EVALUADO</strong></h6>
              <section>
                <div className='parcial  margin-botton'><h6>Inicio:</h6>
                  <h6>{formData.seguimiento?.periodo_evaluado_inicio ?? ""}</h6>
                </div>
                <div className='parcial  '><h6>Finalización:</h6>
                  <h6>{formData.seguimiento?.periodo_evaluado_final ?? ""}</h6>
                </div>

              </section>
            </div>
          </div>



          <div className='factores'>
            <h5 className='title-factores'> <i>FACTORES ACTITUDINALES Y COMPORTAMENTALES</i></h5>


            <div className='head-factores'>

              <div className='variable'>
                <h5> <strong>VARIABLE</strong></h5>
              </div>
              <div>
                <h5> <strong>DESCRIPCIÓN</strong></h5>
              </div>

              <div className='valoracion'>

                <h5 className='titulo-valoracion'> <strong>VALORACIÓN</strong></h5>
                <h6 className='titulo-sactisfactor'> <strong>Sactisfactorio</strong></h6>
                <h6 className='titulo-por-mejorar'> <strong>Por mejorar</strong></h6>
              </div>

              <div className='observ'>
                <h5> <strong>Observación</strong></h5>
              </div>

            </div>

            <section className='actividades-evidencias'>


              {formData.seguimiento && formData.seguimiento.factores_actitudinales && formData.seguimiento.factores_actitudinales.map((factor_actitudinal, index) => (


                <div key={index} className='info-factores'>

                  <div className='t-variables'>
                    <h6> <strong>{factor_actitudinal.variable}</strong></h6>
                  </div>
                  <div className='descrip' >
                    <p>{factor_actitudinal.descripcion}</p>
                  </div>

                  <div className='valoracion-check'>

                    <div className='input-1'> <input className='input-check' type="checkbox" name="opcion1" value="opcion1"
                      checked={factor_actitudinal && factor_actitudinal.satisfactorio === true}
                    ></input></div>

                    <input type="checkbox" name="opcion1" value="opcion1"
                      checked={factor_actitudinal && factor_actitudinal.satisfactorio === false}></input>

                  </div>

                  <div>
                    <h5>{factor_actitudinal?.observaciones ?? ""}</h5>
                  </div>

                </div>
              ))}


            </section>
          </div>


          <div className='factores-tecnicos'>
            <h5 className='title-factores-tecnicos'> <i>FACTORES TÉCNICOS</i></h5>


            <div className='head-factores-tecnicos'>

              <div className='variable'>
                <h5> <strong>VARIABLE</strong></h5>
              </div>
              <div>
                <h5> <strong>DESCRIPCIÓN</strong></h5>
              </div>

              <div className='valoracion'>

                <h5 className='titulo-valoracion'> <strong>VALORACIÓN</strong></h5>
                <h6 className='titulo-sactisfactor'> <strong>Sactisfactorio</strong></h6>
                <h6 className='titulo-por-mejorar'> <strong>Por mejorar</strong></h6>
              </div>

              <div className='observ'>
                <h5> <strong>Observación</strong></h5>
              </div>

            </div>

            <section className='actividades-evidencias-tecnicos'>

              {formData.seguimiento && formData.seguimiento.factores_tecnicos && formData.seguimiento.factores_tecnicos.map((factor_tecnico, index) => (
                <div key={index} className='info-factores'>

                  <div className='t-variables'>
                    <h6> <strong>{factor_tecnico?.variable ?? ""}</strong></h6>
                  </div>
                  <div className='descrip' >
                    <p> {factor_tecnico?.descripcion ?? ""}</p>
                  </div>

                  <div className='valoracion-check'>

                    <div className='input-1'> <input className='input-check' type="checkbox" name="opcion1" value="opcion1"
                      checked={factor_tecnico && factor_tecnico.satisfactorio === true}></input></div>

                    <input className='input-check' type="checkbox" name="opcion1" value="opcion1"
                      checked={factor_tecnico && factor_tecnico.satisfactorio === false}></input>

                  </div>

                  <div>
                    <h5>{factor_tecnico?.observaciones ?? ""}</h5>
                  </div>

                </div>
              ))}

            </section>
          </div>


          <div className="observaciones-seguimiento">
            <div className="subtitulo"> <strong>Observaciones del responsable ente Coformador.</strong> <i>
              (Sus observaciones proporcionan información que aporta al
              mejoramiento de la calidad de la Formación Profesional Integral):</i></div>
            <textarea rows="1" value={formData.seguimiento?.observaciones_ente_conformador ?? ""}> </textarea>
          </div>
          <div className="observaciones-seguimiento-aprendiz">
            <div className="subtitulo"> <strong>Observaciones del Aprendiz:</strong> </div>
            <textarea rows="1" value={formData.seguimiento?.observaciones_aprendiz ?? ""}></textarea>
          </div>
        </div>


        <div className="evaluacion">
          <h2 className='info-titulo titulo2'> <i>4. EVALUACIÓN ETAPA PRODUCTIVA</i> </h2>

          <div className='espacio-div'></div>



          <div className="juicio-evaluativo">

            <h6>JUICIO DE EVALUACIÓN:</h6>
            <div className='div-juicio'><input type='checkbox' checked={formData.evaluacion && formData.evaluacion.juicio_evaluacion === 'aprobado'}></input>
              <h6><strong>APROBADO</strong></h6></div>

            <div className='div-juicio'>
              <input type='checkbox' checked={formData.evaluacion && formData.evaluacion.juicio_evaluacion === 'no aprobado'}></input>
              <h6><strong>NO APROBADO</strong></h6>
            </div>

          </div>


          <div className="reconocimiento">


            <div className='div-reco'>
              <h6>RECONOCIMIENTOS ESPECIALES SOBRE EL DESEMPEÑO:</h6>

              <div className='reco-calificacion'>
                <h6><strong>SI</strong></h6>
                <input type='checkbox' checked={formData.evaluacion && formData.evaluacion.reconocimientos_especiales === true} ></input>
              </div>

              <div className='reco-calificacion'>
                <h6><strong>NO</strong></h6>
                <input type='checkbox' checked={formData.evaluacion && formData.evaluacion.reconocimientos_especiales === false}></input>
              </div>

            </div>


            <div className='especificacion'>

              <h6>Especificar cuáles :</h6>
              {formData.evaluacion && formData.evaluacion.reconocimientos_detalle && formData.evaluacion.reconocimientos_detalle.split('-').map((reconocimiento, index) => (
                <li  key={index}>{reconocimiento}</li>
              ))}


            </div>

          </div>


          <div className="firmas-evaluacion">
            <div className="camp-firma-planeacion">

              <img className="imagen-firma" alt="firma" src={formData.evaluacion?.firma_enteconformador ?? ""} />
              <h6>{formData.evaluacion?.nombre_enteconformador ?? ""}</h6>
              <label>Nombre y Firma del ente Coformador:</label>

            </div>
            <div className="camp-firma-planeacion">

              <img className="imagen-firma" alt="firma" src={formData.evaluacion?.firma_aprendiz ?? ""} />
              <label>Firma del Aprendiz:</label>
            </div>
            <div className="camp-firma-planeacion">

              <img className="imagen-firma" alt="firma" src={formData.evaluacion?.firma_instructor ?? ""} />
              <h6>{formData.evaluacion?.nombre_instructor ?? ""}</h6>

              <label>Nombre y firma Funcionario SENA:</label>
            </div>
          </div>


        </div>
      </div>
    </section>
  );
};

export default ImagenPlaneacion;