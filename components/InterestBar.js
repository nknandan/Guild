import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { windowHeight } from '../utils/Dimentions';

const InterestBar = ({buttonTitle, ...rest}) => {
    return(
        <TouchableOpacity style={styles.buttonContainer}{...rest}>
                <LinearGradient colors={['transparent', '#6B60C9']} start={{ x: 1, y: 0 }} end={{ x: 0, y: 1}}style={styles.linear1}></LinearGradient>
                <LinearGradient colors={['transparent', 'rgba(225, 225, 225, 0.25)', 'transparent']} start={{ x: 0.9, y: 0 }} end={{ x: 0, y: 1}}style={styles.linear2}></LinearGradient>
                <Text style={styles.buttonText}>{buttonTitle}</Text>
        </TouchableOpacity>
    );
};

export default InterestBar;
const styles = StyleSheet.create({
    buttonContainer: {
        marginBottom: 6,
        width: '49%',
        height: windowHeight /8,
        backgroundColor: 'transparent',
        borderRadius: 10,
        marginRight: 6,
        maxWidth: 200,
        borderWidth: 2,
        borderColor: '#6B60C9'
        // borderColor: '#8d83e0'
    },
    linear1: {
        width: '100%',
        height: '100%',
        borderRadius: 8,
    },
    linear2: {
        width: '100%',
        height: '100%',
        borderRadius: 8,
        marginTop: -(windowHeight /8.3),
    },
    buttonText: {
        marginTop: -(windowHeight /9),
        marginLeft: 10,
        fontSize: 20,
        // fontWeight: 'bold',
        color: 'white',
        fontFamily: 'Lato-Regular',
        
    },
    linearGradient: {
        flex: 1,
        width: '100%',
        // paddingLeft: 10,
        // paddingRight: 15,
        // paddingTop: 4,
        borderRadius: 10,
    },

});