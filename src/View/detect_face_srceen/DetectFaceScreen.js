import React, { Component } from 'react'
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Image,
  TouchableOpacity,
  Dimensions
} from 'react-native';
import { RNCamera } from 'react-native-camera';
import RNFS from 'react-native-fs'
import axios from 'axios'

export default class DetectFaceScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loadingCamera: false,
      imageData: '',
      base64ImageData: '',
      result: []
    }
  }
  openCamera = () => {
    this.setState({
      loadingCamera: true
    })
  }
  takePicture = async () => {
    if (this.camera) {
      const options = { quality: 0.5, base64: true };
      const data = await this.camera.takePictureAsync(options);
      this.setState({
        imageData: data.uri,
      })
      //handle crop image goes here

      const base64 = await this.getBase64(data.uri);
      this.setState({
        base64ImageData: base64,
        loadingCamera: false
      })
    }
    this.sendPicToProcess()
  };

  getBase64 = async (imageUri: String) => {
    const filepath = imageUri.split('//')[1];
    const imageUriBase64 = await RNFS.readFile(filepath, 'base64');
    return `data:image/jpeg;base64,${imageUriBase64}`;
  }

  // add frame to camera view
  renderFrame = () => (
    <View style={{
      display: "flex",
      flexDirection: 'column',
      justifyItems: "center",
    }}>
      <React.Fragment>
        <View style={{
          margin: 20,
          borderWidth: 2,
          borderRadius: 2,
          borderColor: '#F00',
          width: 300,
          height: 400
        }} >

        </View>
      </React.Fragment>
      <Text style={{ color: 'white', textAlign: 'center' }}>Vui lòng canh chỉnh vùng chụp trong khung đỏ</Text>
      <View style={{ display: "flex", flexDirection: 'row' }}>
        <TouchableOpacity style={styles.buttonStyle}
          onPress={this.takePicture}
        >
          <Text style={styles.buttonText}>Chụp</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonStyle}
          onPress={this.exitCamera}
        >
          <Text style={styles.buttonText}>Thoát</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
  sendToApp = () => {
    this.props.onPressCompare(this.state.result)
  }
  exitCamera = () => {
    this.setState({
      loadingCamera: false,
      base64ImageData: ""
    })
  }
  render() {
    return (
      <View style={styles.container}>
        {this.state.loadingCamera === true ?
          <RNCamera ref={ref => { this.camera = ref }} style={styles.preview} ratio="4:3" >
            {this.renderFrame}
          </RNCamera> :
          <View>
            {!this.state.base64ImageData ? (
              <View>
                <Image
                  style={styles.image}
                  source={{ uri: this.props.uri }}
                />
                <Text style={styles.requirement}>
                  Mời bạn chụp selfie khuôn mặt
                </Text>
                <TouchableOpacity style={styles.buttonStyle}
                  onPress={() => this.openCamera()}
                >
                  <Text style={styles.buttonText}>Chụp</Text>
                </TouchableOpacity>
                {/* hàm test api */}
              </View>
            ) : (
                <View style={styles.container}>
                  <Image
                    style={styles.image}
                    source={{ uri: this.state.imageData }}
                  />
                  <Text style={styles.requirement}>
                    So sánh khuôn mặt với CMND
                  </Text>
                  <View style={{ display: "flex", flexDirection: 'row' }}>
                    <TouchableOpacity style={styles.buttonStyle}
                      onPress={this.sendToApp}
                    >
                      <Text style={styles.buttonText}>So sánh</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonStyle}
                      onPress={this.openCamera}
                    >
                      <Text style={styles.buttonText}>Chụp lại</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
          </View>}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 0.9,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#FFFFFF'
  },

  image: {
    resizeMode: 'center',
    width: 600,
    height: 350,
  },

  requirement: {
    fontSize: 25,
    color: '#04B431',
    fontWeight: 'bold',
    alignSelf: 'center'
  },
  buttonStyle: {
    width: 150,
    margin: 10,
    height: 50,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    backgroundColor: '#04B431',
  },
  buttonText: {
    fontSize: 25,
    color: 'white',
    fontWeight: 'bold',
  },
  preview: {
    flex: 1,
    alignItems: 'center',
    width: 400,
    height: 300,
  },
})
