import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';

const localizer = momentLocalizer(moment);

const events = [
  {
    id: 1,
    title: 'Evento 1',
    start: new Date(2024, 1, 14, 10, 0), // Año, mes (0-indexed), día, hora, minuto
    end: new Date(2024, 1, 14, 12, 0),
  },
  {
    id: 2,
    title: 'Evento 2',
    start: new Date(2024, 1, 15, 11, 0),
    end: new Date(2024, 1, 15, 13, 0),
  },
];

const MyCalendar = () => (
  <div style={{ height: 500 }}>
    <Calendar
      localizer={localizer}
      events={events}
      startAccessor="start"
      endAccessor="end"
      style={{ margin: '50px' }}
    />
  </div>
);

export default MyCalendar;
