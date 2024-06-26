import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import clienteAxios from '../../config/axios';

const GraficoCertificacion = () => {
  const [datos, setDatos] = useState({ aprobados: 0, pendientes: 0 });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await clienteAxios.get('/api/aprendices-certificacion/');
        setDatos(response.data);
      } catch (error) {
        console.error('Error al obtener datos de certificación:', error);
      }
    };
    fetchData();
  }, []);

  const { aprobados, pendientes } = datos;

  const data = [
    { name: 'Aprobados', value: aprobados },
    { name: 'Pendientes', value: pendientes },
  ];

  const COLORS = ['#4caf50', '#f44336'];

  return (
    <div className='grafi' style={{ width: '100%', height: 400 }}>
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={100}
            fill="#8884d8"
            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default GraficoCertificacion;
