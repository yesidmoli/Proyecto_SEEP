import React, { Fragment, useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch,  Redirect } from 'react-router-dom';
import Header from './components/layout/Header';
import MainSection from './components/layout/MainSection';
import Inicio from './components/Index/Inicio';
import Cuentas from './components/Account/Cuentas';
import Calendario from './components/Calendar/Calendario';
import FormularioFicha from './components/Fichas/FormularioFicha';
import FormularioAprendiz from './components/Apprentice/FormularioAprendiz';
import FormularioFinal from './components/Apprentice/FormularioFinal';
import Bitacoras from './components/bitacoras/Bitacoras';
import ListaAprendices from './components/Fichas/ListaAprendices';
import Login from './components/auth/Login';
import InfoAprediz from './components/Apprentice/InfoAprendiz';

import Apps from './components/layout/menu/App';

import MyCalendar from './components/calendario';
import CalendarPage from './calendar/pages/CalendarPage';

//perfil aprendiz
import PerfilAprendiz from './components/Account/PerfilAprendiz';

//docuentos
import Documentos from './components/Documents/Documentos';
import DocumentosAprendices from './components/Documents/DocumentosAprendices';
import FormularioInicial from './components/Fichas/FormularioInicial';



import FormartoEtapaProductiva from './components/FormatoESP/Index';


import FormatoE from './components/FormatoPdf/Formato';
// import EvaluacionEP from './components/FormatoESP/EvaluacionEP';

// import  from './components/auth/ PrivateRoute';

import PrivateRoute from './components/auth/ PrivateRoute';
import AprendizBitacoraIndividual from './components/bitacoras/AprendizBitacoraIndividual';


//reste password
import PasswordResetForm from './components/auth/resetPassword/PasswordResetForm';
import PasswordResetConfirmForm from './components/auth/resetPassword/PasswordResetConfirmForm';
import ListaFichas from './components/Fichas/ListaFichas';
import Calendar from './components/Calendar/Calendario';

import ChangePasswordPage from './components/auth/ChangePasswordPopup';
import Modal from 'react-modal';
import Graficas from './components/Graficas/indexGraficas';
import AprendicesRegistrados from './components/Fichas/AprendicesRegistrados';
Modal.setAppElement('#root');
function App() {
  
  return (
    <Router>
      <Fragment>
        {/* <Apps/> */}
        {/* <Header /> */}
       
        {/* <MainSection /> */}
          <Switch>
            <PrivateRoute exact path="/" component={Inicio} />
            <Route exact path= "/login" component={Login}  />
            <PrivateRoute exact path= "/calendario" component={CalendarPage}  />
            {/* <Route path="/calendar" element={<CalendarPage />} /> */}
            <PrivateRoute exact path="/cuentas" component={Cuentas} />
            {/* <Route exact path="/calendario" component={Calendario} /> */}
            <PrivateRoute exact path="/fichas" component={FormularioFicha} /> 
            <PrivateRoute exact path="/nuevo-aprendiz" component={FormularioInicial} /> 
            <PrivateRoute exact path="/lista-aprendices/:numero_ficha/:programa" component={ListaAprendices} /> 
            <PrivateRoute exact path="/aprendiz/:id/" component={InfoAprediz} />
            <PrivateRoute exact path="/perfil-aprendiz" component={PerfilAprendiz} />
            <PrivateRoute exact path="/documentos-aprendiz/:id" component={Documentos} />
            <PrivateRoute exact path="/documentos" component={DocumentosAprendices} />
          
            <Route exact path="/inicio-etapa-practica" component={FormularioAprendiz} />
            <PrivateRoute exact path="/bitacoras" component={Bitacoras} />
            <PrivateRoute exact path="/formato-etapa-productiva/:id/:componente" component={FormartoEtapaProductiva} />
            <PrivateRoute exact path="/formato-etapa-productiva-pdf/:id" component={FormatoE} />

            <Route exact path="/formulario-final/:id" component={FormularioFinal}/>
            <PrivateRoute exact path="/graficas" component={Graficas} />

            <PrivateRoute exact path="/aprendices" component={AprendicesRegistrados} />

            <PrivateRoute exact path="/bitacora-aprendiz/:id" component={AprendizBitacoraIndividual} />
            <PrivateRoute exact path="/update-password" component={ChangePasswordPage} />
            <Route exact path="/password/reset/" component={PasswordResetForm} />
            <Route exact path="/password/reset/confirm/:uid/:token" component={PasswordResetConfirmForm} />
            
        
          </Switch>
          
    
      
      </Fragment>
    </Router>
  );
}

export default App;
