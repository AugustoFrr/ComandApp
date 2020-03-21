import React, { Component } from 'react';

import { View, Text, Image, TouchableOpacity, Modal, ToastAndroid, BackHandler } from 'react-native';
import firebaseApp from '../../FirebaseConnection';

export default class EmailVerification extends Component {

    componentDidMount() {
        this.confirmVerification()

    }

    async confirmVerification() {
        let user = firebaseApp.auth().currentUser;

        if (user) {

            await user.reload();
            if (user.emailVerified) {
                this.props.navigation.replace("Main")
            } else {
                ToastAndroid.show("Ops, parece que seu e-mail ainda não foi validado, verifique sua caixa de entrada!", ToastAndroid.LONG);
            }
        }
    }

    logout() {
        firebaseApp.auth().signOut().then(() => {
            this.props.navigation.replace("Login")
        })

    }
    resendEmail() {
        firebaseApp.auth().currentUser.sendEmailVerification()
        .then(()=>{
            ToastAndroid.show("Enviamos um novo email!", ToastAndroid.LONG)
        })
        .catch ((error)=>{
            if(error.code = "auth/too-many-requests"){
                ToastAndroid.show("Espere alguns instantes para fazer uma nova requisição", ToastAndroid.LONG)
            }
        })
    }

    render() {
        return (
            <View>
                <Text>Email Verification</Text>
                <TouchableOpacity onPress={() => { this.confirmVerification() }}>
                    <Text>
                        Já verifiquei
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => this.resendEmail()}>
                    <Text>
                        Reenviar E-mail
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => { this.logout() }}>
                    <Text>
                        Sair
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }
}