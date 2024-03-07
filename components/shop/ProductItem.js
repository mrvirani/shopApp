import { Button, Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'

import MainButton from '../MainButton'

const ProductItem = (props) => {
    return (
        <View style={styles.product}>
            <Image style={styles.image} source={{ uri: props.image }} />

            <View style={styles.details}>
                <Text style={styles.title}>{props.title}</Text>
                <Text style={styles.price}>{props.price}</Text>
            </View>

            <View style={styles.row}>



                <MainButton style={{backgroundColor:'green'}}>
                    Details Screen
                </MainButton>

                <MainButton style={{backgroundColor:'orange'}}>
                    Add to Cart
                </MainButton>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({

    product: {

        elevation: 5,
        borderRadius: 5,
        borderColor: 'red',
        height: 300,
        margin: 20,
        overflow: 'hidden',
        backgroundColor: 'white'

    },

    image: {
        width: '100%',
        height: '60%',


    },

    details: {
        alignItems: 'center',
        height: '20%',
        marginTop: 10

    },

    title: {
        fontSize: 20,
        color: 'black'

    },

    price: {
        fontSize: 14,

    },

    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '10%',
        marginHorizontal: 12
    },

    btn1: {
        backgroundColor: 'red',
        width: 120,
        height: 40
    },

    bt1Text: {
        alignItems: 'center',
        justifyContent: 'center'
    },

    btn2: {
        backgroundColor: 'orange',
        width: 120,
        height: 40
    },

    btn2Text: {
        alignItems: 'center',
        justifyContent: 'center'
    }


})

export default ProductItem