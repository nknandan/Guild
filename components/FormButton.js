import React from 'react';
import { View, Text, Button, TouchableOpacity, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { windowHeight } from '../utils/Dimentions';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const FormButton = ({buttonTitle, ...rest}) => {
    return(
        <TouchableOpacity style={styles.buttonContainer}{...rest}>
                <Text style={styles.buttonText}>{buttonTitle}</Text>
                <FontAwesome.Button 
                    name="long-arrow-right"
                    size={25}
                    backgroundColor="transparent"
                    color="#ffffff"
                    style={styles.iconright}
                />
        </TouchableOpacity>
    );
};

export default FormButton;
const styles = StyleSheet.create({
    buttonContainer: {
        marginTop: 10,
        width: '100%',
        height: windowHeight /15,
        backgroundColor: '#9100FF',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingRight: 10,
    },
    buttonText: {
        fontSize: 24,
        color: 'white',
        fontFamily: 'Montserrat-Regular',
    },
    iconright: {
        alignSelf: 'flex-end',
    },
});