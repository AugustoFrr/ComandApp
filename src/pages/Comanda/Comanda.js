import React, { Component } from 'react'
import { View, Text, Image, TouchableOpacity, Modal, ToastAndroid } from 'react-native';
import firebaseApp from '../../FirebaseConnection';
import QRCode from 'react-native-qrcode-svg'
import QRCodeScanner from 'react-native-qrcode-scanner'

const logo = require('../../img/Comandico.png')

export default class Comanda extends Component {

    render() {
        return (
            <View style={{backgroundColor: "#cc4", flex: 1}}>
                <Text>
                    Comanda
                </Text>

                <QRCode value={"Bem vindo ao comandapp"} size={200} 
                logo={logo} logoSize={30}
                logoBackgroundColor='black'/>

            </View>
        )
    }

}
