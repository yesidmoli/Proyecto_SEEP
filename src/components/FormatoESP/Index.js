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
import { set } from "date-fns";
import Apps from '../layout/menu/App';
import { useAuth } from "../context/AuthContext";

function FormartoEtapaProductiva(props) {

  const { componente } = useParams();
  console.log("este es el para", componente)

  const { id } = props.match.params;
  const {token}=useAuth()

  const history = useHistory();

  const [currentComponent, setCurrentComponent] = useState("Planeacion");


  // estado para  guardar los datos del formato
  const [datosFormatoPrincipal, setDatosFormatoPrincipla] = useState({
    "ciudad": "Dosquebradas",
    "fecha_elaboracion": "2024-02-29",
    "aprendiz": id
  })

  console.log("Datos formato principal", datosFormatoPrincipal)

  //creamos un estado para guardar el id, si al consultar la api, el aprendiz ya tiene un formato creado

  const [idFormato, setIdFormato] = useState(null)

   console.log("este es el id", idFormato)


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

  
  //funcion para enviar el formato
  // const handleFormSubmit = async () => {
  //   try {
  //     if (idFormato) {
  //       // Si existe un ID en el formData, significa que ya existe un registro y debemos actualizarlo
  //       await clienteAxios.put(`/api/formato/principal/${idFormato}/`, datosFormatoPrincipal);
  //       // Actualiza los datos existentes
  //     } else {
  //       //Actualizamos formData con el id del aprendiz, para que no hayan errores de nulidad
  //       // Si no existe un ID en el formData, significa que es un nuevo registro y debemos crearlo
  //       await clienteAxios.post('/api/formato/principal/', datosFormatoPrincipal); // Crea nuevos datos
  //     }
  //     // Manejar éxito de la solicitud si es necesario
  //     console.log('Datos enviados correctamente');
  //     Swal.fire({
  //       title: "Exitoso",
  //       text: "Datos guardados correctamente!",
  //       icon: "success"
  //     });
  //   } catch (error) {
  //     // Manejar errores de la solicitud si es necesario
  //     console.error('Error al enviar los datos:', error);
  //     let errorMessage = "Error al enviar los datos:";
      
  //     Swal.fire("Error", errorMessage, "error");
  //   }
  // };



  const components = {
    Planeacion: <PlaneacionEP goToNextComponent={goToNextComponent}  id={id} />,
    Seguimiento: <SeguimientoEP goToNextComponent={goToNextComponent}  id={id} />,
    Evaluacion: <EvaluacionEP goToNextComponent={goToNextComponent} id={id} />
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
        const response = await clienteAxios.get(`/api/formato/principal/?aprendiz_id=${id}`, {
          headers: {
              Authorization: `Token ${token}`
          }
      });
        const responseData = response.data;

        console.log("estos son los datos", responseData)
        if (responseData.length > 0) {
          const data = responseData[0];
          setDatosFormatoPrincipla(data);
          setIdFormato(data.id)
        }

      } catch (error) {
        // if (error.response && error.response.status === 404) {
        //   resetFormData();
        // }
        console.error('Error al obtener los datos de la API:', error);
      }
    };

    fetchData();

  }, [idFormato, id]);


  return (
    <Fragment>
      <Header />
      <Apps />
      <div className="container">

        <Link to={"#"} aria-label="icon" className=" btn-atras btn-atras__modificado" onClick={() => history.goBack()}>
          <img src={atras}></img>

          <b>Regresar</b>
        </Link>
        <MainSection />
       

        <div className="btns-sigue-atras">
          <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
            <Link className="btn btn-visualizar-formato" to={`/formato-etapa-productiva-pdf/${id}`} >Visualizar Formato</Link>
          </div>

          <div>

            {/* <div className="paginacion-formato">
        <span className="span-paginacion" aria-hidden="true">  </span>
        <span className="span-paginacion"  aria-hidden="true">&raquo;</span>
        </div> */}
            <ul class="pagination">
              <li onClick={handlePrevious} disabled={currentComponent === "Planeacion"} class="page-item">
                <a class="page-link" href="#" aria-label="Previous">
                  <span aria-hidden="true">&laquo;</span>
                </a>
              </li>
      
              <li onClick={handleNext} disabled={currentComponent === "Evaluacion"} class="page-item">
                <a class="page-link" href="#" aria-label="Next">
                  <span aria-hidden="true">&raquo;</span>
                </a>
              </li>
            </ul>




            <button className="btn-ant-desp" onClick={handlePrevious} disabled={currentComponent === "Planeacion"}>
              Anterior
            </button>{" "}
            {/* Botón para retroceder al componente anterior */}
            <button  className="btn-ant-desp"  onClick={handleNext} disabled={currentComponent === "Evaluacion"}>
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
