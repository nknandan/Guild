import React, { Component } from 'react';
import {Text, PermissionsAndroid, StyleSheet, View, Alert, TouchableOpacity} from 'react-native';
import { RNCamera } from 'react-native-camera';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import CameraRoll from "@react-native-community/cameraroll";

class CameraScreen extends Component {
render() {
    return (
    <View style={styles.container}>
        <RNCamera
        style={{ flex: 1, alignItems: 'center' }}
        ref={ref => {
            this.camera = ref
        }}
        androidCameraPermissionOptions={{
            title: 'Permission to use camera',
            message: 'We need your permission to use your camera',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
        }}
        androidRecordAudioPermissionOptions={{
            title: 'Permission to use audio recording',
            message: 'We need your permission to use your audio',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
        }}
        />
        <FontAwesome name={'circle'} size={45} color={'white'} style={styles.cameraIcon}
            onPress={this.takePicture.bind(this)} style={styles.capture} />
    </View>
    )
}

takePicture = async () => {
    if (this.camera) {
      const options = { quality: 0.5, base64: true };
      const data = await this.camera.takePictureAsync(options);
      console.log(data.uri);
      CameraRoll.save(data.uri, "photo")
    }
};

}  
export default CameraScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
        justifyContent: 'center'
    },
    cameraIcon: {
        backgroundColor: 'transparent',
        alignItems: 'center',
        alignSelf: 'center',
    },
    capture: {
        flex: 0,
        backgroundColor: 'transparent',
        alignSelf: 'center',
        margin: 10,
      },
  })