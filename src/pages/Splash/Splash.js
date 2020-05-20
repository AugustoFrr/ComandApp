import React, { Component } from 'react';

import { View, Text, Image, ToastAndroid, ImageBackground, Animated, Dimensions } from 'react-native';
import firebaseApp from '../../FirebaseConnection'
import styles from './Styles'
const comandico = require("../../img/comandico.png")
const backgroundImage = require("../../img/background.png")

export default class Splash extends Component {

    componentDidMount() {
        this.startLogoAnimation()
        setTimeout(() => {
            const unsubscribe = firebaseApp.auth().onAuthStateChanged(async (user) => {
                if (user) {

                    if (user.emailVerified) {
                        this.props.navigation.replace("Main", {screen: "Home"})
                    } else {
                        this.props.navigation.replace("EmailVerification")
                    }
                } else {
                    this.props.navigation.replace("Login");
                }
                unsubscribe()
            })

        }, 2000)
    }


    state = {
        scaleValue: new Animated.Value(0),

    }

    scale = this.state.scaleValue.interpolate({
        inputRange: [0, 1, 2],
        outputRange: [1, 0.6, 1]

    })



    startLogoAnimation = () => {
        Animated.loop(
            Animated.timing(this.state.scaleValue, {
                
                toValue: 2,
                duration: 1000,
                useNativeDriver: true
            }),

            

        ).start()
    }

    

    render() {
        return (
            <ImageBackground source={backgroundImage} style={styles.container} resizeMode="repeat">

                <Animated.View style={[styles.viewLogo ]}>
                    <Animated.Image source={comandico} style={[styles.imageStyle, { transform: [{ scale: this.scale }]}]} />
                
                </Animated.View>




            </ImageBackground>
        )
    }
}