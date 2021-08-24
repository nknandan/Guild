import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';

const FriendBar = ({friendName, friendObj}) => {

    const navigation = useNavigation();

    return(
        <View style={styles.container}>
            <TouchableOpacity style={styles.containerButton}>
                <Text style={styles.userName}>{friendName}</Text>
            </TouchableOpacity>    
            <TouchableOpacity style={styles.chatIcon} onPress={() => {navigation.navigate('ChatScreen', {friend: friendObj})}}>
                <FontAwesome name={'comments'} size={25} color={'#000000'}/>
            </TouchableOpacity>                                    
            <View style={styles.bar}></View>
        </View>
    );
};

export default FriendBar;

const styles = StyleSheet.create({
    container: {
        padding: 8,
        flexDirection: 'row',
        alignItems: 'center'
    },
    containerButton: {
        width: '84%',
        flexDirection: 'row',
        alignItems: 'center',
    },
    userName: {
        fontSize: 24,
        color: '#9100FF',
        marginRight: 200,
        fontFamily: 'Montserrat-Regular',
        marginTop: -14,
    },
    chatIcon: {
        marginLeft: -2,
        marginTop: -14,
    },
    bar: {
        height: 2,
        width: '108%',
        backgroundColor: '#24182E',
        marginLeft: '-106%',
        marginTop: 40,
    }
  });