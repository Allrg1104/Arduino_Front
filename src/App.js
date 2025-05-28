import React, { useEffect, useState } from 'react';

function App() {
  const [registros, setRegistros] = useState([]);
  const [error, setError] = useState(null);

  // Función para cargar datos
  const fetchData = () => {
    fetch('https://arduino-back.vercel.app/api/datos')
    //fetch('http://localhost:3000/api/datos')
      .then(res => {
        if (!res.ok) throw new Error('Error al obtener datos');
        return res.json();
      })
      .then(data => {
        setRegistros(data);
        setError(null);
      })
      .catch(err => setError(err.message));
  };

  useEffect(() => {
    fetchData(); // Carga inicial

    const interval = setInterval(() => {
      fetchData();
    }, 5000); // cada 5000 ms = 5 segundos

    return () => clearInterval(interval); // limpiar al desmontar
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>Registros de botones</h1>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <table border="1" cellPadding="10" style={{ borderCollapse: 'collapse', width: '100%' }}>
        <thead>
          <tr>
            <th>Fecha y Hora</th>
            <th>Botón Presionado</th>
          </tr>
        </thead>
        <tbody>
          {registros.length === 0 ? (
            <tr>
              <td colSpan="2">No hay registros</td>
            </tr>
          ) : (
            registros.map((r) => (
              <tr key={r._id}>
                <td>{r.fechaHora}</td>
                <td>{r.dato}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default App;
