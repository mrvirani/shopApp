import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { FlatList } from 'react-native-gesture-handler'
import { useDispatch, useSelector } from 'react-redux'
import ProductItem from '../../components/shop/ProductItem'
import MainButton from '../../components/MainButton'

import * as productsActions from '../../store/actions/products'

const UserProductScreen = (props) => {

  const userProducts = useSelector(state => state.products.userProducts)


  const editProductHandler = (id) =>{
    props.navigation.navigate('Edit Product',{ productId: id} )
  }

    const dispatch = useDispatch()


  return (
    <View>
      <FlatList
        data={userProducts}
        renderItem={itemData =>

          <ProductItem 
            image={itemData.item.imageUrl}
            title={itemData.item.title}
            price={itemData.item.price}
            onSelectCart={()=>{editProductHandler(itemData.item.id)}}

          >
            <MainButton style={{ backgroundColor: 'green' }} onPress={()=>{editProductHandler(itemData.item.id)}} >
              Edit
            </MainButton>

            <MainButton style={{ backgroundColor: 'orange' }} onPress={()=>{dispatch(productsActions.deleteProduct(itemData.item.id))}}>
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