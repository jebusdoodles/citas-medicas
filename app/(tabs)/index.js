import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { useAppointmentsContext } from '../../src/context/AppointmentsContext';
import AppointmentCard from '../../src/components/AppointmentCard';
import PrimaryButton from '../../src/components/PrimaryButton';

export default function HomeScreen() {
  const router = useRouter();
  const { gruposPendientes, loading } = useAppointmentsContext();

  if (loading) {
    return (
      <View style={[styles.container, styles.center]}>
        <ActivityIndicator size="large" color="#71C1C4" />
      </View>
    );
  }

  const hayCitas = gruposPendientes.length > 0;

  return (
    <View style={styles.container}>
      <PrimaryButton 
        title="Añadir Cita" 
        onPress={() => router.push('/add-edit')} 
      />

      {!hayCitas ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No hay citas pendientes</Text>
        </View>
      ) : (
        <FlatList
          data={gruposPendientes}
          keyExtractor={(item) => item.label}
          contentContainerStyle={styles.listContent}
          renderItem={({ item: grupo }) => (
            <View>
              <View style={styles.dividerContainer}>
                <View style={styles.dividerLine} />
                <Text style={styles.dividerText}>{grupo.label}</Text>
                <View style={styles.dividerLine} />
              </View>
              {grupo.data.map((cita) => (
                <AppointmentCard
                  key={cita.id}
                  title={cita.title}
                  name_doctor={cita.name_doctor}
                  fecha={cita.fecha}
                  hora={cita.hora}
                  onPress={() => router.push({
                    pathname: '/add-edit',
                    params: { id: cita.id }
                  })}
                />
              ))}
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F8F9',
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContent: {
    paddingBottom: 120,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000000',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 16,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#cccccc',
  },
  dividerText: {
    marginHorizontal: 12,
    fontSize: 12,
    fontWeight: 'bold',
    color: '#787676',
    letterSpacing: 1,
  },
});