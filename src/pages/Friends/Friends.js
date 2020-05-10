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





export default class Friends extends Component {

    render() {
        return (
            <ImageBackground source={backgroundImage} resizeMode="repeat" style={styles.container}>

                <Text>Friends</Text>



            </ImageBackground>
        )
    }

}