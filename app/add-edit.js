import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useAppointmentsContext } from '../src/context/AppointmentsContext';

export default function AddEditModal() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const { getCitaById } = useAppointmentsContext();

  const cita = id ? getCitaById(id) : null;
  const isEditing = Boolean(cita);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{isEditing ? 'Editar Cita' : 'Nueva Cita'}</Text>
      {isEditing && (
        <Text style={styles.subtitle}>ID: {cita.id}</Text>
      )}
      <Text style={styles.subtitle}>Doctor: {cita?.name_doctor || 'Nuevo'}</Text>
      <Text style={styles.subtitle}>Título: {cita?.title || 'Nuevo'}</Text>
      
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
    marginBottom: 4,
  },
  closeButton: {
    marginTop: 24,
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