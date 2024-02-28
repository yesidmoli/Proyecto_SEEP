import React from 'react';
import './style.css';
import siga  from './siga.png'

const ImagenPlaneacion = () => {
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
            <input type="text" id="regional" name="regional"  />
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
      <h2 className='info-titulo titulo2'> <i>2. PLANEACIÓN ETAPA PRODUCTIVA </i> </h2>
     
      <div className="titulo">CONCERTACIÓN PLAN DE TRABAJO DE LA ETAPA PRODUCTIVA</div>
      <div className="actividades">

        <div className="subtitulo"><h6>ACTIVIDADES A DESARROLLAR</h6>
        
        <i>Relacionar funciones o actividades que respondan al resultado de aprendizaje de la Etapa Productiva y al Perfil del egresado establecido en el programa de formación.</i>  </div>
        
        
      </div>

      <div className="evidencias">
        <div className="subtitulo"><h6>EVIDENCIAS DE APRENDIZAJE</h6></div>
        
      </div>

      <div className="recoleccion">
        <div className="subtitulo2"><h6>RECOLECCIÓN DE EVIDENCIAS</h6></div>

        <div className="campos">
          <div className="campo1">
            <h5 className='fecha'>Fecha</h5>
          </div>
          <div className="campo1">
            <h5 className='lugar'>Lugar</h5>
          </div>
        </div>

      </div>

      <div className="evidencia-section">

            <div>
            <input className='input-activi'  placeholder="Evidencia 1" />
            <input className='input-activi'  placeholder="Evidencia 1" />
            </div>

            <div>
            <input className='input-activi'  placeholder="Evidencia 1" />
            <input className='input-activi'  placeholder="Evidencia 1" />
            </div>


            <div>
            <div className='reco'> 
            <input className='input-activi'  placeholder="Evidencia 1" />
            <input className='input-activi'  placeholder="Evidencia 1" />

            <input className='input-activi'  placeholder="Evidencia 1" />
            <input className='input-activi'  placeholder="Evidencia 1" />
            </div>
            </div>
           
           
          </div>




      <div className="observaciones">
        <div className="subtitulo">OBSERVACIONES:</div>
        <textarea rows="1"></textarea>
      </div>
      <div className="firmas">
        <div className="campo">
       
          <input  />
          <label>Nombre y Firma del ente Coformador:</label>
        </div>
        <div className="campo">
         
          <input  />
          <label>Firma del Aprendiz:</label>
        </div>
        <div className="campo">
          
          <input/>
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
          <input type="checkbox" name="opcion1" value="opcion1"></input>
          </div>
          
          <div className='parcial'><h6>Final:</h6>
          <input type="checkbox" name="opcion2" value="opcion2"></input>
          </div>
          
          
        </section>
      </div>

      <div className='informe'>

        <h6 className='borde-right'><strong>PERÍODO EVALUADO</strong></h6>
        <section>
          <div className='parcial  margin-botton'><h6>Inicio:</h6>
          <input ></input>
          </div>
          <div className='parcial  '><h6>Finalización:</h6>
          <input></input>
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

        
          <div className='info-factores'>

            <div className='t-variables'>
              <h6> <strong>RELACIONES INTERPERSONALES</strong></h6>
            </div>
            <div className='descrip' >
              <p> Desarrolla relaciones interpersonales con las personas de los diferentes niveles del ente Coformador en forma armoniosa, respetuosa y enmarcada dentro de los principios de convivencia social.</p>
            </div>

            <div className='valoracion-check'>

            <div className='input-1'> <input type="checkbox" name="opcion1" value="opcion1"></input></div>
           
            <input type="checkbox" name="opcion1" value="opcion1"></input>
           
            </div>

            <div>
              <h5>hhhahdahdhdwhhw</h5>
            </div>

            </div>
            <div className='info-factores'>

            <div className='t-variables'>
              <h6> <strong>TRABAJO EN EQUIPO</strong></h6>
            </div>
            <div className='descrip' >
              <p> Participa en forma activa y propositiva en equipos de trabajo asumiendo los roles, de acuerdo con sus fortalezas.</p>
            </div>

            <div className='valoracion-check'>

            <div className='input-1'> <input type="checkbox" name="opcion1" value="opcion1"></input></div>
           
            <input type="checkbox" name="opcion1" value="opcion1"></input>
           
            </div>

            <div>
              <h5>hhhahdahdhdwhhw</h5>
            </div>

            </div>

            <div className='info-factores'>

{/* *************** */}
<div className='t-variables'>
  <h6> <strong>SOLUCIÓN DE PROBLEMAS</strong></h6>
</div>
<div className='descrip' >
  <p> Propone alternativas de solución a situaciones problémicas, en el contexto del desarrollo de su etapa productiva.</p>
</div>

<div className='valoracion-check'>

<div className='input-1'> <input type="checkbox" name="opcion1" value="opcion1"></input></div>

<input type="checkbox" name="opcion1" value="opcion1"></input>

</div>

<div>
  <h5>hhhahdahdhdwhhw</h5>
</div>

</div>
<div className='info-factores'>

            <div className='t-variables'>
              <h6> <strong>CUMPLIMIENTO</strong></h6>
            </div>
            <div className='descrip' >
              <p> Asume compromiso de las funciones y responsabilidades asignadas en el desarrollo de su trabajo.</p>
            </div>

            <div className='valoracion-check'>

            <div className='input-1'> <input type="checkbox" name="opcion1" value="opcion1"></input></div>
           
            <input type="checkbox" name="opcion1" value="opcion1"></input>
           
            </div>

            <div>
              <h5>hhhahdahdhdwhhw</h5>
            </div>

            </div>
            <div className='info-factores'>

            <div className='t-variables'>
              <h6> <strong>ORGANIZACIÓN</strong></h6>
            </div>
            <div className='descrip' >
              <p>Demuestra capacidad para ordenar y disponer los elementos necesarios e información para facilitar la ejecución de un trabajo y el logro de los objetivos.</p>
            </div>

            <div className='valoracion-check'>

            <div className='input-1'> <input type="checkbox" name="opcion1" value="opcion1"></input></div>
           
            <input type="checkbox" name="opcion1" value="opcion1"></input>
           
            </div>

            <div>
              <h5>hhhahdahdhdwhhw</h5>
            </div>

            </div>

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

        
          <div className='info-factores'>

            <div className='t-variables'>
              <h6> <strong>TRANSFERENCIA DE CONOCIMIENTO</strong></h6>
            </div>
            <div className='descrip' >
              <p> Demuestra las competencias específicas del programa de formación en situaciones reales de trabajo.</p>
            </div>

            <div className='valoracion-check'>

            <div className='input-1'> <input type="checkbox" name="opcion1" value="opcion1"></input></div>
           
            <input type="checkbox" name="opcion1" value="opcion1"></input>
           
            </div>

            <div>
              <h5>hhhahdahdhdwhhw</h5>
            </div>

            </div>
            <div className='info-factores'>

            <div className='t-variables'>
              <h6> <strong>MEJORA CONTINUA</strong></h6>
            </div>
            <div className='descrip' >
              <p> Aporta al mejoramiento de los procesos propios de su desempeño.</p>
            </div>

            <div className='valoracion-check'>

            <div className='input-1'> <input type="checkbox" name="opcion1" value="opcion1"></input></div>
           
            <input type="checkbox" name="opcion1" value="opcion1"></input>
           
            </div>

            <div>
              <h5>hhhahdahdhdwhhw</h5>
            </div>

            </div>

            <div className='info-factores'>

{/* *************** */}
<div className='t-variables'>
  <h6> <strong>FORTALECIMIENTO OCUPACIONAL</strong></h6>
</div>
<div className='descrip' >
  <p> Autogestiona acciones que fortalezca su perfil ocupacional en el marco de su proyecto de vida.</p>
</div>

<div className='valoracion-check'>

<div className='input-1'> <input type="checkbox" name="opcion1" value="opcion1"></input></div>

<input type="checkbox" name="opcion1" value="opcion1"></input>

</div>

<div>
  <h5>hhhahdahdhdwhhw</h5>
</div>

</div>
<div className='info-factores'>

            <div className='t-variables'>
              <h6> <strong>OPORTUNIDAD Y CALIDAD</strong></h6>
            </div>
            <div className='descrip' >
              <p> Presenta con oportunidad y calidad los productos generados en el desarrollo de sus funciones y actividades.</p>
            </div>

            <div className='valoracion-check'>

            <div className='input-1'> <input type="checkbox" name="opcion1" value="opcion1"></input></div>
           
            <input type="checkbox" name="opcion1" value="opcion1"></input>
           
            </div>

            <div>
              <h5>hhhahdahdhdwhhw</h5>
            </div>

            </div>
            <div className='info-factores'>

            <div className='t-variables'>
              <h6> <strong>RESPONSABILIDAD AMBIENTAL</strong></h6>
            </div>
            <div className='descrip' >
              <p>Administra los recursos para el desarrollo de sus actividades con criterios de responsabilidad ambiental.</p>
            </div>

            <div className='valoracion-check'>

            <div className='input-1'> <input type="checkbox" name="opcion1" value="opcion1"></input></div>
           
            <input type="checkbox" name="opcion1" value="opcion1"></input>
           
            </div>

            <div>
              <h5>hhhahdahdhdwhhw</h5>
            </div>

            </div>
            <div className='info-factores'>

<div className='t-variables'>
  <h6> <strong>ADMINISTRACIÓN DE RECURSOS</strong></h6>
</div>
<div className='descrip' >
  <p>Utiliza de manera racional los materiales, equipos y herramientas suministrados para el desempeño de sus actividades o funciones.</p>
</div>

<div className='valoracion-check'>

<div className='input-1'> <input type="checkbox" name="opcion1" value="opcion1"></input></div>

<input type="checkbox" name="opcion1" value="opcion1"></input>

</div>

<div>
  <h5>hhhahdahdhdwhhw</h5>
</div>

</div>
<div className='info-factores'>

<div className='t-variables'>
  <h6> <strong>SEGURIDAD OCUPACIONAL E INDUSTRIAL</strong></h6>
</div>
<div className='descrip' >
  <p>Utiliza los elementos de seguridad y salud ocupacional de acuerdo con la normatividad vigente establecida para sus actividades o funciones.</p>
</div>

<div className='valoracion-check'>

<div className='input-1'> <input type="checkbox" name="opcion1" value="opcion1"></input></div>

<input type="checkbox" name="opcion1" value="opcion1"></input>

</div>

<div>
  <h5>hhhahdahdhdwhhw</h5>
</div>

</div>

<div className='info-factores'>

<div className='t-variables'>
  <h6> <strong>DOCUMENTACIÓN ETAPA PRODUCTIVA</strong></h6>
</div>
<div className='descrip' >
  <p>Actualiza permanentemente el portafolio de evidencias.</p>
</div>

<div className='valoracion-check'>

<div className='input-1'> <input type="checkbox" name="opcion1" value="opcion1"></input></div>

<input type="checkbox" name="opcion1" value="opcion1"></input>

</div>

<div>
  <h5>hhhahdahdhdwhhw</h5>
</div>

</div>

          </section>
      </div>
      

      <div className="observaciones-seguimiento">
        <div className="subtitulo"> <strong>Observaciones del responsable ente Coformador.</strong> <i>
        (Sus observaciones proporcionan información que aporta al
mejoramiento de la calidad de la Formación Profesional Integral):</i></div>
        <textarea rows="1"></textarea>
      </div>
      <div className="observaciones-seguimiento-aprendiz">
        <div className="subtitulo"> <strong>Observaciones del Aprendiz:</strong> </div>
        <textarea rows="1"></textarea>
      </div>
    </div>


    <div className="evaluacion">
      <h2 className='info-titulo titulo2'> <i>4. EVALUACIÓN ETAPA PRODUCTIVA</i> </h2>
     
     <div className='espacio-div'></div>



      <div className="juicio-evaluativo">
       
       <h6>JUICIO DE EVALUACIÓN:</h6>
       <div className='div-juicio'><input type='checkbox'></input>
       <h6><strong>APROBADO</strong></h6></div>
       
       <div className='div-juicio'>
       <input type='checkbox'></input>
       <h6><strong>NO APROBADO</strong></h6>
       </div>
      
      </div>


      <div className="reconocimiento">
       
       
       <div className='div-reco'>
       <h6>RECONOCIMIENTOS ESPECIALES SOBRE EL DESEMPEÑO:</h6>

       <div className='reco-calificacion'>
       <h6><strong>SI</strong></h6>
       <input type='checkbox'></input>
       </div>
      
       <div className='reco-calificacion'>
       <h6><strong>NO</strong></h6>
       <input type='checkbox'></input>
       </div>
      
       </div>
       

       <div className='especificacion'>
       
       <h6>Especificar cuáles :</h6>
       <p>Hoaoosoododaddhd</p>

       </div>
      
      </div>


      <div className="firmas">
        <div className="campo">
       
          <input  />
          <label>Nombre y Firma del ente Coformador:</label>
        </div>
        <div className="campo">
         
          <input  />
          <label>Firma del Aprendiz:</label>
        </div>
        <div className="campo">
          
          <input/>
          <label>Nombre y firma Funcionario SENA:</label>
        </div>
        <p><strong>Ciudad y fecha de elaboración</strong></p>
      </div>

     
    </div>
    </div>
    </section>
  );
};

export default ImagenPlaneacion;