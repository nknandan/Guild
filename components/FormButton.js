import React from 'react';
import { View, Text, Button, TouchableOpacity, StyleSheet } from 'react-native';
import { windowHeight } from '../utils/Dimentions';

const FormButton = ({buttonTitle, ...rest}) => {
    return(
        <TouchableOpacity style={styles.buttonContainer}{...rest}>
            <Text style={styles.buttonText}>{buttonTitle}</Text>
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
        padding: 10,
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
});