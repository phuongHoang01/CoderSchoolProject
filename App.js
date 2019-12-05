import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Image
} from 'react-native';

import {
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import LottieView from 'lottie-react-native';
import { createAppContainer, NavigationActions } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { IconToggle } from 'react-native-material-ui/src/'
import Title from './src/template/Title'
import DetectSrceen from './src/View/detect_id_srceen/DetectScreen'
import DetectFaceSrceen from './src/View/detect_face_srceen/DetectFaceScreen'
import Logo from './src/template/Logo';
import WaitingScreen from './src/View/waiting_screen/WaitingSrceen'
import Succes from './src/View/result_screen/Succes'
import Fail from './src/View/result_screen/Fail'
import Form from './src/View/form_screen/forms_srceen'
import Home from './src/new_ui/home'
import Fraud from './src/new_ui/fraud'
import Face from './src/new_ui/face'
import axios from 'axios'
import { createStore } from 'redux'
import myReducer from './src/reducers/index'
import { Provider } from 'react-redux'
import AsyncStorage from '@react-native-community/async-storage';
import NavigationService from './src/NavigationService/service'



class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };
  render() {
    return (
      <Home
        currentProgress={50}
        onPress={() => this.props.navigation.navigate('ListToDoScreen')}
      />
    )
  }
}

class ListToDoScreen extends React.Component {
  static navigationOptions = {
    headerStyle: {
      elevation: 0
    },
  };

  onPress = (Screen) => {
    console.log("render");
    console.log(this.props.navigation.getParam('userInfo'));
    console.log(this.props.navigation.getParam('faceInfo'));
    switch (Screen) {

      case "DetectIDScreen": {
        return this.props.navigation.navigate(Screen, {
          currentScreen: Screen,
        })
      }
      case "Form": {
        if (this.props.navigation.getParam('userInfo') != null) {
          return this.props.navigation.navigate(Screen, {
            currentScreen: Screen,
            userInfo: this.props.navigation.getParam('userInfo')
          })
        }
        else {
          alert("Vui long hoàn thành theo các bước")
          break;
        }
      }

      case "faceRecognize": {
        if(this.props.navigation.getParam('faceInfo') != null){
        return this.props.navigation.navigate(Screen, {
          currentScreen: Screen,
          faceInfo: this.props.navigation.getParam('faceInfo')
        })
        }
        else {
          alert("Vui long hoàn thành theo các bước")
          break;
        }
      }
    }
  }

  render() {

    return (
      <Fraud
        currentStatus={50} // Tiến độ của feature
        onPress={this.onPress}
      />
    )
  }
}


class DetectIDScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  componentDidMount() {

  }

  getBase64ImageData = (data) => {
    if (data) {
      this.sendImageToRepository(data)
    }
  }
  // hàm này gửi ảnh lê imgur 

  sendImageToRepository(image) {
    console.log('run here')
    const imageAfterReplace = image.replace("data:image/jpeg;base64,", "");
    const URL = "https://api.imgur.com/3/upload" //url của api
    axios.post(URL,
      {
        "image": imageAfterReplace
      },
      {
        headers: {
          "Authorization": "Bearer baca0f3689d1415c7c45f6fe2f91717cbc3141b4"
        },

      })
      .then(response => {
        console.log(response.data.data.link);
        this.props.navigation.navigate('templateProcessing', { urlData: response.data.data.link, base64Image: image, currentScreen: this.props.navigation.getParam('currentScreen') }) //Gửi link ảnh qua màng hình xử lý
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  render() {
    return (
      <View style={styles.container}>
        <DetectSrceen
          onPressProcess={this.getBase64ImageData}
          onPressBack={() => this.props.navigation.navigate('ListToDoScreen')}
        />
      </View>
    )

  }
}


//--------------------------------------------------------------
class TemplateResultScreen extends React.Component {
  static navigationOptions = {
    headerStyle: {
      elevation: 0
    },
  };
  constructor(props) {
    super(props)
    this.state = {
      isLoading: true,
      result: '',
      faceError: '',//handle error alert here
      titleError: '',
      logoError: '',
      centerStarError: '',
      alertError: '',
      faceInfo: '',
    }
  }

  componentDidMount() {
    console.log("render")
    console.log(this.props.navigation.getParam('currentScreen'))
    this.pictureFormCMND()
  }


  // Hàm này tìm lỗi 
  templateDataProccesing(templateData, checkData) {
    try {
      for (const element of templateData) {
        if (element.displayName === checkData && element.imageObjectDetection.score >= 0.9)// Điều kiện để kt lỗi
        {
          console.log(element.displayName)
          console.log(element.imageObjectDetection.score)
          console.log("test run here")
          return true;
        }
      }
    } catch (error) {
      return false
    }
    return false
  }

  // Code củ chuối sẽ fix lại sau 
  // Hàm nãy sẽ gắn lỗi vào state
  checkTemplateData(templateData) {
    if (this.templateDataProccesing(templateData, "CenterStar")) {
      this.setState({
        centerStarError: ""
      })
    }
    else {
      this.setState({
        centerStarError: "Vui lòng chụp ngay giữa hình",
      }, () => {
        this.setState({
          alertError: this.state.centerStarError,
        }, () => {
          console.log(this.state.alertError)
          this.setState({ isLoading: false })
        })
        return
      })
      return false
    }
    if (this.templateDataProccesing(templateData, "Title")) {
      this.setState({
        titleError: ""
      })
    }
    else {
      this.setState({
        titleError: "Vui lòng chụp rõ tiêu đề",

      }, () => {
        this.setState({
          alertError: this.state.titleError,
        }, () => {
          console.log(this.state.alertError)
          this.setState({ isLoading: false })
        })
        return
      })
      return false;
    }
    if (this.templateDataProccesing(templateData, "Face")) {
      this.setState({
        faceError: ""
      })
    }
    else {
      this.setState({
        faceError: "Vui lòng chụp rõ mặt trên CMND",
      }, () => {
        this.setState({
          alertError: this.state.faceError,

        }, () => {
          this.setState({ isLoading: false })
          console.log(this.state.alertError)
        })
        return
      })
      return false;
    }
    if (this.templateDataProccesing(templateData, "Logo")) {
      this.setState({
        logoError: ""
      })
    }
    else {
      this.setState({
        logoError: "Vui lòng chụp rõ quốc huy trên CMND",
      }, () => {
        this.setState({
          alertError: this.state.logoError,

        }, () => {
          this.setState({ isLoading: false })
          console.log(this.state.alertError)
        })
        return
      })
      return false;
    }
    const URL = this.props.navigation.getParam('urlData')
    console.log(URL)
    this.sendPicToProcess(URL)

  }

  templateProcessing() {
    const base64Image = this.props.navigation.getParam('base64Image').replace("data:image/jpeg;base64,", "")
    const URLTEMPLATE = "https://automl.googleapis.com/v1beta1/projects/1051788884641/locations/us-central1/models/IOD4203111895592337408:predict"
    axios.post(URLTEMPLATE, {
      "payload": {
        "image": {
          "imageBytes": base64Image
        }
      }
    }, {
      headers: {
        "Authorization": "Bearer ya29.Il-zB-ME7R_JBwwjRaVLxD3InsNbE-5SJDVCzBNGWxzJp-9t-ftGW1p0_gW8ljYyS4wNX6K2jn9ILy49_wcYEPFAjk21tQUAJ2w4NEGcDpSimFgb82S6ufAesSQZFM2Pcg"
      }
    })
      .then(async (response) => {
        console.log(response.data.payload);
        this.checkTemplateData(response.data.payload)
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  pictureFormCMND = () => {
    console.log("first run")
    const URL_PIC = this.props.navigation.getParam('urlData')
    const URL = "https://teamck27.cognitiveservices.azure.com/face/v1.0/detect?returnFaceId=true&returnFaceLandmarks=false&recognitionModel=recognition_01&returnRecognitionModel=false&detectionModel=detection_01"
    axios.post(URL,
      {
        "url": URL_PIC
      },
      {
        headers: {
          "Ocp-Apim-Subscription-Key": "f11b92ee29dd417ba1460c45e420d9ee"
        },

      })
      .then(async (response) => {
        console.log(response.data[0].faceId)
        this.faceDetect(response.data[0].faceId)
      })


      .catch(function (error) {
        return false
      });
    return false
  }
  // Hàm này kiểm tra xem trên cmnd có face ko
  faceDetect(result) {
    if (result != null) {
      this.setState({
        faceInfo: result
      }, () => {
        this.sendPicToProcess();
      })
    }
    else {
      this.setState({
        alertError: "Face không hợp lệ"
      }, () => {
        this.setState({ isLoading: false })
      })
    }
  }



  // API này sẽ gửi hình lên backend để xử lý bbhv
  sendPicToProcess = async (url) => {
    const URL_PIC = this.props.navigation.getParam('urlData') //url của tấm hình để xử lý
    const URL = "https://checkocr72.cognitiveservices.azure.com/vision/v2.0/read/core/asyncBatchAnalyze" //url của api
    axios.post(URL, {
      "url": URL_PIC
    },
      { headers: { "Ocp-Apim-Subscription-Key": "ff1577dae52a4ee69daffa5041a82607" } })
      .then(async (response) => {
        //console.log(response.headers["operation-location"])
        setTimeout(() => {
          this.getResultFormBE(response.headers["operation-location"]);
          this.setState({ isLoading: false })
        }, 10000)
      }).catch(function (error) {
        // handle error
        console.log(error);
      })
  }
  // API ở trên sẽ trả về 1 URL trong đó có kết quả để mình lấy về
  //API này lấy kết quả dã sử lý XONG ở trên
  getResultFormBE = async (url) => {
    axios.get(url, { headers: { "Ocp-Apim-Subscription-Key": "ff1577dae52a4ee69daffa5041a82607" } })
      .then(response => {
        var result = []
        for (let iterator of response.data.recognitionResults[0].lines) {
          //Loại bỏ tất cả các kí tự không phải chữ cái và số
          var str = iterator.text.replace(/[^0-9a-z\s]/gi, '')
          //loại bỏ dấu cách
          var str2 = str.replace(/ /gi, '')
          result.push(str2)
        }//Show kết quả xử lý ở trên vào console.log dợi 10s dể show kết quả
        this.setState({ result }, async () => {
          console.log(this.state.result)
        })
        //Gửi thông tin qua màn hình waiting khi có thông tin này sẽ hết loading

      })
  }


  whenLoading() {
    return (
      <WaitingScreen nofication="Processing ..."
        decription="We have auto recognized National ID base on original template  "
      />
    )
  }

  checkError() {
    if (this.state.alertError != "") {
      return (
        <Fail
          nofication={this.state.alertError}
          decription="We can't auto recognized National ID base on original template  "
        // onPressWhenHaveError={()=>this.props.navigation.navigate('Home')}
        >
        </Fail>
      )
    }
    else {
      return (
        <Succes
          currentScreen={this.props.navigation.getParam('currentScreen')}
          nofication="Great!, National ID's already."
          decription="We have auto recognized National ID base on original template "
          onPress={() => this.props.navigation.navigate('ListToDoScreen', { userInfo: this.state.result, faceInfo: this.state.faceInfo })}
        // onPressWhenHaveError={()=>this.props.navigation.navigate('Home')}
        >
        </Succes>
      )
    }

  }

  // Function này sẽ display ra kết quả của quá trình xử lý
  whenDone() {
    console.log("run here" + this.state.alertError)
    return this.checkError();
  }
  //Kiểm tra processing nếu xong rồi thì trả ra kết quả

  FunctionOnlyForTest() {
    setTimeout(() => this.setState({
      isLoading: false
    }, () => {
      console.log(this.state.isLoading)
    }), 3000)
  }

  checkResult() {
    // this.FunctionOnlyForTest()
    if (this.state.isLoading == true) {
      return this.whenLoading();
    }
    else {
      return this.whenDone();
    }
  }

  render() {

    return (
      this.checkResult()
    )
  }
}
//--------------------------------------------------------------
class FormResultScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: true,
    }
  }
  static navigationOptions = {
    headerStyle: {
      elevation: 0
    },
  };
  componentDidMount() {
    console.log(this.props.navigation.getParam('currentScreen'))
  }

  render() {
    return (
      <Succes
        currentScreen={this.props.navigation.getParam('currentScreen')}
        nofication="Great!, 1 Step to go."
        decription="We have auto recognized National ID base on original template "
        onPress={() => this.props.navigation.navigate('ListToDoScreen')}
      // onPressWhenHaveError={()=>this.props.navigation.navigate('Home')}
      >
      </Succes>
    )
  }
}

class FormScreen extends React.Component {
  static navigationOptions = {
    headerStyle: {
      elevation: 0,
      backgroundColor: 'transparent'
    },
  };

  render() {
    return (
      <Form
        imageData={this.props.navigation.getParam('userInfo')}
        onPress={() => this.props.navigation.navigate('formProcessing', { currentScreen: this.props.navigation.getParam('currentScreen') })}
      ></Form>
    )
  }
}



class FaceRecognize extends React.Component {
  static navigationOptions = {
    header: null,
  };
  getResultFaceRecognize = (data) => {
    if (data) {
      this.sendImageToRepository(data);
    }
  }

  sendImageToRepository(image) {
    console.log('run here')
    const imageAfterReplace = image.replace("data:image/jpeg;base64,", "");
    const URL = "https://api.imgur.com/3/upload" //url của api
    axios.post(URL,
      {
        "image": imageAfterReplace
      },
      {
        headers: {
          "Authorization": "Bearer baca0f3689d1415c7c45f6fe2f91717cbc3141b4"
        },

      })
      .then(response => {
        console.log(response.data.data.link);
        this.props.navigation.navigate('faceProcessing', { faceUrl: response.data.data.link,faceInfo:this.props.navigation.getParam('faceInfo')});
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {
    return (
      <DetectFaceSrceen
        onPressProcess={this.getResultFaceRecognize}
        onPressBack={() => this.props.navigation.navigate('ListToDoScreen')}
      />
    )
  }
}

class FaceResultScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: true,
      alertError: '',
    }
  }

  static navigationOptions = {
    headerStyle: {
      elevation: 0
    },
  };

  componentDidMount(){
    this.pictureFormSelfie();
  }

  pictureFormSelfie = () => {
    console.log("first run")
    const URL_PIC = "https://vnn-imgs-f.vgcloud.vn/2019/11/16/10/ngoc-trinh-len-tieng-benh-vuc-khi-cong-phuong-bi-che-da-do-1.jpg"//this.props.navigation.getParam('faceUrl')
    const URL = "https://teamck27.cognitiveservices.azure.com/face/v1.0/detect?returnFaceId=true&returnFaceLandmarks=false&recognitionModel=recognition_01&returnRecognitionModel=false&detectionModel=detection_01"
    axios.post(URL,
      {
        "url": URL_PIC
      },
      {
        headers: {
          "Ocp-Apim-Subscription-Key": "f11b92ee29dd417ba1460c45e420d9ee"
        },

      })
      .then(async (response) => {
        console.log(response.data[0].faceId)
        this.faceDetect(response.data[0].faceId)
      })
      .catch(function (error) {
        return false
      });
    return false
  }

  faceDetect(result) {
    if (result != null) {
      this.faceRecognition(result, this.props.navigation.getParam('faceInfo'));
    }
    else {
      this.setState({
        alertError: "Face không hợp lệ"
      }, () => {
        this.setState({ isLoading: false })
      })
    }
  }



  faceRecognition = (faceId01, faceId02) => {
    console.log(faceId01)
    console.log(faceId02)
    const URL = "https://teamck27.cognitiveservices.azure.com/face/v1.0/verify"
    axios.post(URL,
      {
        "faceId1": faceId01,
        "faceId2": faceId02
      },
      {
        headers: {
          "Ocp-Apim-Subscription-Key": "f11b92ee29dd417ba1460c45e420d9ee"
        },

      })
      .then( async (response) =>{
        this.faceVerify(response.data);
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  faceVerify(result) {
    if(result.isIdentical == true && result.confidence >=0.6){
      this.setState({
        alertError:''
      })
    }
    else {
      this.setState({
        alertError:'Please take another selfie'
      },()=>{
        this.setState({
          isLoading:false
        })
      })
    }
  }

  checkError() {
    if (this.state.alertError != "") {
      return (
        <Fail
          nofication={this.state.alertError}
          decription="We can't auto recognized National ID base on original template  "
        >
        </Fail>
      )
    }
    else {
      return (
        <Succes
          currentScreen={this.props.navigation.getParam('currentScreen')}
          nofication="Great!, National ID's already."
          decription="We have auto recognized National ID base on original template "
          onPress={() => this.props.navigation.navigate('ListToDoScreen')}
        >
        </Succes>
      )
    }

  }

  whenLoading() {
    return (
      <WaitingScreen nofication="Processing ..."
        decription="We have auto recognized National ID base on original template  "
      />
    )
  }

whenDone() {
    console.log("run here" + this.state.alertError)
    return this.checkError();
  }
  //Kiểm tra processing nếu xong rồi thì trả ra kết quả
  checkResult() {
   // this.thisFunctionOnlyForTest()
    if (this.state.isLoading == true) {
      return this.whenLoading();
    }
    else {
      return this.whenDone();
    }
  }

  thisFunctionOnlyForTest() {
    setTimeout(() => this.setState({
      isLoading: false
    }, () => {
      console.log(this.state.isLoading)
    }), 3000)
  }


  render() {
    return (
      this.checkResult()
    )
  }
}





const styles = StyleSheet.create({
  container: {
    flex: 1
  },

  Image: {
    width: 200,
    height: 50,
    alignSelf: 'center'
  },

  defaultSetting: {

  },

  image: {
    resizeMode: 'center',
    width: 600,
    height: 350,
  },

})



const root = createStackNavigator(
  {
    Home: HomeScreen,
    ListToDoScreen: ListToDoScreen,
    DetectIDScreen: DetectIDScreen,
    templateProcessing: TemplateResultScreen,
    Form: FormScreen,
    formProcessing: FormResultScreen,
    faceRecognize: FaceRecognize,
    faceProcessing: FaceResultScreen
  },
  {
    initialRouteName: 'Home',
    defaultNavigationOptions: {

    },
  }
)

const AppContainer = createAppContainer(root)
const store = createStore(myReducer)
export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <AppContainer
          ref={navigatorRef => {
            NavigationService.setTopLevelNavigator(navigatorRef);
          }}
        />
      </Provider>
    )
  }
}