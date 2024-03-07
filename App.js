import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

import { createStore,combineReducers } from 'redux'
import { Provider } from 'react-redux'

import productsReducernnn from './store/reducers/products'

import ShopNavigator from './navigation/ShopNavigator'
import { NavigationContainer } from '@react-navigation/native'

const rootReducer = combineReducers({
  products: productsReducernnn
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