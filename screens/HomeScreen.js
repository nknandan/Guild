import React, {useContext} from 'react';
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import { AuthContext } from '../navigation/AuthProvider';
import { windowHeight } from '../utils/Dimentions';
import LinearGradient from 'react-native-linear-gradient';
import InterestBar from '../components/InterestBar';
import Logoanimation from '../components/LogoAnimation';


const HomeScreen = ({navigation}) => {
  const {user, logout} = useContext(AuthContext);

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
    height: 1108,
    // backgroundColor: 'white',
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
    height: windowHeight-200,
    width: 2,
    marginTop: 10,
    marginBottom: -(windowHeight-190),
  },

});
