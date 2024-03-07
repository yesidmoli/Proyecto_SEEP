import { Fragment } from "react";
import Header from "../layout/Header";
import MainSection from "../layout/MainSection";

import logo from '../../img/logo-sena.png'
import '../../css/styleaprendiz.css'

import React, { useState, useEffect } from 'react';
import clienteAxios from '../../config/axios';
import Swal from 'sweetalert2'
import Apps from "../layout/menu/App";
function InfoAprediz(props){
   
 //Extrae la propiedad numero de ficha
 const {id, ficha} = props.match.params;

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
    empresa :'',
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
        const consultarApi = await clienteAxios.get(`/api/aprendices/${id}`);
        setAprendiz(consultarApi.data);
        dataEmpresa(consultarApi.data.empresa)

        console.log("Este es el aprendiz" ,consultarApi.data )
      } catch (error) {
        console.error('Error al obtener los aprendices:', error);
      }
    };

    obtenerAprendices();
  }, []); 

  const visita1Realizada = aprendiz && aprendiz.visitas && aprendiz.visitas.includes(1);
  const visita2Realizada = aprendiz && aprendiz.visitas && aprendiz.visitas.includes(2);
  const visita3Realizada = aprendiz && aprendiz.visitas && aprendiz.visitas.includes(3);
  
    return(

        <Fragment>
            <Apps />
            <Header />
            <main className="container">
            <MainSection />
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
                            <input type="text" id="tipoDocumento" value={aprendiz.tipo_documento} readOnly/>
                        </div>
                
                        <div class="input-field">
                            <label for="fechaExpedicion">Fecha de Expedición:</label>
                            <input type="text" id="fechaExpedicion" value={aprendiz.fecha_expedicion} readOnly/>
                        </div>
                
                        <div class="input-field">
                            <label for="lugarExpedicion">Lugar de Expedición:</label>
                            <input type="text" id="lugarExpedicion" value={aprendiz.lugar_expedicion} readOnly/>
                        </div>
                
                        <div class="input-field">
                            <label for="fechaNacimiento">Fecha de Nacimiento:</label>
                            <input type="text" id="fechaNacimiento" value={aprendiz.fecha_nacimiento} readOnly/>
                        </div>
                
                        <div class="input-field">
                            <label for="sexo">Sexo:</label>
                            <input type="text" id="sexo" value={aprendiz.sexo} readOnly/>
                        </div>
                
                        <div class="input-field">
                            <label for="direccion">Dirección de Domicilio:</label>
                            <input type="text" id="direccion" value={aprendiz.direccion_domicilio} readOnly/>
                        </div>
                
                        <div class="input-field">
                            <label for="municipio">Municipio:</label>
                            <input type="text" id="municipio" value={aprendiz.municipio} readOnly/>
                        </div>
                
                        <div class="input-field">
                            <label for="departamento">Departamento:</label>
                            <input type="text" id="departamento" value={aprendiz.departamento} readOnly/>
                        </div>
                
                        <div class="input-field">
                            <label for="telefonoFijo">Teléfono Fijo:</label>
                            <input type="text" id="telefonoFijo" value={aprendiz.telefono_fijo} readOnly/>
                        </div>
                
                        <div class="input-field">
                            <label for="telefonoCelular">Teléfono Celular:</label>
                            <input type="text" id="telefonoCelular" value={aprendiz.numero_celular1} readOnly/>
                        </div>
                
                        <div class="input-field">
                            <label for="correo">Correo Electrónico:</label>
                            <input type="text" id="correo" value={aprendiz.correo_principal} readOnly/>
                        </div>
                
                        <div class="input-field">
                            <label for="correoSecundario">Correo Electrónico Secundario:</label>
                            <input type="text" id="correoSecundario" value={aprendiz.correo_secundario} readOnly/>
                        </div>
                
                
                        <div class="input-field">
                            <label for="visita1">Visita 1:</label>
                            <input type="text" id="visita1" value={visita1Realizada ? "Realizada" : "Pendiente"} readOnly/>
                        </div>
                
                        <div class="input-field">
                            <label for="visita2">Visita 2:</label>
                            <input type="text" id="visita2" value={visita2Realizada ? "Realizada" : "Pendiente"} readOnly/>
                        </div>
                
                        <div class="input-field">
                            <label for="visita3">Visita 3:</label>
                            <input type="text" id="visita3" value={visita3Realizada ? "Realizada" : "Pendiente"} readOnly/>
                        </div>
                    </div>
                    

            </section>

            <section className="informacion-aprendiz">
                <h4 className="titulo-empresa">Datos de la Empresa</h4>
            <div className="container-datos-aprendiz">
            <div class="input-field">
                            <label for="correoSecundario">Empresa:</label>
                            <input type="text" id="correoSecundario" value={empresa.razon_social} readOnly/>
                        </div>
                        <div class="input-field">
                            <label for="correoSecundario">Nit</label>
                            <input type="text" id="correoSecundario" value={empresa.nit} readOnly/>
                        </div>
                        <div class="input-field">
                            <label for="correoSecundario">Jefe Inmediato</label>
                            <input type="text" id="correoSecundario" value={empresa.nombre_jefe_inmediato} readOnly/>
                        </div>
                        <div class="input-field">
                            <label for="correoSecundario">Dirección</label>
                            <input type="text" id="correoSecundario" value={empresa.direccion} readOnly/>
                        </div>
                        <div class="input-field">
                            <label for="correoSecundario">Correo</label>
                            <input type="text" id="correoSecundario" value={empresa.correo} readOnly/>
                        </div>
                        <div class="input-field">
                            <label for="correoSecundario">Telefono</label>
                            <input type="text" id="correoSecundario" value={empresa.telefono} readOnly/>
                        </div>
                        </div>
                    </section>
            

            </main>

        </Fragment>
       )
}
export default InfoAprediz;