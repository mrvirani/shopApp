import { StyleSheet, Text, View, TextInput } from 'react-native'
import React, { useEffect, useReducer } from 'react'
// import { TextInput } from 'react-native-gesture-handler'

import * as Animatable from 'react-native-animatable';


const INPUT_CHANGE = 'INPUT_CHANGE'
const INPUT_BLUR = 'INPUT_BLUR'
const LOGOUT = 'LOGOUT'

const inputReducer = (state, action) => {

  switch (action.type) {
    case INPUT_CHANGE:
      return {
        ...state,
        value: action.value,
        isValid: action.isValid,

      };

    case INPUT_BLUR:
      return {
        ...state,
        touched: true
      }



    default:
      return state
  }

}


const Input = (props) => {


  const { onInputChange, id } = props;


  console.log(id + "idkllklkl")


  const [inputState, inputStateDispatch] = useReducer(inputReducer, {

    value: props.initialValue ? props.initialValue : '',
    isValid: props.initialValid,
    touched: false  // it show whether it has been touched or not   and it will be help ful when we show validation errors
  });


  useEffect(() => {
    if (inputState.touched) {

      onInputChange(id, inputState.value, inputState.isValid)   //onInputeChange is random name 
    }
  }, [inputState, onInputChange, id])



  const textChangeHandler = (text) => {
    console.log('textchange hab');
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let isValid = true;
    if (props.required && text.trim().length === 0) {
      isValid = false;
    }
    if (props.email && !emailRegex.test(text.toLowerCase())) {
      isValid = false;
    }
    if (props.min != null && +text < props.min) {
      isValid = false;
    }
    if (props.max != null && +text > props.max) {
      isValid = false;
    }
    if (props.minLength != null && text.length < props.minLength) {
      isValid = false;
    }
    console.log("text", isValid)
    inputStateDispatch({ type: INPUT_CHANGE, value: text, isValid: isValid })
    // onInputChange(text, isValid)

  }


  const lostFocusHandler = () => {
    inputStateDispatch({ type: INPUT_BLUR })
  }

  return (
    <View>
      <View style={styles.formControl}>
        {/* {console.log(props.label)} */}
        <Text style={styles.lable}>{props.label}</Text>

        <TextInput
          {...props}  // this one is need because we it's help to we can pass props inside componeents
          style={styles.input}
          value={inputState.value}
          onChangeText={textChangeHandler}
          placeholder={props.placeholder}
          onBlur={lostFocusHandler}
        // onEndEditing={() => console.log("onEndEditing properties Run...")}    // will fired when current line mathi biji koi line ma jaiye tyare
        // onSubmitEditing={() => console.log("onSubmiting properties Run...")}  // will fired when return button is clicked(means next button is clicked)
        />

        {!inputState.isValid && inputState.touched && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{props.errorText}</Text>
          </View>
        )}

        {/* {!inputState.isValid && <Text>{props.errorText}</Text>} */}

        {/* {!titleIsvalid && <Text>Please enter valid title</Text>} */}

      </View>
    </View>
  )
}

const styles = StyleSheet.create({

  // form: {
  //   margin: 20
  // },

  formControl: {
    width: '100%',
  },

  lable: {
    fontFamily: 'Sofia-Regular',
    fontSize: 15,
    color: '#FF8E8F'
  },

  input: {
    borderBottomColor: 'black',
    borderWidth: 1,
    paddingHorizontal: 2,
    paddingVertical: 5,
    // marginVertical: 1
  },

  errorText: {
    color: 'red',
    fontSize: 13
  }


})

export default Input