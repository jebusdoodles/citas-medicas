import { Pressable, Text, StyleSheet } from "react-native";

export default function OutlineButton({ title, onPress, disabled }){
    return(
        <Pressable
            onPress={onPress}
            disabled={disabled}
            style={({pressed}) => [
                styles.button,
                pressed && styles.pressed, 
                disabled && styles.disabled
            ]}
        >
            <Text style={styles.text}>{title}</Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: 'transparent',
        paddingVertical: 14, 
        paddingHorizontal: 24, 
        borderRadius: 16, 
        borderWidth: 1.5, 
        borderColor: '#71C1C4',
        alignItems: 'center', 
        minWidth: 140, 
    }, 
    pressed: {
        opacity: 0.7, 
    }, 
    disabled: {
        opacity: 0.4,
    },
    text: {
        color: '#71C1C4', 
        fontWeight: 'bold', 
        fontSize: 16, 
    }, 
})