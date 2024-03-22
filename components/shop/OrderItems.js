import { StyleSheet, Text, View, Button } from 'react-native'
import React, { useState } from 'react'

const OrderItems = (props) => {

    console.log(props)
    

    const [showDetails, setShowDetails] = useState(false)

    return (
        <View style={styles.screen}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Text style={{ fontFamily: 'Quando-Regular', color: 'orange' }}> $ {props.amount.toFixed(2)}</Text>
                <Text>{props.date.toString()}</Text>


            </View>

            <View style={{ marginVertical: 10, alignItems: 'center' }}>
                <Button style={{ justifyContent: 'center' }}
                    title={showDetails?'Hide Details':'More Details'}
                    onPress={() => {
                        setShowDetails(prevState => !prevState)
                    }}
                />

                {showDetails && <View style={{ width: '100%' }}>

                    {props.items.map(cartItem =>

                        <View style={styles.container} key={cartItem.productId}>
                
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', flex: 1 }}>
                                
                                    <Text>{cartItem.quantity}</Text>
                                    <Text>{cartItem.sum.toFixed(2)}</Text>
                                    <Text>{cartItem.productTitle}</Text>
                            </View>

                        </View>

                    )}

                </View>}


            </View>


        </View>
    )
}



const styles = StyleSheet.create({

    screen: {
        elevation: 5,
        borderRadius: 5,
        borderColor: 'red',
        // height: 90,
        marginHorizontal: 20,
        marginVertical: 10,
        padding: 20,
        overflow: 'hidden',
        backgroundColor: 'white',
        justifyContent: 'space-between',
        // alignItems:'center'
    },

    container: {
        // elevation: 5,
        borderRadius: 5,
        height: 80,
        marginHorizontal: 20,
        marginVertical: 7,
        padding: 20,
        backgroundColor: 'white',
        flexDirection: 'row',
        // justifyContent: 'space-between',
        alignItems: 'center',
    }


})

export default OrderItems