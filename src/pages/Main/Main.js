import React, { Component } from 'react';

import { View, Text, Image, TouchableOpacity, Modal, ToastAndroid, ImageBackground } from 'react-native';
import firebaseApp from '../../FirebaseConnection';
import Icon from 'react-native-vector-icons/SimpleLineIcons'
const comandico = require("../../img/comandico.png")
const backgroundImage = require("../../img/background.png")
const scanner = require("../../img/scan_qrcode.png")

import styles from "./Styles"
import Colors from "../../styles/colors";





export default class Main extends Component {

    componentDidMount() {
        let usersRef = firebaseApp.database().ref("Users");
        usersRef.child(firebaseApp.auth().currentUser.uid).child("IncompleteProfile").once("value", (snapshot) => {
            if (snapshot.val()) {
                ToastAndroid.show("Complete seu perfil para utilizar nossos serviços!", ToastAndroid.LONG)
            }
        })

        this.userValidation()

    }

    async userValidation() {
        const validationInterval = setInterval(() => {
            if (firebaseApp.auth().currentUser != null) {
                firebaseApp.auth().currentUser.reload().then(() => {
                    // ToastAndroid.show("reloading " + firebaseApp.auth().currentUser.email, ToastAndroid.LONG)
                }).catch((error) => {
                    if (error.code == "auth/user-token-expired") {
                        firebaseApp.auth().signOut().then(() => {
                            ToastAndroid.show("Faça login novamente!", ToastAndroid.LONG)
                            this.props.navigation.reset({ index: 0, routes: [{ name: "Login" }] });
                            clearInterval(validationInterval)
                        })
                    }
                })
            } else {
                clearInterval(validationInterval)
            }
        }, 30000)
    }

    

    render() {
        return (
            <ImageBackground source={backgroundImage} resizeMode="repeat" style={styles.container}>



                <View style={{ marginTop: 25, flex: 2, alignItems: "center", justifyContent: "center" }}>

                    <Image source={comandico} style={{ width: 100, height: 70 }} />
                    <Text style={{ fontSize: 20, fontFamily: "Century Gothic" }}>ComandApp</Text>

                </View>



                <View style={styles.scanContainer} >
                    <TouchableOpacity style={{ alignSelf: "flex-end" }}>
                        <Icon name="question" size={25} color={Colors.primary} />

                    </TouchableOpacity>

                    <View style={styles.scanView}>
                        <TouchableOpacity style={{ flex: 1 }} onPress={() => { this.props.navigation.navigate("Scanner") }}>
                            <ImageBackground source={scanner} resizeMode="center" style={styles.scanImage}> 
                                
                            </ImageBackground>

                            <Text style={{ marginTop: 15, fontSize: 18, textAlign: "center", fontFamily: "Century Gothic", color: Colors.primary }}>
                                Clique para escanear o QRCode de uma mesa ou amigo!
                            </Text>
                        </TouchableOpacity>
                    </View>




                </View>

                <View style={{ flex: 1 }}></View>






            </ImageBackground>
        )
    }
}