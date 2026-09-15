import { useState, useEffect, useCallback } from 'react';
import { initStorage, getCitas, saveCitas } from '../services/storage';
import { compararCitas, agruparPorMesAnio, getSugerencias } from '../utils/dateUtils';

export function useAppointments() {
  const [citas, setCitas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function cargar() {
      await initStorage();
      const data = await getCitas();
      setCitas(data);
      setLoading(false);
    }
    cargar();
  }, []);

  useEffect(() => {
    if (!loading) {
      saveCitas(citas);
    }
  }, [citas, loading]);

  const citasPendientes = citas
    .filter((c) => !c.completada)
    .sort(compararCitas);

  const citasCompletadas = citas
    .filter((c) => c.completada)
    .sort(compararCitas);

  const gruposPendientes = agruparPorMesAnio(citasPendientes);
  const gruposCompletadas = agruparPorMesAnio(citasCompletadas);

  const sugerenciasDoctores = getSugerencias(citas, 'name_doctor');
  const sugerenciasTitulos = getSugerencias(citas, 'title');

  const addCita = useCallback((cita) => {
    const now = Date.now();
    const nueva = {
      ...cita,
      id: Date.now().toString(),
      createdAt: now,
      updatedAt: now,
    };
    setCitas((prev) => [...prev, nueva]);
  }, []);

  const updateCita = useCallback((id, updates) => {
    setCitas((prev) =>
      prev.map((c) => (c.id === id ? { ...c, ...updates, updatedAt: Date.now() } : c))
    );
  }, []);

  const deleteCita = useCallback((id) => {
    setCitas((prev) => prev.filter((c) => c.id !== id));
  }, []);

  return {
    citas,
    citasPendientes,
    citasCompletadas,
    gruposPendientes,
    gruposCompletadas,
    sugerenciasDoctores,
    sugerenciasTitulos,
    loading,
    addCita,
    updateCita,
    deleteCita,
  };
}