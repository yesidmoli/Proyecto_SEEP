import React from 'react';

import '../../../src/css/styleinicio.css'
//imagenes
import logoSena from '../../img/logoSenaNa.png'

const InfoFicha = ({ficha }) => {

  //extraemos los valores de l BD
  const {_id, numeroFicha,nombrePrograma, nivelFormacion} = ficha;

  return (
    <div className="rectangulo-ficha">
      <div className="logo-info">
        <img src={logoSena} width="90" alt="lista" />
      </div>
      <div className="texto-info">
        <a className="title1" href="lista.html">
          {nombrePrograma}
        </a>
        <p className="title2">{nombrePrograma}</p>
        <p className="aprendiz">{nivelFormacion}</p>
        <div className="codigo-ficha">
          <p className="ficha">Ficha:</p>
          <p className="numero-ficha">{numeroFicha}</p>
        </div>
      </div>
    </div>
  );
}

export default InfoFicha;
