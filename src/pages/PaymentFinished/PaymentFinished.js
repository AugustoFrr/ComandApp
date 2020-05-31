import React, { Component } from 'react'
import { View, Text, Image, TouchableOpacity, Modal, ToastAndroid, ImageBackground, Dimensions, FlatList, Animated } from 'react-native';
import firebaseApp from '../../FirebaseConnection';
import QRCode from 'react-native-qrcode-svg'
import styles from './Styles'
import Colors from '../../styles/colors'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

const backgroundImage = require("../../img/background-dark.png")

const comandico = require("../../img/white-comandico.png")




export default class PaymentFinished extends Component {


    render() {
        return (
            <ImageBackground source={backgroundImage} resizeMode="repeat" style={styles.container}>
                <View style={{ flex: 2, width: "100%", justifyContent: "flex-end", alignItems: "center", paddingHorizontal: 10 }}>

                    <Text style={styles.titulo}>Pagamento Aprovado!</Text>
                    <Text style={styles.subTitulo}>Apresente esse QRCode ao deixar o estabelecimento :)</Text>
                </View>

                <View style={{ flex: 4, margin: 20, width: "100%", justifyContent: "center", alignItems: "center", backgroundColor: 'rgba(255,255,255, 0.3)' }}>

                    <QRCode value={"Comanda1-Closed"} size={Dimensions.get('window').width * 0.7}
                        logo={comandico} logoSize={Dimensions.get('window').width * 0.09}
                        logoBackgroundColor='black' />
                </View>


                <View style={{ flex: 2, width: "100%", justifyContent: "flex-start", alignItems: "center" }}>

                    <Text style={styles.subTitulo}>Obrigado por utilizar os serviços ComandApp!</Text>

                    <TouchableOpacity style={styles.rodapeButton} onPress={() => {
                        this.props.navigation.reset({
                            index: 0,
                            routes: [{ name: "Main" }],
                        });
                    }}>
                        <Text style={styles.rodapeText}>Sair</Text>
                    </TouchableOpacity>
                </View>

            </ImageBackground>

        )
    }


}