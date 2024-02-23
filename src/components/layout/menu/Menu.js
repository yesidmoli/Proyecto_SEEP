// Menu.js
import React from 'react';
import styled from 'styled-components';
import { Link } from "react-router-dom";
import { useAuth } from '../../context/AuthContext';

import { useHistory } from 'react-router-dom';
const StyledMenu = styled.nav`
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: var(--color-iconos);
  transform: ${({ open }) => open ? 'translateX(0)' : 'translateX(-100%)'};
  height: 100vh;
  text-align: left;
  padding: 2rem;
  position: absolute;
  top: 0;
  left: 0;
  transition: transform 0.3s ease-in-out;
  z-index: 999;

  @media (max-width: 576px) {
    width: 20%;
    padding:3.3rem;
  }

  .a {
    font-size: 2rem;
    text-transform: uppercase;
    padding: 2rem 0;
    font-weight: bold;
    letter-spacing: 0.5rem;
    color: #0D0C1D;
    text-decoration: none;
    transition: color 0.3s linear;

    @media (max-width: 576px) {
      font-size: 1rem;
      text-align: center;
    }
   

    &:hover {
      color: #343078;
    }
  }
`;

const Menu = ({ open }) => {

    const {logout} = useAuth()
    const history = useHistory();
      const handleLogout = async () => {
          await logout()
          history.push("/login");
        };
  return (
    <StyledMenu open={open}>
    
    <ul className="navMenuLa " role="list" style={{ zIndex: 1033 }}>
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
      <li>
        <Link to={"/fichas"} aria-label="icon" className="iconLink">
          <i alt="icon" className="iconMenuLateral bi-people-fill"></i>
        </Link>
        <div className="animated slideInLeft">Fichas</div>
      </li>
      <li>
        <Link to={"/documentos"} aria-label="icon" className="iconLink">
          <i alt="icon" className="iconMenuLateral bi bi-file-earmark-zip"></i>
        </Link>
        <div className="animated slideInLeft">Documentos</div>
      </li>
      <li>
        <Link to={"#"} aria-label="icon" className="iconLink">
          <i alt="icon" className="iconMenuLateral bi bi-card-checklist"></i>
        </Link>
        <div className="animated slideInLeft">Bitácoras</div>
      </li>

      <li>
      <Link  onClick={handleLogout} className='a-logout' to="/"><i class="bi bi-box-arrow-left"></i></Link>
     
      </li>
    </ul>


   

                   
    </StyledMenu>
  );
};

export default Menu;
