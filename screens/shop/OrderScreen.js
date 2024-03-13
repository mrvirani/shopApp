import { Button, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { FlatList } from 'react-native-gesture-handler'

import OrderItems from '../../components/shop/OrderItems'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import CustomHeaderButton from '../../components/UI/HeaderButton'

const OrderScreen = (props) => {


  const orders = useSelector(state => state.orders.orders)

  // console.log("kkkkk"+orders)
 
  useEffect(()=>{
        props.navigation.setOptions({
         headerTitle:'Your Order',
         headerLeft:()=>(
          <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
          <Item iconName='bars' title='bars' onPress={()=>props.navigation.toggleDrawer()} style={{marginLeft:20}}/>
        </HeaderButtons>
      
        ),
        headerStyle: {
          backgroundColor: '#FF8E8F'
        },
        headerTintColor: 'white'
         
        })
  },[])



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