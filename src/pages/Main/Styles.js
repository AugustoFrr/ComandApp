import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import Colors from '../../styles/colors'


export default styles = StyleSheet.create({

    comandicoImage:{
        width: 100,
        height: 70,
        
    },
    scanImage: {
        
        flex: 1,
        width: "100%",
        alignSelf: 'center',
        
        
    },

    container: {
        backgroundColor: '#F6F6F6',
        flex: 1,
        width: "100%",
        alignItems: 'center',
        height: Dimensions.get('window').height
        
    },
    header:{
        width: "90%",
        
        flex: 2,
        
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },

    logo:{
        flexDirection: 'row',
        alignItems: "center",
        
    },

    helpIcon:{
              

    },

    scanView:{
        flex: 2,
        
        alignSelf: "center",
        justifyContent: "center",
        width: "90%",
        
        
        
    },

    scanContainer:{
        flex: 4,
        borderRadius: 20,
        alignSelf: "center",
        justifyContent: "center",
        width: "90%",
        
        padding: 15,
        backgroundColor: "#FFF",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,

        elevation: 7,
    }

})