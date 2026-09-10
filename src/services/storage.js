import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@citas_medicas';

// Datos de prueba
const datosDePrueba = [
  {
    id: '1',
    title: 'Cita Cardiólogo',
    name_doctor: 'Alberto Jiménez',
    fecha: '20/09/26',
    hora: '10:40',
    completada: false,
    createdAt: Date.now(),
  },
  {
    id: '2',
    title: 'Estudios de Sangre',
    name_doctor: 'Pablo Alberti',
    fecha: '21/09/26',
    hora: '10:40',
    completada: false,
    createdAt: Date.now() - 1000,
  },
  {
    id: '3',
    title: 'Aplicación Insulina',
    name_doctor: 'Josue HDZ',
    fecha: '27/09/26',
    hora: '15:40',
    completada: false,
    createdAt: Date.now() - 2000,
  },
  {
    id: '4',
    title: 'Cita Cardiólogo',
    name_doctor: 'Alberto Jiménez',
    fecha: '12/10/26',
    hora: '13:00',
    completada: false,
    createdAt: Date.now() - 3000,
  },
  {
    id: '5',
    title: 'Revisión post-operatoria',
    name_doctor: 'Pablo Alberti',
    fecha: '02/09/26',
    hora: '09:00',
    completada: true,
    createdAt: Date.now() - 4000,
  },
  {
    id: '6',
    title: 'Consulta general',
    name_doctor: 'María González',
    fecha: '15/08/26',
    hora: '11:30',
    completada: true,
    createdAt: Date.now() - 5000,
  },
];

export async function initStorage() {
  const existente = await AsyncStorage.getItem(STORAGE_KEY);
  if (!existente) {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(datosDePrueba));
  }
}

export async function getCitas() {
  const json = await AsyncStorage.getItem(STORAGE_KEY);
  return json ? JSON.parse(json) : [];
}

export async function saveCitas(citas) {
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(citas));
}

export async function addCita(cita) {
  const citas = await getCitas();
  citas.push(cita);
  await saveCitas(citas);
  return citas;
}

export async function updateCita(id, updates) {
  const citas = await getCitas();
  const index = citas.findIndex((c) => c.id === id);
  if (index !== -1) {
    citas[index] = { ...citas[index], ...updates };
    await saveCitas(citas);
  }
  return citas;
}

export async function deleteCita(id) {
  const citas = await getCitas();
  const filtradas = citas.filter((c) => c.id !== id);
  await saveCitas(filtradas);
  return filtradas;
}