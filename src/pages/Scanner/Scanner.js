import React, { Component } from 'react'
import { View, Text, Image, TouchableOpacity, Modal, ToastAndroid } from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner'

export default class Scanner extends Component {

    render() {
        return (
            <View style={{backgroundColor: "#cc4", flex: 1}}>
                <Text>
                    Comanda
                </Text>

                <QRCodeScanner
                    onRead={(e) => { this.props.navigation.replace("Comanda") }}

                    topContent={
                        <Text>
                            OLA
                        </Text>
                    }
                    bottomContent={
                        <TouchableOpacity>
                            <Text >Ola em baixo</Text>
                        </TouchableOpacity>
                    }
                />

            </View>
        )
    }

}
