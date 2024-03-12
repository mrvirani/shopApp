import { Button, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux'
import { FlatList } from 'react-native-gesture-handler'

import OrderItems from '../../components/shop/OrderItems'

const OrderScreen = (props) => {


  const orders = useSelector(state => state.orders.orders)

  console.log("kkkkk"+orders)
 

  return (
    <View>
      <Text>OrderScreenmmmmmmmmmmmmmm</Text>


      


      <FlatList
        data={orders}
        renderItem={(itemData) => 
          

            <OrderItems 
             amount={itemData.item.totalAmount} 
             date={itemData.item.date} 
             items={itemData.item.items}  />

            // <View style={{ alignItems: 'center', justifyContent: 'center' }}>

            //   <Text>Your Order Details iS:</Text>
            //   <Text>{itemData.item.id}</Text>
            //   <Text>{itemData.item.readableDate}</Text>
            //   <Text>{itemData.item.items}</Text>
            //   <Text>{itemData.item.totalAmount}</Text>
            // </View>

          
        

        }/>


    </View>
  )
}


const styles = StyleSheet.create({})

export default OrderScreen