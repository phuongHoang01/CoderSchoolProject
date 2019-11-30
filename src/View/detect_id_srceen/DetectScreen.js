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
  Dimensions,
  ImageBackground
} from 'react-native';
import { RNCamera } from 'react-native-camera';
import RNFS from 'react-native-fs'
import axios from 'axios'
import { transparent } from 'react-native-material-ui/src/styles/colors';
import { IconToggle } from 'react-native-material-ui/src/'

export default class DetectScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loadingCamera: false,
      imageData: '',
      base64ImageData: '',
      result: [],
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
        loadingCamera: false,
      })
    }

  };

  getBase64 = async (imageUri: String) => {
    const filepath = imageUri.split('//')[1];
    const imageUriBase64 = await RNFS.readFile(filepath, 'base64');
    return `data:image/jpeg;base64,${imageUriBase64}`;
  }

  renderFrame = () => (
    <View style={styles.captureBox}>
      <React.Fragment>
        <View style={{
          margin: 20,
          borderWidth: 2,
          borderRadius: 2,
          borderColor: 'white',
          opacity: 0.4,
          width: 320,
          height: 460
        }} >
        </View>
      </React.Fragment>
      <Text style={{ color: 'white', textAlign: 'center' }}>Please center the National ID card to the frame</Text>
      <View style={{ display: "flex", flexDirection: 'row', justifyContent: "space-around", marginTop: 20, marginBottom: 20 }}>
        <TouchableOpacity style={styles.buttonStyleTrans}
          onPress={this.exitCamera}
        >
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonStyle}
          onPress={this.takePicture}
        >
          <Text style={styles.buttonText}>Capture</Text>
        </TouchableOpacity>
      </View>
    </View>
  )

  exitCamera = () => {
    this.setState({
      loadingCamera: false,
      base64ImageData: ""
    })
  }

  render() {
    return (
      <ImageBackground source={require('../../assets/backgroud.png')} style={styles.container}>
        {this.state.loadingCamera === true ?
          <RNCamera ref={ref => { this.camera = ref }} style={styles.preview} ratio="4:3" >
            {this.renderFrame}
          </RNCamera> :
          <View>
            {this.state.base64ImageData === "" ? (
              <View style={styles.captureBox}>
                <View style={styles.topNavBar}>
                  <IconToggle style={{ width: "10%" }} name="keyboard-arrow-left" size={30} color="#3BBD81" onPress={this.props.onPressBack} />
                  <Text style={{ color: '#3BBD81', marginTop: 20, marginLeft: -13 }}>Back</Text>
                </View>
                <View>
                  <View style={styles.swaggerTitle}>
                    <Text style={styles.title}>Capture National ID</Text>
                    <Text style={styles.step}>Step 1 of 4</Text>
                  </View>
                  <Image
                    style={styles.image}
                    source={require('../../assets/78487490_1460127677472949_5655837347414016000_n.png')}
                  />
                  <TouchableOpacity style={styles.buttonStyle}
                    onPress={() => this.openCamera()}
                  >
                    <Text style={styles.buttonText}>Capture</Text>
                  </TouchableOpacity>
                </View>
                <Image
                  style={styles.imageLogoFE}
                  source={require('../../assets/Logo.png')}
                />
              </View>
            ) : (
                <View >
                  <Image
                    style={styles.imageTaken}
                    source={{ uri: this.state.imageData }}
                  />
                  <Text style={styles.description}>Please make sure that the National ID look clear and not being crop</Text>
                  <View style={{ display: "flex", flexDirection: 'row', justifyContent: 'center', marginTop: 30 }}>
                    <TouchableOpacity style={styles.buttonStyleSecond}
                      onPress={this.openCamera}
                    >
                      <Text style={styles.buttonTextPrimary}>Take again</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonStyle}
                      onPress={() => this.props.onPressProcess(this.state.base64ImageData)}
                    >
                      <Text style={styles.buttonText}>Process</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
          </View>}
      </ImageBackground>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  captureBox: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    justifyContent: 'space-between'
  },
  image: {
    resizeMode: 'cover',
    width: 230,
    height: 230,
    alignSelf: 'center',
    marginBottom: 30
  },
  imageLogoFE: {
    resizeMode: 'cover',
    width: 250,
    height: 70,
    opacity: 0.5,
    marginTop: 50
  },
  imageTaken: {
    resizeMode: 'cover',
    width: '90%',
    height: 200,
    alignSelf: 'center',
    marginTop: 30,
    borderRadius: 4
  },
  topNavBar: {
    width: '100%',
    height: 40,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start'
  },
  requirement: {
    fontSize: 25,
    color: '#04B431',
    fontWeight: 'bold',
    alignSelf: 'center'
  },
  buttonStyle: {
    width: 150,
    height: 48,
    borderRadius: 30,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#3BBD81',
  },
  buttonStyleTrans: {
    width: 150,
    height: 48,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 30,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    marginRight: 30
  },
  buttonStyleSecond: {
    width: 150,
    height: 48,
    borderWidth: 1,
    borderColor: '#3BBD81',
    borderRadius: 30,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    marginRight: 30
  },
  buttonText: {
    fontSize: 20,
    color: 'white',
    fontWeight: "bold",
  },
  buttonTextPrimary: {
    fontSize: 20,
    color: '#3BBD81',
    fontWeight: 'bold'
  },
  preview: {
    flex: 1,
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  title: {
    fontSize: 30,
    color: "#3bbd81",
    fontWeight: 'bold'
  },
  step: {
    fontSize: 17,
    opacity: 0.4
  },
  description: {
    fontSize: 17,
    opacity: 0.4,
    textAlign: 'center',
    marginTop: 30
  },
  swaggerTitle: {
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 30
  },
})
