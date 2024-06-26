import { Fragment } from "react";
import Header from "../layout/Header";
import MainSection from "../layout/MainSection";

import logo from '../../img/logo-sena.png'
import '../../css/styleaprendiz.css'

import React, { useState, useEffect } from 'react';
import clienteAxios from '../../config/axios';
import Swal from 'sweetalert2'
import Apps from "../layout/menu/App";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
function InfoAprediz(props) {

  //Extrae la propiedad numero de ficha
  const { id, ficha } = props.match.params;

  const {token} = useAuth()
  const initialState = {
    ficha: '',
    nombres: '',
    apellidos: '',
    tipo_documento: '',
    numero_documento: '',
    fecha_expedicion: '',
    lugar_expedicion: '',
    fecha_nacimiento: '',
    sexo: '',
    direccion_domicilio: '',
    municipio: '',
    departamento: '',
    numero_celular1: '',
    numero_celular2: '',
    telefono_fijo: '',
    correo_principal: '',
    correo_secundario: '',
    finalizacion_etapa_lectiva: '',
    estado_aprobacion: '',
    empresa: '',
  };

  const [aprendiz, setAprendiz] = useState([]);
  const [aprendices, setAprendices] = useState([]);

  //datos de la empresa
  const [empresa, dataEmpresa] = useState([])
  const [modoEdicion, setModoEdicion] = useState(false);
  const [idEditar, setIdEditar] = useState(null);

  useEffect(() => {
    const obtenerAprendices = async () => {
      try {
        const consultarApi = await clienteAxios.get(`/api/aprendices/${id}`, {
          headers: {
            Authorization: `Token ${token}`,
          },
        });
        setAprendiz(consultarApi.data);
        dataEmpresa(consultarApi.data.empresa)

       
      } catch (error) {
        console.error('Error al obtener los aprendices:', error);
      }
    };

    obtenerAprendices();
  }, []);

  const visita1Realizada = aprendiz && aprendiz.visitas && aprendiz.visitas.includes(1);
  const visita2Realizada = aprendiz && aprendiz.visitas && aprendiz.visitas.includes(2);
  const visita3Realizada = aprendiz && aprendiz.visitas && aprendiz.visitas.includes(3);

  const [activeButton, setActiveButton] = useState(null);

  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);

  };

  const editarAprendiz = (id) => {
   
   
    Swal.fire({
      title: 'Actualizar Datos Aprendiz',
      html: `
      <div class="swal2-actions">
      <label class="swal2-label" for="numero_ficha">Numero de ficha:</label>
      <input type="text" id="numero_ficha" class="swal2-input" value="${aprendiz.ficha.numero_ficha}" placeholder="Numero de ficha" readonly>
      <label class="swal2-label" for="nombres">Nombres:</label>
      <input type="text" id="nombres" class="swal2-input" value="${aprendiz.nombres}" placeholder="Nombres">
      <label class="swal2-label" for="apellidos">Apellidos:</label>
      <input type="text" id="apellidos" class="swal2-input" value="${aprendiz.apellidos}" placeholder="Apellidos">
      <label class="swal2-label" for="numero_documento">Numero de documento:</label>
      <input type="text" id="numero_documento" class="swal2-input" value="${aprendiz.numero_documento}" placeholder="Numero de documento" readonly>
     
      <label class="swal2-label" for="tipo_documento">Tipo de documento:</label>
      <input type="text" id="tipo_documento" class="swal2-input" value="${aprendiz.tipo_documento}" placeholder="Tipo de documento" readonly>
      <label class="swal2-label" for="fecha_expedicion">Fecha de expedicion:</label>
      <input type="date" id="fecha_expedicion" class="date-form-aprendiz" value="${aprendiz.fecha_expedicion}" placeholder="Fecha de expedicion">
      <label class="swal2-label" for="lugar_expedicion">Lugar de expedicion:</label>
      <input type="text" id="lugar_expedicion" class="swal2-input" value="${aprendiz.lugar_expedicion}" placeholder="Lugar de expedicion">
      <label class="swal2-label" for="fecha_nacimiento">Fecha de nacimiento:</label>
      <input type="date" id="fecha_nacimiento" class="date-form-aprendiz" value="${aprendiz.fecha_nacimiento}" placeholder="Fecha de nacimiento">
      <label class="swal2-label" for="sexo">Sexo:</label>
      <input type="text" id="sexo" class="swal2-input" value="${aprendiz.sexo}" placeholder="Sexo">
      <label class="swal2-label" for="direccion_domicilio">Dirección domicilio:</label>
      <input type="text" id="direccion_domicilio" class="swal2-input" value="${aprendiz.direccion_domicilio}" placeholder="Domicilio">
      <label class="swal2-label" for="municipio">Municipio:</label>
      <input type="text" id="municipio" class="swal2-input" value="${aprendiz.municipio}" placeholder="Municipio">
      <label class="swal2-label" for="departamento">Departamento:</label>
      <input type="text" id="departamento" class="swal2-input" value="${aprendiz.departamento}" placeholder="Departamento">
      <label class="swal2-label" for="numero_celular1">Numero celular 1:</label>
      <input type="text" id="numero_celular1" class="swal2-input" value="${aprendiz.numero_celular1}" placeholder="Celular 1">
      <label class="swal2-label" for="numero_celular2">Numero celular 2:</label>
      <input type="text" id="numero_celular2" class="swal2-input" value="${aprendiz.numero_celular2}" placeholder="Celular 2">
      <label class="swal2-label" for="telefono_fijo">Telefono fijo:</label>
      <input type="text" id="telefono_fijo" class="swal2-input" value="${aprendiz.telefono_fijo}" placeholder="Telefono fijo">
      <label class="swal2-label" for="correo_principal">Correo principal:</label>
      <input type="email" id="correo_principal" class="email-form-aprendiz" value="${aprendiz.correo_principal}" placeholder="Correo principal">
      <label class="swal2-label" for="correo_secundario">Correo secundario:</label>
      <input type="email" id="correo_secundario" class="email-form-aprendiz" value="${aprendiz.correo_secundario}" placeholder="Correo secundario">
      <label class="swal2-label" for="finalizacion_etapa_lectiva">Finalizacion etapa lectiva:</label>
      <input type="date" id="finalizacion_etapa_lectiva" class="date-form-aprendiz" value="${aprendiz.finalizacion_etapa_lectiva}" placeholder="Finalizacion etapa lectiva">
    
     
      <p>Datos de la empresa</p>
      <label class="swal2-label" for="nit">Nit:</label>
      <input type="text" id="nit" class="swal2-input" value="${aprendiz.empresa.nit}" placeholder="Nit">
      <label class="swal2-label" for="razon_social">Razon social:</label>
      <input type="text" id="razon_social" class="swal2-input" value="${aprendiz.empresa.razon_social}" placeholder="Razon social">
      <label class="swal2-label" for="nombre_jefe_inmediato">Nombre jefe inmediato:</label>
      <input type="text" id="nombre_jefe_inmediato" class="swal2-input" value="${aprendiz.empresa.nombre_jefe_inmediato}" placeholder="Nombre jefe inmediato">
      <label class="swal2-label" for="correo">Correo:</label>
      <input type="email" id="correo" class="email-form-aprendiz" value="${aprendiz.empresa.correo}" placeholder="Correo">
      <label class="swal2-label" for="telefono">Telefono:</label>
      <input type="text" id="telefono" class="swal2-input" value="${aprendiz.empresa.telefono}" placeholder="Telefono">
      <label class="swal2-label" for="direccion">Direccion:</label>
      <input type="text" id="direccion" class="swal2-input" value="${aprendiz.empresa.direccion}" placeholder="Direccion">
      </div>
    `,
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Guardar',
      cancelButtonText: 'Cancelar',
      preConfirm: async () => {
        // Obtener los valores actualizados del formulario
        const nombres = Swal.getPopup().querySelector('#nombres').value;
        const apellidos = Swal.getPopup().querySelector('#apellidos').value;
        const numeroDocumento = Swal.getPopup().querySelector('#numero_documento').value;
        const tipoDocumento = Swal.getPopup().querySelector('#tipo_documento').value;
        const numeroFicha = Swal.getPopup().querySelector('#numero_ficha').value;
        const fechaExpedicion = Swal.getPopup().querySelector('#fecha_expedicion').value;
        const lugarExpedicion = Swal.getPopup().querySelector('#lugar_expedicion').value;
        const fechaNacimiento = Swal.getPopup().querySelector('#fecha_nacimiento').value;
        const sexo = Swal.getPopup().querySelector('#sexo').value;
        const direccionDomicilio = Swal.getPopup().querySelector('#direccion_domicilio').value;
        const municipio = Swal.getPopup().querySelector('#municipio').value;
        const departamento = Swal.getPopup().querySelector('#departamento').value;
        const numeroCelular1 = Swal.getPopup().querySelector('#numero_celular1').value;
        const numeroCelular2 = Swal.getPopup().querySelector('#numero_celular2').value;
        const telefonoFijo = Swal.getPopup().querySelector('#telefono_fijo').value;
        const correoPrincipal = Swal.getPopup().querySelector('#correo_principal').value;
        const correoSecundario = Swal.getPopup().querySelector('#correo_secundario').value;
        const finalizacionLectiva = Swal.getPopup().querySelector('#finalizacion_etapa_lectiva').value;
        
        const nit = Swal.getPopup().querySelector('#nit').value;
        const razonSocial = Swal.getPopup().querySelector('#razon_social').value;
        const nombreJefeInmediato = Swal.getPopup().querySelector('#nombre_jefe_inmediato').value;
        const correo = Swal.getPopup().querySelector('#correo').value;
        const telefono = Swal.getPopup().querySelector('#telefono').value;
        const direccion = Swal.getPopup().querySelector('#direccion').value;


        const aprendizEditado = {
          nombres: nombres,
          apellidos: apellidos,
          numero_documento: numeroDocumento,
          tipo_documento: tipoDocumento,
          numero_ficha: numeroFicha,
          fecha_expedicion: fechaExpedicion,
          lugar_expedicion: lugarExpedicion,
          fecha_nacimiento: fechaNacimiento,
          sexo: sexo,
          direccion_domicilio: direccionDomicilio,
          municipio: municipio,
          departamento: departamento,
          numero_celular1: numeroCelular1,
          numero_celular2: numeroCelular2,
          telefono_fijo: telefonoFijo,
          correo_principal: correoPrincipal,
          correo_secundario: correoSecundario,
          finalizacion_etapa_lectiva: finalizacionLectiva,
         
          empresa: {
            nit: nit,
            razon_social: razonSocial,
            nombre_jefe_inmediato: nombreJefeInmediato,
            correo: correo,
            telefono: telefono,
            direccion: direccion,
          }
        }
        await clienteAxios.put(`/api/aprendices/${id}/`, aprendizEditado, {
          headers: {
              Authorization: `Token ${token}`
          }
      });
        Swal.fire('¡Cambios guardados!', '', 'success');
        window.location.reload();
        
      }
    });

  };
  
  return (

    <Fragment>
      <Apps />
      <Header />
      <main className="container container__scroll">
        <div className="btn-group">
          <Link to={`/formato-etapa-productiva/${id}/${'Planeacion'}`}
            className={`btn btn-success ${activeButton === 'Planeación' ? 'active' : ''}`}
            onClick={() => handleButtonClick('Planeación')}
          >
            Planeación
          </Link>
          <Link to={`/formato-etapa-productiva/${id}/${'Seguimiento'}`}
            className={`btn  btn-success ${activeButton === 'Seguimiento' ? 'active' : ''}`}
            onClick={() => handleButtonClick('Seguimiento')}
          >
            Seguimiento
          </Link>
          <Link to={`/formato-etapa-productiva/${id}/${'Evaluacion'}`}
            className={`btn  btn-success ${activeButton === 'Evaluación' ? 'active' : ''}`}
            onClick={() => handleButtonClick('Evaluación')}
          >
            Evaluación
          </Link>
          <Link to={`/documentos-aprendiz/${id}`}
            className={`btn  btn-success ${activeButton === 'Documentación' ? 'active' : ''}`}
            onClick={() => handleButtonClick('Documentación')}
          >
            Documentación
          </Link>
          <Link to={`/bitacora-aprendiz/${id}`}
            className={`btn  btn-success ${activeButton === 'Bitacoras' ? 'active' : ''}`}
            onClick={() => handleButtonClick('Bitacoras')}
          >
            Bitácoras
          </Link>
        </div>
        <MainSection />
        <div className="btn-editar-info">
        <button id="btn btn-success" onClick={() => editarAprendiz(id)}>
                        Actualizar Datos
                      </button>
        </div>
        
        
        <section class="informacion-aprendiz">
          
          <div class="info-formacion">


            <div class="nombre-documento">
              <img src={logo} alt="Logo-sena" />
              <p class="nombre-aprendiz">
                <b>{aprendiz.nombres} {aprendiz.apellidos}</b> <br></br>
                <b>CC:</b> {aprendiz.numero_documento}</p>
            </div>

            <div class="info-ficha">
              <p><b>Ficha:</b> {aprendiz.ficha?.numero_ficha || ''}

                <br></br>

                <b>Etapa Productiva:</b> {aprendiz.finalizacion_etapa_lectiva}</p>
            </div>
          </div>

          <div class="container-datos-aprendiz">
            <div class="input-field">
              <label for="tipoDocumento">Tipo de Documento:</label>
              <input type="text" id="tipoDocumento" value={aprendiz.tipo_documento} readOnly />
            </div>

            <div class="input-field">
              <label for="fechaExpedicion">Fecha de Expedición:</label>
              <input type="text" id="fechaExpedicion" value={aprendiz.fecha_expedicion} readOnly />
            </div>

            <div class="input-field">
              <label for="lugarExpedicion">Lugar de Expedición:</label>
              <input type="text" id="lugarExpedicion" value={aprendiz.lugar_expedicion} readOnly />
            </div>

            <div class="input-field">
              <label for="fechaNacimiento">Fecha de Nacimiento:</label>
              <input type="text" id="fechaNacimiento" value={aprendiz.fecha_nacimiento} readOnly />
            </div>

            <div class="input-field">
              <label for="sexo">Sexo:</label>
              <input type="text" id="sexo" value={aprendiz.sexo} readOnly />
            </div>

            <div class="input-field">
              <label for="direccion">Dirección de Domicilio:</label>
              <input type="text" id="direccion" value={aprendiz.direccion_domicilio} readOnly />
            </div>

            <div class="input-field">
              <label for="municipio">Municipio:</label>
              <input type="text" id="municipio" value={aprendiz.municipio} readOnly />
            </div>

            <div class="input-field">
              <label for="departamento">Departamento:</label>
              <input type="text" id="departamento" value={aprendiz.departamento} readOnly />
            </div>

            <div class="input-field">
              <label for="telefonoFijo">Teléfono Fijo:</label>
              <input type="text" id="telefonoFijo" value={aprendiz.telefono_fijo} readOnly />
            </div>

            <div class="input-field">
              <label for="telefonoCelular">Teléfono Celular:</label>
              <input type="text" id="telefonoCelular" value={aprendiz.numero_celular1} readOnly />
            </div>

            <div class="input-field">
              <label for="correo">Correo Electrónico:</label>
              <input type="text" id="correo" value={aprendiz.correo_principal} readOnly />
            </div>

            <div class="input-field">
              <label for="correoSecundario">Correo Electrónico Secundario:</label>
              <input type="text" id="correoSecundario" value={aprendiz.correo_secundario} readOnly />
            </div>


            <div class="input-field">
              <label for="visita1">Visita 1:</label>
              <input type="text" id="visita1" value={visita1Realizada ? "Realizada" : "Pendiente"} readOnly />
            </div>

            <div class="input-field">
              <label for="visita2">Visita 2:</label>
              <input type="text" id="visita2" value={visita2Realizada ? "Realizada" : "Pendiente"} readOnly />
            </div>

            <div class="input-field">
              <label for="visita3">Visita 3:</label>
              <input type="text" id="visita3" value={visita3Realizada ? "Realizada" : "Pendiente"} readOnly />
            </div>
          </div>


        </section>

        <section className="informacion-aprendiz">
          <h4 className="titulo-empresa">Datos de la Empresa</h4>
          <div className="container-datos-aprendiz">
            <div class="input-field">
              <label for="correoSecundario">Empresa:</label>
              <input type="text" id="correoSecundario" value={empresa.razon_social} readOnly />
            </div>
            <div class="input-field">
              <label for="correoSecundario">Nit</label>
              <input type="text" id="correoSecundario" value={empresa.nit} readOnly />
            </div>
            <div class="input-field">
              <label for="correoSecundario">Jefe Inmediato</label>
              <input type="text" id="correoSecundario" value={empresa.nombre_jefe_inmediato} readOnly />
            </div>
            <div class="input-field">
              <label for="correoSecundario">Dirección</label>
              <input type="text" id="correoSecundario" value={empresa.direccion} readOnly />
            </div>
            <div class="input-field">
              <label for="correoSecundario">Correo</label>
              <input type="text" id="correoSecundario" value={empresa.correo} readOnly />
            </div>
            <div class="input-field">
              <label for="correoSecundario">Telefono</label>
              <input type="text" id="correoSecundario" value={empresa.telefono} readOnly />
            </div>
          </div>

         
        
        </section>


      </main>

    </Fragment>
  )
}
export default InfoAprediz;