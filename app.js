const express = require('express');
const incidenciasRoutes = require('./routes/incidencias');
const {
  obtenerEstadisticas,
} = require('./controllers/incidenciasController');

const app = express();

app.use(express.json());

app.use('/incidencias', incidenciasRoutes);

app.get('/estadisticas', obtenerEstadisticas);

app.get('/', (req, res) => {
  res.status(200).json({
    mensaje:
      'API de gestión de incidencias',
    endpoints: [
      'POST /incidencias',
      'GET /incidencias',
      'GET /incidencias/:id',
      'PUT /incidencias/:id/estado',
      'DELETE /incidencias/:id',
      'GET /estadisticas',
      'GET /incidencias/:id/clasificacion',
    ],
  });
});

app.use((req, res) => {
  res.status(404).json({
    mensaje: 'Ruta no encontrada',
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(
    `Servidor corriendo en http://localhost:${PORT}`
  );
});

module.exports = app;