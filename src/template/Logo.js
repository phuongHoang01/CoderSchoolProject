import React, { Component } from 'react'
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
    Image,
    TouchableOpacity
  } from 'react-native';

export default class Logo extends React.Component {
    render() {
        return (
        <View style={styles.container}>
          <Image
            resizeMode="cover"
            style={styles.Image}
            source={{ uri: 'https://fecredit.com.vn/wp-content/uploads/2016/11/FACEBOOK-FE-CREDIT.png' }}
          />
        </View>
        )
    }
}

const styles = StyleSheet.create({
    Image : {
        resizeMode: 'cover',
        width: 300,
        height: 50,
    },

    container : {
        flex: 1,
        flexDirection: 'row', 
        justifyContent: 'center', 
        
    }
})
