import React, { useState } from "react";
import MainSection from "../layout/MainSection";
import Header from "../layout/Header";
import Swal from "sweetalert2";
import '../../css/formulariofinal.css'

const FormularioFinal = () => {
        const [formData, setFormData] = useState({
          nombres: '',
          apellidos: '',
          numero_documento: '',
          tipo_documento: '',
          fecha_expedicion: '',
          lugar_expedicion: '',
          fecha_nacimiento: '',
          sexo: '',
          direccion_domicilio: '',
          municipio: '',
          departamento: '',
          telefono: '',
          numero_celular: '',
          telefono_fijo: '',
          correo: '',
          cabeza_familia: 'Seleccione una opción',
          programa_formacion: '',
          nivel_formacion: '',
          numero_ficha: '',
          titulo_obtenido: '',
          horario_formacion: '',
          fecha_lectiva: '',
          empresa: '',
          cargo: '',
          fecha_productiva: '', 
          etapa_productiva: 'Seleccione una opción',
          jefe_inmediato: '',
          cargo_jefe: '',
          telefono_jefe: '',
          correo_jefe: '',
          estudios_superiores: 'Seleccione una opción',
          estudios_adicionales: '', 
          trabaja_actualmente: 'Seleccione una opción', 
          estado_empleo: 'Seleccione una opción', 
          cargo_actual: '', 
          empresa_actual: '', 
          tiempo_trabajo: '',
          informacion_complementaria: '',
          estudio_actual: '',
          estudios_actualmente: '', 
          universidad: '', 
          certificacion: 'Seleccione una opción', 
          servicio_nacional_empleo: 'Seleccione una opción',
          idea_negocio: 'Seleccione una opción', 
          fondo_emprender: 'Seleccione una opcion', 
          empleo: 'Seleccione una opción', 
          sugerencias: '',

          
        });
      
        const handleChange = (e) => {
          const { id, value } = e.target;
          setFormData({
            ...formData,
            [id]: value
          });
        };
      
        const handleSubmit = (e) => {
          e.preventDefault();
          // Aquí puedes manejar la lógica para enviar el formulario
          console.log(formData);
          // Mostrar ventana modal de éxito
          Swal.fire({
            icon: 'success',
            title: '¡Éxito!',
            text: 'Los datos se han guardado correctamente.',
          });
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
            id="cabeza_familia"
            value={formData.cabeza_familia}
            onChange={handleChange}
            >
                <option>Seleccione una opción</option>
                <option>Si</option>
                <option>No</option>
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
              id="fecha_lectiva"
              value={formData.fecha_lectiva}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="cargo">Cargo y funciones realizadas:</label>
            <textarea
              type="text"
              id="cargo"
              value={formData.cargo}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="fecha_productiva">Fecha en la que terminó o terminará la etapa productiva:</label>
            <input
              type="date"
              id="fecha_productiva"
              value={formData.fecha_productiva}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="etapa_productiva">¿Durante la etapa productiva practicó lo aprendido en la formación?:</label>
            <select 
            id="etapa_productiva" 
            value={formData.etapa_productiva} 
            onChange={handleChange}>
                <option>Seleccione una opción</option>
                <option>Totalmente</option>
                <option>Parcialmente</option>
                <option>Casi nada</option>
                <option>Nada</option>
            </select>
          </div>
          <div>
            <label htmlFor="estudios_superiores">¿Tiene usted estudios superiores adicionales?:</label>
            <select
            id="estudios_superiores"
            value={formData.estudios_superiores}
            onChange={handleChange}>
                <option>Seleccione una opción</option>
                <option>Si</option>
                <option>No</option>
            </select>
          </div>
          <div>
            <label htmlFor="estudios_adicionales">¿Qué estudios tiene? (Si respondió "Si" a la pregunta anterior):</label>
            <input
              type="text"
              id="estudios_adicionales"
              value={formData.estudios_adicionales}
              onChange={handleChange}
            />
          </div>
          <div>
          <label htmlFor="trabaja_actualmente">¿Trabaja actualmente?:</label>
            <select 
            id="trabaja_actualmente"
            value={formData.trabaja_actualmente}
            onChange={handleChange}>
                <option>Seleccione una opción</option>
                <option>Si</option>
                <option>No</option>
            </select>
          </div>
          <div>
          <label htmlFor="estado_empleo">¿Actualmente usted es?:</label>
            <select 
            id="estado_empleo"
            value={formData.estado_empleo}
            onChange={handleChange}>
                <option>Seleccione una opción</option>
                <option>Empleado</option>
                <option>Independiente</option>
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
              id="empresa_actual"
              value={formData.empresa_actual}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="tiempo_trabajo">Si es empleado ¿qué antiguedad tiene en su trabajo:</label>
            <input
              type="text"
              id="tiempo_trabajo"
              value={formData.tiempo_trabajo}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="informacion_complementaria">¿En que área le gustaría recibir información complementaria?:</label>
            <input
              type="text"
              id="informacion_complementaria"
              value={formData.informacion_complementaria}
              onChange={handleChange}
            />
          </div>
          <div>
          <label htmlFor="estudio_actual">¿Actualmente estudia?:</label>
            <select
            id="estudio_actual"
            value={formData.estudio_actual}
            onChange={handleChange}>
                <option>Seleccione una opción</option>
                <option>Si</option>
                <option>No</option>
            </select>
          </div>
          <div>
            <label htmlFor="estudios_actualmente">¿Qué se encuentra estudiando?:</label>
            <input
              type="text"
              id="estudios_actualmente"
              value={formData.estudios_actualmente}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="universidad">Nombre de la institución o universidad :</label>
            <input
              type="text"
              id="universidad"
              value={formData.universidad}
              onChange={handleChange}
            />
          </div>
          <div>
          <label htmlFor="certificacion">¿Requiere certificar sus competencias laborales?:</label>
            <select
            id="certificacion"
            value={formData.certificacion}
            onChange={handleChange}>
                <option>Seleccione una opción</option>
                <option>Si</option>
                <option>No</option>
            </select>
          </div>
          <div>
          <label htmlFor="servicio_nacional_empleo">¿Conoce los beneficios que ofrece el SENA a través del servicio nacional de empleo?:</label>
            <select
            id="servicio_nacional_empleo"
            value={formData.servicio_nacional_empleo}
            onChange={handleChange}>
                <option>Seleccione una opción</option>
                <option>Si</option>
                <option>No</option>
            </select>
          </div>
          <div>
          <label htmlFor="idea_negocio">¿Tiene una idea de negocio?:</label>
            <select
            id="idea_negocio"
            value={formData.idea_negocio}
            onChange={handleChange}>
                <option>Seleccione una opción</option>
                <option>Si</option>
                <option>No</option>
            </select>
          </div><div>
          <label htmlFor="fondo_emprender">¿Conoce el servicio que presta el SENA a través del fondo emprender?:</label>
            <select
            id="fondo_emprender"
            value={formData.fondo_emprender}
            onChange={handleChange}>
                <option>Seleccione una opción</option>
                <option>Si</option>
                <option>No</option>
            </select>
          </div>
          <div>
          <label htmlFor="empleo">¿En la actualidad necesita empleo?:</label>
            <select 
            id="empleo"
            value={formData.empleo}
            onChange={handleChange}>
                <option>Seleccione una opción</option>
                <option>Si</option>
                <option>No</option>
            </select>
          </div>
          <div>
            <label htmlFor="sugerencias">Sugerencias o comentarios:</label>
            <textarea
              type="text"
              id="sugerencias"
              value={formData.sugerencias}
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
