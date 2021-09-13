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
import Logoanimation from '../components/LogoAnimation';
import FriendBar from '../components/FriendBar';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const UserProfile = ({navigation}) => {
  const {user, logout} = useContext(AuthContext);

  const [userName, setUserName] = useState("");

  const[friends, setFriends] = useState([]);
  
  useEffect(()=>{
    setFriends([]);
    firestore().collection("Users").doc(auth().currentUser.uid).get().then(userSnapshot => {
      let userData = userSnapshot.data();
      let friendIds = Object.keys(userData.Friends);
      friendIds.forEach(friendId => {
        firestore().collection("Users").doc('' + friendId).get().then(friendSnapshot => {
          let friendData = friendSnapshot.data();
          friendData.roomId = userData.Friends[friendId]
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
      <LinearGradient colors={['#ffffff', '#D6C1E7']} start={{ x: 0, y: 0.5 }} end={{ x: 0, y: 1}} style={styles.container}>
           <View style={styles.navbar}>
              <Logoanimation/>
              <Image source={require('../assets/logo_name.png')} style={styles.logon}/>
           </View>
           <LinearGradient colors={['#9E97D4', '#24182E']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0}} style={styles.empty1}></LinearGradient>
           <View style={styles.maincontainer}>
           <Text style={styles.welcometext}>Welcome</Text>
           <View style={styles.userNameText1}>
           <Text  numberOfLines={1} style={styles.userNameText}>{userName}</Text>
           </View>
            
            <LinearGradient colors={['#9E97D4', '#24182E']} start={{ x: 0, y: 0 }} end={{ x: 0, y: 1}} style={styles.empty2}></LinearGradient>
            <View style={styles.maincontainer1}>
              <Text style={styles.welcometext1}>Your Friends</Text>
              <ScrollView style={styles.scrollViewS}>
                {friends.map((friend, key) => {
                  console.log(`OBJJ ${friend}`);
                  return (<FriendBar key={key} friendName={'' + friend.Name} friendObj={friend}/>)
                })}
              </ScrollView>              
            </View>
           </View>
           <TouchableOpacity style={styles.logoutButton} onPress={() => logout()}>
                <FontAwesome name={'sign-out'} size={34} color={'#9100FF'}/>
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
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    marginLeft: -(windowWidth/18),
  },
  logoc: {
    height: 120,
    width: 120,
    marginLeft: -(windowWidth/18),
  },
  logon: {
    height: 90,
    width: 90,
    marginTop: -(windowHeight/22),
    marginLeft: -(windowWidth/8),
  },
  empty1: {
    height: (windowHeight/220),
    backgroundColor: 'red',
  },
  usercon: {
    marginTop: 4,
    marginLeft: 210,
    alignItems: 'center',
  },
  maincontainer: {
    padding: (windowHeight/40),
  },
  maincontainer1: {
    padding: (windowHeight/60),
  },
  maincontainer2: {
    padding: (windowHeight/60),
    paddingLeft: 0,
    height: (windowHeight/1.39),
    // backgroundColor: 'white',
    flexWrap: 'wrap',
  },
  scroll: {
    flex: 1,
    paddingRight: (windowWidth/30),
    width: (windowWidth/1.14),
  },
  maincontainer3: {
    height: (windowHeight/1.1),
    flexWrap: 'wrap',
  },
  welcometext: {
    fontSize: 22,
    fontWeight: '100',
    color: '#676767',
    // textTransform: 'uppercase'
    fontFamily: 'Montserrat-Regular',
  },
  userNameText: {
    fontSize: 26,
    fontWeight: '100',
    color: '#000000',
    fontFamily: 'Montserrat-Regular',
    marginTop: -30,
    marginLeft: 112,

  },
  userNameText1: {
    width: 300,
  },
  welcometext1: {
    fontSize: 18,
    fontWeight: '100',
    color: 'black',
    fontFamily: 'Montserrat-Regular',
    marginBottom: 12,
  },
  empty2: {
    height: (windowHeight/1.34),
    width: (windowHeight/220),
    marginTop: (windowHeight/100),
    marginBottom: -(windowHeight-190),
  },
  logoutButton: {
    padding: 8,
    position: 'absolute',
    backgroundColor: '#E7E7E7',
    marginTop: 59,
    marginLeft: windowWidth-64,
    borderRadius: 24,
  },
  scrollViewS: {
    height: 524,
    width: '110%'
  }

});
  