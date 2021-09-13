import React, {useState, useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import HomeScreen from '../screens/HomeScreen';
import InterestMeet from '../screens/InterestMeet';
import MessagesScreen from '../screens/MessagesScreen';
import CameraScreen from '../screens/CameraScreen';
import ContactsScreen from '../screens/ContactsScreen';
import ChatScreen from '../screens/ChatScreen';
import UserProfile from '../screens/UserProfile';
import { StyleSheet } from 'react-native';

const Stack = createStackNavigator();

const Tab = createBottomTabNavigator();

const HomeScreen1 = ({navigation}) => (
  <Stack.Navigator>
    <Stack.Screen name="HomeScreen" component={HomeScreen} options={{header:() => null}}/>
    <Stack.Screen name="CameraScreen" component={CameraScreen} options={{header:() => null}}/>
    <Stack.Screen name="InterestMeet" component={InterestMeet} options={{header:() => null}}/>
    <Stack.Screen name="ContactsScreen" component={ContactsScreen} options={{header:() => null}}/>
    {/* <Stack.Screen name="MessagesScreen" component={MessagesScreen} options={{header:() => null}}/> */}
    <Stack.Screen name="ChatScreen" component={ChatScreen} options={{header:() => null}}/>
  </Stack.Navigator>
);

const UserProfile1 = ({navigation}) => (
  <Stack.Navigator>
    <Stack.Screen name="UserProfile" component={UserProfile} options={{header:() => null}}/>
    {/* <Stack.Screen name="MessagesScreen" component={MessagesScreen} options={{header:() => null}}/> */}
    <Stack.Screen name="ChatScreen" component={ChatScreen} options={{header:() => null}}/>
  </Stack.Navigator>
);

const AppStack = () => {
  const getTabBarVisibility = (route) => {
    const routeName = route.state
      ? route.state.routes[route.state.index].name
      : '';

    if (routeName === 'InterestMeet') {
      return false;
    }
    return true;
  };

    return(
        <Tab.Navigator tabBarOptions={{
            activeTintColor: '#9100FF',
            inactiveTintColor: '#676767',
            showLabel: false,
            unmountOnBlur: true,
            style: {
              backgroundColor: '#24182E',
              borderTopWidth: 0,
              height: 46,
              elevation: 8
            }
          }}>
            <Tab.Screen name='Home' component={HomeScreen1} options={({route}) => ({
          tabBarLabel: '',
          unmountOnBlur: true,
          tabBarVisible: getTabBarVisibility(route),
          tabBarIcon: ({color, size}) => (
            <FontAwesome5
              name="home"
              color={color}
              size={26}
              style={styles.button}
            />
          ),
        })}/>
            <Tab.Screen name='UserProfile' component={UserProfile1} options={
              {
                // tabBarLabel: 'Home',
                unmountOnBlur: true,
                tabBarLabel: '',
                tabBarIcon: ({color, size}) => (
                  <FontAwesome5 name="user" color={color} size={26} style={styles.button}/>
                ),
              }
            }/>
        </Tab.Navigator> 
    );
}
export default AppStack;

const styles = StyleSheet.create({
  button: {
    // marginTop: 16,
  }
});