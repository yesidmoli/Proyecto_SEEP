import React from 'react';
import { PDFDownloadLink, Document, Page, View, Text, StyleSheet, Image, TableCell } from '@react-pdf/renderer';
import { Calendar } from 'react-big-calendar';
import { localizer, getMessagesES } from '../../helpers';
import { useCalendarStore } from '../../hooks';
import '../../img/logo.png';
import '../../css/stylecalendario.css'

const styles = StyleSheet.create({
    page: {
      fontFamily: 'Helvetica',
      paddingTop: 20,
      paddingBottom: 40,
      paddingHorizontal: 30,
    },
    section: {
      marginBottom: 10,
      marginTop: 10,
    },
    title: {
      fontSize: 10,
      marginBottom: 20,
      fontWeight: 'bold',
      paddingTop: 10,
    },
    text: { 
      fontSize: 9, 
      marginLeft: 5,
      marginBottom: 5,
      marginTop: 7,
    },
    image: {
      width: 350,
      height: 100,
      margin: 'auto',
      marginTop: 10,
      justifyContent: 'center',
      alignItems: 'center',
      
    },
    tableRow: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#000',
        backgroundColor: "#F8F8F8",
        paddingBottom: 5,
        marginBottom: 5,
        marginTop: 10,
      },
      tableCell: {
        flex: 1,
      },
  });
const CalendarPDF = ({ events }) => {
    const mapEventsToPDF = () => {
        return events.map((event, index) => (
            <View key={index} style={styles.tableRow}>
            <View style={styles.tableCell}><Text style={styles.text}>Fecha: {event.fecha_visita}</Text></View>
            <View style={styles.tableCell}><Text style={styles.text}>Hora: {event.hora_visita}</Text></View>
            <View style={styles.tableCell}><Text style={styles.text}>Nombres: {event.aprendiz_datos.nombres}</Text></View>
            <View style={styles.tableCell}><Text style={styles.text}>Apellidos: {event.aprendiz_datos.apellidos}</Text></View>
            <View style={styles.tableCell}><Text style={styles.text}>Documento: {event.aprendiz_datos.numero_documento}</Text></View>
            <View style={styles.tableCell}><Text style={styles.text}>Lugar: {event.lugar}</Text></View>
            <View style={styles.tableCell}><Text style={styles.text}>Tipo visita: {event.tipo_visita}</Text></View>
            <View style={styles.tableCell}><Text style={styles.text}>N. visita: {event.numero_visita}</Text></View>
            <View style={styles.tableCell}><Text style={styles.text}>Notas: {event.observaciones}</Text></View>
          </View>
        ));
      };
    const MyDocument = () => (
        <Document>
          <Page size="A4">
            <View style={{ padding: 20 }}>
              <Image style={styles.image} src={require("../../img/logo.png")} />
              <Text style={{ fontSize: 15, marginBottom: 10, marginTop: 15, marginLeft: 5 }}>Visitas programadas:</Text>
              {mapEventsToPDF()}
            </View>
          </Page>
        </Document>
      );

      return (
        <div>
          <PDFDownloadLink document={<MyDocument />} fileName="visitas.pdf">
            {({ blob, url, loading, error }) => (
              loading ? 'Loading document...' : <button id='download-pdf'>Descargar PDF</button>
            )}
          </PDFDownloadLink>
        </div>
      );
    };

export default CalendarPDF;
