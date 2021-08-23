import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';

const FriendBar = ({friendName, ...rest}) => {

    const navigation = useNavigation();

    return(
        <View style={styles.container}>
            <View style={styles.containerButton}>
                <Text style={styles.userName}>{friendName}</Text>
            </View>    
            <TouchableOpacity style={styles.chatIcon} onPress={() => {navigation.navigate('ChatScreen')}}>
                <FontAwesome name={'comments'} size={25} color={'#ffbe8f'}/>
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
        marginRight: 200,
        fontWeight: 'bold'
    },
    chatIcon: {
        marginLeft: -2,
    },
    bar: {
        height: 1,
        width: '108%',
        backgroundColor: 'gray',
        marginLeft: '-106%',
        marginTop: 50,
    }
  });