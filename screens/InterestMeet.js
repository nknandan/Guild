import React, {useContext, useEffect, useState, useCallback, Component} from 'react';
import { useFocusEffect } from '@react-navigation/native';
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
import InterestBar from '../components/InterestBar';
import Logoanimation from '../components/LogoAnimation';
import { GiftedChat } from 'react-native-gifted-chat'
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const InterestMeet = ({navigation, route}) => {

  const [messages, setMessages] = useState([]);

  const RoomsCollection = firestore().collection('Rooms');

  let room;
  let they;
  let we;

  useFocusEffect(
    React.useCallback(() => {
      //Check if Room exists
      return () => {
        RoomsCollection
          .doc(room.id)
          .delete()
          .then(() => {
            console.log('Room Cleared');
          });
      };
    }, [])
  );

  useEffect(() => {
    const {roomName} = route.params;

    RoomsCollection.where('Connected', '<', 2).where("Interest", "==", roomName).get().then(querySnapshot => {
      let rooms = querySnapshot._docs;
      if(rooms.length > 0){
        //Rooms Available
        room = rooms[0]._ref;
        console.log(`RoomId: ${room.id}`);
        RoomsCollection.doc(room.id).update({
          'Connected': 2,
          'ConnectedUsers': firestore.FieldValue.arrayUnion(auth().currentUser.uid)
        })
        .then(() => {
          console.log('Room Connected');
          RoomsCollection.doc(room.id).onSnapshot(documentSnapshot => {
            let updatedData = documentSnapshot.data();
            //If we don't have the other user's id
            if(!they.id){
              updatedData.ConnectedUsers.forEach(user => {
                if(user !== auth().currentUser.uid){
                  they.id = user;
                }
              })
            }

            //Checking if we sent any message
            console.log(updatedData[`${auth().currentUser.uid}_Message`]);
            if(updatedData[`${auth().currentUser.uid}_Message`] !== we.previousMessage){
              onSend([updatedData[`${auth().currentUser.uid}_Message`]])
            }

            //Checking if they sent any message
            console.log(updatedData[`${they.id}_Message`]);
            if(updatedData[`${they.id}_Message`] !== we.previousMessage){
              onSend([updatedData[`${they.id}_Message`]])
            }
            console.log('User data: ', documentSnapshot.data());
          });    
        });
      }else {
        //Create a new Room
        RoomsCollection.add({
          Interest: roomName,
          ConnectedUsers: [auth().currentUser.uid],
          Connected: 1
        })
        .then((snapshot) => {
          room = snapshot
          console.log('Room Created and Waiting!');
          RoomsCollection.doc(room.id).onSnapshot(documentSnapshot => {
            console.log('User data: ', documentSnapshot.data());
          }); 
        });
      
      }
      console.log(querySnapshot._docs);
    });
    
    setMessages([
      {
        _id: 1,
        text: 'Hello developer',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
        },
      },
    ])
  }, [])

  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
  }, [])

  return(
    <View>
        <LinearGradient colors={['#2d2d2d', '#653942']} start={{ x: 0, y: 0.5 }} end={{ x: 0, y: 1}} style={styles.container}>
            <View style={styles.navbar}>
                <Logoanimation/>
                <Image source={require('../assets/logo_name.png')} style={styles.logon}/>
            </View>
            <LinearGradient colors={['#9E97D4', '#ffbe8f']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0}} style={styles.empty1}></LinearGradient>
            <View style={styles.maincontainer}>
                <Text style={styles.welcometext}>InterestMeet</Text>
            </View>
            <GiftedChat
              messages={messages}
              onSend={messages => onSend(messages)}
              user={{
              _id: auth().currentUser.uid}}
            />
        </LinearGradient>
        
    </View>
  );
};

export default InterestMeet;

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
