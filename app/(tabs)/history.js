import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { useAppointments } from '../../src/hooks/useAppointments';
import AppointmentCard from '../../src/components/AppointmentCard';

export default function HistoryScreen() {
  const { gruposCompletadas, loading } = useAppointments();

  if (loading) {
    return (
      <View style={[styles.container, styles.center]}>
        <ActivityIndicator size="large" color="#71C1C4" />
      </View>
    );
  }

  const hayCitas = gruposCompletadas.length > 0;

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Historial</Text>

      {!hayCitas ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No hay citas completadas</Text>
        </View>
      ) : (
        <FlatList
          data={gruposCompletadas}
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
                  onPress={() => {}}
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
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 16,
    textAlign: 'center',
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