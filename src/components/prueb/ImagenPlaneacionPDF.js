import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import ImagenPlaneacion from './InfoGeneral';

// Estilos para el documento PDF
const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#E4E4E4'
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1
  }
});

// Componente que renderiza ImagenPlaneacion dentro de un documento PDF
const ImagenPlaneacionPDF = () => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
    <ImagenPlaneacion /> 
        <h1>    Hols mundooooo</h1>
      </View>
    </Page>
  </Document>
);

export default ImagenPlaneacionPDF;

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
