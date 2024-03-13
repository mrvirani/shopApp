import { StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useEffect, useLayoutEffect, useState } from 'react'
import { ScrollView, TextInput } from 'react-native-gesture-handler'
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import CustomHeaderButton from '../../components/UI/HeaderButton'
import { useRoute } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';

import * as productsActions from '../../store/actions/products'

const EditProductScreen = (props) => {

  const route = useRoute();
  const productId = route.params?.productId   // check karse product id chhe 

  // console.log(productId)

  const prodId = productId

  // console.log(prodId + "" + productId)

  const editedProducts = useSelector(state => state.products.userProducts.find(prod => prod.id === productId))


  const [title, setTitle] = useState(editedProducts ? editedProducts.title : '')
  const [imageUrl, setImageUrl] = useState(editedProducts ? editedProducts.imageUrl : '')
  const [price, setPrice] = useState('')
  const [description, setDescription] = useState(editedProducts ? editedProducts.description : '')


  const dispatch = useDispatch()

  // const submitHandler = useCallback(() => {

  //   if (editedProducts) {
  //     dispatch(productsActions.updateProduct(productId, title, description, imageUrl))
  //   }
  //   else {
  //     dispatch(productsActions.createProduct(title, description, imageUrl, +price))
  //   }

  // }, [dispatch,productId, title, description, imageUrl, price]);

  console.log(editedProducts)

  const submitHandler = useCallback(() => {
    if(editedProducts){
        dispatch(productsActions.updateProduct(prodId, title, description,imageUrl));
    }
    else{
        dispatch(productsActions.createProduct(title,description,imageUrl,+price));
    }
    props.navigation.goBack();
},[dispatch,prodId,title,description,imageUrl,price]);
  


  // const dummyHandler = useCallback(() => {
  //   submitHandler
  // }, [submitHandler])





  


  useLayoutEffect(() => {
    props.navigation.setOptions({
      title: prodId ? 'Edit Product' : 'Add Product',  //jo product id hase to Edit scrren (title depend on privous screen like here we press Edit button 

      headerRight: () =>
      (
        <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
          <Item iconName='save' title='save' onPress={() => {

            // console.log("hello")
            submitHandler
          }} style={{ marginRight: 12 }} />
        </HeaderButtons>
      )
    })
  }, [props.navigation,submitHandler])


  return (
    <ScrollView>
      <View style={styles.form}>

        <View style={styles.formControl}>
          <Text style={styles.lable}>Title :</Text>
          <TextInput style={styles.input} value={title} onChangeText={text => setTitle(text)} />
        </View>
        <View style={styles.formControl}>
          <Text style={styles.lable}>ImageUrl :</Text>
          <TextInput style={styles.input} value={imageUrl} onChangeText={text => setImageUrl(text)} />
        </View>
        {editedProducts ? null : (

          <View style={styles.formControl}>
            <Text style={styles.lable}>Price :</Text>
            <TextInput style={styles.input} value={price} onChangeText={text => setPrice(text)} />
          </View>

        )}
        <View style={styles.formControl}>
          <Text style={styles.lable}>Description :</Text>
          <TextInput style={styles.input} value={description} onChangeText={text => setDescription(text)} />
        </View>

      </View>


    </ScrollView>
  )
}

const styles = StyleSheet.create({

  form: {
    margin: 20
  },

  formControl: {
    marginVertical: 5,
    marginHorizontal: 20
  },

  lable: {
    fontFamily: 'Sofia-Regular',
    fontSize: 18,
    color: '#FF8E8F'
  },

  input: {
    borderBottomColor: 'black',
    borderWidth: 1,
    marginVertical: 3
  },

})

export default EditProductScreen