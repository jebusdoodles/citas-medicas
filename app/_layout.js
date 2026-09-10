import { Stack } from 'expo-router';
import { useAuth } from '../src/hooks/useAuth';
import { View, Text, ActivityIndicator } from 'react-native';

export default function RootLayout() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F4F8F9' }}>
        <ActivityIndicator size="large" color="#71C1C4" />
        <Text style={{ marginTop: 12, color: '#333333' }}>Iniciando sesión...</Text>
      </View>
    );
  }

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen 
        name="modal/add-edit" 
        options={{ 
          presentation: 'modal',
          animation: 'slide_from_bottom',
          headerShown: false,
        }} 
      />
    </Stack>
  );
}