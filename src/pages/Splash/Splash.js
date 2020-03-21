import React, { Component } from 'react';

import { View, Text, Image, ToastAndroid } from 'react-native';
import firebaseApp from '../../FirebaseConnection'
import styles from './Styles'

export default class Splash extends Component {

    componentDidMount() {
        setTimeout(() => {
            const unsubscribe = firebaseApp.auth().onAuthStateChanged((user) => {
                if (user) {

                    if (user.emailVerified) {
                        this.props.navigation.replace("Main")
                    } else {
                        this.props.navigation.replace("EmailVerification")
                    }
                } else {
                    this.props.navigation.replace("Login");
                }
                unsubscribe()
            })

        }, 1000)
    }

    render() {
        return (
            <View style={styles.background}>
                <Text style={styles.texto}>SPLASH</Text>

            </View>
        )
    }
}