import React, {useContext, useState, useEffect} from 'react';
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import { AuthContext } from '../navigation/AuthProvider';
import { windowHeight, windowWidth } from '../utils/Dimentions';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/FontAwesome';
import Logoanimation from '../components/LogoAnimation';
import FriendBar from '../components/FriendBar';

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const UserProfile = ({navigation}) => {
  const {user, logout} = useContext(AuthContext);

  const [userName, setUserName] = useState("");

  const[friends, setFriends] = useState([]);


  useEffect(()=>{
    firestore().collection("Users").doc(auth().currentUser.uid).get().then(userSnapshot => {
      let userData = userSnapshot.data();
      let friendIds = Object.keys(userData.Friends);
      friendIds.forEach(friendId => {
        firestore().collection("Users").doc('' + friendId).get().then(friendSnapshot => {
          let friendData = friendSnapshot.data();
          setFriends(oldFriendsList => [...oldFriendsList, friendData]);
        });
      })
      setUserName(userData.Name)
    }).catch(e => {
      console.log(e);
    })
  }, []);

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
           <View style={styles.maincontainer}>
            <Text style={styles.welcometext}>Welcome {userName}</Text>
            <LinearGradient colors={['#9E97D4', '#ffbe8f']} start={{ x: 0, y: 0 }} end={{ x: 0, y: 1}} style={styles.empty2}></LinearGradient>
            <View style={styles.maincontainer1}>
              <Text style={styles.welcometext1}>Your Friends</Text>
              <ScrollView style={styles.scrollViewS}>
                {friends.map((friend, key) => {
                  return (<FriendBar key={key} friendName={'' + friend.Name}/>)
                })}
              </ScrollView>              
            </View>
           </View>
           <TouchableOpacity style={styles.logoutButton} onPress={() => logout()}>
                <FontAwesome name={'sign-out'} size={34} color={'#8d83e0'}/>
            </TouchableOpacity>
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
    logoutButton: {
      position: 'absolute',
      marginTop: 73,
      marginLeft: windowWidth-36,
    },
    scrollViewS: {
      height: 524,
      width: '110%'
    }
  
  });
  