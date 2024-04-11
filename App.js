import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

import { createStore,combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'

import productsReducernnn from './store/reducers/products'
import cartReducer from './store/reducers/cart'
import orderReducer from './store/reducers/order'
import authReducer from './store/reducers/auth'

import ShopNavigator from './navigation/ShopNavigator'
import { NavigationContainer } from '@react-navigation/native'

import OrderScreen from './screens/shop/OrderScreen'

import 'react-native-gesture-handler';

import NavigationContainers from './navigation/NavigationContainers'

import {thunk} from 'redux-thunk' 
import { StatusBar } from 'react-native'
// import logger  from 'redux-logger'

const rootReducer = combineReducers({
  products: productsReducernnn,
  cart: cartReducer,
  orders: orderReducer,   // this gives us access to the state slice managed by the orders reducer
  auth: authReducer
});






const store = createStore(rootReducer, applyMiddleware(thunk));




 const  App=()=> {
  return (
    <NavigationContainer>
    <Provider store={store}>
      {/* <View>
        <Text>
          hello 
        </Text>
      </View> */}
      {/* <StatusBar backgroundColor="#FF8E8F" barStyle="light-content"/> */}

      <ShopNavigator/>
    </Provider>
   </NavigationContainer>
  )
}

const styles = StyleSheet.create({})

export default App