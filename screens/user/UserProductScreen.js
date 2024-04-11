import { Alert, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { FlatList } from 'react-native-gesture-handler'
import { useDispatch, useSelector } from 'react-redux'
import ProductItem from '../../components/shop/ProductItem'
import MainButton from '../../components/MainButton'

import * as productsActions from '../../store/actions/products'
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import CustomHeaderButton from '../../components/UI/HeaderButton'

const UserProductScreen = (props) => {
  

  useEffect(() => {

    props.navigation.setOptions({
      headerTitle: 'Your Product',
      headerLeft:()=>(
        <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item iconName='bars' title='bars' onPress={()=>props.navigation.toggleDrawer()} style={{marginLeft:20}}/>
      </HeaderButtons>
    
      )
      ,
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
          <Item iconName='edit' title='edit Button' onPress={() => {props.navigation.navigate('Edit Product') }} style={{marginRight:12}} />
        </HeaderButtons>
      ),
      headerStyle: {
        backgroundColor: '#FF8E8F'
      },
      headerTintColor: 'white'
    })
    
  }, [])
  
  const userProducts = useSelector(state => state.products.userProducts)
  console.log("userProducts::::"+JSON.stringify(userProducts))
  
  const dispatch = useDispatch()

  const editProductHandler = (id) => {
    props.navigation.navigate('Edit Product', { productId: id })
  }

  const deleteProductHandler = (id) => {
    Alert.alert('Are you sure??', 'Do You really want to delete item?', [
      {text:'No', style:'default'},
      {text:'Yes', style:'destructive', onPress:()=>{ dispatch(productsActions.deleteProduct(id)) }} 
    ])
  }



  if(userProducts.length === 0){
    <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
      <Text>
      Product is not found, maybe start creacting some?
      </Text>
    </View>
    // Alert.alert("Product is Not Found, maybe start creacting some?")
  }



  return (
    <View>
      <FlatList
        data={userProducts}
        renderItem={itemData =>

          <ProductItem
            image={itemData.item.imageUrl}
            title={itemData.item.title}
            price={itemData.item.price}
            onSelectCard={() => { editProductHandler(itemData.item.id) }}

          >
            <MainButton style={{ backgroundColor: 'green' }} onPress={() => { editProductHandler(itemData.item.id) }} >
              Edit
            </MainButton>

            <MainButton style={{ backgroundColor: 'orange' }} onPress={() => { deleteProductHandler(itemData.item.id) }}>
              Delete Product
            </MainButton>

          </ProductItem>
        }
      />
    </View>
  )
}



const styles = StyleSheet.create({})

export default UserProductScreen