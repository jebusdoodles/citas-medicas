// Parsea "dd/mm/aa" o "dd/mm/aaaa" a objeto Date
export function parseFecha(fechaStr, horaStr) {
  const [dia, mes, anio] = fechaStr.split('/');
  const [hora, minuto] = horaStr.split(':');
  const yearFull = anio.length === 2 ? `20${anio}` : anio;
  return new Date(
    parseInt(yearFull),
    parseInt(mes) - 1,
    parseInt(dia),
    parseInt(hora),
    parseInt(minuto)
  );
}

// Compara dos citas para ordenar de más próxima a más lejana
export function compararCitas(a, b) {
  const dateA = parseFecha(a.fecha, a.hora);
  const dateB = parseFecha(b.fecha, b.hora);
  return dateA - dateB;
}

// Extrae etiqueta de mes-año en español, ej: "JULIO 2026"
export function getMesAnioLabel(fechaStr) {
  const [, mes, anio] = fechaStr.split('/');
  const yearFull = anio.length === 2 ? `20${anio}` : anio;
  const meses = [
    'ENERO', 'FEBRERO', 'MARZO', 'ABRIL', 'MAYO', 'JUNIO',
    'JULIO', 'AGOSTO', 'SEPTIEMBRE', 'OCTUBRE', 'NOVIEMBRE', 'DICIEMBRE'
  ];
  return `${meses[parseInt(mes) - 1]} ${yearFull}`;
}

// Agrupa array de citas ordenadas por mes-año
export function agruparPorMesAnio(citas) {
  const grupos = [];
  let currentLabel = null;
  let currentItems = [];

  for (const cita of citas) {
    const label = getMesAnioLabel(cita.fecha);
    if (label !== currentLabel) {
      if (currentItems.length > 0) {
        grupos.push({ label: currentLabel, data: currentItems });
      }
      currentLabel = label;
      currentItems = [cita];
    } else {
      currentItems.push(cita);
    }
  }
  if (currentItems.length > 0) {
    grupos.push({ label: currentLabel, data: currentItems });
  }
  return grupos;
}

// Extrae valores únicos para autocompletado
export function getSugerencias(citas, campo) {
  const valores = citas.map((c) => c[campo]).filter(Boolean);
  return [...new Set(valores)];
}