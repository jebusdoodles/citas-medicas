import { Pressable, Text, View, Image, StyleSheet } from 'react-native';
import { getDiaSemana, getDiaMes } from '../utils/dateUtils';

export default function AppointmentCard({ title, name_doctor, fecha, hora, onPress }) {
  const diaSemana = getDiaSemana(fecha);
  const diaMes = getDiaMes(fecha);

  return (
    <Pressable onPress={onPress} style={styles.card}>
      <View style={styles.leftContainer}>
        <View style={styles.iconWrapper}>
          <Image source={require('../../assets/calendar.png')} style={styles.calendarIcon} />
          <Text style={styles.dayNumber}>{diaMes}</Text>
        </View>
      </View>
      
      <View style={styles.rightContainer}>
        <Text style={styles.headerText}>
          {diaSemana} - {hora}
        </Text>
        <Text style={styles.titleText}>{title}</Text>
        <Text style={styles.doctorText}>{name_doctor}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 4,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 4,
  },
  leftContainer: {
    marginRight: 12,
  },
  iconWrapper: {
    width: 60,
    height: 60,
    justifyContent: 'center', 
    alignItems: 'center',     
  },
  calendarIcon: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
    position: 'absolute',    
  },
  dayNumber: {
    fontSize: 22,            
    fontWeight: 'bold',
    color: '#71C1C4',
    marginTop: 4,         
  },
  rightContainer: {
    flex: 1,
  },
  headerText: {
    color: '#000000',
    fontWeight: 'bold',
    fontSize: 15,
    marginBottom: 4,
  },
  titleText: {
    color: '#333333',
    fontSize: 14,
    marginBottom: 2,
  },
  doctorText: {
    color: '#787676',
    fontSize: 14,
  },
});