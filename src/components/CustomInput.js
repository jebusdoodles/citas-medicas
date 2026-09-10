import { View, TextInput, Text, StyleSheet } from 'react-native'; 

export default function CustomInput({ label, placeholder, value, onChangeText, error, keyboardType, secureTextEntry }){
    return(
        <View style={styles.container}>
            {label && <Text style={styles.label}>{label}</Text>}
            <TextInput
                style={[
                    styles.input, 
                    error && styles.inputError
                ]}
                placeholder={placeholder}
                placeholderTextColor="#787676"
                value={value}
                onChangeText={onChangeText}
                keyboardType={keyboardType || 'default'}
                secureTextEntry={secureTextEntry || false}
            />
        </View>
    ); 
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 12, 
        width: '100%',
    }, 
    label: {
        fontSize: 14, 
        fontWeight: 'bold', 
        color: '#333333', 
        marginBottom: 6, 
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
    inputError: {
        backgroundColor: 'transparent', 
        borderWidth: 1, 
        borderColor: '#FF383C', 
    }
}); 