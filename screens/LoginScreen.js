import React, { useContext, useState } from 'react';
import { View, Text, TouchableOpacity, Button, Image, StyleSheet } from 'react-native';
import { windowHeight } from '../utils/Dimentions';
import FormButton from '../components/FormButton';
import FormInput from '../components/FormInput';
import SocialButton from '../components/SocialButton';
import { AuthContext } from '../navigation/AuthProvider';
import LinearGradient from 'react-native-linear-gradient';
import ForgotPassword from './ForgotPassword';


const LoginScreen = ({navigation}) => {
  
    const [email,setEmail] = useState();
    const [password,setPassword] = useState();

    const [data,setData] = useState({
      validPassword: true,
      validUsername: true,
    });

    const [blankCheck,setblankCheck] = useState({
      validEmail: false,
      validPassword: false,
    });

    const {login, googleLogin} = useContext(AuthContext);

    const handleValidPassword = (val) => {
      if( val.trim().length >= 8 ) {
        setData({
            ...data,
            validPassword: true
        });
      } 
      else if( val.trim().length == 0 ) {
        setData({
            ...data,
            validPassword: true
        });
      } 
      else {
          setData({
              ...data,
              validPassword: false
          });
      }
    }

    return (
        <View>
          <LinearGradient colors={['#2d2d2d', '#543965']} start={{ x: 0, y: 0.3 }} end={{ x: 0, y: 1}} style={styles.container}>
            <Image source={require('../assets/logo.png')} style={styles.logo}/>
            <FormInput 
                labelValue={email}
                onChangeText={(userEmail) => {
                  setEmail(userEmail)
                  setblankCheck({
                    validEmail: true,
                  })
                }}
                placeholderText="Email" 
                iconType="user" 
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}    
            />

            <FormInput 
                labelValue={password}
                onChangeText={(userPassword) => {
                  setPassword(userPassword)
                  handleValidPassword(userPassword)
                  setblankCheck({
                    validPassword: true,
                  })
                }}
                placeholderText="Password" 
                iconType="lock" 
                secureTextEntry={true}
            />

            { data.validPassword ? null : 
              <View animation="fadeInLeft" duration={500}>
              <Text style={styles.errorMsg}>Password must be 8 characters long.</Text>
              </View>
            }
            <FormButton
                buttonTitle="Log In"
                onPress={() => {
                    if(blankCheck.validEmail||blankCheck.validPassword == false){
                      alert("Atleast Enter valid details");
                    }
                    else if(data.validPassword == true){
                      login(email, password)
                    }else{
                      alert("Enter valid details");
                    }
                  }
                }
            />

            <TouchableOpacity style={styles.forgotButton} onPress={() => {navigation.navigate(ForgotPassword)}}>
                <Text style={styles.navButtonText}>Forgot Password?</Text>
            </TouchableOpacity>

            {/* <SocialButton
                buttonTitle="Sign In with Facebook"
                btnType="facebook"
                color="#4867aa"
                backgroundColor="#e6eaf4"
                onPress={() => fbLogin()}
            /> */}
            <View style={styles.empty}>

            </View>
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
          </LinearGradient>
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
    errorMsg: {
      color: '#E08384',
      fontSize: 14,
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
    empty: {
      marginBottom: 50,
    }
  });