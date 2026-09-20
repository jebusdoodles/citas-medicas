import { Stack } from 'expo-router';
import { AppointmentsProvider } from '../src/context/AppointmentsContext';
import { useAuth } from '../src/hooks/useAuth';
import { useSync } from '../src/hooks/useSync';
import { View, Text, ActivityIndicator, Pressable, StyleSheet } from 'react-native';

export default function RootLayout() {
  const { user, loading: authLoading } = useAuth();
  const { syncing, sync, lastSyncError } = useSync();

  if (authLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#71C1C4" />
        <Text style={styles.loadingText}>Iniciando sesión...</Text>
      </View>
    );
  }

  return (
    <AppointmentsProvider>
      <View style={{ flex: 1 }}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen
            name="add-edit"
            options={{
              presentation: 'modal',
              animation: 'slide_from_bottom',
              headerShown: false,
            }}
          />
        </Stack>

        {/* Indicador de sincronización */}
        {syncing && (
          <View style={styles.syncIndicator}>
            <ActivityIndicator size="small" color="#ffffff" />
            <Text style={styles.syncText}>Sincronizando...</Text>
          </View>
        )}

        {/* Indicador de error de sincronización */}
        {lastSyncError && !syncing && (
          <Pressable 
            style={styles.errorIndicator}
            onPress={() => sync()}
          >
            <Text style={styles.errorText}>⚠️ {lastSyncError}</Text>
            <Text style={styles.retryText}>Toca para reintentar</Text>
          </Pressable>
        )}
      </View>
    </AppointmentsProvider>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F4F8F9',
  },
  loadingText: {
    marginTop: 12,
    color: '#333333',
    fontSize: 16,
  },
  syncIndicator: {
    position: 'absolute',
    top: 50,
    right: 20,
    backgroundColor: '#71C1C4',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    zIndex: 999,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  syncText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  errorIndicator: {
    position: 'absolute',
    top: 50,
    left: 20,
    right: 20,
    backgroundColor: '#FF383C',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    zIndex: 999,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  errorText: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  retryText: {
    color: '#ffffff',
    fontSize: 11,
    textDecorationLine: 'underline',
  },
});