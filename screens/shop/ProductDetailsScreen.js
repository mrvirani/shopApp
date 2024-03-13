import { Button, Image, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { useRoute } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';
import MainButton from '../../components/MainButton';
import { addToCart } from '../../store/actions/cart';

import * as cartActions from '../../store/actions/cart'
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import HeaderButton from '../../components/UI/HeaderButton'

import CartScreens from './CartScreens';
import CustomHeaderButton from '../../components/UI/HeaderButton';

const ProductDetailsScreen = (props) => {

  const route = useRoute();
  const { productId, productTitle } = route.params;
  // const { productTitle} = route.params;

  //this will extract our product Id from the parameterd we received
  // const productId = props.navigation.getParam('productId')
  console.log(productTitle)
  //that slice name is define in where you use combined reducers
  const selectedProduct = useSelector(state => state.products.availableProducts.find(prod => prod.id === productId))



  console.log("hi" + selectedProduct.price)



  //screenname.navigationOption latest version ma nahi chaltu so useEffect thi navigation.setoption thi header set karvu
  useEffect(() => {
    if (productTitle) {
      props.navigation.setOptions({
        title: productTitle,

        headerRight: () => (
          <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
            <Item
              title="shopping-cart"
              iconName="shopping-cart"
              onPress={() => {
                props.navigation.navigate('CartScreens')
                // console.log("helllo")
              }}
              style={{marginRight:10}}
            />
          </HeaderButtons>
        )

      })
    }
  }, [productTitle])

  const dispatch = useDispatch()


  // console.log(productId)   

  return (
    <ScrollView>

      <View style={{ marginTop: 10 }}>

        <Image style={styles.image} source={{ uri: selectedProduct.imageUrl }} />

      </View>

      <View style={styles.btncontainer}>
        <MainButton style={styles.AddToCartBtn} onPress={() => {
          dispatch(addToCart(selectedProduct))
          // console.log("hello")
        }}>ADD TO CART</MainButton>

      </View>

      <Text style={styles.price}> $ {selectedProduct.price}    </Text>

      <Text style={styles.description}> {selectedProduct.description} </Text>


    </ScrollView>
  )




}

// ProductDetailsScreen.navigationOptions = navData =>{
//   return{
//     headerTitle:navData.navigation.getParam('productTitle') 
//   }
// }




const styles = StyleSheet.create({


  image: {
    width: "100%",
    height: 370
  },

  btncontainer: {
    alignItems: 'center'
  },

  AddToCartBtn: {
    marginVertical: 10,
    // alignItems:'center'
  },

  price: {
    marginVertical: 10,
    textAlign: 'center',
    fontFamily: 'InriaSans-Light'
  },

  description: {
    marginVertical: 10,
    color: 'black',
    fontSize: 20,
    textAlign: 'center',
    marginHorizontal: 10,
    fontFamily: 'Quando-Regular'
  }

})

export default ProductDetailsScreen