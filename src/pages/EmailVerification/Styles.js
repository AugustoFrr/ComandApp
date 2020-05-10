import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import Colors from '../../styles/colors'

export default styles = StyleSheet.create({
    container: {
        backgroundColor: '#F6F6F6',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height: Dimensions.get('window').height
    },

    subContainers: {
        width: "100%",
        justifyContent: "center"
    },
    titulo: {
        fontSize: 26,
        fontFamily: "Century Gothic",
        color: Colors.OutText,

    },

    subTitulo: {
        fontSize: 16,
        fontFamily: "Century Gothic",
        color: Colors.OutText,
        textAlign: "center"


    },

    btnReenviar: {
        backgroundColor: Colors.primary,
        width: "50%",
        height: 40,
        justifyContent: "center",
        borderRadius: 10,


    },

    btnReenviarText: {
        fontSize: 20,
        color: "#FFFFFF",
        fontFamily: "Century Gothic",
        alignSelf: "center"
    },

    imageStyle: {
        width: Dimensions.get('window').width * 0.3,
        height: Dimensions.get('window').width * 0.3
    },

    containerValidate: {
        width: Dimensions.get('window').width * 0.6,
        height: Dimensions.get('window').width * 0.6,
        borderRadius: Dimensions.get('window').width * 0.6 / 2,
        justifyContent: "center",
        alignItems: "center"
    },

    validateText: {
        fontSize: 20,
        color: Colors.primary,
        fontFamily: "Century Gothic",
        alignSelf: "center"
    }




})