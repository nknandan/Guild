import React, {useEffect, useState} from 'react';
import {Image, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { windowHeight } from '../utils/Dimentions';




const InterestBar = ({buttonTitle, ...rest}) => {

    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
    }
    let arr = [`require('../images/4.jpg')`, `require('../images/1.jpg')`, `require('../images/2.jpg')`, `require('../images/3.jpg')`, `require('../images/7.jpg')`, `require('../images/5.jpg')`, `require('../images/6.jpg')`]     
    useEffect(() => {
        let imagen = getRandomInt(1,9)
        console.log(imagen);
        console.log(arr[1]);
    }, []);
    
    return(
        <TouchableOpacity style={styles.buttonContainer}{...rest}>
                {/* <LinearGradient colors={['#ed213a', '#6B60C9']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1}}style={styles.linear1}></LinearGradient> */}
                <Image source={require('../images/4.jpg')} style={styles.imageC} blurRadius={3}/>
                <View style={styles.buttonTextBox}>
                    <Text style={styles.buttonText}>{buttonTitle}</Text>
                </View>        
        </TouchableOpacity>
    );
};

export default InterestBar;
const styles = StyleSheet.create({
    buttonContainer: {
        marginBottom: 6,
        width: '49%',
        height: windowHeight /5,
        backgroundColor: 'transparent',
        borderRadius: 20,
        marginRight: 6,
        maxWidth: 200,
        borderWidth: 2,
        borderColor: '#ffffff',
        justifyContent: 'center'
    },
    imageC: {
        position: 'absolute',
        height: '100%',
        width: '100%',
        borderRadius: 17,
    },
    linear2: {
        position: 'absolute',
        height: '100%',
        width: '100%',
        borderRadius: 17,
    },
    buttonText: {
        alignSelf: 'center',
        // marginBottom: 8,
        // marginLeft: 10,
        fontSize: 17,
        color: 'white',
        fontFamily: 'Montserrat-Regular',
        
    },
    buttonTextBox: {
        height: 60,
        alignSelf: 'center',
        // marginTop : 88,
        borderRadius: 18,
        // backgroundColor: 'red',
        flexDirection: 'row',
        paddingRight: 3,
    },
    linearGradient: {
        flex: 1,
        width: '100%',
        borderRadius: 10,
    },

});