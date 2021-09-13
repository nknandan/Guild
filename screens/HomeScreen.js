import React, {useContext, useState} from 'react';
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Linking,
  Image,
  PermissionsAndroid,
  Platform
} from 'react-native';
import { AuthContext } from '../navigation/AuthProvider';
import { windowHeight, windowWidth } from '../utils/Dimentions';
import LinearGradient from 'react-native-linear-gradient';
import InterestBar from '../components/InterestBar';
import Logoanimation from '../components/LogoAnimation';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {
  launchImageLibrary
} from 'react-native-image-picker';

const HomeScreen = ({navigation}) => {  
  const {user, logout} = useContext(AuthContext);
  const [filePath, setFilePath] = useState({});

  const chooseFile = (type) => {
    let options = {
      mediaType: type,
      maxWidth: 300,
      maxHeight: 550,
      quality: 1,
    };
    launchImageLibrary(options, (response) => {
      console.log('Response = ', response);

      if (response.errorCode == 'permission') {
        alert('Permission not satisfied');
        return;
      } else if (response.errorCode == 'others') {
        alert(response.errorMessage);
        return;
      }
      console.log('base64 -> ', response.base64);
      console.log('uri -> ', response.uri);
      console.log('width -> ', response.width);
      console.log('height -> ', response.height);
      console.log('fileSize -> ', response.fileSize);
      console.log('type -> ', response.type);
      console.log('fileName -> ', response.fileName);
      setFilePath(response);
    });
  };

  let interests = ["Gaming", "Cryptocurrency", "Valorant", "Apex Legends", "Football", "Marvel", "React", "Graphics", "Fifa", "TV Series", "Fiction", "Sherlock Holmes", "Web Development", "Trading"]
  
  let interestBarArray = interests.map((interest, index) => (
    <InterestBar key={index} buttonTitle={interest} onPress={() => navigation.navigate('InterestMeet', {roomName: interest})}/>
  ));

  return(
    <View>
      <LinearGradient colors={['#ffffff', '#D6C1E7']} start={{ x: 0, y: 0.5 }} end={{ x: 0, y: 1}} style={styles.container}>
           <View style={styles.navbar}>
            <Logoanimation/>
            <Image source={require('../assets/logo_name.png')} style={styles.logon}/>
           </View>
           <LinearGradient colors={['#9E97D4', '#24182E']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0}} style={styles.empty1}></LinearGradient>
           <View style={styles.maincontainer}>
           <Text style={styles.welcometext}>Find Your Type Of People</Text>
           <FontAwesome name={'camera'} size={25} color={'#9100FF'} style={styles.cameraIcon}
            onPress={() => {navigation.navigate('CameraScreen')}} />
           <FontAwesome name={'address-book'} size={25} color={'#9100FF'} style={styles.contactIcon}
            // onPress={() => {navigation.navigate('ContactsScreen')}}/>
            onPress={() => {Linking.openURL('content://com.android.contacts/contacts')}}/>
            <FontAwesome name={'image'} size={25} color={'#9100FF'} style={styles.imageIcon} 
            onPress={() => chooseFile('photo')}/>
           <LinearGradient colors={['#9E97D4', '#24182E']} start={{ x: 0, y: 0 }} end={{ x: 0, y: 1}} style={styles.empty2}></LinearGradient>
              <View style={styles.maincontainer1}>
                <Text style={styles.welcometext1}>Interests you might like</Text>
                <View style={styles.maincontainer2}>
                  <ScrollView style={styles.scroll}>
                    <View style={styles.maincontainer3}>
                      {interestBarArray}
                    </View>
                  </ScrollView>                  
                </View>
              </View>
           </View>
          </LinearGradient>
    </View>
  );
};

export default HomeScreen;

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
  maincontainer: {
    padding: (windowHeight/40),
  },
  cameraIcon: {
    position: 'absolute',
    marginTop: -(windowHeight/20),
    marginLeft: (windowWidth/1.2),
  },
  imageIcon: {
    position: 'absolute',
    marginTop: -(windowHeight/20),
    marginLeft: (windowWidth/1.69),
  },
  contactIcon: {
    position: 'absolute',
    marginTop: -(windowHeight/20),
    marginLeft: (windowWidth/1.39),
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
    fontSize: 20,
    fontWeight: '100',
    color: '#000000',
    textTransform: 'uppercase',
    fontFamily: 'Montserrat-Regular'
  },
  welcometext1: {
    fontSize: 18,
    fontWeight: '100',
    color: '#000000',
    fontFamily: 'Montserrat-Regular'
  },
  empty2: {
    height: (windowHeight/1.34),
    width: (windowHeight/220),
    marginTop: (windowHeight/100),
    marginBottom: -(windowHeight-190),
  },

});
