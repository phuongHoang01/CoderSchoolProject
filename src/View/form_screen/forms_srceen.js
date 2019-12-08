import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  ScrollView
} from 'react-native';
import { FormLabel, FormInput, FormValidationMessage, ThemeConsumer } from 'react-native-elements'
import { Input } from 'react-native-elements';
import axios from 'axios'
import ModalDropdown from 'react-native-modal-dropdown';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
export default class Form_Screen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      cardID: "",
      name: "",
      birthDay: "",
      homeTown: "",
      locale: "",
      // cardID: "364152355",
      // name: "VONGUYENGIAHAN",
      // birthDay: "30122000",
      // homeTown: "TPHoChiMinh",
      // locale: "PhuNhuan",
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
      cardID: newText
    })
  }
  getName(text) {
    let newText = this.xoa_dau(text).replace(/ /gi, '')
    this.setState({
      name: newText
    })
  }
  getBirthDay(text) {
    var str = text.replace(/[^0-9a-z\s]/gi, '')
    this.setState({
      birthDay: str
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
  handleSubmit = () => {
    var resultFromCardID = this.props.imageData
    // var onlyForTest = ["CONGHOAXAHOICHUNGHIAVIETNAM", "DoclapTudoHanhphuc", "GIAYCHUNGMINHNHANDAN", "VIETNAM", "So364152355", "HotenVONGUYENGIAHAN", "Sinhngay", "30122000", "NguyenquanTPHoChiMinh", "NoiDKHKthuongtru430NguyenKiem", "Phuong3quanPhuNhuan"];
    var resultFromCardID = resultFromCardID.map(item => item.replace(/So|so|Hoten|SO|Sinhngay|/g, ""))
    for (var i = 0; i <= resultFromCardID.length; i++) {

      if (resultFromCardID[i] == "") {
        resultFromCardID.splice(i, 1);
      }
    }

    var spliceArray = [...resultFromCardID]
    // var spliceArray = [...this.props.imageData]
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

      if (this.state.name.toUpperCase() == resultFromCardID[i]) {
        hasValidName = true
        spliceArray.splice(i, 1);
      }
    }
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
        break;
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
      if (this.confirmEnding(spliceArray[i], this.state.locale.replace(/Quan|Huyen|Xa|ThanhPho/g, ""))) {
        hasValidLocale = true;
        break;
      }

    }
    if (this.state.locale == "") {
      this.setState({
        errorLocale: "Vui lòng chọn quận huyện",
        error: true
      }, () => {
        return this.state.error;
      })
    } else if (hasValidLocale) {
      this.setState({
        errorLocale: ""
      })
    } else {
      this.setState({
        errorLocale: "Không đúng thông tin",
        error: true
      }, () => {
        return this.state.error;
      })
    }

    return this.state.error;


  }


  confirmEnding(string, target) {
    let regex = new RegExp(target)
    return regex.test(string)
  };
  goToFaceDetect = () => {
    this.props.onPress()
  }
  render() {
    return (


      <ImageBackground style={styles.container}
        resizeMode="cover"
        source={require('../../assets/backgroud.png')}
      >
        <View style={styles.body}>
          <ScrollView>
            <View style={styles.swaggerTitle}>
              <Text style={styles.title}>Filling form</Text>
              <Text style={styles.step}>Step 2 of 4</Text>
            </View>
            <View style={styles.form}>
              <View style={{ marginTop: 38 }}>
                <Text style={styles.label}>National ID number</Text>
                <View style={styles.formInput}>
                  <View style={
                    {
                      backgroundColor: '#BCE6D8',
                      justifyContent: 'center',
                      alignSelf: 'center',
                      padding: 10,
                      marginLeft: 2.5,
                      borderRadius: 100
                    }
                  }>
                    <Icon
                      name='account-card-details'
                      size={30}
                      color='#46C188'
                    />
                  </View>

                  <Input
                    placeholder="Enter your National ID number"
                    containerStyle={{ height: 56 }}
                    inputContainerStyle={{ height: "100%", borderBottomWidth: 0 }}
                    onChangeText={text => this.getCardID(text)}
                    errorStyle={{ color: 'red', fontSize: 16 }}
                    errorMessage={this.state.errorID}
                    keyboardType="number-pad"
                  />
                </View>
              </View>

              <View style={{ marginTop: 38 }}>
                <Text style={styles.label}>Name</Text>
                <View style={styles.formInput}>
                  <View style={
                    {
                      backgroundColor: '#BCE6D8',
                      justifyContent: 'center',
                      alignSelf: 'center',
                      padding: 10,
                      marginLeft: 2.5,
                      borderRadius: 100
                    }
                  }>
                    <Icon
                      name='account'
                      size={30}
                      color='#46C188'
                    />
                  </View>

                  <Input
                    placeholder="Enter your full name"
                    containerStyle={{ height: 56 }}
                    inputContainerStyle={{ height: "100%", borderBottomWidth: 0 }}
                    errorStyle={{ color: 'red', fontSize: 15 }}
                    errorMessage={this.state.errorName}
                    onChangeText={text => this.getName(text)}
                  />
                </View>
              </View>

              <View style={{ marginTop: 38 }}>
                <Text style={styles.label}>Day of birth</Text>
                <View style={styles.formInput}>
                  <View style={
                    {
                      backgroundColor: '#BCE6D8',
                      justifyContent: 'center',
                      alignSelf: 'center',
                      padding: 10,
                      marginLeft: 2.5,
                      borderRadius: 100
                    }
                  }>
                    <Icon
                      name='calendar'
                      size={30}
                      color='#46C188'
                    />
                  </View>

                  <Input
                    placeholder="DD/MM/YYYY"
                    containerStyle={{ height: 56 }}
                    inputContainerStyle={{ height: "100%", borderBottomWidth: 0 }}
                    errorStyle={{ color: 'red', fontSize: 15 }}
                    errorMessage={this.state.errorBirthDay}
                    onChangeText={text => this.getBirthDay(text)}
                  />
                </View>
              </View>


              <View style={{ marginTop: 38 }}>
                <Text style={styles.label}>Hometown</Text>
                <View style={styles.formInput}>
                  <View style={
                    {
                      backgroundColor: '#BCE6D8',
                      justifyContent: 'center',
                      alignSelf: 'center',
                      padding: 10,
                      marginLeft: 2.5,
                      borderRadius: 100
                    }
                  }>
                    <Icon
                      name='map-marker'
                      size={30}
                      color='#46C188'
                    />
                  </View>

                  <ModalDropdown
                    style={{
                      position: 'relative',
                      width: '85%',
                      height: 56,
                      justifyContent: 'center',
                    }}
                    textStyle={{
                      paddingLeft: 10,
                      fontSize: 17,
                      opacity: 0.4,
                    }}
                    options={this.state.province}
                    defaultValue="Choose your Home Town"
                    onSelect={id => this.getHomeTown(id)}
                    dropdownStyle={{
                      width: "60%"
                    }}
                    dropdownTextStyle={
                      {
                        fontSize: 17,
                        textAlign: 'center'
                      }
                    }
                    accessible
                  />

                  <View style={
                    {
                      zIndex: -1,
                      left: '50%',
                      transform: [
                        {
                          translateX: 131,
                        }

                      ],
                      position: 'absolute',
                      borderWidth: 0.4,
                      justifyContent: 'center',
                      alignSelf: 'center',
                      padding: 5,
                      borderRadius: 100,

                    }
                  }>
                    <Icon
                      name='chevron-down'
                      size={20}
                      color='black'
                    />
                  </View>
                </View>
                <Text style={{ color: 'red', fontSize: 15, marginLeft: 10 }}>{this.state.errorHomeTown}</Text>
              </View>
              <Text style={styles.label}>Locale</Text>
              <View style={[styles.localeSwagger]}>
                <View style={styles.locale}>
                  <View style={
                    {
                      backgroundColor: '#BCE6D8',
                      justifyContent: 'center',
                      alignSelf: 'center',
                      padding: 10,
                      marginLeft: 2.5,
                      borderRadius: 100
                    }
                  }>
                    <Icon
                      name='map-marker'
                      size={30}
                      color='#46C188'
                    />
                  </View>

                  <ModalDropdown
                    style={{
                      position: 'relative',
                      width: '60%',
                      height: 56,
                      justifyContent: 'center',

                    }}
                    textStyle={{
                      fontWeight: 'bold',
                      paddingLeft: 10,
                      fontSize: 15,
                      opacity: 0.4
                    }}
                    options={this.state.province}
                    defaultValue="Province"
                    onSelect={id => this.getLocaleDistrict(id)}
                    dropdownStyle={{
                      width: "30%",
                    }}
                    dropdownTextStyle={
                      {
                        fontSize: 17,
                        textAlign: 'center'
                      }
                    }
                    accessible
                  />

                  <View style={
                    {
                      zIndex: -1,
                      left: '50%',
                      transform: [
                        {
                          translateX: 40,
                        }

                      ],
                      position: 'absolute',
                      borderWidth: 0.4,
                      justifyContent: 'center',
                      alignSelf: 'center',
                      padding: 5,
                      borderRadius: 100,

                    }
                  }>
                    <Icon
                      name='chevron-down'
                      size={20}
                      color='black'
                    />
                  </View>
                </View>



                <View style={[styles.locale]}>
                  <View style={
                    {
                      backgroundColor: '#BCE6D8',
                      justifyContent: 'center',
                      alignSelf: 'center',
                      padding: 10,
                      marginLeft: 2.5,
                      borderRadius: 100
                    }
                  }>
                    <Icon
                      name='map-marker'
                      size={30}
                      color='#46C188'
                    />
                  </View>

                  <ModalDropdown
                    style={{

                      position: 'relative',
                      width: '60%',
                      height: 56,
                      justifyContent: 'center',
                    }}
                    textStyle={{
                      fontWeight: 'bold',
                      paddingLeft: 10,
                      fontSize: 15,
                      opacity: 0.4
                    }}
                    options={this.state.district}
                    defaultValue="Distric"
                    onSelect={id => this.getLocale(id)}
                    dropdownStyle={{
                      width: "30%"
                    }}
                    dropdownTextStyle={
                      {
                        fontSize: 17,
                        textAlign: 'center'
                      }
                    }
                    accessible
                  />

                  <View style={
                    {
                      zIndex: -1,
                      left: '50%',
                      transform: [
                        {
                          translateX: 40,
                        }

                      ],
                      position: 'absolute',
                      borderWidth: 0.4,
                      justifyContent: 'center',
                      alignSelf: 'center',
                      padding: 5,
                      borderRadius: 100,

                    }
                  }>
                    <Icon
                      name='chevron-down'
                      size={20}
                      color='black'
                    />
                  </View>
                </View>
              </View>
              <Text style={{ color: 'red', marginLeft: 20 }}>{this.state.errorLocale}</Text>
              <TouchableOpacity style={styles.buttonStyle}
                onPress={async () => {
                  var a = await this.handleSubmit();
                  if (this.handleSubmit() == false) {
                    console.log('run here n time')
                    return this.props.onPress()
                  }
                }}
              >
                <Text style={styles.buttonText}>Compare</Text>
              </TouchableOpacity>

              <ImageBackground
                source={require('../../assets/2.png')}
                style={{ width: 100, height: 100, alignSelf: 'center' }}
              />
            </View>
          </ScrollView>
        </View>
      </ImageBackground>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  body: {
    flex: 1,
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

  swaggerTitle: {
    marginTop: 20,
    alignItems: 'center'
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
    margin: 6,
    width: 200,
    height: 50,
    borderRadius: 30,
    alignSelf: 'center',
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
  },

  formInput: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 100,
    borderColor: "#8FC7B4"
  },

  label: {
    color: "#3bbd81",
    fontSize: 19,
    marginBottom: 10,
    marginLeft: 7
  },

  form: {
    marginLeft: 20,
    marginRight: 20
  },

  localeSwagger: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around'
  },

  locale: {
    width: "45%",
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 100,
    borderColor: "#8FC7B4"
  }


})

