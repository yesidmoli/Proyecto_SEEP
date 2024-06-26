import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import clienteAxios from '../../config/axios';

const GraficoCertificacionPorFicha = () => {
  const [datos, setDatos] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await clienteAxios.get('/api/aprendices-certificacion-por-ficha/');
        setDatos(response.data.fichas);
      } catch (error) {
        console.error('Error al obtener datos de certificación por ficha:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className='grafi' style={{ width: '90%', height: 400 }}>
      <ResponsiveContainer>
        <BarChart data={datos}>
          <XAxis dataKey="numero_ficha" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="aprobados" fill="#8884d8" name="Aprobados" />
          <Bar dataKey="pendientes" fill="#82ca9d" name="Pendientes" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default GraficoCertificacionPorFicha;

