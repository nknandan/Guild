import React, { useState, useContext} from 'react';
import { View, Text, TouchableOpacity, Button, Image, StyleSheet } from 'react-native';
import { windowHeight } from '../utils/Dimentions';
import FormButton from '../components/FormButton';
import FormInput from '../components/FormInput';
import SocialButton from '../components/SocialButton';
import { AuthContext } from '../navigation/AuthProvider';
import LinearGradient from 'react-native-linear-gradient';

const SignupScreen = ({navigation}) => {

    const [email,setEmail] = useState();
    const [name,setName] = useState();
    const [password,setPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();

    const {register, googleLogin} = useContext(AuthContext);

    return (
        <View>
          <LinearGradient colors={['#2d2d2d', '#543965']} start={{ x: 0, y: 0.3 }} end={{ x: 0, y: 1}} style={styles.container}>
            {/* <Image source={require('../assets/logo.png')} style={styles.logo}/> */}
            <Text style={styles.text}>Create an account</Text>
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
                labelValue={name}
                onChangeText={(userName) => setName(userName)}
                placeholderText="Name" 
                iconType="user" 
                autoCapitalize="true"
                autoCorrect={false}    
            />

            <FormInput 
                labelValue={password}
                onChangeText={(userPassword) => setPassword(userPassword)}
                placeholderText="Password" 
                iconType="lock" 
                secureTextEntry={true}
            />

            <FormInput
                    labelValue={confirmPassword}
                    onChangeText={(userPassword) => setConfirmPassword(userPassword)}
                    placeholderText="Confirm Password"
                    iconType="lock"
                    secureTextEntry={true}
                  />

            <FormButton
                buttonTitle="Sign Up"
                onPress={() => register(email, password)}
            />

            <View style={styles.textPrivate}>
                <Text style={styles.color_textPrivate}>
                By registering, you confirm that you accept our{' '}
                </Text>
                <TouchableOpacity onPress={() => alert('Terms Clicked!')}>
                <Text style={[styles.color_textPrivate, {color: '#e88832'}]}>
                    Terms of service
                </Text>
                </TouchableOpacity>
                <Text style={styles.color_textPrivate}> and </Text>
                <Text style={[styles.color_textPrivate, {color: '#e88832'}]}>
                Privacy Policy
                </Text>
            </View>

            {/* <SocialButton
                buttonTitle="Sign Up with Facebook"
                btnType="facebook"
                color="#4867aa"
                backgroundColor="#e6eaf4"
                onPress={() => fbLogin()}
            /> */}

            <View style={styles.empty}>

            </View>

            <SocialButton
                buttonTitle="Sign Up with Google"
                btnType="google"
                color="#de4d41"
                backgroundColor="#f5e7ea"
                onPress={() => googleLogin()}
            />

            <TouchableOpacity
                style={styles.navButton1}
                onPress={() => navigation.navigate('Login')}>
                <Text style={styles.navButtonText}>Have an account? Log In</Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>
    );
}

export default SignupScreen;

const styles = StyleSheet.create({
    container: {
      // justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
      paddingTop: 50,
      backgroundColor: '#2d2d2d',
      height: windowHeight,
      marginTop: -50,
    },
    logo: {
      height: 150,
      width: 150,
      resizeMode: 'cover',
      marginTop: -0,
    },
    text: {
      fontFamily: 'Kufam-SemiBoldItalic',
      fontSize: 26,
      marginLeft: -140,
      marginBottom: 10,
      color: '#ffbe8f',
    },
    navButton: {
      marginTop: 15,
    },
    navButton1: {
        margin: 25,
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
    textPrivate: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginVertical: 35,
        justifyContent: 'center',
        marginBottom: 70,
      },
      color_textPrivate: {
        fontSize: 13,
        fontWeight: '400',
        fontFamily: 'Lato-Regular',
        color: 'white',
      },
      empty: {
        marginBottom: 6,
      }
  });
