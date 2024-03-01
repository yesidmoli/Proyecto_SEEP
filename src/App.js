import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
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

import MyCalendar from './components/calendario';
import CalendarPage from './calendar/pages/CalendarPage';

//perfil aprendiz
import PerfilAprendiz from './components/Account/PerfilAprendiz';

//docuentos
import Documentos from './components/Documents/Documentos';
import DocumentosAprendices from './components/Documents/DocumentosAprendices';
import FormularioInicial from './components/Fichas/FormularioInicial';
import ListaFichas from './components/Fichas/ListaFichas';
// import  from './components/auth/ PrivateRoute';

function App() {
  return (
    <Router>
      <Fragment>
        {/* <Header /> */}
       
        {/* <MainSection /> */}
          <Switch>
            <Route exact path="/" component={Inicio} />
            <Route exact path= "/login" component={Login}  />
            <Route exact path= "/calendario" component={CalendarPage}  />
            {/* <Route path="/calendar" element={<CalendarPage />} /> */}
            <Route exact path="/cuentas" component={Cuentas} />
            {/* <Route exact path="/calendario" component={Calendario} /> */}
            <Route exact path="/fichas" component={FormularioFicha} /> 
            <Route exact path="/nuevo-aprendiz" component={FormularioInicial} /> 
            <Route exact path="/lista-aprendices/:numero_ficha/:programa" component={ListaAprendices} /> 
            <Route exact path="/aprendiz/:id/" component={InfoAprediz} />
            <Route exact path="/perfil-aprendiz" component={PerfilAprendiz} />
            <Route exact path="/documentos-aprendiz/:id" component={Documentos} />
            <Route exact path="/documentos" component={DocumentosAprendices} />
            <Route exact path="/inicio-etapa-practica" component={FormularioAprendiz} />
            <Route exact path="/bitacoras" component={Bitacoras} />
            <Route exact path="/lista-fichas" component={ListaFichas}/>


          </Switch>
    
      
      </Fragment>
    </Router>
  );
}

export default App;
