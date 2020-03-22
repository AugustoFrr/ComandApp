import React, { Component } from 'react';

import { View, Text, Image, ToastAndroid } from 'react-native';
import firebaseApp from '../../FirebaseConnection'
import styles from './Styles'

export default class Splash extends Component {

    componentDidMount() {
        setTimeout(() => {
            const unsubscribe = firebaseApp.auth().onAuthStateChanged(async (user) => {
                if (user) {

                    if (user.emailVerified) {
                        await firebaseApp.database().ref("Users").child(user.uid).child("Email").set(user.email);                       
                        this.props.navigation.replace("Main")
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

    render() {
        return (
            <View style={styles.background}>
                <Text style={styles.texto}>SPLASH</Text>

            </View>
        )
    }
}