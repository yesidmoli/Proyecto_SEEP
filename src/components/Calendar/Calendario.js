// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { google } from 'googleapis';
// import path from 'path'; // Importa la biblioteca 'path' para manejar rutas de archivos
// import stream from 'stream-browserify'; // Agrega importación para el polifill de 'stream'
// import util from 'util'; // Agrega importación para el polifill de 'util'

// const Calendar = () => {
//   const [events, setEvents] = useState([]);

//   useEffect(() => {
//     const getEvents = async () => {
//       try {
//         // Configurar la autenticación con las credenciales de la API de Google Calendar
//         const auth = new google.auth.GoogleAuth({
//           keyFile: path.join(__dirname, 'credentials', 'client_secret_80696118659-nnaertjc207kk5l8009fgdnrh6glfaq6.apps.googleusercontent.com.json'), // Ruta al archivo JSON de credenciales
//           scopes: 'https://www.googleapis.com/auth/calendar.readonly', // Alcance de la API
//         });
//         const calendar = google.calendar({ version: 'v3', auth });

//         // Obtener la lista de eventos del calendario
//         const response = await calendar.events.list({
//           calendarId: 'primary', // ID del calendario. 'primary' es el calendario principal del usuario
//           timeMin: new Date().toISOString(), // Obtener eventos a partir de la fecha actual
//           maxResults: 10, // Obtener como máximo 10 eventos
//           singleEvents: true,
//           orderBy: 'startTime',
//         });

//         setEvents(response.data.items);
//       } catch (error) {
//         console.error('Error al obtener eventos:', error);
//       }
//     };

//     getEvents();
//   }, []);

//   return (
//     <div>
//       <h2>Eventos del Calendario</h2>
//       <ul>
//         {events.map((event) => (
//           <li key={event.id}>{event.summary}</li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default Calendar;
