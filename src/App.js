import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch,  Redirect } from 'react-router-dom';
import Header from './components/layout/Header';
import MainSection from './components/layout/MainSection';
import Inicio from './components/Index/Inicio';
import Cuentas from './components/Account/Cuentas';
import Calendario from './components/Calendar/Calendario';
import FormularioFicha from './components/Fichas/FormularioFicha';
import FormularioAprendiz from './components/Apprentice/FormularioAprendiz';
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
import ListaFichas from './components/Fichas/ListaFichas';



import FormartoEtapaProductiva from './components/FormatoESP/Index';


import FormatoE from './components/prueb/Formato';
// import EvaluacionEP from './components/FormatoESP/EvaluacionEP';

// import  from './components/auth/ PrivateRoute';

import PrivateRoute from './components/auth/ PrivateRoute';


import AprendizBitacoraIndividual from './components/bitacoras/AprendizBitacoraIndividual';
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
            <Route exact path= "/calendario" component={CalendarPage}  />
            {/* <Route path="/calendar" element={<CalendarPage />} /> */}
            <PrivateRoute exact path="/cuentas" component={Cuentas} />
            {/* <Route exact path="/calendario" component={Calendario} /> */}
            <PrivateRoute exact path="/fichas" component={FormularioFicha} /> 
            <PrivateRoute exact path="/nuevo-aprendiz" component={FormularioInicial} /> 
            <Route exact path="/lista-aprendices/:numero_ficha/:programa" component={ListaAprendices} /> 
            <Route exact path="/aprendiz/:id/" component={InfoAprediz} />
            <Route exact path="/perfil-aprendiz" component={PerfilAprendiz} />
            <Route exact path="/documentos-aprendiz/:id" component={Documentos} />
            <PrivateRoute exact path="/documentos" component={DocumentosAprendices} />
          
            <Route exact path="/inicio-etapa-practica" component={FormularioAprendiz} />
            <Route exact path="/bitacoras" component={Bitacoras} />
            <Route exact path="/lista-fichas" component={ListaFichas}/>
            <Route exact path="/formato-etapa-productiva/:id/:componente" component={FormartoEtapaProductiva} />
            <Route exact path="/formato-etapa-productiva-pdf/:id" component={FormatoE} />
            <Route exact path="/bitacora-aprendiz/:id" component={AprendizBitacoraIndividual} />
        
          </Switch>
    
      
      </Fragment>
    </Router>
  );
}

export default App;
