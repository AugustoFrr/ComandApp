import React, { Component } from 'react';

import { View, Text, Image, TouchableOpacity, Modal, ToastAndroid } from 'react-native';
import firebaseApp from '../../FirebaseConnection';



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

    logout() {
        firebaseApp.auth().signOut().then(() => {
            this.props.navigation.replace("Login")
        })

    }

    render() {
        return (
            <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
                <Text>MAIN</Text>

                <TouchableOpacity onPress={() => this.props.navigation.navigate("Profile")}>
                    <Text>
                        Perfil
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={()=>{this.props.navigation.navigate("Comanda") }}>
                    <Text>
                        Entrar no restaurante...
                    </Text>
                </TouchableOpacity>


                <TouchableOpacity onPress={() => this.logout()}>
                    <Text>
                        Sair
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }
}