import React, { Component } from 'react';

import { View, Text, Image, TouchableOpacity, Modal, ToastAndroid, ImageBackground, Animated, Dimensions } from 'react-native';
import firebaseApp from '../../FirebaseConnection';
import Colors from '../../styles/colors'
const backgroundImage = require("../../img/background.png")
const comandico = require("../../img/white-comandico.png")
import styles from "./Styles"
import QRCode from 'react-native-qrcode-svg'
import Icon from 'react-native-vector-icons/FontAwesome5'
import Icon2 from 'react-native-vector-icons/SimpleLineIcons'





export default class MainUserQR extends Component {

    componentDidMount() {
        this.borderAnimation()
    }

    state = {
        borderColorValue: new Animated.Value(0)
    }

    borderColor = this.state.borderColorValue.interpolate({
        inputRange: [0, 1, 2],
        outputRange: ['rgba(0, 204, 255, 0.1)', 'rgba(0, 204, 255, 0.6)', 'rgba(0, 204, 255, 0.1)']
    })

    borderAnimation = () => {
        Animated.loop(
            Animated.timing(this.state.borderColorValue, {
                duration: 1000,
                toValue: 2,

            })
        ).start()
    }

    logout() {
        firebaseApp.auth().signOut().then(() => {
            this.props.navigation.replace("Login")
        })

    }

    generateCode = () => {
        const uid = firebaseApp.auth().currentUser.uid;
        const user = {
            comandApp: '1',
            uid
        }

        return JSON.stringify(user);

    }

    render() {
        return (
            <ImageBackground source={backgroundImage} resizeMode="repeat" style={styles.container}>

                <View style={{ flex: 2, justifyContent: "flex-end", alignItems: "center", width: '90%' }}>
                    <Text style={styles.txtTitulo}>Este é seu código de perfil, apresente-o para um amigo ou funcionário!</Text>
                </View>

                <View style={{ flex: 6, alignItems: "center", justifyContent: 'center', width: "100%" }}>
                    <Animated.View style={[styles.qrContainer, { borderColor: this.borderColor }]}>

                        <QRCode value={this.generateCode()} size={Dimensions.get('window').width * 0.4}
                            logo={comandico} logoSize={Dimensions.get('window').width * 0.09}
                            logoBackgroundColor='black' />
                    </Animated.View>

                </View>


                <View style={styles.cardContainer}>

                    <TouchableOpacity style={styles.perfilContainer} onPress={() => this.props.navigation.navigate("Profile")}>
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-start' }}>
                            <Icon name='user-edit' color={Colors.blue} size={30} />

                        </View>

                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={styles.cardText}>Perfil</Text>
                        </View>


                        <TouchableOpacity style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-end', }}>
                            <Icon2 name='question' color={Colors.primary} size={30} />

                        </TouchableOpacity>

                    </TouchableOpacity>
                </View>


                <View style={styles.cardContainer}>
                    <TouchableOpacity style={styles.friendContainer} onPress={() => this.props.navigation.navigate("Friends")}>
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-start' }}>
                            <Icon name='user-friends' color={Colors.blue} size={30} />

                        </View>

                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={styles.cardText}>Amigos</Text>
                        </View>


                        <TouchableOpacity style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-end', }}>
                            <Icon2 name='question' color={Colors.primary} size={30} />

                        </TouchableOpacity>
                    </TouchableOpacity>
                </View>

                <View style={{ flex: 1 }}></View>



            </ImageBackground>
        )
    }

}