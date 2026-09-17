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