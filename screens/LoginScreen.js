import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Button, Image, StyleSheet } from 'react-native';
import { windowHeight } from '../utils/Dimentions';
import FormButton from '../components/FormButton';
import FormInput from '../components/FormInput';
import SocialButton from '../components/SocialButton';


const LoginScreen = ({navigation}) => {

    const [email,setEmail] = useState();
    const [password,setPassword] = useState();

    return (
        <View style={styles.container}>
            <Image source={require('../assets/logo.png')} style={styles.logo}/>
            <FormInput 
                labelValue={email}
                onChangeText={(userEmail) => setEmail(userEmail)}
                placeholderText="Email" 
                iconType="user" 
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}    
            />

            <FormInput 
                labelValue={password}
                onChangeText={(userPassword) => setPassword(userPassword)}
                placeholderText="Password" 
                iconType="lock" 
                secureTextEntry={true}
            />

            <FormButton
                buttonTitle="Log In"
                onPress={() => alert('Log In is clicked !')}
            />

            <TouchableOpacity style={styles.forgotButton} onPress={() => {}}>
                <Text style={styles.navButtonText}>Forgot Password?</Text>
            </TouchableOpacity>

            <SocialButton
                buttonTitle="Sign In with Facebook"
                btnType="facebook"
                color="#4867aa"
                backgroundColor="#e6eaf4"
                onPress={() => fbLogin()}
            />

            <SocialButton
                buttonTitle="Sign In with Google"
                btnType="google"
                color="#de4d41"
                backgroundColor="#f5e7ea"
                onPress={() => googleLogin()}
            />

            <TouchableOpacity
                style={styles.forgotButton}
                onPress={() => navigation.navigate('Signup')}>
                <Text style={styles.navButtonText}>
                Don't have an account? Create here
                </Text>
            </TouchableOpacity>
        </View>
    );
}

export default LoginScreen;

const styles = StyleSheet.create({
    container: {
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
      paddingTop: 50,
      backgroundColor: '#2d2d2d',
      height: windowHeight,
    },
    logo: {
      height: 150,
      width: 150,
      resizeMode: 'cover',
      marginTop: -0,
    },
    text: {
      fontFamily: 'Kufam-SemiBoldItalic',
      fontSize: 28,
      marginBottom: 10,
      color: '#051d5f',
    },
    navButton: {
      marginTop: 15,
    },
    forgotButton: {
      marginVertical: 35,
    },
    navButtonText: {
      marginTop: -8,
      fontSize: 18,
      fontWeight: '500',
      color: '#ffbe8f',
      fontFamily: 'Lato-Regular',
    },
  });