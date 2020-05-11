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

    scrollContainer: {
        flex: 1,
        width: "100%",
        alignItems: 'center',
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
    input: {
        flex: 1,
        paddingTop: 10,
        paddingRight: 10,
        paddingBottom: 10,
        paddingLeft: 0,
        color: '#4D4D4D',


    },

    btnDisconnectText: {
        fontSize: 21,
        fontFamily: 'Century Gothic',
        color: Colors.red,
        

    },

    btnDisconnect:{
        height: 50,
        justifyContent: "center",
        borderRadius: 10,
        width: '60%',
        alignItems: 'center',
        

        borderColor: Colors.red,
        borderWidth: 2

    },

    titulo: {
        fontSize: 20,
        fontFamily: "Century Gothic",
        color: Colors.OutText,

    },

    subTitulo: {
        fontSize: 16,
        fontFamily: "Century Gothic",
        color: Colors.OutText,


    },

    cardView:{
        width: "100%",
        marginTop: 10, 
        flex: 1,
        alignItems: 'center',
        borderBottomColor: "#FFFFFF",
        justifyContent: 'center',
        backgroundColor: Colors.primary,
        borderWidth: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 15,
        paddingRight: 15,


    },

    cardViewDone:{
        width: "100%",
        marginTop: 10, 
        flex: 1,
        alignItems: 'center',
        borderBottomColor: "#FFFFFF",
        justifyContent: 'center',
        backgroundColor: Colors.green,
        
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 15,
        paddingRight: 15,


    },

    cardText:{
        fontSize: 16,
        fontFamily: "Century Gothic",
        color: "#FFFFFF",
    }


})