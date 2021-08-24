import React, {useContext, useEffect, useState, Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import { AuthContext } from '../navigation/AuthProvider';
import { windowHeight } from '../utils/Dimentions';
import LinearGradient from 'react-native-linear-gradient';
import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';
import Logoanimation from '../components/LogoAnimation';

const ForgotPassword = ({navigation}) => {

  const [email,setEmail] = useState();

  const [blankCheck,setblankCheck] = useState({
    validEmail: false,
  });

  const {passwordReset} = useContext(AuthContext);

  return(
    <View>
        <LinearGradient colors={['#ffffff', '#D6C1E7']} start={{ x: 0, y: 0.5 }} end={{ x: 0, y: 1}} style={styles.container}>
            <View style={styles.navbar}>
                <Logoanimation/>
                <Image source={require('../assets/logo_name.png')} style={styles.logon}/>
            </View>
            <LinearGradient colors={['#9E97D4', '#24182E']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0}} style={styles.empty1}></LinearGradient>
            <View style={styles.maincontainer}>
                <Text style={styles.welcometext}>Forgot Password?</Text>
                <Text style={styles.para}>Please enter the email address you'd like your password reset information sent to</Text>
                <Text style={styles.para1}>Enter your e-mail address</Text>
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
            <View style={styles.empty9}></View>
            <FormButton
                buttonTitle="Request reset link"
                onPress={() => {
                    if(blankCheck.validEmail == false){
                      alert("Enter valid details");
                    }
                    else{
                      passwordReset(email);
                      alert("Password reset link has been sent to your e-mail!");
                    }
                  }
                }
            />
            <TouchableOpacity onPress={() => {navigation.navigate('Login')}}>
              <Text style={styles.para2}>Back to Login</Text>
            </TouchableOpacity>
            
            </View>
        </LinearGradient>
        
    </View>
  );
};

export default ForgotPassword;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    backgroundColor: '#2d2d2d',
    height: windowHeight,
  },
  navbar: {
    height: windowHeight/15,
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    marginLeft: -25,
  },
  logoc: {
    height: 120,
    width: 120,
    marginLeft: -25,
  },
  logon: {
    height: 90,
    width: 90,
    marginTop: -34,
    marginLeft: -50,
  },
  empty1: {
    height: 2,
    backgroundColor: 'red',
  },
  empty9: {
    height: 20,
  },
  usercon: {
    marginTop: 4,
    marginLeft: 210,
    alignItems: 'center',
  },
  maincontainer: {
    padding: 20,
  },
  maincontainer1: {
    padding: 15,
  },
  maincontainer2: {
    padding: 15,
    paddingLeft: 0,
    height: 540,
    // backgroundColor: 'white',
    flexWrap: 'wrap',
  },
  scroll: {
    flex: 1,
    paddingRight: 10,
    width: '110%',
  },
  maincontainer3: {
    height: 790,
    // backgroundColor: 'white',
    flexWrap: 'wrap',
  },
  welcometext: {
    fontSize: 22,
    fontWeight: '100',
    color: '#676767',
    textTransform: 'uppercase',
    marginBottom: 40,
    fontFamily: 'Montserrat-Regular'
  },
  welcometext1: {
    fontSize: 22,
    fontWeight: '100',
    color: 'black',
  },
  para: {
    fontSize: 18,
    fontWeight: '100',
    color: '#676767',
    marginBottom: 28,
  },
  para1: {
    fontSize: 16,
    fontWeight: '100',
    color: 'black',
    marginBottom: 2,
  },
  para2: {
    alignSelf: 'center',
    fontSize: 18,
    fontWeight: '100',
    color: '#676767',
    marginTop: 30,
    marginBottom: 4,
    fontFamily: 'Montserrat-Regular'
  },
  empty2: {
    height: windowHeight-200,
    width: 2,
    marginTop: 10,
    marginBottom: -(windowHeight-190),
  },

});
