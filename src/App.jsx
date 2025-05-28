import React, { useEffect, useState } from "react";

export default function App() {
  const [registros, setRegistros] = useState([]);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      const res = await fetch("https://arduino-back.vercel.app/api/datos");
      //const res = await fetch("http://localhost:3000/api/datos");
      if (!res.ok) throw new Error("Error al obtener datos");
      const data = await res.json();
      setRegistros(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchData();

    const interval = setInterval(() => {
      fetchData();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ padding: 20, fontFamily: "Arial, sans-serif" }}>
      <h1>Registros de botones</h1>
      {error && <p style={{ color: "red" }}>Error: {error}</p>}

      <table
        border="1"
        cellPadding="10"
        style={{ borderCollapse: "collapse", width: "100%" }}
      >
        <thead>
          <tr>
            <th>Fecha y Hora</th>
            <th>Botón Presionado</th>
          </tr>
        </thead>
        <tbody>
          {registros.length === 0 ? (
            <tr>
              <td colSpan="2" style={{ textAlign: "center" }}>
                No hay registros
              </td>
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
