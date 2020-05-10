import React, { Component } from 'react';

import { View, Text, Image, Easing, TouchableOpacity, Animated, Modal, ToastAndroid, BackHandler, ImageBackground } from 'react-native';
import firebaseApp from '../../FirebaseConnection';
import styles from './Styles'
const backgroundImage = require("../../img/background.png")
const comandico = require("../../img/comandico.png")
import Colors from '../../styles/colors'
const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);



export default class EmailVerification extends Component {

    state = {
        spinValue: new Animated.Value(0),
        bgColorValue: new Animated.Value(0)
    }


    spin = this.state.spinValue.interpolate({
        inputRange: [0, 1, 2, 3, 4],
        outputRange: ['0deg', '15deg', '0deg', '-15deg', '0deg']
    })

    bgColor = this.state.bgColorValue.interpolate({
        inputRange: [0, 1, 2],
        outputRange: ["rgba(57, 255, 20, 0.1)", "rgba(57, 255, 20, 0.3)", "rgba(57, 255, 20, 0.1)"]
    })

    startLogoAnimation = () => {

        Animated.loop(

            Animated.timing(this.state.spinValue, {

                toValue: 4,
                duration: 100,
                useNativeDriver: true,
                easing: Easing.bounce
            }), { iterations: 3 }
        ).start(this.state.spinValue.setValue(0))

    }

    startBGAnimation = () => {

        Animated.loop(

            Animated.timing(this.state.bgColorValue, {

                toValue: 2,
                duration: 2000,
            }), 
        ).start(this.state.spinValue.setValue(0))

    }


    componentDidMount() {
        this.confirmVerification()
        this.startBGAnimation()
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
            .then(() => {
                ToastAndroid.show("Enviamos um novo email!", ToastAndroid.LONG)
            })
            .catch((error) => {
                if (error.code = "auth/too-many-requests") {
                    ToastAndroid.show("Espere alguns instantes para fazer uma nova requisição", ToastAndroid.LONG)
                }
            })
    }

    render() {
        return (
            <ImageBackground source={backgroundImage} style={styles.container} resizeMode="repeat">
                <View style={{ flex: 2, width: "100%", justifyContent: "flex-end", alignItems: "center" }}>

                    <Text style={styles.titulo}>Verificação de E-mail</Text>
                    <Text style={styles.subTitulo}>Clique no link que enviamos ao seu e-mail para validá-lo :)</Text>
                </View>

                <View style={{ flex: 4, width: "100%", justifyContent: "center", alignItems: "center" }}>

                    <TouchableOpacity  onPress={() => { this.startLogoAnimation(), this.confirmVerification() }}>
                        <Animated.View style={[styles.containerValidate, {backgroundColor: this.bgColor}]} >
                            <Animated.Image style={[styles.imageStyle, {transform: [{ rotate: this.spin },]
                            }]} source={comandico}>

                            </Animated.Image>

                            <Text style={styles.validateText}>
                                Já verifiquei!
                        </Text>
                        </Animated.View>
                    </TouchableOpacity>



                </View>

                <View style={{ flex: 2, width: "100%", justifyContent: "center", alignItems: "center" }}>

                    <TouchableOpacity style={styles.btnReenviar} onPress={() => this.resendEmail()}>
                        <Text style={styles.btnReenviarText}>
                            Reenviar E-mail
                        </Text>
                    </TouchableOpacity>
                </View>

                <View style={{ flex: 1, width: "100%", justifyContent: "center", alignItems: "center" }}>

                    <TouchableOpacity onPress={() => { this.logout() }}>
                        <Text style={styles.subTitulo, { borderBottomColor: Colors.primary, borderBottomWidth: 1, fontSize: 18 }}>
                            Sair
                        </Text>
                    </TouchableOpacity>
                </View>

            </ImageBackground>
        )
    }
}