// Parsea "dd/mm/aa" + "hh:mm" a objeto Date
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

// Date -> "dd/mm/aa"
export function formatDateToString(date) {
  const d = String(date.getDate()).padStart(2, '0');
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const y = String(date.getFullYear()).slice(-2);
  return `${d}/${m}/${y}`;
}

// Date -> "hh:mm"
export function formatTimeToString(date) {
  const h = String(date.getHours()).padStart(2, '0');
  const min = String(date.getMinutes()).padStart(2, '0');
  return `${h}:${min}`;
}

// Verifica si una fecha "dd/mm/aa" es anterior a hoy
export function isFechaPasada(fechaStr) {
  const [dia, mes, anio] = fechaStr.split('/');
  const yearFull = anio.length === 2 ? `20${anio}` : anio;
  const fechaCita = new Date(parseInt(yearFull), parseInt(mes) - 1, parseInt(dia));
  const hoy = new Date();
  hoy.setHours(0, 0, 0, 0);
  return fechaCita < hoy;
}

export function getDiaSemana(fechaStr) {
  const [dia, mes, anio] = fechaStr.split('/');
  const yearFull = anio.length === 2 ? `20${anio}` : anio;
  const fecha = new Date(parseInt(yearFull), parseInt(mes) - 1, parseInt(dia));
  const dias = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
  return dias[fecha.getDay()];
}

// Devuelve el día del mes como string, ej: "20"
export function getDiaMes(fechaStr) {
  const [dia] = fechaStr.split('/');
  return dia;
}