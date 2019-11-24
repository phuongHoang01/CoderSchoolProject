import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import { FormLabel, FormInput, FormValidationMessage, ThemeConsumer } from 'react-native-elements'
import { Input } from 'react-native-elements';
import axios from 'axios'
import ModalDropdown from 'react-native-modal-dropdown';
export default class Form_Screen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      cardID: "",
      name: "",
      birthDay: "",
      homeTown: "",
      locale: "",
      errorID: "",
      errorName: "",
      errorBirthDay: "",
      errorHomeTown: "",
      errorLocale: "",
      province: [],
      district: [],
      error: false
    }
  }
  componentDidMount = () => {
    console.log("data here")
    console.log(this.props.imageData)
    this.getProvince()
  }
  getCardID(text) {
    let newText = this.xoa_dau(text).replace(/ /gi, '')
    this.setState({
      cardID: "SO" + newText
    })
  }
  getName(text) {
    let newText = this.xoa_dau(text).replace(/ /gi, '')
    this.setState({
      name: newText
    })
  }
  getBirthDay(text) {
    this.setState({
      birthDay: text
    })
  }
  getHomeTown(id) {
    let provinceList = this.state.province
    var newProvince = provinceList[id]
    newProvince = this.xoa_dau(newProvince).replace(/ /gi, '')
    this.setState({
      homeTown: newProvince
    })
  }
  getLocaleDistrict = (id) => {
    this.getDistrict(id)
  }
  getLocale = (id) => {
    let districtList = this.state.district
    var newDistrict = districtList[id]
    console.log(newDistrict)
    newDistrict = this.xoa_dau(newDistrict).replace(/ /gi, '')
    this.setState({
      locale: newDistrict
    })
  }
  xoa_dau(str) {
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replace(/đ/g, "d");
    str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
    str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
    str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
    str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
    str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
    str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
    str = str.replace(/Đ/g, "D");
    return str;
  }
  getProvince = () => {
    const url = "https://thongtindoanhnghiep.co/api/city"
    var listProvince = []
    axios.get(url)
      .then(function (response) {
        // handle success
        for (var i = 0; i <= 62; i++) {
          listProvince.push(response.data.LtsItem[i].Title)
        }
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
    this.setState({
      province: listProvince
    })
  }

  getDistrict = (id) => {
    var stt = parseInt(id) + 1
    const url = "https://thongtindoanhnghiep.co/api/city/" + stt + "/district"
    var listDistrict = []
    axios.get(url)
      .then(function (response) {
        // handle success        
        for (var i = 0; i <= 62; i++) {
          listDistrict.push(response.data[i].Title)
        }
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
    this.setState({
      district: listDistrict
    })
  }
  handleSubmit = async () => {
    var resultFromCardID = this.props.imageData
    var spliceArray = [...this.props.imageData]
    //compare cardID
    var hasValidID = false
    for (var i = 0; i <= resultFromCardID.length; i++) {
      if (this.state.cardID == resultFromCardID[i]) {
        hasValidID = true
        spliceArray.splice(i, 1);
      }
    }
    if (hasValidID == false) {
      if (this.state.cardID == "") {
        this.setState({
          errorID: "Chưa điền số CMND",
          error: true
        })
      } else {
        this.setState({
          errorID: "Số CMND không đúng",
          error: true
        })
      }
    } else {
      this.setState({
        errorID: ""
      })
    }
    //compare name
    var hasValidName = false
    for (var i = 0; i <= resultFromCardID.length; i++) {
      console.log("---here---")
      console.log(resultFromCardID[i])
      console.log(this.state.name)
      if (this.state.name.toUpperCase() == resultFromCardID[i]) {
        hasValidName = true
        spliceArray.splice(i,1);
      }
    }
    console.log(spliceArray)
    if (hasValidName == false) {
      if (this.state.name == "") {
        this.setState({
          errorName: "Chưa điền họ tên",
          error: true
        })
      } else {
        this.setState({
          errorName: "Họ tên không đúng",
          error: true
        })
      }
    } else {
      this.setState({
        errorName: ""
      })
    }
    //compare birthday
    var hasValidBirthDay = false
    for (var i = 0; i <= resultFromCardID.length; i++) {
      if (this.state.birthDay == resultFromCardID[i]) {
        hasValidBirthDay = true
        spliceArray.splice(i, 1);
      }
    }
    if (hasValidBirthDay == false) {
      if (this.state.birthDay == "") {
        this.setState({
          errorBirthDay: "Chưa điền ngày sinh",
          error: true
        })
      } else {
        this.setState({
          errorBirthDay: "Ngày sinh không đúng",
          error: true
        })
      }
    } else {
      this.setState({
        errorBirthDay: ""
      })
    }

    
    //compare hometown
    var hasValidHomeTown = false
    for (var i = 0; i <= spliceArray.length; i++) {
      if (this.confirmEnding(spliceArray[i], this.state.homeTown)) {
        hasValidHomeTown = true
      }
    }
    if (hasValidHomeTown == false) {
      if (this.state.homeTown == "") {
        this.setState({
          errorHomeTown: "Chưa chọn nguyên quán",
          error: true
        })
      } else {
        this.setState({
          errorHomeTown: "Nguyên quán không đúng",
          error: true
        })
      }
    } else {
      this.setState({
        errorHomeTown: ""
      })
    }
    //compare locale, just compare district because the district belong to a province
    var hasValidLocale = false
    console.log(this.state.locale)
    for (var i = 0; i <= spliceArray.length; i++) {
      var a = this.confirmEnding(spliceArray[i], this.state.locale.replace(/Quan|Huyen|Xa|ThanhPho/g, ""))
      console.log(a)
        if (this.state.locale == "") {
          this.setState({
            errorLocale: "Vui lòng chọn quận huyện",
            error: true
          })
        } else if(a) {
          this.setState({
            errorLocale: ""
          })
          console.log(this.state.error)
          if (this.state.error === false) {
            await goToFaceDetect()
          } else {
            this.setState({
              error: false
            })
          } 
          return;
        } else {
          this.setState({
            errorLocale: "Không đúng thông tin",
            error: true
          })
        }
    }
    
   
  }


  confirmEnding(string, target) {
    console.log("string"+string)
    console.log(target)
    let regex = new RegExp(target)
    return regex.test(string)
  };
  goToFaceDetect = () => {
    this.props.onPress()
  }
  render() {
    return (
      <View style={styles.container} >
        <View style={styles.message}>
        </View>

        <View style={styles.from}>
          <View style={styles.input}>
            <Input
              errorStyle={{ color: 'red' }}
              errorMessage={this.state.errorID}
              placeholder='Số CMND'
              keyboardType="number-pad"
              onChangeText={text => this.getCardID(text)}
            />
          </View>

          <View style={styles.input}>
            <Input
              errorStyle={{ color: 'red' }}
              errorMessage={this.state.errorName}
              placeholder='Họ tên'
              onChangeText={text => this.getName(text)}
            />
          </View>

          <View style={styles.input}>
            <Input
              errorStyle={{ color: 'red' }}
              errorMessage={this.state.errorBirthDay}
              placeholder='Sinh ngày'
              onChangeText={text => this.getBirthDay(text)}
            />
          </View>

          <View style={styles.inputDropdown}>
            <Text style={{fontSize:15,fontWeight:'bold'}}>Nguyên quán: </Text>
            <ModalDropdown
              style={{marginLeft:30}}
              options={this.state.province}
              defaultValue="Chọn tỉnh thành"
              onSelect={id => this.getHomeTown(id)}
            />
            <Text style={{ color: 'red' }}>{this.state.errorHomeTown}</Text>
          </View>

          <View style={styles.inputDropdown}>
            <Text style={{fontSize:15,fontWeight:'bold'}}>Nơi ĐKHK thường trú:</Text>
            <ModalDropdown
              style={{marginRight:6,marginLeft:6}}
              options={this.state.province}
              defaultValue="Chọn tỉnh thành"
              onSelect={id => this.getLocaleDistrict(id)}
            />
            <ModalDropdown
              options={this.state.district}
              defaultValue="Chọn quận/huyện"
              onSelect={id => this.getLocale(id)}
            />
            <Text style={{ color: 'red' }}>{this.state.errorLocale}</Text>
          </View>

          <TouchableOpacity style={styles.buttonStyle}
            onPress={this.handleSubmit}
          >
            <Text style={styles.buttonText}>Tiếp tục</Text>
          </TouchableOpacity>

        </View>
      </View>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 0.9,
    justifyContent: 'flex-start',
    backgroundColor: '#FFFFFF'

  },

  message: {
  },

  form: {

  },

  input: {
    marginTop: 23,
  },


  nofication: {
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
    backgroundColor: '#04B431',
  },
  buttonText: {
    fontSize: 25,
    color: 'white',
    fontWeight: 'bold',
  },
  inputDropdown: {
    marginTop: 20,
    margin: 10,
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
    alignItems: 'flex-end',
  }


})

