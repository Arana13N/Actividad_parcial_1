const express = require('express');
const router = express.Router();

const incidenciasController = require(
  '../controllers/incidenciasController'
);

router.post(
  '/',
  incidenciasController.registrarIncidencia
);

router.get(
  '/',
  incidenciasController.listarIncidencias
);

router.get(
  '/:id/clasificacion',
  incidenciasController.clasificarIncidencia
);

router.get(
  '/:id',
  incidenciasController.buscarIncidenciaPorId
);

router.put(
  '/:id/estado',
  incidenciasController.cambiarEstadoIncidencia
);

router.delete(
  '/:id',
  incidenciasController.eliminarIncidencia
);

module.exports = router;