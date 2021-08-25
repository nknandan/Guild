import React, { useEffect, useState } from 'react';
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
import { Composer, InputToolbar, Time, Day, Bubble, GiftedChat } from 'react-native-gifted-chat'
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { TextPropTypes } from 'react-native';

const InterestMeet = ({ navigation, route }) => {

  const [messages, setMessages] = useState([]);

  const [messageSaveTimeout, setMessageSaveTimeout] = useState();

  const [friendAdded, setFriendAdded] = useState(false);

  const [roomId, setRoomId] = useState("");

  const [otherUserId, setOtherUserId] = useState("");

  const [otherUserName, setOtherUserName] = useState("");

  const RoomsCollection = firestore().collection('Rooms');

  const UsersCollection = firestore().collection('Users');

  const [addf, setAddf] = useState(['Add Friend', 'user-plus', '#2d2d2d']);

  const[listeners, setListeners] = useState([]);

  let userExited = false;

  //Use Effect called Each time the Component is Opened
  useEffect(() => {
    //Initialize
    Initialize();
  }, []);

  //Checking if messages needs to be store to the server when each message is sent
  useEffect(() => {
    if (friendAdded && messages.length > 0) {
      if (messageSaveTimeout) {
        //Clearing Previous Timeouts
        clearTimeout(messageSaveTimeout);
      }

      /**
       * Adding a Timeout for 100ms so that user message update event
       * wont collide with messages being saved to the server
       */
      let msgSaveTimeout = setTimeout(function () {
        RoomsCollection.doc(roomId).update({
          'Messages': messages
        })
          .then(() => {
            console.log("Message Saved to Server");
          });
      }, 100);
      setMessageSaveTimeout(msgSaveTimeout);
    }
  }, [messages]);

  //Saving Messages to Server when added as Friends
  useEffect(() => {
    if (friendAdded && messages.length > 0) {
      if (messageSaveTimeout) {
        clearTimeout(messageSaveTimeout);
      }
      let msgSaveTimeout = setTimeout(function () {
        RoomsCollection.doc(roomId).update({
          'Messages': messages
        })
          .then(() => {
            console.log("Message Saved to Server");
          });
      }, 100)
      setMessageSaveTimeout(msgSaveTimeout);
    }
  }, [friendAdded]);

  //Clean Up When User exist's the screen/ Component
  useEffect(() => {
    let unsubscribe = navigation.addListener('beforeRemove', () => {
      //Before Closing Screen
      console.log(`Friend Added ${friendAdded}`);
      if (!friendAdded) {
        RoomsCollection.doc(roomId).delete();
      }

      //Unsubscribe Listeners
      listeners.forEach(listener => {
        listener();
      })
    });
    return unsubscribe;
  }, [navigation, messages, friendAdded, roomId, listeners])


  //Initialization Function
  function Initialize() {
    //Checking if Room Id is the default to prevent matching multiple times
    if (roomId !== "") {
      return;
    }

    //Get the Room Name which the user selected
    const { roomName } = route.params;

    //Matchmaking
    RoomsCollection.where('Connected', '<', 2).where("Interest", "==", roomName).get().then(querySnapshot => {

      let rooms = querySnapshot._docs;

      if (rooms.length > 0) {
        //If there are already users waiting to chat
        setRoomId(rooms[0]._ref.id);

        RoomsCollection.doc(rooms[0]._ref.id).update({
          'Connected': 2,
          'ConnectedUsers': firestore.FieldValue.arrayUnion(auth().currentUser.uid)
        })
          .then(() => {
            setRoomId(snapshot._documentPath._parts[1]);
            startListening(rooms[0]._ref.id);
          });

      } else {
        //If there are no users, we wait for a user to connect
        RoomsCollection.add({
          Interest: roomName,
          ConnectedUsers: [auth().currentUser.uid],
          Connected: 1
        })
          .then((snapshot) => {
            setRoomId(snapshot._documentPath._parts[1]);
            startListening(snapshot._documentPath._parts[1]);
          });
      }
    });
  }

  function startListening(roomUid) {
    let connectedUserId;
    let connectedUserName;

    let updatedDataListener = RoomsCollection.doc(roomUid).onSnapshot(documentSnapshot => {
      let updatedData = documentSnapshot.data();
      if (!updatedData) {
        //User Disconnected
        if (!userExited) {
          Alert.alert(
            'User Disconnected',
            'Do you want to find a new user?',
            [
              {
                text: 'Reconnect', onPress: () => {
                  setMessages([]);
                  setOtherUserId("");
                  setFriendAdded(false);
                  Initialize();
                }
              },
              {
                text: 'Cancel', onPress: () => {
                  navigation.goBack();
                }
              },
            ],
            { cancelable: false }
          )
        }
        return;
      }
      console.log(`Connected Users: ${updatedData.Connected}`);
      if (updatedData.Connected < 2) {
        return;
      }

      //Get user Details
      if (!connectedUserId || !otherUserId) {
        //Get User id
        if (!otherUserId || !connectedUserId) {
          updatedData.ConnectedUsers.forEach(user => {
            ;
            if (user !== auth().currentUser.uid) {
              connectedUserId = user;
              setOtherUserId(user);
            }
          })
        }
      }

      UsersCollection.doc('' + connectedUserId).get().then(snapshot => {
        let connectedUserData = snapshot.data();
        console.log(`Connected User Data ${connectedUserData}`);
        if (!connectedUserName || !otherUserName) {
          //Get user Name
          connectedUserName = connectedUserData.Name;
          setOtherUserName(connectedUserName);
        }

        //Check if they are friends
        if (connectedUserData.Friends) {
          //If they have friends
          let friends = Object.keys(connectedUserData.Friends);
          if (friends.includes(auth().currentUser.uid)) {
            //They are friends
            setAddf(['Friend Added', 'check-circle', 'white']);
            setFriendAdded(true);
          }
        }
      }).catch(e => {
        console.log(e);
      });

      //Checking if they sent any message
      if (updatedData[`${connectedUserId}_Message`]) {
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

    setListeners(oldListeners => oldListeners.concat(updatedDataListener))

    //Check for FriendRequest
    console.log(`Checking for Friend Request ${auth().currentUser.uid}`);
    let friendRequestListener = UsersCollection.doc('' + auth().currentUser.uid).onSnapshot(snapshot => {
      let userData = snapshot.data();
      if (userData.FriendRequests && userData.FriendRequests.length > 0) {
        //Got Friend Request
        console.log(`Got Friend Request`);
        UsersCollection.doc(connectedUserId).get().then(friendSnapshot => {
          let friendData = friendSnapshot.data();
          let friendName = friendData.Name;

          Alert.alert("Friend Request", `${friendName} Sent You a Friend Request`, [
            {
              text: "Accept",
              onPress: () => {
                //Friend Request Accepted
                clearFriendRequests(() => {
                  UsersCollection.doc(connectedUserId).update({
                    [`Friends.${auth().currentUser.uid}`]: roomUid
                  }).then(() => {
                    UsersCollection.doc(auth().currentUser.uid).update({
                      [`Friends.${connectedUserId}`]: roomUid
                    }).then(() => {
                      //Added Friend
                      setAddf(['Friend Added', 'check-circle', 'white']);
                      setFriendAdded(true);
                    }).catch(e => {
                      console.log(e);
                      clearFriendRequests();
                    });
                  }).catch(e => {
                    console.log(e);
                    clearFriendRequests();
                  })
                });
              },
            },
            {
              text: "Cancel", onPress: () => {
                clearFriendRequests();
              }
            }
          ]);

        }).catch(e => {
          console.log(e);
        })
      }

      //Check if friend Accepted
      let friends = userData.Friends;
      if (friends) {
        // If you have friends
        Object.keys(userData.Friends).some(friend => {
          if (friend === connectedUserId) {
            //Friend found
            setAddf(['Friend Added', 'check-circle', 'white']);
            setFriendAdded(true);
          }
          return friend === connectedUserId;
        })
      }
    });

    setListeners(oldListeners => oldListeners.concat(friendRequestListener))

    const backAction = () => {
      Alert.alert("Hold on!", "Are you sure you want to exit this room?", [
        {
          text: "Cancel",
          onPress: () => {
            backHandler.remove();
          },
          style: "cancel"
        },
        {
          text: "YES", onPress: () => {
            userExited = true;
            navigation.goBack()
          }
        }
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );
  }

  function clearFriendRequests(callback = () => { }) {
    UsersCollection.doc(auth().currentUser.uid).update({ "FriendRequests": firestore.FieldValue.delete() }).then(() => {
      console.log('Friend Request Handled');
      callback();
    });
  }

  function onMessageReceive(newMessage = []) {
    setMessages(previousMessages => GiftedChat.append(previousMessages, newMessage));
  }

  function onMessageSent(newMessage = []) {
    RoomsCollection.doc(roomId).update({
      [`${auth().currentUser.uid}_Message`]: newMessage[0].text
    }).then(snapshot => {

    }).catch(e => {
      console.log(e);
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
            borderWidth: 2,
            borderColor: '#9E97D4'
          },
          left: {
            backgroundColor: '#FAF4FF',
            borderBottomLeftRadius: 0,
            borderWidth: 2,
            borderColor: '#24182E'
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
    return <Day {...props} textStyle={{ color: '#24182E' }} />
  }


  const customtInputToolbar = props => {
    return (
      <InputToolbar
        {...props}
        containerStyle={{
          backgroundColor: "#000000",
          borderTopColor: "#ffffff",
          borderTopWidth: 2,
          borderBottomWidth: 1,
          borderBottomColor: '#9100FF',
          padding: 1,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          elevation: 10,
        }}
        placeholder="Enter your message..."
        placeholderTextColor="rgba(225, 225, 225, 0.46)"

      />
    );
  };


  function addFriend() {
    UsersCollection.doc(otherUserId).update({
      FriendRequests: firestore.FieldValue.arrayUnion(auth().currentUser.uid)
    }).then(() => {
      //Added Friend
      setAddf(['Requested', 'hourglass', 'white']);
    }).catch(e => {
      console.log(e);
    })
  }


  return (
    <View style={styles.newc1}>
      <LinearGradient colors={['#ffffff', '#D6C1E7']} start={{ x: 0, y: 0.5 }} end={{ x: 0, y: 1 }} style={styles.newc2}>
        <View style={styles.navbar}>
          <Logoanimation />
          <Image source={require('../assets/logo_name.png')} style={styles.logon} />
        </View>
        <LinearGradient colors={['#9E97D4', '#24182E']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.empty1}></LinearGradient>
        <View style={styles.maincontainer}>
          <Text style={styles.welcometext}>You are connected on</Text>
          <Text style={styles.welcometext69}>{route.params.roomName}</Text>
        </View>
        {otherUserId ?
          <View style={styles.chatContainer}>
            <GiftedChat
              messages={messages}
              onSend={newMessage => onMessageSent(newMessage)}
              user={{
                _id: auth().currentUser.uid
              }}
              renderTime={renderTime}
              renderBubble={renderBubble}
              renderUsernameOnMessage={true}
              renderDay={renderDay}
              renderInputToolbar={props => customtInputToolbar(props)}
              renderComposer={(props) => <Composer textInputStyle={{ color: 'white' }} {...props} />}
            />
            <TouchableOpacity style={styles.addFriend} disabled={friendAdded} onPress={() => {
              addFriend();
            }}>
              <LinearGradient colors={['#D6C1E7', '#9E97D4']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.newc3}>
                <View style={styles.addfriendIcon}>
                  <FontAwesome name={addf[1]} size={25} color={'#9100FF'} />
                </View>
                <Text style={{ color: addf[2], fontSize: 20, fontWeight: 'bold' }}>{addf[0]}</Text>
              </LinearGradient>
            </TouchableOpacity>
            <View style={styles.userNameHeader}>
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
              <Text style={styles.welcometext420}>{otherUserName}</Text>
            </View>
          </View>
          :
          <View style={styles.userNotConnectedRoom}>
            <View style={styles.userNotConnectedRoomLogo}>
              <Logoanimation1 />
            </View>
            <Text style={styles.userNotConnectedRoomText}>Connecting</Text>
          </View>
        }
      </LinearGradient>
    </View>
  );
};

export default InterestMeet;

const styles = StyleSheet.create({
  userNameHeader: {
    flexDirection: 'row',
    position: 'absolute',
    backgroundColor: 'white',
    marginTop: -134,
    height: 44,
  },
  newc1: {
    flex: 1,
  },
  newc2: {
    flex: 1,
  },
  chatContainer: {
    marginTop: 1,
    flex: 1,
  },
  welcometext420: {
    alignSelf: 'center',
    fontSize: 24,
    fontWeight: '100',
    color: '#000000',
    textTransform: 'uppercase',
    fontFamily: 'Montserrat-Regular',
    marginLeft: 20,
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
    height: windowHeight / 15,
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    marginLeft: -25,
  },
  addFriend: {
    height: 42,
    width: 200,
    position: 'absolute',
    backgroundColor: '#8d83e0',
    marginLeft: windowWidth - 160,
    marginTop: -16,
    flexDirection: 'row',
    alignItems: 'center',
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    elevation: 10,
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
  maincontainer2: {
    padding: 15,
    paddingLeft: 0,
    height: 540,
    flexWrap: 'wrap',
  },
  scroll: {
    flex: 1,
    paddingRight: 10,
    width: '110%',
  },
  maincontainer3: {
    height: 790,
    flexWrap: 'wrap',
  },
  welcometext: {
    fontSize: 16,
    marginTop: -6,
    fontWeight: '100',
    color: '#676767',
    fontFamily: 'Montserrat-Regular',
    textTransform: 'uppercase'
  },
  welcometext69: {
    fontSize: 26,
    fontWeight: '100',
    color: 'black',
    fontFamily: 'Montserrat-Regular',
    textTransform: 'uppercase',
  },
  userNotConnectedRoom: {
    alignSelf: 'center',
    alignItems: 'center',
    width: 200,
    height: 200,
    marginTop: 150,
    flexDirection: 'row',
    marginLeft: 270,
  },
  userNotConnectedRoomText: {
    fontSize: 24,
    marginTop: 0,
    marginLeft: -260,
    fontWeight: '100',
    fontFamily: 'Montserrat-Regular',
    color: 'black',
    textTransform: 'uppercase'
  },
  userNotConnectedRoomLogo: {
    height: windowHeight / 15,
    flexDirection: 'row',
  },
  welcometext1: {
    fontSize: 22,
    fontWeight: '100',
    color: 'black',
  },
  empty2: {
    height: windowHeight - 200,
    width: 2,
    marginTop: 10,
    marginBottom: -(windowHeight - 190),
  },
  iconCOntainer: {
    marginLeft: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
