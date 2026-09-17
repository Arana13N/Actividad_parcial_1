const {
  esTextoValido,
  validarPrioridad,
  normalizarPrioridad,
} = require('../utils/helpers');

const incidencias = [];
let contadorId = 1;

function registrarIncidencia(req, res) {
  const {
    empleado,
    area,
    descripcion,
    prioridad,
  } = req.body;

  if (
    !esTextoValido(empleado) ||
    !esTextoValido(area) ||
    !esTextoValido(descripcion) ||
    !esTextoValido(prioridad)
  ) {
    return res.status(400).json({
      mensaje:
        'Todos los campos son obligatorios y no pueden estar vacíos',
    });
  }

  if (!validarPrioridad(prioridad)) {
    return res.status(400).json({
      mensaje: 'La prioridad debe ser Alta, Media o Baja',
    });
  }

  const nuevaIncidencia = {
    id: contadorId,
    empleado: empleado.trim(),
    area: area.trim(),
    descripcion: descripcion.trim(),
    prioridad: normalizarPrioridad(prioridad),
    estado: 'Pendiente',
  };

  incidencias.push(nuevaIncidencia);
  contadorId++;

  return res.status(201).json({
    mensaje: 'Incidencia registrada correctamente',
  });
}

function listarIncidencias(req, res) {
  return res.status(200).json(incidencias);
}