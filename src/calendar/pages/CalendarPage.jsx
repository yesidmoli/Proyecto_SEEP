import { Calendar } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import { Navbar, CalendarEvent, CalendarModal, FabAddNew, FabDelete } from "../"
import { localizer, getMessagesES } from '../../helpers';
import { Fragment, useEffect, useState } from 'react';
import { useCalendarStore, useUIStore } from '../../hooks';
import '../../css/styles.css'

import Header from '../../components/layout/Header';
import MainSection from '../../components/layout/MainSection';

import Swal from 'sweetalert2';

import Apps from '../../components/layout/menu/App';

const CalendarPage = () => {

  const { events, setActiveEvent, startLoadingEvents, startDeletingEvent } = useCalendarStore();
  const { openDateModal } = useUIStore();
  const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'week');

  useEffect(() => {
    startLoadingEvents();
  }, []);



  const eventStyleGetter = (event, start, end, isSelected) => {

    // Aquí puedes definir tu lógica para determinar el estilo del evento

    const dayOfWeek = event.start.getDay(); // Obtén el día de la semana del evento (0 para domingo, 1 para lunes, etc.)
    let backgroundColor = '';

    // Cambia el color de fondo del evento dependiendo del día de la semana
    switch (dayOfWeek) {
      case 0: // Domingo
        backgroundColor = '#98ff98'; // Cambia el color de fondo a rojo
        break;
      case 2: // Lunes
        backgroundColor = '#39A900'; // Cambia el color de fondo a azul
        break;

        case 3: // Lunes
        backgroundColor = '#346474'; // Cambia el color de fondo a azul
        break;

        case 4: // Lunes
        backgroundColor = '#1c71f9'; // Cambia el color de fondo a azul
        break;

        // case 5: // Lunes
        // backgroundColor = '#ffc0cb'; // Cambia el color de fondo a azul
        // break;
      // Agrega más casos según sea necesario para otros días de la semana
      default:
        backgroundColor = 'rgb(3, 155, 229)'; // Color de fondo predeterminado para otros días
        break;
    }
    const style = {
      backgroundColor: backgroundColor, // Color de fondo predeterminado para todos los eventos
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
    console.log("este es el evento seleccionado", event);
  
    Swal.fire({
      title: "¿Qué acción desea realizar?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Editar visita",
      denyButtonText: "Cancelar visita",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isDenied) {
        Swal.fire({
          title: 'Motivo Cancelación',
          input: 'text',
          inputAttributes: {
            autocapitalize: "off"
          },
          inputPlaceholder: 'Ingrese el motivo aquí',
          showCancelButton: true,
          confirmButtonText: 'Aceptar',
          cancelButtonText: 'Cancelar',
          customClass: {
            input: 'my-custom-input-class' // Clase CSS personalizada para el input
          }
        }).then((result) => {
          if (result.isConfirmed) {
            const motivo_cancelacion = result.value;
            console.log('Motivo de cancelación:', motivo_cancelacion);
            // Aquí puedes llamar a la función para cancelar la visita
            startDeletingEvent(event, motivo_cancelacion);
          } else {
            console.log('Entrada de texto cancelada');
          }
        });
      } else if (result.isConfirmed) {
        // Aquí puedes llamar a la función para editar la visita
         onDoubleClick()
      } else {
        console.log("Se ha cancelado la acción");
      }
    });
  };
  

  const onViewChanged = (event) => {
    localStorage.setItem('lastView', event)
  }

  const mapApiEventsToCalendarEvents = (apiEvents) => {
    return apiEvents.map(apiEvent => ({
      id: apiEvent.id,
      apellidos: apiEvent.aprendiz_datos.apellidos,
      title: apiEvent.aprendiz_datos.nombres,
      start: new Date(`${apiEvent.fecha_visita}T${apiEvent.hora_visita}`),
      end: new Date(`${apiEvent.fecha_visita}T${apiEvent.hora_visita}`),
      lugar: apiEvent.lugar,
      aprendiz:apiEvent.aprendiz,
      tipo_visita:apiEvent.tipo_visita,
      identificacion_aprendiz: apiEvent.aprendiz_datos.numero_documento
    }));
  };
  const slotPropGetter = (date) => {
    const hours = date.getHours();
    if (hours >= 0 && hours < 12) {
      return {
        className: 'morning-slot' // Clase CSS para las ranuras de tiempo de la mañana
      };
    }
    return {}; // Devuelve un objeto vacío para las demás ranuras de tiempo
  };
  
  const MyCustomDay = ({ id }) => (
    <div style={{ textAlign: 'center', backgroundColor: 'lightgray', padding: '10px' }}>
      <strong>{id}</strong>
    </div>
  );
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
            showAllEvents={true}
            slotPropGetter={slotPropGetter}
            
           
          />
           
         
    
      </div>
      
      <CalendarModal />

      
     
    </div>
    <FabAddNew />
   
      <FabDelete />
    
    <Apps />
    </Fragment>
    
  )
}
export default CalendarPage