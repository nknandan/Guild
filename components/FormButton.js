import React from 'react';
import { View, Text, Button, TouchableOpacity, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { windowHeight } from '../utils/Dimentions';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const FormButton = ({buttonTitle, ...rest}) => {
    return(
        <TouchableOpacity style={styles.buttonContainer}{...rest}>
            <LinearGradient colors={['#9100FF', '#9100FF']} style={styles.linearGradient}>
                <Text style={styles.buttonText}>{buttonTitle}</Text>
                <FontAwesome.Button 
                    name="long-arrow-right"
                    size={25}
                    backgroundColor="#9100FF"
                    color="#ffffff"
                    style={styles.iconright}
                />
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
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
    },
    buttonText: {
        fontSize: 24,
        color: 'white',
        fontFamily: 'Montserrat-Regular',
        marginLeft: 10,
    },
    iconright: {
        marginLeft: 200,
    },
    linearGradient: {
        flex: 1,
        width: '100%',
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 20,
        alignItems: 'center',
        flexDirection: 'row'
      },
});