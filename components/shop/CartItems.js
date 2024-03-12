import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

 const CartItems=()=> {
  return (
    <View style={styles.container}>
    <View>
      <Image source={{ uri: itemData.item.productImage }} style={{ width: 50, height: 50 }} />
    </View>

    <View style={{  flexDirection: 'row', justifyContent: 'space-between', flex: 1 }}>
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
  )
}

const styles = StyleSheet.create({})


export default CartItems