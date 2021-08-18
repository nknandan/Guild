import React, {useContext, useEffect, useState, Component} from 'react';
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  FlatList,
  SafeAreaView,
  Alert,
  Image,
  TouchableOpacity,
  Animated,
} from 'react-native';
import { AuthContext } from '../navigation/AuthProvider';
import { windowHeight } from '../utils/Dimentions';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/FontAwesome';
import Logoanimation from '../components/LogoAnimation';
import FormButton from '../components/FormButton';

const UserProfile = ({navigation}) => {
  const {user, logout} = useContext(AuthContext);

  return(
    <View>
      <LinearGradient colors={['#2d2d2d', '#3C6539']} start={{ x: 0, y: 0.5 }} end={{ x: 0, y: 1}} style={styles.container}>
           <View style={styles.navbar}>
            {/* <View>
            <Image source={require('../assets/logo_circle.png')} style={styles.logoc}/>
            </View> */}
            <Logoanimation/>
            {/* <Image source={require('../assets/logo_circle.png')} style={styles.logoc}/> */}
            <Image source={require('../assets/logo_name.png')} style={styles.logon}/>
            <TouchableOpacity style={styles.usercon}>
              <Icon.Button
                name="envelope"
                backgroundColor="#2d2d2d"
                color='#8d83e0'
                size={30}
                style={styles.user}
                onPress={() => navigation.navigate('MessagesScreen')}
              />
            </TouchableOpacity>
           </View>
           <LinearGradient colors={['#9E97D4', '#ffbe8f']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0}} style={styles.empty1}></LinearGradient>
           <View style={{width: '30%'}}>
            <FormButton
                  buttonTitle="Log Out"
                  onPress={() => logout()}
              />
           </View>
           
          </LinearGradient>
    </View>
  );
};

export default UserProfile;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    backgroundColor: '#2d2d2d',
    height: windowHeight,
  },
  navbar: {
    height: windowHeight/15,
    backgroundColor: '#2d2d2d',
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
    color: '#ffbe8f',
    textTransform: 'uppercase'
  },
  welcometext1: {
    fontSize: 22,
    fontWeight: '100',
    color: 'white',
  },
  empty2: {
    height: windowHeight-200,
    width: 2,
    marginTop: 10,
    marginBottom: -(windowHeight-190),
  },

});
