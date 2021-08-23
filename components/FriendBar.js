import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';


const FriendBar = ({friendName, ...rest}) => {
    return(
        <View style={styles.container}>
            <TouchableOpacity style={styles.containerButton}>
                <Text style={styles.userName}>John Doe</Text>
            </TouchableOpacity>    
            <TouchableOpacity>
                <FontAwesome name={'comment'} size={25} color={'#ffbe8f'}/>
            </TouchableOpacity>                                    
            <View style={styles.bar}></View>
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
    containerButton: {
        // width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
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
        marginTop: 50,
    }
  });