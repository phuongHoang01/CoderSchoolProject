import React, { Component } from 'react'
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
  } from 'react-native';


export default class Title extends React.Component {
    render() {
        return (
           <View style={styles.container}>
               <Text style={styles.titleText}>
                    {this.props.title}
               </Text>
           </View>
        )
    }
}

const styles = StyleSheet.create({
    container : {
        flex: 0.1,
        backgroundColor:'#04B431',
        justifyContent:'center',
        alignItems : 'center'
    },

    titleText : {
        color : "white",
        fontSize: 30
        
    }

    

    
})
