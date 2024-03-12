import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

import { createStore,combineReducers } from 'redux'
import { Provider } from 'react-redux'

import productsReducernnn from './store/reducers/products'
import cartReducer from './store/reducers/cart'
import orderReducer from './store/reducers/order'

import ShopNavigator from './navigation/ShopNavigator'
import { NavigationContainer } from '@react-navigation/native'

import OrderScreen from './screens/shop/OrderScreen'

import 'react-native-gesture-handler';

const rootReducer = combineReducers({
  products: productsReducernnn,
  cart: cartReducer,
  orders: orderReducer   // this gives us access to the state slice managed by the orders reducer
});

const store = createStore(rootReducer);

 const  App=()=> {
  return (
    <NavigationContainer>
    <Provider store={store}>
      {/* <View>
        <Text>
          hello 
        </Text>
      </View> */}

      <ShopNavigator/>
    </Provider>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({})

export default App