import React from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
    Image,
    ImageBackground,
    Dimensions,
    TouchableOpacity
} from 'react-native';
import LottieView from 'lottie-react-native';
import { createAppContainer, NavigationActions, NavigationEvents } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import { IconToggle } from 'react-native-material-ui/src/'
import { CheckBox } from 'react-native-elements'
import Icon from 'react-native-vector-icons/Entypo'
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { connect } from 'react-redux'


const { width, height } = Dimensions.get('window')
class Fraud extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            progress: 50,
            screen: "",
            currentProcessStatus: [
                {
                    "id": 1,
                    "name": "Detect National ID template from photo",
                    "value": true
                },

                {
                    "id": 2,
                    "name": "Filling form and compare with the result from Nation ID OCR result ",
                    "value": true
                },

                {
                    "id": 3,
                    "name": "Capture face from camera and compare with the face from Nation ID card",
                    "value": false
                },

                {
                    "id": 4,
                    "name": "Show the final result",
                    "value": false
                },


            ]
        }
    }
    componentDidMount() {

    }

    onPressSwitchScreen(id) {
        this.setState({
            screen: ''
        }, () => {
            console.log("here" + this.state.screen)
            for (const iterator of this.props.stepToDo) {
                switch (id) {
                    case 1:
                        return this.setState({ screen: "DetectIDScreen" }, () => {
                            this.props.onPress(this.state.screen)
                        })
                    case 2:
                        return this.setState({ screen: "Form" }, () => {
                            this.props.onPress(this.state.screen)
                        })
                    case 3:
                        return this.setState({ screen: "faceRecognize" }, () => {
                            this.props.onPress(this.state.screen)
                        })
                }
            }
        })

    }


    render() {
        console.log(this.state.screen)
        return (
            <ScrollView>

                <ImageBackground resizeMode='stretch' style={styles.container} source={require('./assets/home.png')}>

                    <View style={styles.header}>
                        <View style={styles.progress}>
                            <Image
                                style={{ width: "100%", height: "100%" }}
                                source={require("./assets/scan02.png")}
                                resizeMode="contain"
                            />

                            <AnimatedCircularProgress
                                style={{
                                    position: 'absolute', transform: [{
                                        rotate: -190
                                    }]
                                }}
                                duration={4000}
                                size={120}
                                width={8}
                                fill={this.state.progress}
                                tintColor="#4EF4C6"
                                onAnimationComplete={() => console.log('onAnimationComplete')}
                                backgroundColor="transparent" />

                        </View>
                    </View>
                    <View style={styles.body}>
                        <View style={styles.bodySwagger}>
                            <NavigationEvents
                                onWillFocus={() => {
                                    return this.setState({
                                        currentProcessStatus: this.props.stepToDo
                                    })
                                }}
                            />
                            <View style={{ alignItems: 'center', marginTop: 0 }}>
                                <Text style={{ fontSize: 18, color: '#f0faf6' }}>{this.state.progress}% complete</Text>
                                <Text style={styles.title}>Fraud Detection</Text>
                            </View>

                            <View style={styles.checkBoxSwagger}>
                                {
                                    this.props.stepToDo.map(item =>
                                        <View style={styles.checkBox}>
                                            <CheckBox
                                                title={item.name}
                                                textStyle={
                                                    {
                                                        color: "white",
                                                        fontSize: 17
                                                    }
                                                }
                                                leftIconContainerStyle={{ color: "white", backgroundColor: 'white' }}
                                                checked={item.value}
                                                iconType='Ionicons'
                                                checkedIcon='check-circle'
                                                uncheckedIcon='radio-button-unchecked'
                                                containerStyle={{
                                                    backgroundColor: "transparent",
                                                    borderWidth: 0,
                                                    width: "90%"
                                                }}
                                                onPress={() => this.onPressSwitchScreen(item.id)}
                                            />

                                            <IconToggle style={{ width: "10%" }} name="chevron-right" size={30} color="#F2F2F2" />
                                        </View>
                                    )
                                }
                            </View>

                            <TouchableOpacity style={styles.buttonStyle}
                                onPress={this.props.onPressButton}>
                                <Text style={styles.buttonText}>Start</Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                </ImageBackground>
            </ScrollView>

        )
    }
}

const mapStateToProps = state => {
    return {
        stepToDo: state.step
    }
}

export default connect(mapStateToProps, null)(Fraud);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },

    header: {
        flex: 0.2
    },

    body: {
        flex: 0.8,
        width,
        height,
    },

    progress: {
        width: 120, height: 120,
        backgroundColor: "#F0F6E8",
        left: "50%",
        borderRadius: 100,
        transform: [
            {
                translateX: -50
            },
            {
                translateY: 10
            }
        ],
    },


    progressBar: {
        position: 'absolute',
        flexDirection: 'row',
        width: "100%",
        height: "100%",
        borderRadius: 100,
        borderWidth: 10,
        borderRadius: 100,
        borderColor: '#4EF4C6',
    },

    title: {
        marginTop: 10,
        color: '#f0faf6',
        fontSize: 35,
        fontWeight: '700',
        lineHeight: 35
    },

    bodySwagger: {
        marginTop: 20,
        alignItems: 'center'
    },

    checkBoxSwagger: {
        marginTop: 35,
        marginLeft: 10,
        marginRight: 10,
    },


    buttonStyle: {
        marginTop: 20,
        width: 150,
        height: 50,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
    },
    buttonText: {
        fontSize: 25,
        color: '#3bbd81',
        fontWeight: 'bold',
    },

    checkBox: {
        alignItems: 'center',
        flexDirection: 'row',
        width: "100%"
    }



})
