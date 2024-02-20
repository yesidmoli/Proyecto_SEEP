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

function App() {
  return (
    <Router>
      <Fragment>
        <Header />
        <main className='contenedor'>
        <MainSection />
          <Switch>
            <Route exact path="/" component={Inicio} />
            <Route exact path="/cuentas" component={Cuentas} />
            <Route exact path="/calendario" component={Calendario} />
            <Route exact path="/fichas" component={FormularioFicha} /> 
            <Route exact path="/nuevo-aprendiz" component={FormularioAprendiz} /> 
            <Route exact path="/lista-aprendices/:numero_ficha" component={ListaAprendices} />
            <Route exact path="/bitacoras" component={Bitacoras}/>
            
          </Switch>
    
        </main>
      </Fragment>
    </Router>
  );
}

export default App;
