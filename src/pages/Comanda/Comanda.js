import React, { Component } from 'react'
import { View, Text, Image, TouchableOpacity, Modal, ToastAndroid } from 'react-native';
import firebaseApp from '../../FirebaseConnection';
import QRCode from 'react-native-qrcode-svg'
import QRCodeScanner from 'react-native-qrcode-scanner'

const logo = require('../../img/comandico.png')

export default class Comanda extends Component {

    render() {
        return (
            <View>
                <Text>
                    Comanda
                </Text>

                <QRCodeScanner
                    onRead={()=>{ToastAndroid.show("QRCode Lido!", ToastAndroid.LONG)}}
                    
                    topContent={
                        <Text style={styles.centerText}>
                            Go to{' '}
                            <Text style={styles.textBold}>wikipedia.org/wiki/QR_code</Text> on
                        your computer and scan the QR code.
                      </Text>
                    }
                    bottomContent={
                        <TouchableOpacity style={styles.buttonTouchable}>
                            <Text style={styles.buttonText}>OK. Got it!</Text>
                        </TouchableOpacity>
                    }
                />

            </View>
        )
    }

}
