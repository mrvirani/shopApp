import { Alert, StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useEffect, useLayoutEffect, useReducer, useState } from 'react'
import { ScrollView, TextInput } from 'react-native-gesture-handler'
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import CustomHeaderButton from '../../components/UI/HeaderButton'
import { useRoute } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';

import * as productsActions from '../../store/actions/products'
// import { Input } from 'react-native-elements';

import Input from '../../components/UI/Input';


const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE'

const formReducer = (state, action) => {
  if (action.type === FORM_INPUT_UPDATE) {

    const updateValues = {
      ...state.inputValues,  // we copy all the key- value pairs of that input values snapshot (je niche default set kariyo chhe means as initial state  )
      [action.input]: action.value //dynamically over Ride a key here in copied input values
      //[so dynamically store karaviye chhiye value that was dispatched with the dynamically assiged input and update our copied input values]
    }

    const updateValidities = {
      ...state.inputValidities,  //copy our validities
      [action.input]: action.isValid             // replace one validity for the input which we get on the action
    }

    let updatedFormIsValid = true
    for (const key in updateValidities) {   // if at least one of them is false then over al form is false
      updatedFormIsValid = updatedFormIsValid && updateValidities[key]   //apni pase 4 fild chhe like title price image description aa badhu valid hoi to j true
    }



    return {
      // ...state,
      inputValues: updateValues,
      inputValidities: updateValidities,
      formIsValid: updatedFormIsValid

    }

  }

  return state
}





const EditProductScreen = (props) => {

  const route = useRoute();
  const productId = route.params?.productId   // check karse product id chhe 

  // console.log(productId)

  const prodId = productId



  // console.log(prodId + "" + productId)

  const editedProducts = useSelector(state => state.products.userProducts.find(prod => prod.id === productId))


  // const [title, setTitle] = useState(editedProducts ? editedProducts.title : '')
  // const [imageUrl, setImageUrl] = useState(editedProducts ? editedProducts.imageUrl : '')
  // const [price, setPrice] = useState('')
  // const [description, setDescription] = useState(editedProducts ? editedProducts.description : '')


  // const [titleIsvalid, setTitleIsValid] = useState(false)


  const dispatch = useDispatch()


  //==============useReducer for form validation ====================

  //here second argument is optional and it was our initial state
  //[NOTE: use reducer of course return somthing just like use state did. It also return an array with exactly two with element and thefore we can destructure it with this array,,  and destructuring syntax which we also used on use state (ex. [name, setname] = usestate()) ]
  // return value is store in formState and dispatchFormState is function which dispatch some action again this reducer
  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      title: editedProducts ? editedProducts.title : '',
      imageUrl: editedProducts ? editedProducts.imageUrl : '',
      price: '',           //ignore price because we not edit price
      description: editedProducts ? editedProducts.description : ''

    },
    inputValidities: {
      title: editedProducts ? true : false,    //means edit karta hoi ye mean value already hoi to to valide chhe nahitar false(In case new product add kariye tyare)
      imageUrl: editedProducts ? true : false,
      price: editedProducts ? true : false,  //ignore price because we not edit price
      description: editedProducts ? true : false

    },
    formIsValid: editedProducts ? true : false

    //this three is our initial state, .... so this reducer function should be able to change that state when action are dispatched , and action should be dispathed whatever we type into one of text input

    //reducer update action for every key stroke we do in an input

  })

  //==================================================================

  const submitHandler = useCallback(() => {

    if (!formState.formIsValid ) {
      Alert.alert("Wrong Input!!", "Please check all data is correctly fill or not...", [{ text: 'okay' }])
      return
    }

    if (editedProducts) {
      dispatch(productsActions.updateProduct(
        productId,
        formState.inputValues.title,
        formState.inputValues.description,
        formState.inputValues.imageUrl)

      )
    }
    else {
      dispatch(productsActions.createProduct(
        formState.inputValues.title,
        formState.inputValues.imageUrl,
        formState.inputValues.description,
        +formState.inputValues.price)



      )
    }
    props.navigation.goBack();

  }, [productId,dispatch, formState]);

  console.log(editedProducts)

  //=====================================================

  // const submitHandler = useCallback(() => {

  //   if (!titleIsvalid ) {
  //     Alert.alert("Wrong Input!!", "Please check all data is correctly fill or not...", [{ text: 'okay' }])
  //     return
  //   }

  //   if (editedProducts) {
  //     dispatch(productsActions.updateProduct(
  //       productId,
  //       title,
  //       imageUrl,
  //       description
  //       )

  //       )
  //   }
  //   else {
  //     dispatch(productsActions.createProduct(
  //       title,
  //       imageUrl,
  //       description,
  //       price
  //       // formState.inputValues.title,
  //       // formState.inputValues.imageUrl,
  //       // formState.inputValues.description,
  //       // +formState.inputValues.price
  //       )



  //       )
  //   }
  //   props.navigation.goBack();

  // }, [ productId, !formState.inputValues.title,!formState.inputValues.imageUrl,  !formState.inputValues.description, !formState.inputValues.price, formState ]);

  // console.log(editedProducts)

  //=======================validation part [Manually] =====================

  // const titleChangeHandler = (text) =>{

  //   if(text.trim().length ===0){

  //     setTitleIsValid(false)

  //   }else{
  //     setTitleIsValid(true)
  //   }

  //   setTitle(text)


  // }

  // ==================================================================

  //=====================  validation using useReducer=================

  const onInputChangeHandler = useCallback((inputeIdentifires, InputValue, InputValidities) => {

    let isValid = false

    if (InputValue.trim().length > 0) {
      isValid = true

    }

    dispatchFormState({
      type: 'FORM_INPUT_UPDATE',
      value: InputValue,
      isValid: InputValidities,
      // input:'title' // here title is key and this should be a key which you also have inside of youre state, like initial state
      input: inputeIdentifires
    })


  },[dispatchFormState])

  //=====================================================================




  useLayoutEffect(() => {
    props.navigation.setOptions({
      title: prodId ? 'Edit Product' : 'Add Product',  //jo product id hase to Edit scrren (title depend on privous screen like here we press Edit button 

      headerRight: () =>
      (
        <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
          <Item iconName='save' title='save' onPress={() => {

            // console.log("hello")
            submitHandler()
          }} style={{ marginRight: 12 }} />
        </HeaderButtons>
      )
    })
  }, [props.navigation, submitHandler])


  return (
    <ScrollView>
      <View style={styles.form}>

        <Input
          id='Title'
          label="Title"
          errorText="Please enter valid title"
          keyboardType='default'
          autoCapitalize='sentences'
          autoCorrect
          returnKeyType='next'
          onInputChange= {onInputChangeHandler}
          initialValue={editedProducts? editedProducts.title:''}
          initialValid={!!editedProducts}
          required

        />


        {/* <View style={styles.formControl}>
          <Text style={styles.lable}>Title :</Text>

          <TextInput
            style={styles.input}
            value={formState.inputValues.title}
            onChangeText={textChangeHandler.bind(this, 'title')}


            onEndEditing={() => console.log("onEndEditing properties Run...")}    // will fired when current line mathi biji koi line ma jaiye tyare
            onSubmitEditing={() => console.log("onSubmiting properties Run...")}  // will fired when return button is clicked(means next button is clicked)
          />
          {!formState.inputValidities.title && <Text>Please enter valid title</Text>}

          {!titleIsvalid && <Text>Please enter valid title</Text>}

        </View> */}

        <Input
        id='Image Url'
          label="Image Url"
          errorText="Please enter valid Image Url"
          keyboardType='default'
          autoCapitalize='sentences'
          autoCorrect
          returnKeyType='next'
          onInputChange= {onInputChangeHandler} 
          initialValue={editedProducts? editedProducts.imageUrl:''}
          initialValid={!!editedProducts}
          required
        />

        {editedProducts ? null : (

          <Input
          id='Price'
            label="Price"
            errorText="Please enter valid Price"
            keyboardType='decimal-pad'
            autoCapitalize='sentences'
            autoCorrect
            returnKeyType='next'
            onInputChange={onInputChangeHandler} 
            // initialValue={editedProducts? editedProducts.title:''}   //No need
            // initialValid={!!editedProducts}
            required
            min={0.1}
          />

        )}

        <Input
        id='Description'
          label="Description"
          errorText="Please enter valid Description"
          keyboardType='default'
          autoCapitalize='sentences'
          autoCorrect
          // borderWidth={10}
          returnKeyType='next'
          // multiline
          // numberOfLines={3}
          onInputChangeHandler={onInputChangeHandler}
          initialValue={editedProducts? editedProducts.description:''}
          initialValid={!!editedProducts}
          required
        />

      </View>


    </ScrollView>
  )
}

const styles = StyleSheet.create({

  form: {
    margin: 20
  },

  // formControl: {
  //   marginVertical: 5,
  //   marginHorizontal: 20
  // },

  // lable: {
  //   fontFamily: 'Sofia-Regular',
  //   fontSize: 18,
  //   color: '#FF8E8F'
  // },

  // input: {
  //   borderBottomColor: 'black',
  //   borderWidth: 1,
  //   marginVertical: 3
  // },

})

export default EditProductScreen