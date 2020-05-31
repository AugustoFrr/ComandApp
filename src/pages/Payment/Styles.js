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

    header:{
        flex: 2,
        width: "100%",
        backgroundColor: Colors.primary,
        justifyContent: 'flex-end',
        alignItems: 'center',
        borderBottomEndRadius: 10,
        borderBottomStartRadius: 10,
        padding: 20

    
    },

    textTitulo:{
        fontSize: 30,
        fontFamily: 'Century Gothic',
        color: "#fff",
        textAlign: 'center',
    },

    valor: {
        flex: 3,
        width: "100%",
        justifyContent: 'center',
        alignItems: 'center'
    },

    textValor:{
        fontSize: 60,
        fontFamily: 'Century Gothic',
        color: Colors.primary
    },

    textReais:{
        fontSize: 45,
        fontFamily: 'Century Gothic',
        color: Colors.green
    },
    textInfo:{
        fontSize: 18,
        textAlign: 'center',
        margin: 20,
        fontFamily: 'Century Gothic',
        color: Colors.primary
    },

    textBotao:{
        fontSize: 16,
        textAlign: 'center',
        fontFamily: 'Century Gothic',
        color: "#fff"
    },

    botoes:{
        flex: 4,
        width: "100%",
        alignItems: 'center',
        justifyContent: 'center'
    },
    rodape:{
        flex: 1,
        width: "100%",
        backgroundColor: Colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
        borderTopEndRadius: 10,
        borderTopStartRadius: 10,
    },

    rodapeButton:{
        alignItems: 'center',
        justifyContent: 'center',
        width: "40%",
        borderWidth: 1,
        paddingVertical: 10,
        borderColor: Colors.red,
        borderRadius: 20,
        backgroundColor: 'transparent'
    },
    rodapeText: {
        fontSize: 17,
        fontFamily: 'Century Gothic',
        color: Colors.red
    },

    botaoCartao:{
        width: '50%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: 50,
        borderRadius: 10,
        backgroundColor: '#54c7c3',
        
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,

        elevation: 7,
        
    },
})