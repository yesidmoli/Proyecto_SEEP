import React from 'react';

import '../../../src/css/styleinicio.css'
//imagenes
import logoSena from '../../img/logoSenaNa.png'
import '../layout/Header';
import '../layout/MainSection';

const InfoFicha = ({ficha }) => {

  //extraemos los valores de l BD
  const {id, numero_ficha, nombre_programa, nivel_formacion} = ficha;

  return (
    <div className="rectangulo-ficha">
      <div className="logo-info">
        <img src={logoSena} width="90" alt="lista" />
      </div>
      <div className="texto-info">
        <a className="title1" href={`/lista-aprendices/${numero_ficha}`}>
          {nombre_programa}
        </a>
        <p className="title2">{nombre_programa}</p>
        <p className="aprendiz">{nivel_formacion}</p>
        <div className="codigo-ficha">
          <p className="ficha">Ficha:</p>
          <p className="numero-ficha">{numero_ficha}</p>
        </div>
      </div>
    </div>
  );
}

export default InfoFicha;
