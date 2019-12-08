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
    Animated,
    Easing
} from 'react-native';
import LottieView from 'lottie-react-native';
import { Button } from 'react-native-material-ui/src';


export default class Result extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            success: new Animated.Value(0),
            isError: this.props.isError
        }
    }

    componentDidMount() {
        Animated.timing(this.state.success, {
            toValue: 1,
            duration: 2000,
            easing: Easing.linear,
        }).start();
    }

    getImage = () => {
        console.log("getImage")
        console.log(this.props.currentScreen)
        switch (this.props.currentScreen) {
            case "DetectIDScreen":
                return require("../../assets/Animation/fail.json")
            case "faceRecognize":
                return require("../../assets/Animation/faceFail.json")
            default:
                break;
        }
    }


    render() {
        return (
            <View style={styles.container}>
                <LottieView style={{ width: "80%", height: 300, alignSelf: 'center', }}
                    source={this.getImage()}
                    progress={this.state.success}
                />
                <View style={
                    {
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginLeft: 20,
                        marginRight: 20,
                    }}>
                    <View style={{ alignItems: 'center' }}>
                        <Text style={styles.waitText}>{this.props.nofication}</Text>
                        <Text style={styles.decription}>{this.props.decription}</Text>
                    </View>
                </View>

                <TouchableOpacity style={styles.buttonStyle}
                    onPress={() => {
                        return this.updateStep();

                    }}
                >
                    <Text style={styles.buttonText}>Take again</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 0.9,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFFFFF'
    },

    waitText: {
        marginTop: 20,
        fontSize: 24,
        color: '#FA5858',
        fontWeight: 'bold',
    },

    decription: {
        marginTop: 10,
        fontSize: 20,
        color: '#bebebe',
        fontWeight: 'bold',
        textAlign: 'center',
        lineHeight: 29
    },

    buttonStyle: {
        marginTop: 40,
        width: 150,
        height: 48,
        borderRadius: 30,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FA5858',
    },

    buttonText: {
        fontSize: 20,
        color: 'white',
        fontWeight: "bold",
    },

})
