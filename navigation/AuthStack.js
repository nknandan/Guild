import React, {useState, useEffect } from 'react';
import {View} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import SignupScreen from '../screens/SignupScreen';
import LoginScreen from '../screens/LoginScreen';
import OnboardingScreen from '../screens/OnboardingScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { GoogleSignin } from '@react-native-google-signin/google-signin';


const Stack = createStackNavigator();

const AuthStack = () => {
  const [isFirstLaunch, setIsFirstLaunch] = useState(null);
  let routeName;

  useEffect(() => {
    AsyncStorage.getItem('alreadyLaunched').then(value => {
      if(value=null){
        AsyncStorage.setItem('alreadyLaunched', 'true');
        setIsFirstLaunch(true);
      }else{
        setIsFirstLaunch(false);
      }
    });
    
    GoogleSignin.configure({
      webClientId: '515563494117-64lu7rvq64v7k945r9eg2fl23surb46j.apps.googleusercontent.com',
    });
  
  
  }, []);

  if( isFirstLaunch === null){
    return null;
  }else if( isFirstLaunch === true){
    routeName = 'Onboarding';
  }else{
    routeName = 'Login';
  }

  return(
      <Stack.Navigator initialRouteName={routeName}>
          <Stack.Screen
            name="Onboarding"
            component={OnboardingScreen}
            options={{header:() => null}}
          />
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{header:() => null}}
          />
          <Stack.Screen
            name="Signup"
            component={SignupScreen}
            options={({navigation}) => ({
              title: '',
              headerStyle: {
                backgroundColor: '#2d2d2d',
                shadowColor: '#2d2d2d',
                elevation: 0,
              },
              headerLeft: () => (
                <View style={{marginLeft: 10}}>
                  <FontAwesome.Button 
                    name="long-arrow-left"
                    size={25}
                    backgroundColor="#2d2d2d"
                    color="#8d83e0"
                    onPress={() => navigation.navigate('Login')}
                  />
                </View>
              ),
            })}
          />
      </Stack.Navigator>
  );
}

export default AuthStack;