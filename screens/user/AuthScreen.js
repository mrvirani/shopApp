import { StyleSheet, Text, TextInput, ToastAndroid, View } from 'react-native'
import React, {useCallback, useReducer, useState} from 'react'
import { KeyboardAvoidingView } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import Input from '../../components/UI/Input'
import MainButton from '../../components/MainButton'

import LinearGradient from 'react-native-linear-gradient';

// import { UseDispatch } from 'react-redux'
import * as AuthAction from '../../store/actions/auth'
import { useDispatch } from 'react-redux'



const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE'


const formReducer = (state, action) => {
    if (action.type === FORM_INPUT_UPDATE) {
      const updatedValues = {
        ...state.inputValues,
        [action.input]: action.value
      };
      const updatedValidities = {
        ...state.inputValidities,
        [action.input]: action.isValid
      };
      let updatedFormIsValid = true;
      for (const key in updatedValidities) {
        updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
      }
      return {
        formIsValid: updatedFormIsValid,
        inputValidities: updatedValidities,
        inputValues: updatedValues
      };
    }
    return state;
  };
  
  
  
  






const AuthScreen = (props) => {


    const dispatch = useDispatch()

    
const [Email, setEmail] = useState('')
const [password, setPassword] = useState('')


// const [formState, dispatchFormState] = useReducer(formReducer, {
//     inputValues: {
//       email:'',
//       password:''

//     },
//     inputValidities: {
//       email:false,
//       password:false
//     },
//     formIsValid: false
//   })
     

  
     const signupHandler =  useCallback(async()=>{



        // console.log("email:" + formState.inputValues.email)
        // console.log("password:" + formState.inputValues.password)


        // if (!formState.formIsValid) {
        //     // Show an error message if form is invalid
        //     ToastAndroid.showWithGravity("Please check your inputs", ToastAndroid.SHORT, ToastAndroid.BOTTOM);
        //     return;
        //   }
      
        // dispatch(AuthAction.signUp(formState.inputValues.email,formState.inputValues.password))
       await dispatch(AuthAction.signUp(Email, password)) 

        setEmail('');
        setPassword('');

        // console.log("msg: "+ formState.inputValues.email +  formState.inputValues.password)

        // console.log("submit button is pressed") 

        ToastAndroid.showWithGravity("Login button is pressed",  ToastAndroid.show)
    })



    // const signupHandler = () => {
    //     dispatch(
    //       AuthAction.signUp(
    //         formState.inputValues.email,
    //         formState.inputValues.password
    //       )
    //     );
    //   };
    


   

        
//   const InputChangeHandler = useCallback((inputeIdentifires, InputValue, InputValidities) => {



//     // if (InputValue.length > 0) {
//     //     isValid = true
//     //   }

//     dispatchFormState({
//       type: 'FORM_INPUT_UPDATE',
//       value: InputValue,
//       isValid:   InputValidities,
//       input: inputeIdentifires
//     })


//   }, [dispatchFormState])


    



    return (
        <View style={{flex: 1,width:'100%', height:'100%'}}>

        <KeyboardAvoidingView behavior='padding' keyboardVerticalOffset={50}  >
          
          <LinearGradient colors={['#D16BA5','#86A8E7', '#5FFBF1']} style={{width:'100%', height:'100%',  justifyContent: 'center', alignItems:'center'}}>

            <View style={styles.container}>
                <ScrollView>

                    <View styles={{width:'80%'}}>

                        <Text style={styles.title}>LOGIN</Text>

                    {/* <Input

                        id="email"
                        label="E-mail"
                        keyboardType='email-address'
                        placeholder='Enter You Email Address'
                        required
                        email
                        autoCapitalize="none"
                        errorText="Please enter a valid Email address"
                        initialValue=''
                        onInputChange={InputChangeHandler}
                        // value={Email}
                        // onChangeText={(text)=> setEmail(text)}
                        // style={styles.inputBox}
                    /> */}

                    <View>
                        <Text>Email</Text>
                        <TextInput
                        value={Email}
                        onChangeText={(text)=> setEmail(text)}
                        keyboardType='default'
                        required
                        placeholder='Enter Youe email'
                        borderColor='black'
                        style={{borderWidth:1}}
                        />
                    </View>

                    <View>
                        <Text>password</Text>
                        <TextInput
                        value={password}
                        onChangeText={(text)=>setPassword(text)}
                        keyboardType='numeric'
                        required
                        placeholder='Enter Youe password'
                        borderColor='black'
                        style={{borderWidth:1}}
                        />
                    </View>


                    {/* <Input
                        id="password"
                        label="Password"
                        keyboardType='default'
                       // value={password}
                        secureTextEntry
                        placeholder='Enter Your Password'
                        required
                        minLength={5}
                        autoCapitalize="none"
                        errorText="Please enter a valid Password "
                        initialValue=''
                       onInputChange ={InputChangeHandler}
                        // onChangeText={(text)=>setPassword(text)}
                        // style={styles.inputBox}
                    />  */}

                    </View>


                    <View>

                        <MainButton style={styles.btn1} onPress={signupHandler}> LOGIN</MainButton>

                        <MainButton style={styles.btn2} onPress={()=>{}}>SWITCH TO SIGN UP</MainButton>

                    </View>




                </ScrollView>
            </View>

            </LinearGradient>

        </KeyboardAvoidingView>
        </View>
    )
}




const styles = StyleSheet.create({


    container: {
        width: '80%',
        borderColor: 'black',
    },

    title:{
            fontFamily:'Quando-Regular',
            fontSize:30,
            color:'orange',
           textAlign:'center'
    },

    btn1:{
        width:'100%',
        marginVertical:5,
    },

    btn2:{
        width:'100%',
        marginVertical:5
    }





})

export default AuthScreen