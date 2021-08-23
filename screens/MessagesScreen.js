import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
} from 'react-native';
import { windowHeight } from '../utils/Dimentions';
import LinearGradient from 'react-native-linear-gradient';
import Logoanimation from '../components/LogoAnimation';
import MessageComponent from '../components/MessageComponent';

const MessagesScreen = ({navigation}) => {

  return(
    <View>
        <LinearGradient colors={['#2d2d2d', '#653942']} start={{ x: 0, y: 0.5 }} end={{ x: 0, y: 1}} style={styles.container}>
            <View style={styles.navbar}>
                <Logoanimation/>
                <Image source={require('../assets/logo_name.png')} style={styles.logon}/>
            </View>
            <LinearGradient colors={['#9E97D4', '#ffbe8f']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0}} style={styles.empty1}></LinearGradient>
            <View style={styles.maincontainer}>
                <Text style={styles.welcometext}>Messages</Text>
                <LinearGradient colors={['#9E97D4', '#ffbe8f']} start={{ x: 0, y: 0 }} end={{ x: 0, y: 1}} style={styles.empty2}></LinearGradient>
                <View style={styles.maincontainer1}>
                  <ScrollView style={styles.scrollViewS}>
                    <MessageComponent/>
                    <MessageComponent/>
                    <MessageComponent/>
                    <MessageComponent/>
                    <MessageComponent/>
                    <MessageComponent/>
                    <MessageComponent/>
                    <MessageComponent/>
                    <MessageComponent/>
                    <MessageComponent/>
                    <MessageComponent/>
                    <MessageComponent/>
                    <MessageComponent/>
                    <MessageComponent/>
                    <MessageComponent/>
                  </ScrollView>              
                </View>
            </View>
        </LinearGradient>
        
    </View>
  );
};

export default MessagesScreen;

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
  scrollViewS: {
    paddingTop: 12,
    height: 555,
    width: '104%'
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
