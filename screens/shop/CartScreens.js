import { StyleSheet, Text, View, Button, Image, TouchableOpacity, ToastAndroid, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { FlatList } from 'react-native-gesture-handler'
import { useDispatch, useSelector } from 'react-redux'
import MainButton from '../../components/MainButton'

import * as mainReducer from '../../store/actions/cart'
import * as ordersActions from '../../store/actions/order'

const CartScreens = (props) => {


  const [isLoading, setIsLoading] = useState(false)

  const cartTotalAmount = useSelector(state => state.cart.TotalAmount)

  // console.log(cartTotalAmount)

  const cartItems = useSelector(state => {

    const transformedCartItems = []

    for (const key in state.cart.items) {
      transformedCartItems.push({
        productId: key,
        productImage: state.cart.items[key].productImage,
        productTitle: state.cart.items[key].productTitle,
        productPrice: state.cart.items[key].productPrice,
        quantity: state.cart.items[key].quantity,
        sum: state.cart.items[key].sum,
      })
    }

    return transformedCartItems

  }



  )
  // console.log("jjhjhj"+cartItems)


  console.log(cartItems)

  const dispatch = useDispatch();







  const sendorder = async () => {
    setIsLoading(true)
    await dispatch(ordersActions.addOrder(cartItems, cartTotalAmount))
    setIsLoading(false)
  }





  return (
    <View style={styles.screen}>
      <View style={styles.details}>
        <Text style={styles.text}>Total:<Text style={styles.amount}> $ {cartTotalAmount.toFixed(2)} </Text></Text>
        <Button title="9090" onPress={() => {
          (
            props.navigation.navigate('OrderScreen')
          )
        }


        } />

        {isLoading ? (<ActivityIndicator color='red' size='large' />) : (

          <Button title="Order Now" disabled={cartItems.length === 0}

            onPress={() =>

              sendorder()

            } />

        )}
      </View>

      <View style={styles.bottom}>
        <Text>CART ITEMS</Text>
      </View>

      <FlatList
        data={cartItems}
        renderItem={(itemData) => {
          return (
            <TouchableOpacity activeOpacity={0.8} onPress={() => {
              dispatch(mainReducer.removeFromcart(itemData.item.productId))

              console.log(itemData.item.productTitle + " remove this item from cart")
            }}>

              <View style={styles.container}>
                <View>
                  <Image source={{ uri: itemData.item.productImage }} style={{ width: 50, height: 50 }} />
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', flex: 1 }}>
                  <View style={{ marginHorizontal: 20 }}>
                    <Text>{itemData.item.productTitle}</Text>


                    <View style={{ flexDirection: 'row', marginVertical: 5 }}>
                      <MainButton style={{ width: 20, height: 20 }}> - </MainButton>
                      <Text style={{ marginHorizontal: 10 }}>{itemData.item.quantity}</Text>
                      <MainButton style={{ width: 20, height: 20 }}> + </MainButton>
                    </View>

                  </View>

                  <View ><Text>{itemData.item.productPrice}</Text></View>

                </View>



              </View>

            </TouchableOpacity>

          )
        }}
      />

    </View>
  )
}

const styles = StyleSheet.create({


  screen: {
    flex: 1
  },

  details: {
    elevation: 5,
    borderRadius: 5,
    // // borderColor: 'red',
    // // borderWidth:2,
    height: 70,
    margin: 20,
    padding: 20,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

  },

  text: {
    fontFamily: 'Quando-Regular'
  },

  amount: {
    color: 'orange',
    fontFamily: 'InriaSans-Light',
    fontSize: 20
  },

  bottom: {
    marginStart: 20
  },

  container: {
    elevation: 5,
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

export default CartScreens