import React, { Component } from 'react';

import { View, Text, Image, TouchableOpacity, Modal, ToastAndroid } from 'react-native';
import firebaseApp from '../../FirebaseConnection';



export default class MainSearch extends Component {

    render(){
        return (
            <View>
                <Text>MAIN SEARCH</Text>
                <TouchableOpacity onPress={()=>{this.props.navigation.navigate("TabRoutes", {screen: "Comanda"}) }}>
                    <Text>
                        ENTRAR
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }

}