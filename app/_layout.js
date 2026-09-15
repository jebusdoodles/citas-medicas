import { Stack } from 'expo-router';
import { useAuth } from '../src/hooks/useAuth';
import { useSync } from '../src/hooks/useSync';
import { View, Text, ActivityIndicator } from 'react-native';

export default function RootLayout() {
  const { user, loading: authLoading } = useAuth();
  const { syncing } = useSync();

  if (authLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F4F8F9' }}>
        <ActivityIndicator size="large" color="#71C1C4" />
        <Text style={{ marginTop: 12, color: '#333333' }}>Iniciando sesión...</Text>
      </View>
    );
  }

  return (
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
      {syncing && (
        <View style={{
          position: 'absolute',
          top: 50,
          right: 20,
          backgroundColor: '#71C1C4',
          paddingVertical: 6,
          paddingHorizontal: 12,
          borderRadius: 12,
          zIndex: 999,
        }}>
          <Text style={{ color: '#ffffff', fontSize: 12, fontWeight: 'bold' }}>Sync...</Text>
        </View>
      )}
    </View>
  );
}