import React from 'react';
import { View, Text, Button, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { windowWidth, windowHeight } from '../utils/Dimentions';
import AntDesign from 'react-native-vector-icons/AntDesign';


const FormButton = ({labelValue, placeholderText, iconType, error, ...rest}) => {
    return(
        <View style={styles.inputContainer} >
            <View style={styles.iconStyle}>
                <AntDesign name={iconType} size={25} color="#9100FF"/>
            </View>
            <TextInput
                style={styles.input}
                value={labelValue}
                numberOfLines={1}
                placeholder={placeholderText}
                placeholderTextColor='#575757'
                {...rest}
            />
        </View>
    );
};

export default FormButton;

const styles = StyleSheet.create({
    inputContainer: {
      marginTop: 5,
      marginBottom: 10,
      width: '100%',
      height: windowHeight / 15,
      borderColor: '#9100FF',
      borderRadius: 20,
      borderWidth: 2,
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#D8D8D8',
    },
    iconStyle: {
      padding: 10,
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      borderColor: '#9100FF',
      borderRightColor: '#ccc',
      borderRightWidth: 2,
      width: 50,
    },
    input: {
      padding: 10,
      flex: 1,
      fontSize: 16,
      fontFamily: 'Lato-Regular',
      color: '#333',
      justifyContent: 'center',
      alignItems: 'center',
      color: '#9100FF'
    },
    inputField: {
      padding: 10,
      marginTop: 5,
      marginBottom: 10,
      width: windowWidth / 1.5,
      height: windowHeight / 15,
      fontSize: 16,
      borderRadius: 8,
      borderWidth: 1,
    },
  });