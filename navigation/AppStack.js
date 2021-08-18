import React, {useState, useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import HomeScreen from '../screens/HomeScreen';
import UserProfile from '../screens/UserProfile';
import { StyleSheet } from 'react-native';

const Stack = createStackNavigator();

const Tab = createBottomTabNavigator();

const AppStack = () => {
    return(
        <Tab.Navigator tabBarOptions={{
            activeTintColor: '#ffbe8f',
            inactiveTintColor: 'white',
            activeBackgroundColor: '#2d2d2d',
            inactiveBackgroundColor: '#2d2d2d',
          }}>
            <Tab.Screen name='Home' component={HomeScreen} options={({route}) => ({
          tabBarLabel: '',
          // tabBarVisible: route.state && route.state.index === 0,
          tabBarIcon: ({color, size}) => (
            <FontAwesome5
              name="home"
              color={color}
              size={24}
              style={styles.button}
            />
          ),
        })}/>
            <Tab.Screen name='UserProfile' component={UserProfile} options={
              {
                // tabBarLabel: 'Home',
                tabBarLabel: '',
                tabBarIcon: ({color, size}) => (
                  <FontAwesome5 name="user" color={color} size={23} style={styles.button}/>
                ),
              }        
            }/>
        </Tab.Navigator> 
    );
}
export default AppStack;

const styles = StyleSheet.create({
  button: {
    marginTop: 12,
  }
});