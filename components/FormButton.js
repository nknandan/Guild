import React from 'react';
import { View, Text, Button, TouchableOpacity, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { windowHeight } from '../utils/Dimentions';

const FormButton = ({buttonTitle, ...rest}) => {
    return(
        <TouchableOpacity style={styles.buttonContainer}{...rest}>
            <LinearGradient colors={['#8d83e0', '#A76BE6']} style={styles.linearGradient}>
                <Text style={styles.buttonText}>{buttonTitle}</Text>
            </LinearGradient>
        </TouchableOpacity>
    );
};

export default FormButton;
const styles = StyleSheet.create({
    buttonContainer: {
        marginTop: 10,
        width: '100%',
        height: windowHeight /15,
        backgroundColor: '#8d83e0',
        // padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
    },
    buttonText: {
        marginTop: -2,
        fontSize: 24,
        fontWeight: 'bold',
        color: '#2d2d2d',
        fontFamily: 'Lato-Regular',
        
    },
    linearGradient: {
        flex: 1,
        width: '100%',
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 8,
        borderRadius: 20,
        alignItems: 'center'
      },
});