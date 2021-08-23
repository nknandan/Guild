import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';


const MessageComponent = ({friendName, messageText, messageTime, ...rest}) => {

    const navigation = useNavigation();
    return(
        <TouchableOpacity style={styles.container}{...rest} onPress={() => {
            console.log('chatscreen pressed');
            navigation.navigate('ChatScreen')}}>
                <Text style={styles.userName}>John Doe</Text>      
                <View style={styles.messageContainer}>
                    <Text style={styles.message}>Lorem Ipsum inki ponki shunki adzn chokli inki ponki shunki adzn chokli inki ponki shunki adzn chokli</Text>      
                </View>     
                <View style={styles.timeContainer}>
                    <Text style={styles.time}>9:32 pm</Text>
                </View>                               
            {/* <View style={styles.bar}></View> */}
        </TouchableOpacity>
    );
};

export default MessageComponent;

const styles = StyleSheet.create({
    container: {
        padding: 7,
        paddingTop: 0,
        height: 80,
        backgroundColor: 'rgba(0,0,0,0.1)',
        marginBottom: 10,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#8d83e0'
    },
    userName: {
        fontSize: 22,
        color: '#8d83e0',
        marginRight: 200,
        fontWeight: 'bold',
        paddingLeft: 4,
    },
    messageContainer:{
        marginTop: -4,
        marginLeft: 20,
        height: 38,
        width: '80%',
        marginBottom: 4,
    },
    timeContainer:{
        position: 'absolute',
        marginTop: '3%',
        marginLeft: '85%'
    },
    time: {
        fontSize: 12,
        color: 'rgba(225,225,255,0.7)',
    },
    message: {
        color: 'white',
        marginTop: 6,
    },
    bar: {
        alignSelf: 'center',
        height: 1,
        marginTop: 11,
        width: '100%',
        backgroundColor: 'gray',
        // marginLeft: '-100%',
        // marginTop: 50,
    }
  });