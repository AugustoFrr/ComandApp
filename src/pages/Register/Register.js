import React, { Component } from 'react';

import { View, Text, Image, TouchableOpacity, TextInput, ToastAndroid, ImageBackground, Keyboard } from 'react-native';
import firebaseApp from '../../FirebaseConnection'
import styles from './Styles'
import Icon from 'react-native-vector-icons/SimpleLineIcons'
import Colors from '../../styles/colors'
const backgroundImage = require("../../img/background.png")
const comandico = require("../../img/Comandico.png")



export default class Register extends Component {

    componentDidMount() {
        this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this.keyboardDidShow);
        this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this.keyboardDidHide);
    }

    keyboardDidShow = () => {
        this.setState({ showHeader: false })
    }

    keyboardDidHide = () => { this.setState({ showHeader: true }) }



    componentWillUnmount() {
        this.keyboardDidShowListener.remove();
        this.keyboardDidHideListener.remove();
    }


    register() {
        firebaseApp.auth().createUserWithEmailAndPassword(this.state.email.trim(), this.state.password.trim()).then(() => {
            firebaseApp.auth().currentUser.sendEmailVerification();
            firebaseApp.database().ref("Users").child(firebaseApp.auth().currentUser.uid).set({ Name: (this.state.name).trim(), IncompleteProfile: true })


            this.props.navigation.reset({ index: 0, routes: [{ name: "EmailVerification" }] });

        }).catch((error) => {
            let errorMessage = "";
            switch (error.code) {
                case "auth/email-already-in-use":
                    errorMessage = "O e-mail inserido já está em uso!"
                    break;
                case "auth/invalid-email":
                    errorMessage = "O e-mail inserido não é válido!"
                    break;
                case "auth/operation-not-allowed":
                    errorMessage = "Ocorreu um erro interno, tente novamente em alguns instantes!"
                    break;
                case "auth/weak-password":
                    errorMessage = "A senha deve conter no mínimo 6 caracteres!"
                    break;
                default:
                    errorMessage = "Parece que temos um problema interno, tente novamente em alguns instantes!"
            }

            ToastAndroid.show(errorMessage, ToastAndroid.LONG)
        })
    }

    state = {
        name: "",
        email: "",
        password: "",
        showHeader: true

    }

    render() {
        return (
            <ImageBackground source={backgroundImage} resizeMode="repeat" style={styles.container}>

                {this.state.showHeader ?
                    <>
                    <View style={{ flex: 1 }}>

                    </View>

                    <View style={{
                        flex: 1, alignItems: "center", justifyContent: "center", padding: 15, width: "100%",
                        backgroundColor: Colors.primary,
                        }}>

                        
                        <Text style={styles.titulo}>
                            Junte-se a nós,
                        </Text>

                        <Text style={styles.subTitulo}>
                            e descubra uma nova forma de consumir!
                        </Text>


                    </View></> :

                    <View>
                        <Text style={{ fontSize: 20, fontFamily: "Century Gothic", marginTop: 25 }}>ComandApp</Text>
                    </View>}

                <View style={{ flex: 3, width: "90%", justifyContent: "center" }}>


                    <View style={styles.viewInput}>
                        <Icon style={styles.iconInput} name="user" size={20} color={Colors.OutText} />
                        <TextInput style={styles.input} placeholder="Nome Completo" onChangeText={name => this.setState({ name })} />

                    </View>

                    <View style={styles.viewInput}>
                        <Icon style={styles.iconInput} name="envelope" size={20} color={Colors.OutText} />
                        <TextInput style={styles.input} keyboardType="email-address" placeholder="E-mail" onChangeText={email => this.setState({ email })} />

                    </View>

                    <View style={styles.viewInput}>
                        <Icon style={styles.iconInput} name="lock" size={20} color={Colors.OutText} />
                        <TextInput style={styles.input} secureTextEntry={true} placeholder="Senha" onChangeText={password => this.setState({ password })} />

                    </View>




                </View>

                <View style={{ flex: 1, width: "90%", alignItems: "center" }}>

                    <TouchableOpacity style={styles.btnCadastrar} onPress={() => this.register()}>
                        <Text style={styles.btnCadastrarText}>
                            Cadastrar
                        </Text>
                    </TouchableOpacity>
                </View>

            </ImageBackground>
        )
    }
}