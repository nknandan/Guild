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

    const [data,setData] = useState({
      validPassword: true,
      validUsername: true,
      validConfirmPassword: true
    });

    const [blankCheck,setblankCheck] = useState({
      validEmail: false,
      validUsername: false,
      validPassword: false,
      validConfirmPassword: false,
    });

    const handelValidUsername = (val) => {
      if( val.trim().length >= 4 ) {
        setData({
            ...data,
            validUsername: true
        });
      } 
      else if( val.trim().length == 0 ) {
        setData({
            ...data,
            validUsername: true
        });
      } 
      else {
          setData({
              ...data,
              validUsername: false
          });
      }
    }

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

    const handleValidConfirmPassword = (val) => {
      if( val.trim() == password ) {
        setData({
            ...data,
            validConfirmPassword: true
        });
      } 
      else if( val.trim().length == 0 ) {
        setData({
            ...data,
            validConfirmPassword: true
        });
      } 
      else {
          setData({
              ...data,
              validConfirmPassword: false
          });
      }
    }

    const {register, googleLogin} = useContext(AuthContext);

    return (
        <View>
          <LinearGradient colors={['#2d2d2d', '#543965']} start={{ x: 0, y: 0.3 }} end={{ x: 0, y: 1}} style={styles.container}>
            {/* <Image source={require('../assets/logo.png')} style={styles.logo}/> */}
            <Text style={styles.text}>Create an account</Text>
            <FormInput 
              labelValue={email}
              onChangeText={(userEmail) => {
                setEmail(userEmail)
                setblankCheck({
                  validEmail: true,
                })
              }
              }
              placeholderText="Email" 
              iconType="user" 
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}    
            />
            <FormInput 
              labelValue={name}
              onChangeText={(userName) => {
                setName(userName)
                handelValidUsername(userName)
                setblankCheck({
                  validUsername: true,
                })
              }}
              placeholderText="Name"
              iconType="user" 
              autoCapitalize="true"
              autoCorrect={false}    
            />

            { data.validUsername ? null : 
              <View animation="fadeInLeft" duration={500}>
              <Text style={styles.errorMsg}>Username must be 4 characters long.</Text>
              </View>
            }

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

            <FormInput
              labelValue={confirmPassword}
              onChangeText={(userPassword) => {
                setConfirmPassword(userPassword)
                handleValidConfirmPassword(userPassword)
                setblankCheck({
                  validConfirmPassword: true,
                })
              }
              }
              placeholderText="Confirm Password"
              iconType="lock"
              secureTextEntry={true}
            />

            { data.validConfirmPassword ? null : 
              <View animation="fadeInLeft" duration={500}>
              <Text style={styles.errorMsg}>Passwords do not match.</Text>
              </View>
            }

            <View style={styles.empty1}></View>

            <View style={styles.container1}>
              <FormButton
                  buttonTitle="Sign Up"
                  onPress={() => {
                    if(blankCheck.validEmail||blankCheck.validPassword||blankCheck.validUsername||blankCheck.validConfirmPassword == false){
                      alert("Atleast Enter valid details");
                    }
                    else if(data.validPassword&&data.validUsername&&data.validConfirmPassword == true){
                      register(name, email, password)
                    }else{
                      alert("Enter valid details");
                    }
                    }
                  }
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

              <View style={styles.empty}></View>

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

            </View>

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
    container1: {
      marginTop: 366,
      position: 'absolute',
      alignItems: 'center',
      padding: 20,
      paddingTop: 50,
      backgroundColor: 'transparent',
      height: windowHeight,
      width: '110%',
    },
    logo: {
      height: 150,
      width: 150,
      resizeMode: 'cover',
      marginTop: -0,
    },
    errorMsg: {
      color: '#E08384',
      fontSize: 14,
    },
    text: {
      fontFamily: 'Kufam-SemiBoldItalic',
      fontSize: 26,
      marginLeft: -140,
      marginBottom: 10,
      color: '#ffbe8f',
    },
    navButton1: {
        margin: 25,
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
        marginBottom: 20,
      },
      color_textPrivate: {
        fontSize: 13,
        fontWeight: '400',
        fontFamily: 'Lato-Regular',
        color: 'white',
      },
      // empty: {
      //   marginBottom: 6,
      // },
  });
