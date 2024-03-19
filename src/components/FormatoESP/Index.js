import React, { useEffect, useState } from "react";
import { Fragment } from "react";
import PlaneacionEP from "./PlaneacionEP";
import SeguimientoEP from "./SegumientoEP";
import EvaluacionEP from "./EvaluacionEP";
import atras from '../../img/atras.png'
import MainSection from "../layout/MainSection";
import Header from "../layout/Header";
import clienteAxios from "../../config/axios";

import { useFormContext } from "./FormProvide";
import { Link, useHistory, Redirect } from "react-router-dom";
import Swal from "sweetalert2";

import { useParams } from "react-router-dom";

function FormartoEtapaProductiva(props) {

  const { componente } = useParams();
  console.log("este es el para", componente)

  const { id } = props.match.params;

  const history = useHistory();

  const [currentComponent, setCurrentComponent] = useState("Planeacion");

  const { formData, updateFormData, resetFormData } = useFormContext();


  //datos que llegan desde el componente hijo planeacion

  // const [planeacion , dataPlaneacion] = useState({})
  // const [seguimiento , dataSeguimiento] = useState({})
  // const [evaluacion , dataEvaluacion] = useState({})


  // const[formatoData, dataFormato] = useState({

  //   "planeacion": planeacion,
  //   "seguimiento": seguimiento,
  //   "evaluacion": evaluacion,
  //   "ciudad": "Dosquebradas",
  //   "fecha_elaboracion": "2024-02-29",
  //   "aprendiz": id
  // })


  // console.log("Toda la data", {
  //   planeacion:planeacion,
  //   segui:seguimiento,
  //   evaluaci:evaluacion
  // })

  //definimos un estado para enviar los datos del formato para su creacion, estos los obtenemos del contexto
  const [datosFormato, setDatosFormato] = useState({

    "planeacion": formData.planeacion,
    "seguimiento": formData.seguimiento,
    "evaluacion": formData.evaluacion,
    "ciudad": "Dosquebradas",
    "fecha_elaboracion": "2024-02-29",
    "aprendiz": id

  })

  console.log("Datos formato", datosFormato)
  const [gurdarFormato, guardarDatosFormato] = useState(false)

  useEffect(() => {
    setDatosFormato({
      planeacion: formData.planeacion,
      seguimiento: formData.seguimiento,
      evaluacion: formData.evaluacion,
      ciudad: formData.ciudad || "Dosquebradas",
      fecha_elaboracion: formData.fecha_elaboracion || "2024-02-29",
      aprendiz: formData.aprendiz || id
    });
  }, [formData]);


  useEffect(() => {
    // Validar que el componente pasado como parámetro sea uno de los permitidos
    if (["Planeacion", "Seguimiento", "Evaluacion"].includes(componente)) {
      setCurrentComponent(componente);
    } else {
      // Si el componente no es válido, establecer un valor predeterminado
      setCurrentComponent("Planeacion");
    }
  }, [componente]);



  const goToNextComponent = (data) => {
    if (currentComponent === "Planeacion") {
      setCurrentComponent("Seguimiento");

      // dataPlaneacion(data)
    } else if (currentComponent === "Seguimiento") {
      setCurrentComponent("Evaluacion");
      // dataSeguimiento(data)
    } else if (currentComponent === "Evaluacion") {
      // dataEvaluacion(data)

    }
  };

  const components = {
    Planeacion: <PlaneacionEP goToNextComponent={goToNextComponent} data={datosFormato.planeacion} />,
    Seguimiento: <SeguimientoEP goToNextComponent={goToNextComponent} data={datosFormato.seguimiento} />,
    Evaluacion: <EvaluacionEP goToNextComponent={goToNextComponent} data={datosFormato.evaluacion} />
  };



  const handleNext = () => {
    if (currentComponent === "Planeacion") {
      setCurrentComponent("Seguimiento");
    } else if (currentComponent === "Seguimiento") {
      setCurrentComponent("Evaluacion");
    }
  };

  const handlePrevious = () => {
    if (currentComponent === "Seguimiento") {
      setCurrentComponent("Planeacion");
    } else if (currentComponent === "Evaluacion") {
      setCurrentComponent("Seguimiento");
    }
  };
  const reiniciarPage = () => {
    // Recargar la página actual
    window.location.reload();
  };




  useEffect(() => {
    const fetchData = async () => {

      try {
        const response = await clienteAxios.get(`/api/formato/?aprendiz_id=${id}`);
        const responseData = response.data;
        if (responseData.length > 0) {
          const data = responseData[0];
          // setDatosFormato(data);
          updateFormData('seguimiento', data.seguimiento);
          updateFormData('planeacion', data.planeacion);
          updateFormData('evaluacion', data.evaluacion);
          updateFormData('id', data.id);
          updateFormData('ciudad', data.ciudad);
          updateFormData('fecha_elaboracion', data.fecha_elaboracion);
          updateFormData('aprendiz', data.aprendiz); // Actualizar el contexto con los datos obtenidos de la API
        }

      } catch (error) {
        if (error.response && error.response.status === 404) {
          resetFormData();
        }
        console.error('Error al obtener los datos de la API:', error);
      }
    };

    fetchData();

  }, []);







  const handleFormSubmit = async () => {
    try {
      if (formData.id) {
        // Si existe un ID en el formData, significa que ya existe un registro y debemos actualizarlo
        await clienteAxios.put(`/api/formato/${formData.id}/`, formData);
        // Actualiza los datos existentes
      } else {
        //Actualizamos formData con el id del aprendiz, para que no hayan errores de nulidad

        console.log("datooooooo", datosFormato)
        // Si no existe un ID en el formData, significa que es un nuevo registro y debemos crearlo
        await clienteAxios.post('/api/formato/', datosFormato); // Crea nuevos datos
      }
      // Manejar éxito de la solicitud si es necesario
      console.log('Datos enviados correctamente');
      Swal.fire({
        title: "Exitoso",
        text: "Datos guardados correctamente!",
        icon: "success"
      });
    } catch (error) {
      // Manejar errores de la solicitud si es necesario
      console.error('Error al enviar los datos:', error);
      let errorMessage = "Error al enviar los datos:";
      if (error.response && error.response.data) {
        const { data } = error.response;
        // Verificar si hay mensajes de error en la respuesta
        if (data.evaluacion) {
          errorMessage += `\n- Evaluación: ${data.evaluacion.join(", ")}`;
        }
        if (data.planeacion) {
          errorMessage += `\n- Planeación: ${data.planeacion.join(", ")}`;
        }
        if (data.seguimiento) {
          errorMessage += `\n- Seguimiento: ${data.seguimiento.join(", ")}`;
        }
      } else {
        errorMessage += `\n- ${error.message}`;
      }
      Swal.fire("Error", errorMessage, "error");
    }
  };


  return (
    <Fragment>
      <Header />
      <div className="container">

        <Link to={"#"} aria-label="icon" className=" btn-atras" onClick={() => history.goBack()}>
          <img src={atras}></img>

          <b>Regresar</b>
        </Link>
        <MainSection />

        <div className="btns-sigue-atras">
          <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
            <button onClick={handleFormSubmit}>Guardar Formato</button>
            <Link className="btn btn-visualizar-formato" to={`/formato-etapa-productiva-pdf/${id}`} >Visualizar Formato</Link>
          </div>

          <div>
            <button onClick={handlePrevious} disabled={currentComponent === "Planeacion"}>
              Anterior
            </button>{" "}
            {/* Botón para retroceder al componente anterior */}
            <button onClick={handleNext} disabled={currentComponent === "Evaluacion"}>
              Siguiente
            </button>{" "}
            {/* Botón para avanzar al siguiente componente */}
          </div>
        </div>
        {components[currentComponent]} {/* Mostrar el componente actual según el estado currentComponent */}


      </div>
    </Fragment>
  );
}

export default FormartoEtapaProductiva;
