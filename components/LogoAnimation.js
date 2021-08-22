import React, {Component} from 'react';
import {
  StyleSheet,
  Image,
  Animated,
} from 'react-native';


export default class logoanimation extends Component {
    UNSAFE_componentWillMount() {
        this.animatedValue = new Animated.Value(0);
    }
    componentDidMount() {
        Animated.timing(this.animatedValue, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true
        }).start()
    }

    render() {
        const interPolateRotation = this.animatedValue.interpolate({
            inputRange: [0.5,1],
            outputRange: ['0deg', '180deg'],
        })
        const animatedStyle = {
           transform: [
               { rotate: interPolateRotation}
           ] 
        }
        return(
            <Animated.View style={styles.box, animatedStyle}>
                <Image source={require('../assets/logo_circle.png')} style={styles.logoc}/>
            </Animated.View>
        );
    }
}

const styles = StyleSheet.create({

    logoc: {
        height: 120,
        width: 120,
        marginTop: -4,
        marginLeft: 0,
    },
})

