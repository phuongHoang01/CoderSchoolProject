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
import { createAppContainer, NavigationActions } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { IconToggle } from 'react-native-material-ui/src/'

const { width, height } = Dimensions.get('window')
export default class home extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            progress : this.props.currentProgress
        }
    }
    render() {
        return (

            <ImageBackground resizeMode='stretch' style={styles.container} source={require('./assets/77121420_549453845618839_2376841142193881088_n.png')}>
                <View style={styles.header}>

                </View>
                <View style={styles.body}>
                    <View style={styles.swaggerChild}>
                        <Text style={styles.title}>Developer Circles Vietnam</Text>
                        <Text style={styles.title}>Innovation Chanllenge</Text>

                        <View style={styles.featureSwagger}>
                            <ScrollView>
                            <TouchableOpacity style={styles.feature}
                                onPress={this.props.onPress}
                            >
                                <View style={styles.swaggerDetail}>
                                    <Text style={styles.featureTitle}>Fraud</Text>
                                    <Text style={styles.featureTitle}>Detections</Text>
                                    <View style={styles.featureProcessing}>
                                        <View style={[styles.featureInProcessing,{width:this.state.progress,}]}>
                                        </View>
                                    </View>
                                    <Text style={{color:"#296c5b",fontSize:18,marginTop:10}}>{this.state.progress} complete</Text>
                                </View>

                                <View style={styles.featureImage}>
                                    <Image
                                        style={{width:"100%",height:"100%"}}
                                        source={require("./assets/scan_1_2000_x.png")}
                                    />
                                </View>
                            </TouchableOpacity>

                            <View style={[styles.feature,{opacity:0.8}]}>
                                <View style={styles.swaggerDetail}>
                                    <Text style={styles.featureTitle}>Comming</Text>
                                    <Text style={styles.featureTitle}>soon</Text>
                                    <View style={styles.featureProcessing}>
                                        <View style={[styles.featureInProcessing,{width:0}]}>
                                        </View>
                                    </View>
                                    <Text style={{color:"#296c5b",fontSize:18,marginTop:10}}>0% complete</Text>
                                </View>

                                <View style={styles.featureImage}>
                                    <Image
                                        style={{width:"100%",height:"100%"}}
                                        source={require("./assets/group_2000_x.png")}
                                    />
                                </View>
                            </View>

                            <View style={[styles.feature,{opacity:0.8}]}>
                                <View style={styles.swaggerDetail}>
                                    <Text style={styles.featureTitle}>Comming</Text>
                                    <Text style={styles.featureTitle}>soon</Text>
                                    <View style={styles.featureProcessing}>
                                        <View style={[styles.featureInProcessing,{width:0,}]}>
                                        </View>
                                    </View>
                                    <Text style={{color:"#296c5b",fontSize:18,marginTop:10}}>0% complete</Text>
                                </View>

                                <View style={styles.featureImage}>
                                    <Image
                                        style={{width:"100%",height:"100%"}}
                                        source={require("./assets/group_2000_x.png")}
                                    />
                                </View>
                            </View>

                            </ScrollView>
                        </View>
                    </View>
                </View>
            </ImageBackground>

        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },

    header: {
        flex: 0.2
    },

    body: {
        flex: 0.5,
        width,
        height,
    },

    title: {
        color: '#f0faf6',
        fontSize: 25,
        fontWeight: '700',
        lineHeight: 35
    },

    swaggerChild: {
        marginLeft: 35,
        marginRight: 35,
        alignItems: 'center'
    },

    featureSwagger: {
        marginTop:10,
        width: "100%",
        height: "100%",
    },

    feature: {
        width: "100%",
        height: 160,
        backgroundColor: '#f0f6e8',
        borderRadius: 7,
        flexDirection:'row',
        marginTop: 20,
        
    },

    swaggerDetail: {
        width:"50%",
        marginLeft: 35,
        marginTop: 22,
    },

    featureTitle: {
        color: '#296c5b',
        fontWeight: '700',
        fontSize: 20,
        lineHeight: 30
    },

    featureProcessing : {
        position:'relative',
        marginTop:20,
        width: 160,
        height:1.6,
        borderWidth:0.2,
    },

    featureInProcessing : {
       position:'absolute', 
       backgroundColor:'#296c5b',
       height:"100%"
    },

    featureImage : {
        height:"100%",
        width:"40%",
    }



})
