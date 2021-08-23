import React, {Component} from 'react';
import {
  StyleSheet,
  Image,
  Animated,
} from 'react-native';
import { LogBox } from 'react-native';


export default class logoanimation extends Component {

    runAnimation() {
        this.animatedValue.setValue(300);
        Animated.timing(this.animatedValue, {
          toValue: 1,
          duration: 100000,
          useNativeDriver: true 
        }).start(() => this.runAnimation());
    }

    UNSAFE_componentWillMount() {
        this.animatedValue = new Animated.Value(0);
    }
    componentDidMount() {
        this.runAnimation() 
        LogBox.ignoreLogs(['Animated: `useNativeDriver`']);
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
        marginTop: -3,
        marginLeft: 0,
    },
})

