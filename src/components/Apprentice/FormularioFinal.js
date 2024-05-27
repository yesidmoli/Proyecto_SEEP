import React, { useState } from "react";
import MainSection from "../layout/MainSection";
import Header from "../layout/Header";
import Swal from "sweetalert2";
import '../../css/formulariofinal.css'
import clienteAxios from "../../config/axios";

const FormularioFinal = (prop) => {
        const { id } = prop.match.params;
        const [formData, setFormData] = useState({
          
            madre_cabeza_familia: "",
            titulo_obtenido: "",
            fecha_fin_etapa_lectiva: "",
            cargo_funciones: "",
            fecha_fin_etapa_productiva: "",
            practica_aprendido: "",
            estudios_superiores_adicionales: "",
            estudios: "",
            trabaja_actualmente: "",
            estado_actual: "",
            cargo_actual: "",
            empresa_labora: "",
            antiguedad_trabajo:"",
            area_informacion_complementaria: "",
            actualmente_estudia: "",
            estudia_que: "",
            institucion_universidad: "",
            certificar_competencias_laborales: "",
            conoce_beneficios_sena: "",
            idea_negocio: "",
            conoce_servicio_fondo_emprender: "",
            necesita_empleo: "",
            sugerencias_comentarios: "",
            aprendiz: id
        }

        
          
        );
        console.log("este es el id",id)
          
      console.log("esta es la data",formData);
        const handleChange = (e) => {
          const { id, value } = e.target;
          setFormData({
            ...formData,
            [id]: value
          });
        };
      
       
        const handleSubmit =  async (e) => {
          e.preventDefault();
          try {
            const response = await clienteAxios.post(`api/formulario-final/`, formData);
            console.log(response.data);
            
            // Mostrar ventana modal de éxito
            Swal.fire({
              icon: 'success',
              title: '¡Éxito!',
              text: 'Los datos se han guardado correctamente.',
            });
          } catch (error) {
            Swal.fire({
              icon: 'error',
              title: '¡Error!',
              text: 'Error al enviar los datos.',
            });
            console.log(error.response ? error.response.data : error.message);
          }

        };
      
  return (
    <>
      <Header />
      <MainSection />

      <div className="contenedor-form-final" style={{ overflow: 'auto', maxHeight: 'calc(100vh - 200px)', padding: '20px' }}>
        <h1 id="title-form">Formulario final</h1>
        <form className="formulario-final" onSubmit={handleSubmit}>
          
          <div>
            <label htmlFor="cabeza_familia">¿Es usted madre o padre cabeza de familia?:</label>
            <select 
            id="madre_cabeza_familia"
            value={formData.madre_cabeza_familia}
            onChange={handleChange}
            >
                <option value="">Seleccione una opción</option>
                <option value="SI">Si</option>
                <option value="NO">No</option>
            </select>
          </div>
          <div>
            <label htmlFor="titulo_obtenido">Titulo obtenido:</label>
            <input
              type="text"
              id="titulo_obtenido"
              value={formData.titulo_obtenido}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="fecha_lectiva">Fecha en la que terminó la etapa lectiva:</label>
            <input
              type="date"
              id="fecha_fin_etapa_lectiva"
              value={formData.fecha_fin_etapa_lectiva}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="cargo">Cargo y funciones realizadas:</label>
            <textarea
              type="text"
              id="cargo_funciones"
              value={formData.cargo_funciones}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="fecha_productiva">Fecha en la que terminó o terminará la etapa productiva:</label>
            <input
              type="date"
              id="fecha_fin_etapa_productiva"
              value={formData.fecha_fin_etapa_productiva}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="etapa_productiva">¿Durante la etapa productiva practicó lo aprendido en la formación?:</label>
            <select 
            id="practica_aprendido" 
            value={formData.practica_aprendido} 
            onChange={handleChange}>
                <option value="">Seleccione una opción</option>
                <option value="Totalmente" >Totalmente</option>
                <option value="Parcialmente">Parcialmente</option>
                <option value="Casi nada">Casi nada</option>
                <option value="Nada">Nada</option>
            </select>
          </div>
          <div>
            <label htmlFor="estudios_superiores">¿Tiene usted estudios superiores adicionales?:</label>
            <select
            id="estudios_superiores_adicionales"
            value={formData.estudios_superiores_adicionales}
            onChange={handleChange}>
                <option value="">Seleccione una opción</option>
                <option value="SI">Si</option>
                <option value="NO">No</option>
            </select>
          </div>
          <div>
            <label htmlFor="estudios_adicionales">¿Qué estudios tiene? (Si respondió "Si" a la pregunta anterior):</label>
            <input
              type="text"
              id="estudios"
              value={formData.estudios}
              onChange={handleChange}
            />
          </div>
          <div>
          <label htmlFor="trabaja_actualmente">¿Trabaja actualmente?:</label>
            <select 
            id="trabaja_actualmente"
            value={formData.trabaja_actualmente}
            onChange={handleChange}>
                <option value="">Seleccione una opción</option>
                <option value="SI">Si</option>
                <option value="NO">No</option>
            </select>
          </div>
          <div>
          <label htmlFor="estado_empleo">¿Actualmente usted es?:</label>
            <select 
            id="estado_actual"
            value={formData.estado_actual}
            onChange={handleChange}>
                <option value="">Seleccione una opción</option>
                <option value="Empleado">Empleado</option>
                <option value="Independiente">Independiente</option>
            </select>
          </div>
          <div>
            <label htmlFor="cargo_actual">¿Qué cargo tiene?:</label>
            <input
              type="text"
              id="cargo_actual"
              value={formData.cargo_actual}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="empresa_actual">Nombre de la empresa donde labora:</label>
            <input
              type="text"
              id="empresa_labora"
              value={formData.empresa_labora}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="tiempo_trabajo">Si es empleado ¿qué antiguedad tiene en su trabajo:</label>
            <input
              type="number"
              id="antiguedad_trabajo"
              value={formData.antiguedad_trabajo}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="informacion_complementaria">¿En que área le gustaría recibir información complementaria?:</label>
            <input
              type="text"
              id="area_informacion_complementaria"
              value={formData.area_informacion_complementaria}
              onChange={handleChange}
            />
          </div>
          <div>
          <label htmlFor="estudio_actual">¿Actualmente estudia?:</label>
            <select
            id="actualmente_estudia"
            value={formData.actualmente_estudia}
            onChange={handleChange}>
                <option value="">Seleccione una opción</option>
                <option value="SI">Si</option>
                <option value="NO">No</option>
            </select>
          </div>
          <div>
            <label htmlFor="estudios_actualmente">¿Qué se encuentra estudiando?:</label>
            <input
              type="text"
              id="estudia_que"
              value={formData.estudia_que}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="universidad">Nombre de la institución o universidad :</label>
            <input
              type="text"
              id="institucion_universidad"
              value={formData.institucion_universidad}
              onChange={handleChange}
            />
          </div>
          <div>
          <label htmlFor="certificacion">¿Requiere certificar sus competencias laborales?:</label>
            <select
            id="certificar_competencias_laborales"
            value={formData.certificar_competencias_laborales}
            onChange={handleChange}>
                <option value="">Seleccione una opción</option>
                <option value="SI">Si</option>
                <option value="NO">No</option>
            </select>
          </div>
          <div>
          <label htmlFor="servicio_nacional_empleo">¿Conoce los beneficios que ofrece el SENA a través del servicio nacional de empleo?:</label>
            <select
            id="conoce_beneficios_sena"
            value={formData.conoce_beneficios_sena}
            onChange={handleChange}>
                <option value="">Seleccione una opción</option>
                <option value="SI">Si</option>
                <option value="NO">No</option>
            </select>
          </div>
          <div>
          <label htmlFor="idea_negocio">¿Tiene una idea de negocio?:</label>
            <select
            id="idea_negocio"
            value={formData.idea_negocio}
            onChange={handleChange}>
                <option value="">Seleccione una opción</option>
                <option value="SI">Si</option>
                <option value="NO">No</option>
            </select>
          </div><div>
          <label htmlFor="fondo_emprender">¿Conoce el servicio que presta el SENA a través del fondo emprender?:</label>
            <select
            id="conoce_servicio_fondo_emprender"
            value={formData.conoce_servicio_fondo_emprender}
            onChange={handleChange}>
                <option value="">Seleccione una opción</option>
                <option value="SI">Si</option>
                <option value="NO">No</option>
            </select>
          </div>
          <div>
          <label htmlFor="empleo">¿En la actualidad necesita empleo?:</label>
            <select 
            id="necesita_empleo"
            value={formData.necesita_empleo}
            onChange={handleChange}>
                <option value="">Seleccione una opción</option>
                <option value="SI">Si</option>
                <option value="NO">No</option>
            </select>
          </div>
          <div>
            <label htmlFor="sugerencias">Sugerencias o comentarios:</label>
            <textarea
              type="text"
              id="sugerencias_comentarios"
              value={formData.sugerencias_comentarios}
              onChange={handleChange}
            />
          </div>
        <button id="enviar-form-final" type="submit">Enviar</button>
        </form>
      </div>
    </>
  );
};

export default FormularioFinal;
