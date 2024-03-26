import { ActivityIndicator, Button, StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FlatList } from 'react-native-gesture-handler'

import OrderItems from '../../components/shop/OrderItems'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import CustomHeaderButton from '../../components/UI/HeaderButton'

import * as orderActions from '../../store/actions/order'

const OrderScreen = (props) => {


  const orders = useSelector(state => state.orders.orders)

  const dispatch = useDispatch()

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState()
  const [isRefreshing, setRefreshing] = useState(false)


  // console.log("kkkkk"+orders)

  useEffect(() => {
    props.navigation.setOptions({
      headerTitle: 'Your Order',
      headerLeft: () => (
        <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
          <Item iconName='bars' title='bars' onPress={() => props.navigation.toggleDrawer()} style={{ marginLeft: 20 }} />
        </HeaderButtons>

      ),
      headerStyle: {
        backgroundColor: '#FF8E8F'
      },
      headerTintColor: 'white'

    })
  }, [])




  const loadedOrders = useCallback(
    async () => {

      setError(null)

      setIsLoading(true)

      try {
        await dispatch(orderActions.fetchOrder())

      } catch (err) {
        setError(err.message)
      }


      setIsLoading(false)

    }, [dispatch, setRefreshing, setError]
  )


  useEffect(() => {
    // setIsLoading(true);
    loadedOrders()
    //.finally(() => setIsLoading(false));
  }, [dispatch, loadedOrders]);


  if (error) {
    return (<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Error Ocurred!!!</Text>
    </View>)
  }



  if (isLoading) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator color='red' size='large' />
      </View>
    )
  }






  return (
    <View>
     


      <FlatList
        data={orders}
        // onRefresh={loadedOrders}
        // refreshing={isRefreshing}
        renderItem={(itemData) =>


          <OrderItems
            amount={itemData.item.totalAmount}
            date={itemData.item.date}
            items={itemData.item.items} />

          // <View style={{ alignItems: 'center', justifyContent: 'center' }}>

          //   <Text>Your Order Details iS:</Text>
          //   <Text>{itemData.item.id}</Text>
          //   <Text>{itemData.item.readableDate}</Text>
          //   <Text>{itemData.item.items}</Text>
          //   <Text>{itemData.item.totalAmount}</Text>
          // </View>




        } />


    </View>
  )
}


const styles = StyleSheet.create({})

export default OrderScreen