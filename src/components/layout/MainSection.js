import React from 'react';

import '../../../src/css/menu-lateral.css';
import '../../../src/css/css_animate.css';


import { Link } from 'react-router-dom';


const MainSection = () => {
  const rol = localStorage.getItem('rol')

  return (
    <ul className={"navMenuLat "} role="list" style={{ zIndex: 1033 }}>
      <li>
        <Link to={"/"} aria-label="icon" className="iconLink">
          <i alt="icon" className="iconTamano iconMenuLateral bi bi-house"></i>
        </Link>
        <div className="animated slideInLeft">Inicio</div>
      </li>
      <li>
        <Link to={"/cuentas"} aria-label="icon" className="iconLink">
          <i alt="icon" className="iconMenuLateral bi bi-person-circle"></i>
        </Link>
        <div className="animated slideInLeft">Cuenta</div>
      </li>
      <li>
        <Link to={"/calendario"} aria-label="icon" className="iconLink">
          <i alt="icon" className="iconMenuLateral bi bi-calendar-check"></i>
        </Link>
        <div className="animated slideInLeft">Calendario</div>
      </li>
      {rol !== "aprendiz" ?
        <li>
          <Link to={"/fichas"} aria-label="icon" className="iconLink">
            <i alt="icon" className="iconMenuLateral bi-people-fill"></i>
          </Link>
          <div className="animated slideInLeft">Fichas</div>
        </li>
        : null}

      <li>
        <Link to={"/documentos"} aria-label="icon" className="iconLink">
          <i alt="icon" className="iconMenuLateral bi bi-file-earmark-zip"></i>
        </Link>
        <div className="animated slideInLeft">Documentos</div>
      </li>
      <li>
        <Link to={"/bitacoras"} aria-label="icon" className="iconLink">
          <i alt="icon" className="iconMenuLateral bi bi-card-checklist"></i>
        </Link>
        <div className="animated slideInLeft">Bitácoras</div>
      </li>
    </ul>


  );

};

export default MainSection;
