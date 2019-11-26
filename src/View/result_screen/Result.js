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


    render() {
        console.log(this.props.isError)
        return (
            <View>
                {this.state.isError === "" ? (
                    <View style={styles.container}>
                        <LottieView resizeMode="contain" style={{ width: "80%", height: 300, alignSelf: 'center', }} source={require("../../assets/Animation/1127-success.json")} progress={this.state.success} />
                        <View style={styles.swagger}>
                            <Text style={styles.nofication}>{this.props.nofication}</Text>
                            <View style={{ marginTop: 40 }}>
                                <Text style={styles.nofication}>{this.props.message}</Text>
                                <View style={{ backgroundColor: 'blue', width: "100%", height: 40 }}>
                                    <TouchableOpacity style={styles.buttonStyle}
                                        onPress={this.props.onPressButton}
                                    >
                                        <Text style={styles.buttonText}>Tiếp tục</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>
                ) : (
                        <View></View>
                    )
                }
                {this.state.isError === "" ? (
                    <View></View>
                ) : (
                        <View style={styles.container}>
                            <LottieView style={{ width: "80%", height: 200, alignSelf: 'center', }} source={require('../../assets/Animation/4970-unapproved-cross.json')} progress={this.state.success} />
                            <View style={styles.swagger}>
                                <Text style={styles.nofication}>{this.state.isError}</Text>
                                <View style={{ marginTop: 10 }}>
                                    <Text style={styles.nofication}></Text>
                                    <TouchableOpacity style
                                    ={styles.buttonStyle}
                                        onPress={this.props.onPressWhenHaveError}
                                    >
                                        <Text style={styles.buttonText}>Trở về</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    )
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 0.9,
        backgroundColor: '#FFFFFF',

    },

    swagger: {
        marginTop: 80,
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        backgroundColor: 'blue'
    },

    buttonStyle: {
        marginTop: 10,

        width: 150,
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

    nofication: {
        fontSize: 25,
        color: '#04B431',
        fontWeight: 'bold',
        alignSelf: 'center'
    }

})
 