import { isBindExpression } from '@babel/types';
import React, {useState, Component} from 'react';
// Import required components
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Platform,
  PermissionsAndroid,
} from 'react-native';

import Contacts from 'react-native-contacts';
import { FlatList } from 'react-native-gesture-handler';
class ContactsScreen extends Component {
  state = {
    contacts:null
  }
  componentDidMount(){
    if(Platform.OS=== 'ios'){
      Contacts.getAll((err,contact)=>{
        if(err){
          throw err
        }
        this.setState({contacts})
      })
    }else if(Platform.OS==='android'){
      PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
        {
          'title': 'Contacts',
          'message': 'This app would like to view your contacts.',
          'buttonPositive': 'Please accept bare mortal'
        }
      ).then(() => {
        Contacts.getAll((err,contacts)=>{
          if(err==='denied'){
            // error
          }
          else{
            this.setState({contacts})
          }
        })
      })
    }

  }

  render(){
    return (
      <View style={StyleSheet.Container}>
        <FlatList 
          data = {this.state.contacts}
          renderItem={({item})=>(
            <View>
              <Text>{`${item.givenName}`}{item.familyName}</Text>
              {item.phoneNumber.map(phone=>(
                <Text>{phone.number}</Text>
              ))}
            </View>
          )}
          numColumns={1}
          keyExtractor={(item,index)=>index}
        />
      </View>
    )
  }
}
export default ContactsScreen;
