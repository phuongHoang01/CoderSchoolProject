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
    Easing,
    ImageBackground
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
        return (
            <ImageBackground source={require('../assets/backgroud.png')} style={styles.container}>
                <View style={styles.swaggerTitle}>
                    <Text style={styles.title}>Capture your face</Text>
                    <Text style={styles.step}>Step 3 of 4</Text>
                </View>
                <View style={{backgroundColor: "#F0F6E8",borderRadius:100,marginTop:50}}>
                    <Image
                        source={require('../assets/78487490_1460127677472949_5655837347414016000_n.png')}
                        style={{}}
                    />
                </View>
                <View style={
                    {
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginLeft: 20,
                        marginRight: 20,
                    }}>
                    <Text style={styles.waitText}>{this.props.nofication}</Text>
                    <Text style={styles.decription}>{this.props.decription}</Text>
                </View>

                <TouchableOpacity style={styles.buttonStyle}
                    onPress={this.handleSubmit}
                >
                    <Text style={styles.buttonText}>Capture</Text>
                </TouchableOpacity>
            </ImageBackground>
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
        fontSize: 25,
        color: '#04B431',
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
        
        alignItems: 'center'
    },

    buttonStyle: {
        margin:6,
        width: 200,
        height: 50,
        borderRadius: 30,
        alignSelf:'center',
        alignItems:'center',
        justifyContent: 'center',
        backgroundColor: '#04B431',
      },
      buttonText: {
        fontSize: 25,
        color: 'white',
        fontWeight: 'bold',
      },

})
