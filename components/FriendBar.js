import React from 'react';
import { View, Text, Button, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { windowWidth, windowHeight } from '../utils/Dimentions';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';


const FriendBar = ({labelValue, placeholderText, iconType, error, ...rest}) => {
    return(
        <View style={styles.container}>
            <Text style={styles.userName}>John Doe</Text>
            <FontAwesome name={'comment'} size={25} color={'#ffbe8f'}/>
            <View style={styles.bar}>
                <Text>Hi</Text>
            </View>
        </View>
    );
};

export default FriendBar;

const styles = StyleSheet.create({
    container: {
        padding: 7,
        flexDirection: 'row',
        alignItems: 'center'
    },
    userName: {
        fontSize: 20,
        color: '#8d83e0',
        marginRight: 210,
        fontWeight: 'bold'
    },
    bar: {
        height: 1,
        width: '108%',
        backgroundColor: 'gray',
        marginLeft: '-106%',
        marginTop: 60,
    }
  });