import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import Colors from '../../styles/colors'


export default styles = StyleSheet.create({


    container: {
        backgroundColor: '#F6F6F6',
        flex: 1,
        width: "100%",
        alignItems: 'center',
        height: Dimensions.get('window').height

    },



    subContainers: {
        width: "100%",
        justifyContent: "center"
    },
    titulo: {
        fontSize: 26,
        fontFamily: "Century Gothic",
        color: Colors.green,

    },

    subTitulo: {
        fontSize: 16,
        fontFamily: "Century Gothic",
        color: "#fff",
        textAlign: "center"


    },



    containerValidate: {
        width: Dimensions.get('window').width * 0.6,
        height: Dimensions.get('window').width * 0.6,
        borderRadius: Dimensions.get('window').width * 0.6 / 2,
        justifyContent: "center",
        alignItems: "center"
    },

    rodapeButton: {
        marginTop: 30,
        alignItems: 'center',
        justifyContent: 'center',
        width: "40%",
        borderWidth: 1,
        paddingVertical: 10,
        borderColor: Colors.green,
        borderRadius: 20,
        backgroundColor: 'transparent'
    },
    rodapeText: {
        fontSize: 17,
        fontFamily: 'Century Gothic',
        color: Colors.green
    },
})