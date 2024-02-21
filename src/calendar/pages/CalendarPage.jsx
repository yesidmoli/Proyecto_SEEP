import { Calendar } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import { Navbar, CalendarEvent, CalendarModal, FabAddNew, FabDelete } from "../"
import { localizer, getMessagesES } from '../../helpers';
import { Fragment, useEffect, useState } from 'react';
import { useCalendarStore, useUIStore } from '../../hooks';
import '../../css/styles.css'

import Header from '../../components/layout/Header';
import MainSection from '../../components/layout/MainSection';
const CalendarPage = () => {

  const { events, setActiveEvent, startLoadingEvents } = useCalendarStore();
  const { openDateModal } = useUIStore();
  const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'week');

  useEffect(() => {
    startLoadingEvents();
  }, []);



  const eventStyleGetter = (event, start, end, isSelected) => {
    // Aquí puedes definir tu lógica para determinar el estilo del evento
    const style = {
      backgroundColor: '#347CF7', // Color de fondo predeterminado para todos los eventos
      borderRadius: '0px',
      // opacity: 0.8,
      color: 'white'
    };
    return { style };
  };
  

  const onDoubleClick = (event) => {
    openDateModal();
  }

  const onSelect = (event) => {
    setActiveEvent(event)
  }

  const onViewChanged = (event) => {
    localStorage.setItem('lastView', event)
  }

  const mapApiEventsToCalendarEvents = (apiEvents) => {
    return apiEvents.map(apiEvent => ({
      id: apiEvent.aprendiz_datos.nombres,
      apellidos: apiEvent.aprendiz_datos.apellidos,
      title: apiEvent.tipo_visita,
      start: new Date(`${apiEvent.fecha_visita}T${apiEvent.hora_visita}`),
      end: new Date(`${apiEvent.fecha_visita}T${apiEvent.hora_visita}`),
      lugar: apiEvent.lugar,
      aprendiz:apiEvent.aprendiz,
    }));
  };
  
  return (
    <Fragment>
      <Header />
    <div className='container '>
      <MainSection />

      <div className='calendario'>
      <Calendar
        culture='es'
        localizer={localizer}
        events={mapApiEventsToCalendarEvents(events)}
        defaultView={lastView}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 'calc(100vh - 80px)'}}
        messages={getMessagesES()}
        eventPropGetter={eventStyleGetter}
        components={{
          event: CalendarEvent
        }}
        onDoubleClickEvent={onDoubleClick}
        onSelectEvent={onSelect}
        onView={onViewChanged}
      />
      </div>

      <CalendarModal />

      <FabAddNew />
      <FabDelete />
    </div>
    </Fragment>
  )
}
export default CalendarPage