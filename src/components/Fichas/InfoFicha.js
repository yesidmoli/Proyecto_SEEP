import React from 'react';

import '../../../src/css/styleinicio.css'
//imagenes
import logoSena from '../../img/sena-logo.svg'
import '../layout/Header';
import '../layout/MainSection';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

const InfoFicha = ({ficha }) => {

  //extraemos los valores de l BD
  const {id, numero_ficha, nombre_programa, nivel_formacion} = ficha;

  return (
    <Link  className="ficha-info" to={`/lista-aprendices/${numero_ficha}/${nombre_programa}`}>
    <div className="rectangulo-ficha">
      <div className="logo-info">
        <img src={logoSena} width="90" alt="lista" />
      </div>
      <div className="texto-info">
        <Link className="title1" to={`/lista-aprendices/${numero_ficha}/${nombre_programa}`}>
          {nombre_programa}
        </Link>
        <p className="title2">{nombre_programa}</p>
        <p className="aprendiz">{nivel_formacion}</p>
        <div className="codigo-ficha">
          <p className="ficha">Ficha:</p>
          <p className="numero-ficha">{numero_ficha}</p>
        </div>
      </div>
    </div>
    </Link>
  );
}

export default InfoFicha;
