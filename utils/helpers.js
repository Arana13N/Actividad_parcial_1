function esTextoValido(texto) {
  if (typeof texto !== 'string') {
    return false;
  }

  return texto.trim().length > 0;
}

function validarPrioridad(prioridad) {
  if (!esTextoValido(prioridad)) {
    return false;
  }

  const prioridadesValidas = ['alta', 'media', 'baja'];

  return prioridadesValidas.includes(
    prioridad.trim().toLowerCase()
  );
}

function normalizarPrioridad(prioridad) {
  const texto = prioridad.trim().toLowerCase();

  switch (texto) {
    case 'alta':
      return 'Alta';
    case 'media':
      return 'Media';
    case 'baja':
      return 'Baja';
    default:
      return prioridad.trim();
  }
}

const ESTADOS_VALIDOS = [
  'Pendiente',
  'En Proceso',
  'Resuelta',
  'Cancelada',
];

module.exports = {
  esTextoValido,
  validarPrioridad,
  normalizarPrioridad,
  ESTADOS_VALIDOS,
};