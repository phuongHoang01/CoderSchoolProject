import React, { Component } from 'react'
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
    ActivityIndicator
  } from 'react-native';

export default class WaitingSrceen extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <ActivityIndicator  size={60}></ActivityIndicator>
                <Text style={styles.waitText}>{this.props.nofication}</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container : {
        flex: 0.9,
        alignItems : 'center',
        justifyContent:'center',
        backgroundColor:'#FFFFFF'
    },

    waitText : {   
        marginTop:20,
        fontSize: 25,
        color: '#04B431',
        fontWeight: 'bold',
        alignSelf:'center'
    },

})