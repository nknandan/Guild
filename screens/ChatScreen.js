import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Alert,
  Image,
  TouchableOpacity,
  BackHandler
} from 'react-native';
import { windowHeight, windowWidth } from '../utils/Dimentions';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Logoanimation from '../components/LogoAnimation';
import Logoanimation1 from '../components/LogoAnimation1';
import { Composer, InputToolbar, Time, Bubble, GiftedChat } from 'react-native-gifted-chat'
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const ChatScreen = ({navigation, route}) => {

  const {friend} = route.params;

  let friendId = friend.UserUid;

  console.log(JSON.stringify(friend));
  
  const [messages, setMessages] = useState([]);
  
  const [roomId, setRoomId] = useState("");
  
  const [otherUserId, setOtherUserId] = useState("");
  
  const [otherUserName, setOtherUserName] = useState("");

  const [messageSaveTimeout, setMessageSaveTimeout] = useState();
  
  const RoomsCollection = firestore().collection('Rooms');
  
  const UsersCollection = firestore().collection('Users');

  useEffect(() => {
    Initialize();
  }, []);

  useEffect(()=>{
    if(messages.length > 0){
      if(messageSaveTimeout){
        clearTimeout(messageSaveTimeout);
      }
      let msgSaveTimeout = setTimeout(function (){
        RoomsCollection.doc(roomId).update({
          'Messages': messages
        })
        .then(() => {
          console.log("Message Saved to Server");
        });
      }, 100)
      setMessageSaveTimeout(msgSaveTimeout);
    }
  }, [messages]);
  
  function Initialize(){
    if(roomId !== ""){
      return;
    }
    
    const {friend} = route.params;
    setRoomId(friend.roomId)

    RoomsCollection.doc('' + friend.roomId).get().then(roomSnapshot => {
      let roomData = roomSnapshot.data();
      console.log(`Room DATA ${JSON.stringify(roomData)}`);
      setMessages(roomData.Messages)
    })

    startListening(friend.roomId);
  }

  function startListening(roomUid){

    console.log(`Room id ${roomUid}`);
    let connectedUserId;
    let connectedUserName;

    RoomsCollection.doc('' + roomUid).onSnapshot(documentSnapshot => {
      let updatedData = documentSnapshot.data();
      if(!updatedData){
        //Room No Longer Exists
        //TODO: Unfriend or Show Toast
      }

      //Get user Details 
      if(!connectedUserId || !otherUserId){
        //Get User id
        if(!otherUserId || !connectedUserId){
          updatedData.ConnectedUsers.forEach(user => {;
            if(user !== auth().currentUser.uid){
              connectedUserId = user;
              setOtherUserId(user);
            }
          })
        }
      }

      UsersCollection.doc('' + connectedUserId).get().then(snapshot => {
        let connectedUserData = snapshot.data();
        console.log(`Connected User Data ${JSON.stringify(connectedUserData)}`);
        if(!connectedUserName || !otherUserName){
          //Get user Name
          connectedUserName = connectedUserData.Name;
          setOtherUserName(connectedUserName);
        }
      }).catch(e => {
        console.log(e);
      });

      //Checking if they sent any message
      if(updatedData[`${connectedUserId}_Message`]){
        RoomsCollection.doc(roomUid).update({
          [`${connectedUserId}_Message`]: firestore.FieldValue.delete()
        });
        onMessageReceive(
          {
            _id: new Date().getTime(),
            text: updatedData[`${connectedUserId}_Message`],
            createdAt: new Date().getTime(),
            user: {
              _id: connectedUserId,
              name: connectedUserName
            }
          }
        )
      }
    }); 
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
            backgroundColor: '#000000',
            borderBottomRightRadius: 0,
          },
          left: {
            backgroundColor: '#ffffff',
            borderBottomLeftRadius: 0,
          }
        }}
        textStyle={{
          left: {
            color: '#000000',
          },
          right: {
            color: '#ffffff',
          },
        }}
        usernameStyle={{
          color: 'rgba(0,0,0,0.6)',
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
            color: 'rgba(0,0,0,0.6)',
          },
          right: {
            color: 'rgba(225,225,225,0.6)',
          },
        }}
      />
    );
  };

  const renderDay = (props) => {
    return <Day {...props} textStyle={{color: '#24182E'}}/>
  }

  const customtInputToolbar = props => {
    return (
      <InputToolbar
        {...props}
        containerStyle={{
          backgroundColor: "#000000",
          borderTopColor: "#ffffff",
          borderTopWidth: 2,
          padding: 1,
          borderTopLeftRadius: 20, 
          borderTopRightRadius: 20, 
        }}
        placeholder="Enter your message..."
        placeholderTextColor="rgba(188, 122, 255, 0.56)"

      />
    );
  };


  return(
      <View style= {styles.newc1}>
      <LinearGradient colors={['#ffffff', '#D6C1E7']} start={{ x: 0, y: 0.5 }} end={{ x: 0, y: 1}} style={styles.newc2}>
        <View style={styles.navbar}>    
          <TouchableOpacity style={styles.iconCOntainer}>
            <FontAwesome
                        name="long-arrow-left"
                        size={25}
                        backgroundColor="#ffffff"
                        color="#9100FF"
                        style={styles.iconright}
                        onPress={() => navigation.goBack()}
            />
          </TouchableOpacity>          
          <Text style={styles.welcometext}>{friend.Name} </Text>
        </View>
        <LinearGradient colors={['#9E97D4', '#24182E']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0}} style={styles.empty1}></LinearGradient>
        <View style={styles.maincontainer}>
          
        </View>
        
      {<GiftedChat 
        messages={messages}
        onSend={newMessage => onMessageSent(newMessage)}
        user={{
        _id: auth().currentUser.uid}}
        renderTime={renderTime}
        renderBubble={renderBubble}
        renderUsernameOnMessage={true}
        renderInputToolbar={props => customtInputToolbar(props)}
        renderComposer={(props) => <Composer textInputStyle={{color: 'white'}} {...props} />}
        // renderAvatar={nul}
      /> }
      </LinearGradient>
    </View>
  );
};

export default ChatScreen;

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
    backgroundColor: '#ffffff',
    height: windowHeight,
  },
  navbar: {
    height: windowHeight/15,
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    // marginLeft: -25,
  },
  iconCOntainer: {
    marginLeft: 10,
    alignItems: 'center',
    justifyContent: 'center',
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
    alignSelf: 'center',
    fontSize: 24,
    fontWeight: '100',
    color: '#000000',
    textTransform: 'uppercase',
    fontFamily: 'Montserrat-Regular',
    marginLeft: 20,
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
