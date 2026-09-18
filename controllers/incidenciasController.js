const {
  esTextoValido,
  validarPrioridad,
  normalizarPrioridad,
} = require('../utils/helpers');

const incidencias = [];

let siguienteId = 1;

function registrarIncidencia(req, res) {
  const { titulo, descripcion, prioridad } = req.body;

  if (!esTextoValido(titulo)) {
    return res.status(400).json({
      mensaje: 'El campo titulo es obligatorio',
    });
  }

  if (!esTextoValido(descripcion)) {
    return res.status(400).json({
      mensaje: 'El campo descripcion es obligatorio',
    });
  }

  if (!validarPrioridad(prioridad)) {
    return res.status(400).json({
      mensaje: 'La prioridad debe ser Alta, Media o Baja',
    });
  }

  const nuevaIncidencia = {
    id: siguienteId++,
    titulo: titulo.trim(),
    descripcion: descripcion.trim(),
    prioridad: normalizarPrioridad(prioridad),
    estado: 'Pendiente',
  };

  incidencias.push(nuevaIncidencia);

  return res.status(201).json(nuevaIncidencia);
}

function listarIncidencias(req, res) {
  return res.status(200).json(incidencias);
}

function buscarIncidenciaPorId(req, res) {
  const id = Number(req.params.id);

  if (Number.isNaN(id)) {
    return res.status(400).json({
      mensaje: 'El id debe ser un número',
    });
  }

  const incidencia = incidencias.find(
    (inc) => inc.id === id
  );

  if (!incidencia) {
    return res.status(404).json({
      mensaje: 'Incidencia no encontrada',
    });
  }

  return res.status(200).json(incidencia);
}

function cambiarEstadoIncidencia(req, res) {
  const id = Number(req.params.id);
  const { estado } = req.body;

  if (Number.isNaN(id)) {
    return res.status(400).json({
      mensaje: 'El id debe ser un número',
    });
  }

  if (!esTextoValido(estado)) {
    return res.status(400).json({
      mensaje: 'El campo estado es obligatorio',
    });
  }

  const incidencia = incidencias.find(
    (inc) => inc.id === id
  );

  if (!incidencia) {
    return res.status(404).json({
      mensaje: 'Incidencia no encontrada',
    });
  }

  const estadoNormalizado = estado.trim().toLowerCase();
  let esEstadoValido = true;

  switch (estadoNormalizado) {
    case 'pendiente':
      incidencia.estado = 'Pendiente';
      break;
    case 'en proceso':
      incidencia.estado = 'En Proceso';
      break;
    case 'resuelta':
      incidencia.estado = 'Resuelta';
      break;
    case 'cancelada':
      incidencia.estado = 'Cancelada';
      break;
    default:
      esEstadoValido = false;
  }

  if (!esEstadoValido) {
    return res.status(400).json({
      mensaje:
        'Estado no válido. Use Pendiente, En Proceso, Resuelta o Cancelada',
    });
  }

  return res.status(200).json({
    mensaje: 'Estado actualizado correctamente',
    incidencia,
  });
}

function eliminarIncidencia(req, res) {
  const id = Number(req.params.id);

  if (Number.isNaN(id)) {
    return res.status(400).json({
      mensaje: 'El id debe ser un número',
    });
  }

  const indice = incidencias.findIndex(
    (inc) => inc.id === id
  );

  if (indice === -1) {
    return res.status(404).json({
      mensaje: 'Incidencia no encontrada',
    });
  }

  incidencias.splice(indice, 1);

  return res.status(200).json({
    mensaje: 'Incidencia eliminada correctamente',
  });
}

function obtenerEstadisticas(req, res) {
  const conteoPorEstado = incidencias.reduce(
    (acumulador, incidencia) => {
      acumulador[incidencia.estado] =
        (acumulador[incidencia.estado] || 0) + 1;

      return acumulador;
    },
    {}
  );

  return res.status(200).json({
    totalIncidencias: incidencias.length,
    pendientes: conteoPorEstado.Pendiente || 0,
    enProceso: conteoPorEstado['En Proceso'] || 0,
    resueltas: conteoPorEstado.Resuelta || 0,
    canceladas: conteoPorEstado.Cancelada || 0,
  });
}

function clasificarIncidencia(req, res) {
  const id = Number(req.params.id);

  const incidencia = incidencias.find(
    (inc) => inc.id === id
  );

  if (!incidencia) {
    return res.status(404).json({
      mensaje: 'Incidencia no encontrada',
    });
  }

  let clasificacion;

  switch (incidencia.prioridad) {
    case 'Alta':
      clasificacion = 'Crítica';
      break;
    case 'Media':
      clasificacion = 'Importante';
      break;
    case 'Baja':
      clasificacion = 'Normal';
      break;
    default:
      clasificacion = 'Sin clasificar';
  }

  return res.status(200).json({
    id: incidencia.id,
    clasificacion,
  });
}

module.exports = {
  registrarIncidencia,
  listarIncidencias,
  buscarIncidenciaPorId,
  cambiarEstadoIncidencia,
  eliminarIncidencia,
  obtenerEstadisticas,
  clasificarIncidencia,
};