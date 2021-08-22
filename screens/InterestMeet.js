import React, {useContext, useEffect, useState, useCallback, KeyboardAvoidingView, Component} from 'react';
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
  BackHandler
} from 'react-native';
import { AuthContext } from '../navigation/AuthProvider';
import { windowHeight, windowWidth } from '../utils/Dimentions';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/FontAwesome';
import InterestBar from '../components/InterestBar';
import Logoanimation from '../components/LogoAnimation';
import { Composer, InputToolbar, Time, Bubble, GiftedChat } from 'react-native-gifted-chat'
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import Modal from 'react-native-modalbox'

const InterestMeet = ({navigation, route}) => {

  const [messages, setMessages] = useState([]);

  const [roomId, setRoomId] = useState("");

  const RoomsCollection = firestore().collection('Rooms');

  const [addf, setAddf] = useState(['Add Friend','user-plus','#2d2d2d']);

  let they = {};

  let userExited = false;

  Initialize();

  useEffect(() => {
    console.log("use Effect");
    console.log(`RoomId ${roomId}`);
  }, []);

  function Initialize(){
    console.log("hi");
    console.log(`STRAT ROOM ${JSON.stringify(roomId)}`);
    if(roomId !== ""){
      return;
    }
    const {roomName} = route.params;

    RoomsCollection.where('Connected', '<', 2).where("Interest", "==", roomName).get().then(querySnapshot => {

      let rooms = querySnapshot._docs;

      if(rooms.length > 0){
        //Rooms Available
        console.log(`Setting Room Id: ${rooms[0]._ref.id}`);
        setRoomId(rooms[0]._ref.id);

        RoomsCollection.doc(rooms[0]._ref.id).update({
          'Connected': 2,
          'ConnectedUsers': firestore.FieldValue.arrayUnion(auth().currentUser.uid)
        })
        .then(() => {
          console.log('Room Connected');   
          console.log("Listening");
          startListening(rooms[0]._ref.id);
        });

      }else {
        //Create a new Room
        RoomsCollection.add({
          Interest: roomName,
          ConnectedUsers: [auth().currentUser.uid],
          Connected: 1
        })
        .then((snapshot) => {
          console.log(snapshot._documentPath._parts[1]);

          console.log(`Setting Room Id: ${snapshot._documentPath._parts[1]}`);
          setRoomId(snapshot._documentPath._parts[1]);

          console.log('Room Created and Waiting!');
          console.log("Listening");
          startListening(snapshot._documentPath._parts[1]);
        });
      }
    });
  }

  function startListening(roomUid){
    console.log(`Room UID: ${roomUid}`);
    RoomsCollection.doc(roomUid).onSnapshot(documentSnapshot => {
      console.log(documentSnapshot);
      let updatedData = documentSnapshot.data();
      if(!updatedData){
        //User Disconnected
        if(!userExited){
          Alert.alert(
            'User Disconnected',
            'Do you want to find a new user?',
            [
              {text: 'Reconnect', onPress: () => {
                setMessages([]);
                Initialize();
              }},
              {text: 'Cancel'},
            ],
            { cancelable: false }
          )
        }
        return;
      }
      //If we don't have the other user's id
      if(!they.id){
        updatedData.ConnectedUsers.forEach(user => {
          console.log(`User ${user}`);
          if(user !== auth().currentUser.uid){
            they.id = user;
          }
        })
      }

      //Checking if they sent any message
      console.log(updatedData[`${they.id}_Message`]);
      if(updatedData[`${they.id}_Message`]){
        RoomsCollection.doc(roomUid).update({
          [`${they.id}_Message`]: firestore.FieldValue.delete()
        });
        onMessageReceive(
          {
            _id: new Date().getTime(),
            text: updatedData[`${they.id}_Message`],
            createdAt: new Date().getTime(),
            user: {
              _id: they.id,
              name: they.id
            }
          }
        )
      }
      console.log('User data: ', documentSnapshot.data());
    }); 

    const backAction = () => {
      Alert.alert("Hold on!", "Are you sure you want to exit this room?", [
        {
          text: "Cancel",
          onPress: () => null,
          style: "cancel"
        },
        { text: "YES", onPress: () => {
          console.log(`Remove RoomId: ${roomUid}`);
          userExited = true;
          RoomsCollection.doc(roomUid).delete().then(() => {
            console.log('Room Cleared');
          });
          navigation.goBack()
        }  }
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );
  }

  function onMessageReceive(newMessage = []) {
    setMessages(previousMessages => GiftedChat.append(previousMessages, newMessage));
  }

  function onMessageSent(newMessage = []) {
    console.log(`Message Sent: RoomId : ${roomId}`);
    RoomsCollection.doc(roomId).update({
      [`${auth().currentUser.uid}_Message`]: newMessage[0].text
    }).then(snapshot => {

    }).catch(error => {
      console.log(`Firebase Error ${error}`);
    })
    setMessages(previousMessages => GiftedChat.append(previousMessages, newMessage));
  }

  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: '#ffbe8f',
          },
          left: {
            backgroundColor: '#8d83e0',
          }
        }}
        textStyle={{
          right: {
            color: '#000',
          },
        }}
      />
    );
  };

  const renderTime = (props) => {
    return (
      <Time
      {...props}
        timeTextStyle={{
          left: {
            color: 'black',
          },
          right: {
            color: 'black',
          },
        }}
      />
    );
  };

  const customtInputToolbar = props => {
    return (
      <InputToolbar
        {...props}
        containerStyle={{
          backgroundColor: "#2d2d2d",
          borderTopColor: "#9E97D4",
          borderTopWidth: 1,
          padding: 1,
          borderTopLeftRadius: 20, 
          borderTopRightRadius: 20, 
        }}
        placeholder="Enter your message"
        placeholderTextColor="rgba(255, 190, 143, 0.51)"

      />
    );
  };


  return(
      <View style= {styles.newc1}>
      <LinearGradient colors={['#2d2d2d', '#653942']} start={{ x: 0, y: 0.5 }} end={{ x: 0, y: 1}} style={styles.newc2}>
        <View style={styles.navbar}>
          <Logoanimation/>
          <Image source={require('../assets/logo_name.png')} style={styles.logon}/>
        </View>
        <LinearGradient colors={['#9E97D4', '#ffbe8f']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0}} style={styles.empty1}></LinearGradient>
        <View style={styles.maincontainer}>
          <Text style={styles.welcometext}>You are connected on </Text>
        </View>
        
      <GiftedChat 
        messages={messages}
        onSend={newMessage => onMessageSent(newMessage)}
        user={{
        _id: auth().currentUser.uid}}
        renderTime={renderTime}
        renderBubble={renderBubble}
        renderInputToolbar={props => customtInputToolbar(props)}
        renderComposer={(props) => <Composer textInputStyle={{color: 'white'}} {...props} />}
        // renderAvatar={nul}
      />
      <TouchableOpacity style={styles.addFriend} onPress={() => setAddf(['Friend Added','check-circle','white'])}>          
        <LinearGradient colors={['#8d83e0', '#9E97D4']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0}} style={styles.newc3}>
          <View style={styles.addfriendIcon}> 
            <FontAwesome name={addf[1]} size={25} color={'#ffbe8f'}/>
          </View>
          <Text style={{color: addf[2], fontSize: 20, fontWeight: 'bold'}}>{addf[0]}</Text>
        </LinearGradient>
        </TouchableOpacity>
      </LinearGradient>
    </View>
  );
};

export default InterestMeet;

const styles = StyleSheet.create({
  newc1: {
    flex: 1,
  },
  newc2: {
    flex: 1,
  },
  newc3: {
    height: '100%',
    flex: 1,
    flexDirection: 'row',
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    padding: 4,
    alignItems: 'center'
  },
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
  addFriend:{
    height: 42,
    width: 200,
    position: 'absolute',
    backgroundColor: '#8d83e0',
    marginLeft: windowWidth-160,
    marginTop: 116,
    flexDirection: 'row',
    alignItems: 'center',
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
  },
  addfriendIcon: {
    marginHorizontal: 6,
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
