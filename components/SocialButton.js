import React from 'react';
import { View, Text, Button, TouchableOpacity, StyleSheet } from 'react-native';
import { windowHeight } from '../utils/Dimentions';
import FontAwesome from 'react-native-vector-icons/FontAwesome'; 
import { color } from 'react-native-elements/dist/helpers';


const SocialButton = ({buttonTitle, btnType, color, backgroundColor, ...rest}) => {
    let bgColor = backgroundColor;
    
    return(
        <TouchableOpacity style={[styles.buttonContainer, {backgroundColor: bgColor}]} {...rest}>
            <View style={styles.iconWrapper}>
                <FontAwesome name={btnType} size={22} color={color}/>
            </View>
            <View style={styles.btnTxtWrapper}> 
                <Text style={styles.buttonText}>{buttonTitle}</Text>
            </View>
        </TouchableOpacity>
    );
};

export default SocialButton;

const styles = StyleSheet.create({
    buttonContainer: {
      marginTop: 10,
      width: '80%',
      height: windowHeight / 15,
      padding: 10,
      flexDirection: 'row',
      borderRadius: 20,
    },
    iconWrapper: {
      width: 30,
      justifyContent: 'center',
      alignItems: 'center',
    },
    icon: {
      fontWeight: 'bold',
    },
    btnTxtWrapper: {
      flex: 1,
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
      marginLeft: 16,
      marginTop: 2,
    },
    buttonText: {
      fontSize: 18,
      fontWeight: 'bold',
      fontFamily: 'Lato-Regular',
    },
  });