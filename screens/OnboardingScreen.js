import React from 'react';
import { TouchableOpacity } from 'react-native';
import { View, Text, Button, StyleSheet } from 'react-native';
import { withTheme } from 'react-native-elements';
import { color } from 'react-native-elements/dist/helpers';
import Onboarding from 'react-native-onboarding-swiper';
import { greaterThan } from 'react-native-reanimated';

const Done = ({...props}) => (
    <TouchableOpacity
        style={
            {
                marginHorizontal:18,
            }
        }{...props}><Text style={
            {
                fontSize: 16,
                color: '#FFFFFF',
            }
        }>Done</Text></TouchableOpacity>
)


const OnboardingScreen = ({navigation}) => {
    return (
        <Onboarding
        DoneButtonComponent={Done}
        onSkip={() => navigation.replace("Login")}
        onDone={() => navigation.navigate("Login")}
        bottomBarColor='#090010'
        pages={[
            {
                backgroundColor: '#0A0111',
                title: 'Onboarding 1',
                subtitle: 'Done with React Native Onboarding Swiper',
            },
            {
                backgroundColor: '#0A0111',
                title: 'Onboarding 2',
                subtitle: 'Done with React Native Onboarding Swiper',
            },
            {
                backgroundColor: '#0A0111',
                title: 'Onboarding 3',
                subtitle: 'Done with React Native Onboarding Swiper',
            },
        ]}
        />
    );
}


export default OnboardingScreen;

