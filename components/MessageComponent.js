import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';


const MessageComponent = ({friendName, messageText, messageTime, ...rest}) => {
    return(
        <TouchableOpacity style={styles.container}>
                <Text style={styles.userName}>John Doe</Text>      
                <View style={styles.messageContainer}>
                    <Text style={styles.message}>Lorem Ipsum inki ponki shunki adzn chokli inki ponki shunki adzn chokli inki ponki shunki adzn chokli</Text>      
                </View>     
                <View style={styles.timeContainer}>
                    <Text style={styles.time}>9:32 pm</Text>
                </View>                               
            <View style={styles.bar}></View>
        </TouchableOpacity>
    );
};

export default MessageComponent;

const styles = StyleSheet.create({
    container: {
        padding: 7,
        paddingTop: 0,
        height: 70,
        backgroundColor: 'rgba(0,0,0,0.1)',
        marginBottom: 4,
        borderRadius: 10,
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
        marginTop: '2%',
        marginLeft: '85%'
    },
    time: {
        fontSize: 12,
        color: 'white',
    },
    message: {
        color: 'white',
    },
    bar: {
        alignSelf: 'center',
        height: 1,
        width: '96%',
        backgroundColor: 'gray',
        // marginLeft: '-100%',
        // marginTop: 50,
    }
  });