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
        return (
            <View style={styles.container}>
                <LottieView style={{ width: "80%", height: 300, alignSelf: 'center', }}
                    source={require('../../assets/Animation/succes.json')}
                    progress={this.state.success}
                     />
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
    }

})
