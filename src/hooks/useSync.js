import { useEffect, useState, useCallback } from 'react';
import { auth } from '../config/firebase';
import { getCitas, saveCitas } from '../services/storage';
import { fetchAllCitas, createCitaRemote, updateCitaRemote, deleteCitaRemote } from '../services/firebaseRest';

export function useSync() {
  const [syncing, setSyncing] = useState(false);
  const [lastSyncError, setLastSyncError] = useState(null);
  const [lastSyncTime, setLastSyncTime] = useState(null);

  const sync = useCallback(async () => {
    try {
      if (!auth.currentUser) {
        console.log('[SYNC] Auth no listo, saltando...');
        return;
      }

      setSyncing(true);
      setLastSyncError(null);
      console.log('[SYNC] Iniciando sincronización...');

      const localCitas = await getCitas();
      console.log('[SYNC] Citas locales:', localCitas.length);

      let remoteCitas = [];
      try {
        remoteCitas = await fetchAllCitas();
        console.log('[SYNC] Citas remotas:', remoteCitas.length);
      } catch (err) {
        console.log('[SYNC] No se pudieron descargar citas remotas:', err.message);
        setLastSyncError('No se pudo conectar con Firebase. Tus cambios se guardaron localmente.');
        setSyncing(false);
        return;
      }

      const localMap = new Map(localCitas.map(c => [c.id, c]));
      const remoteMap = new Map(remoteCitas.map(c => [c.id, c]));

      // Merge: traer remotas que no existen local o son más recientes
      const merged = [...localCitas];
      const mergedMap = new Map(merged.map(c => [c.id, c]));

      for (const remote of remoteCitas) {
        const local = mergedMap.get(remote.id);
        if (!local) {
          merged.push(remote);
          mergedMap.set(remote.id, remote);
        } else if (remote.updatedAt > local.updatedAt) {
          const idx = merged.findIndex(c => c.id === remote.id);
          merged[idx] = remote;
          mergedMap.set(remote.id, remote);
        }
      }

      // Subir locales que no existen en remoto o son más recientes
      let uploadErrors = 0;
      for (const local of localCitas) {
        const remote = remoteMap.get(local.id);
        try {
          if (!remote) {
            console.log('[SYNC] Subiendo cita nueva:', local.id);
            await createCitaRemote(local);
          } else if (local.updatedAt > remote.updatedAt) {
            console.log('[SYNC] Actualizando cita:', local.id);
            await updateCitaRemote(local);
          }
        } catch (err) {
          console.error('[SYNC] Error al subir cita:', local.id, err.message);
          uploadErrors++;
        }
      }

      // Eliminar en remoto las que ya no existen localmente
      for (const remote of remoteCitas) {
        if (!localMap.has(remote.id)) {
          try {
            console.log('[SYNC] Eliminando cita remota:', remote.id);
            await deleteCitaRemote(remote.id);
          } catch (err) {
            console.error('[SYNC] Error al eliminar cita remota:', remote.id, err.message);
            uploadErrors++;
          }
        }
      }

      await saveCitas(merged);
      console.log('[SYNC] Completada. Total:', merged.length);
      
      if (uploadErrors > 0) {
        setLastSyncError(`${uploadErrors} cita(s) no se pudieron sincronizar. Se reintentará automáticamente.`);
      } else {
        setLastSyncTime(new Date());
      }

    } catch (err) {
      console.error('[SYNC] Error general:', err.message);
      setLastSyncError('Error de sincronización. Tus datos están seguros localmente.');
    } finally {
      setSyncing(false);
    }
  }, []);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        console.log('[AUTH] Usuario listo:', user.uid);
        setTimeout(() => sync(), 1000);
      }
    });

    return () => unsubscribe();
  }, [sync]);

  return { syncing, sync, lastSyncError, lastSyncTime };
}