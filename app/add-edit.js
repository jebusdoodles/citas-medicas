import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useRouter } from 'expo-router';

export default function AddEditModal() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>AddEditModal</Text>
      <Text style={styles.subtitle}>Placeholder - Paso 1</Text>
      
      <Pressable style={styles.closeButton} onPress={() => router.back()}>
        <Text style={styles.closeText}>Cerrar Modal</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#787676',
    marginBottom: 24,
  },
  closeButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: '#71C1C4',
  },
  closeText: {
    color: '#71C1C4',
    fontWeight: 'bold',
    fontSize: 16,
  },
});