import { Pressable, Text, StyleSheet } from "react-native";

export default function AppointmentCard({ title, name_doctor, fecha, hora, onPress }){
    return(
        <Pressable
            onPress={onPress}
            style={styles.card}
        >
            <Text style={styles.title}>{fecha} - {hora}</Text>
            <Text style={styles.subtitle}>{title}</Text>
            <Text style={styles.subtitle}>{name_doctor}</Text>
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
        shadowColor: '#000000', 
        shadowOffset: { width: 0, height: 4 }, 
        shadowOpacity: 0.04, 
        shadowRadius: 4, 
        elevation: 4, 
    }, 
    title: {
        color: '#000000', 
        fontWeight: 'bold', 
        fontSize: 16, 
        marginBottom: 4, 
    }, 
    subtitle: {
        color: '#333333', 
        fontSize: 14, 
        marginBottom: 2, 
    }
})