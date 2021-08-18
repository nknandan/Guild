import React from 'react';
import { View, Text, Button, TouchableOpacity, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { windowHeight } from '../utils/Dimentions';

const colorslist = ["#A76BE6", "#6B83E6", "#6BE6E6","#B1E66B", "#E66B9C", "#E66B6B","#6FE66B", "#E66BC7", "#B1E66B", "#6F6BE6", "#B1E66B", "#6BE691", "#E6C26B", "#786BE6", "#E6A16B", "#E66B9C", ];

const InterestBar = ({buttonTitle, ...rest}) => {
    var itemcolor = colorslist[Math.floor(Math.random()*colorslist.length)];
    return(
        <TouchableOpacity style={styles.buttonContainer}{...rest}>
            {/* <LinearGradient colors={['#8d83e0', itemcolor]} style={styles.linearGradient}> */}
                <LinearGradient colors={['#8d83e0', '#6B60C9']} start={{ x: 0.6, y: 0 }} end={{ x: 1, y: 1}}style={styles.linear1}></LinearGradient>
                <Text style={styles.buttonText}>{buttonTitle}</Text>
            {/* </LinearGradient> */}
        </TouchableOpacity>
    );
};

export default InterestBar;
const styles = StyleSheet.create({
    buttonContainer: {
        marginBottom: 6,
        width: '49%',
        height: windowHeight /8,
        backgroundColor: '#E66B6B',
        borderRadius: 10,
        marginRight: 6,
        maxWidth: 200,
    },
    linear1: {
        width: '100%',
        height: '100%',
        borderRadius: 10,
    },
    buttonText: {
        marginTop: -(windowHeight /9),
        marginLeft: 10,
        fontSize: 20,
        fontWeight: 'bold',
        color: '#2d2d2d',
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