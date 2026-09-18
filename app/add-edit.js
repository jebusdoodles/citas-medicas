import { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  ScrollView,
  Switch,
  Alert,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useAppointmentsContext } from '../src/context/AppointmentsContext';
import PrimaryButton from '../src/components/PrimaryButton';
import OutlineButton from '../src/components/OutlineButton';
import { formatDateToString, formatTimeToString, isFechaPasada } from '../src/utils/dateUtils';

export default function AddEditModal() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const { getCitaById, addCita, updateCita, deleteCita, sugerenciasDoctores, sugerenciasTitulos } =
    useAppointmentsContext();

  const cita = id ? getCitaById(id) : null;
  const isEditing = Boolean(cita);

  // Form state
  const [title, setTitle] = useState('');
  const [nameDoctor, setNameDoctor] = useState('');
  const [fecha, setFecha] = useState('');
  const [hora, setHora] = useState('');
  const [completada, setCompletada] = useState(false);

  // UI state
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [fechaError, setFechaError] = useState(false);
  const [showTitleSuggestions, setShowTitleSuggestions] = useState(false);
  const [showDoctorSuggestions, setShowDoctorSuggestions] = useState(false);

  // Load existing data
  useEffect(() => {
    if (cita) {
      setTitle(cita.title);
      setNameDoctor(cita.name_doctor);
      setFecha(cita.fecha);
      setHora(cita.hora);
      setCompletada(cita.completada);
    }
  }, [cita]);

  // Filtered suggestions
  const filteredTitles = sugerenciasTitulos.filter(
    (t) => t.toLowerCase().includes(title.toLowerCase()) && t !== title && title.length > 0
  );
  const filteredDoctors = sugerenciasDoctores.filter(
    (d) => d.toLowerCase().includes(nameDoctor.toLowerCase()) && d !== nameDoctor && nameDoctor.length > 0
  );

  const isFormValid = title.trim() && nameDoctor.trim() && fecha && hora && !fechaError;

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      const fechaStr = formatDateToString(selectedDate);
      setFecha(fechaStr);
      setFechaError(false);
    }
  };

  const handleTimeChange = (event, selectedDate) => {
    setShowTimePicker(false);
    if (selectedDate) {
      setHora(formatTimeToString(selectedDate));
    }
  };

  const validateAndSave = () => {
    if (!title.trim() || !nameDoctor.trim() || !fecha || !hora) return;

    if (isFechaPasada(fecha)) {
      setFechaError(true);
      return;
    }

    if (isEditing) {
      Alert.alert('¿Está seguro de cambiar la cita?', '', [
        { text: 'Sí', onPress: performSave },
        { text: 'Cancelar', style: 'cancel' },
      ]);
    } else {
      performSave();
    }
  };

  const performSave = () => {
    const payload = {
      title: title.trim(),
      name_doctor: nameDoctor.trim(),
      fecha,
      hora,
      completada,
    };

    if (isEditing) {
      updateCita(cita.id, payload);
    } else {
      addCita({ ...payload, completada: false });
    }
    router.back();
  };

  const handleDelete = () => {
    Alert.alert('¿Está seguro de eliminar esta cita?', '', [
      { text: 'Sí', onPress: confirmDelete, style: 'destructive' },
      { text: 'Cancelar', style: 'cancel' },
    ]);
  };

  const confirmDelete = () => {
    if (cita) {
      deleteCita(cita.id);
      router.back();
    }
  };

  const getInitialDate = () => {
    if (fecha) {
      const [d, m, y] = fecha.split('/');
      const year = y.length === 2 ? `20${y}` : y;
      return new Date(parseInt(year), parseInt(m) - 1, parseInt(d));
    }
    return new Date();
  };

  const getInitialTime = () => {
    if (hora) {
      const [h, min] = hora.split(':');
      const now = new Date();
      now.setHours(parseInt(h), parseInt(min));
      return now;
    }
    return new Date();
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{isEditing ? 'Editar Cita' : 'Nueva Cita'}</Text>
        {isEditing && (
          <Pressable onPress={handleDelete} style={styles.trashButton}>
            <Text style={styles.trashIcon}>🗑</Text>
          </Pressable>
        )}
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        {/* Título */}
        <View style={styles.field}>
          <Text style={styles.label}>Título</Text>
          <TextInput
            style={styles.input}
            placeholder="Ingresa título"
            placeholderTextColor="#787676"
            value={title}
            onChangeText={(text) => {
              setTitle(text);
              setShowTitleSuggestions(true);
            }}
            onBlur={() => setTimeout(() => setShowTitleSuggestions(false), 200)}
          />
          {showTitleSuggestions && filteredTitles.length > 0 && (
            <View style={styles.suggestions}>
              {filteredTitles.slice(0, 3).map((item) => (
                <Pressable
                  key={item}
                  style={styles.suggestionItem}
                  onPress={() => {
                    setTitle(item);
                    setShowTitleSuggestions(false);
                  }}
                >
                  <Text style={styles.suggestionText}>{item}</Text>
                </Pressable>
              ))}
            </View>
          )}
        </View>

        {/* Doctor */}
        <View style={styles.field}>
          <Text style={styles.label}>Nombre del Doctor</Text>
          <TextInput
            style={styles.input}
            placeholder="dr alberto ramírez vázquez"
            placeholderTextColor="#787676"
            value={nameDoctor}
            onChangeText={(text) => {
              setNameDoctor(text);
              setShowDoctorSuggestions(true);
            }}
            onBlur={() => setTimeout(() => setShowDoctorSuggestions(false), 200)}
          />
          {showDoctorSuggestions && filteredDoctors.length > 0 && (
            <View style={styles.suggestions}>
              {filteredDoctors.slice(0, 3).map((item) => (
                <Pressable
                  key={item}
                  style={styles.suggestionItem}
                  onPress={() => {
                    setNameDoctor(item);
                    setShowDoctorSuggestions(false);
                  }}
                >
                  <Text style={styles.suggestionText}>{item}</Text>
                </Pressable>
              ))}
            </View>
          )}
        </View>

        {/* Fecha y Hora */}
        <View style={styles.row}>
          <View style={[styles.field, styles.half]}>
            <Text style={styles.label}>Fecha</Text>
            <Pressable
              onPress={() => setShowDatePicker(true)}
              style={[styles.input, styles.inputPressable, fechaError && styles.inputError]}
            >
              <Text style={fecha ? styles.inputText : styles.placeholder}>
                {fecha || 'dd/mm/aa'}
              </Text>
            </Pressable>
          </View>

          <View style={[styles.field, styles.half]}>
            <Text style={styles.label}>Hora</Text>
            <Pressable
              onPress={() => setShowTimePicker(true)}
              style={[styles.input, styles.inputPressable]}
            >
              <Text style={hora ? styles.inputText : styles.placeholder}>
                {hora || 'hh:mm'}
              </Text>
            </Pressable>
          </View>
        </View>

        {/* Toggle Completado (solo edición) */}
        {isEditing && (
          <View style={styles.switchRow}>
            <Text style={styles.label}>Completado</Text>
            <Switch
              value={completada}
              onValueChange={setCompletada}
              trackColor={{ false: '#cccccc', true: '#71C1C4' }}
              thumbColor="#ffffff"
            />
          </View>
        )}

        {/* Botones */}
        <View style={styles.buttonsRow}>
          <OutlineButton title="Cancelar" onPress={() => router.back()} />
          <PrimaryButton
            title={isEditing ? 'Guardar cambios' : 'Añadir Cita'}
            onPress={validateAndSave}
            disabled={!isFormValid}
          />
        </View>
      </ScrollView>

      {showDatePicker && (
        <DateTimePicker
          value={getInitialDate()}
          mode="date"
          display="default"
          minimumDate={new Date()}
          onChange={handleDateChange}
        />
      )}

      {showTimePicker && (
        <DateTimePicker
          value={getInitialTime()}
          mode="time"
          display="default"
          onChange={handleTimeChange}
        />
      )}
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333333',
  },
  trashButton: {
    padding: 8,
  },
  trashIcon: {
    fontSize: 20,
    color: '#FF383C',
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  field: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#E8E8E8',
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#000000',
    fontWeight: 'bold',
  },
  inputPressable: {
    justifyContent: 'center',
  },
  inputText: {
    color: '#000000',
    fontWeight: 'bold',
    fontSize: 16,
  },
  placeholder: {
    color: '#787676',
    fontSize: 16,
  },
  inputError: {
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: '#FF383C',
  },
  row: {
    flexDirection: 'row',
    gap: 12,
  },
  half: {
    flex: 1,
  },
  suggestions: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    marginTop: 4,
    borderWidth: 1,
    borderColor: '#E7F3F3',
    overflow: 'hidden',
  },
  suggestionItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F4F8F9',
  },
  suggestionText: {
    color: '#333333',
    fontSize: 14,
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
    paddingVertical: 8,
  },
  buttonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
    marginTop: 8,
  },
});