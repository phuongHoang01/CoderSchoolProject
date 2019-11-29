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
    console.log(Screen)
    return this.props.navigation.navigate(Screen)
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
        this.props.navigation.navigate('templateProcessing', { urlData: response.data.data.link, base64Image: image }) //Gửi link ảnh qua màng hình xử lý
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  static navigationOptions = {
    headerTitle: () => <Logo></Logo>,
    headerRight: () => { }
  }

  render() {
    return (
      <View style={styles.container}>
        <Title title="Xác minh CMND"></Title>
        <DetectSrceen
          onPressProcess={this.getBase64ImageData}
          uri='https://png.pngtree.com/element_our/png_detail/20181227/camera-icon-designed-for-all-application-purpose-png_287858.jpg'
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
      alertError: ''
    }
  }

  // componentDidMount() {
  //   this.pictureFormCMND()
  // }


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
        "Authorization": "Bearer ya29.Il-yBxx7M4rst3fqEoJxW4Tyk5sqwgQ5D4ILfC9CnAyDFH35C-draX9J8UoYIhDn_8aIzDQ3yMNWnJxYbgmsKbG3ESpZMVcj1Nbz1Znz49jOA-q_wN7d47VdNs4ocN10pQ"
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
        console.log("sec run")
        // console.log(response.data[0].faceId);
        console.log(response)
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
    console.log("here" + result)
    if (result != null) {
      this.templateProcessing();
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
        this.setState({ result }, () => {
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
    if (this.state.alertError != null) {
      return(
      <Fail
        nofication="Uh-Oh! Process not complete."
        decription="We can't auto recognized National ID base on original template  "
      // onPressWhenHaveError={()=>this.props.navigation.navigate('Home')}
      >
      </Fail>
      )
    }
    else {
      return(
      <Succes
        nofication="Great!, National ID's already."
        decription="We have auto recognized National ID base on original template "
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
    this.FunctionOnlyForTest()
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
  
  whenLoading() {
    return (
      <WaitingScreen nofication="Đang xử lý thông tin" />
    )
  }

  // Function này sẽ display ra kết quả của quá trình xử lý
  whenDone() {
    // return (
    //   <Result
    //     onPress={() => this.props.navigation.navigate('faceRecognize')}
    //     nofication="Thông tin trùng khớp"
    //     message="Mời bạn tiếp tục"
    //   >
    //   </Result>
    // )
  }
  //Kiểm tra processing nếu xong rồi thì trả ra kết quả
  checkResult() {
    this.FunctionOnlyForTest()
    if (this.state.isLoading == true) {
      return this.whenLoading();
    }
    else {
      return this.whenDone();
    }
  }

  FunctionOnlyForTest() {
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

class FormScreen extends React.Component {
  static navigationOptions = {
    headerStyle: {
      elevation: 0,
      backgroundColor: 'rgba(52, 52, 52, alpha)'
    },
  };
  render() {
    const imageData = this.props.navigation.getParam('userInfo')
    return (
        <Form
          imageData={imageData}
          onPress={() => this.props.navigation.navigate('formProcessing')}
        ></Form>
    )
  }
}



class FaceRecognize extends React.Component {
  static navigationOptions = {
    headerStyle: {
      elevation: 0,
      backgroundColor: 'transparent'
    },
  };
  getResultFaceRecognize = (data) => {
    if (data) {
      console.log("get from face recognize" + data)
      this.props.navigation.navigate('faceProcessing', { resultCompare: data })
    }
  }
  render() {
    return (
      <Face
      nofication 
      />
    )
  }
}

class FaceResultScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: true,

    }
  }

  whenLoading() {
    return (
      <WaitingScreen nofication="Đang xử lý thông tin" />
    )
  }

  // Function này sẽ display ra kết quả của quá trình xử lý
  whenDone() {
    // return (
    //   <Result
    //     onPress={() => this.props.navigation.navigate('faceProcessing')}
    //     nofication="Trùng khớp 80%"
    //     message="Xác nhận CMND thật"
    //   >
    //   </Result>
    // )
  }
  //Kiểm tra processing nếu xong rồi thì trả ra kết quả
  checkResult() {
    this.thisFunctionOnlyForTest()
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

export default class App extends React.Component {
  render() {
    return (
      <AppContainer />
    )
  }
}