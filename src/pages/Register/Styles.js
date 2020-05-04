import React from 'react';
import { StyleSheet } from 'react-native';
import Colors from '../../styles/colors'

export default styles = StyleSheet.create({
    container: {
        backgroundColor: '#F6F6F6',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },

    titulo: {
        fontSize: 26,
        fontFamily: "Century Gothic",
        color: "#FFFFFF"
    },

    subTitulo: {
        fontSize: 18,
        fontFamily: "Century Gothic",
        color: "#FFFFFF"

    },

    input: {
        flex: 1,
        paddingTop: 10,
        paddingRight: 10,
        paddingBottom: 10,
        paddingLeft: 0,
        backgroundColor: '#fff',
        color: '#4D4D4D',


    },

    viewInput: {

        
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: 60,
        backgroundColor: '#fff',
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,

        elevation: 7,
    },

    iconInput: {
        padding: 10
    },

    btnCadastrar: {
        backgroundColor: Colors.primary,
        width: "70%",
        height: 50,
        justifyContent: "center",
        borderRadius: 10,


    },

    btnCadastrarText: {
        fontSize: 22,
        color: "#FFFFFF",
        fontFamily: "Century Gothic",
        alignSelf: "center"
    },

})