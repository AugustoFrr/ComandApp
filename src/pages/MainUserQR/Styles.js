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

    qrContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 3,
        width: Dimensions.get('window').width * 0.7,
        height: Dimensions.get('window').width * 0.7,
        borderRadius: (Dimensions.get('window').width * 0.7) / 2

    },

    qrCode: {

    },

    txtSair: {
        color: Colors.red,
        fontSize: 16,

        borderBottomWidth: 1,
        borderBottomColor: Colors.red
    },

    cardContainer: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 2,
    },

    friendContainer: {
        borderRadius: 20,
        backgroundColor: "#FFFFFF",
        flex: 1,
        width: '70%',
        marginTop: 10,
        marginBottom: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,

        elevation: 7,
        flexDirection: 'row',
        padding: 15
    },

    perfilContainer: {
        borderRadius: 20,
        backgroundColor: "#FFFFFF",
        flex: 1,
        width: '70%',
        marginTop: 10,
        marginBottom: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,

        elevation: 7,
        flexDirection: 'row',
        padding: 15
    },

    txtTitulo:{
        fontSize: 18,
        color: Colors.OutText,
        fontFamily: 'Century Gothic',
        textAlign: 'center'

    },
    cardText:{
        fontSize: 24,
        fontFamily: 'Century Gothic',
        color: Colors.primary
    }
})