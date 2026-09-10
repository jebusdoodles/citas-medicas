import { Pressable, Text, StyleSheet } from 'react-native';

export default function SecondaryButton({ title, onPress, disabled }) {
  return (
    <Pressable 
      onPress={onPress} 
      disabled={disabled}
      style={({ pressed }) => [
        styles.button,
        pressed && styles.pressed,
        disabled && styles.disabled
      ]}
    >
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#E7F3F3',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 140,
  },
  pressed: {
    opacity: 0.85,
  },
  disabled: {
    opacity: 0.5,
  },
  text: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});