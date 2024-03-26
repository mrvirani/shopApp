import { ActivityIndicator, Alert, StyleSheet, Text, TextInput, ToastAndroid, View } from 'react-native'
import React, { useCallback, useEffect, useReducer, useState } from 'react'
import { KeyboardAvoidingView } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import Input from '../../components/UI/Input'
import MainButton from '../../components/MainButton'

import LinearGradient from 'react-native-linear-gradient';

// import { UseDispatch } from 'react-redux'
import * as AuthAction from '../../store/actions/auth'
import { useDispatch } from 'react-redux'



const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE'


// const formReducer = (state, action) => {
//     if (action.type === FORM_INPUT_UPDATE) {
//         const updatedValues = {
//             ...state.inputValues,
//             [action.input]: action.value
//         };
//         const updatedValidities = {
//             ...state.inputValidities,
//             [action.input]: action.isValid
//         };
//         let updatedFormIsValid = true;
//         for (const key in updatedValidities) {
//             updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
//         }
//         return {
//             formIsValid: updatedFormIsValid,
//             inputValidities: updatedValidities,
//             inputValues: updatedValues
//         };
//     }
//     return state;
// };




const AuthScreen = (props) => {


    const dispatch = useDispatch()


    const [Email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [isSignUp, setIsSignUp] = useState(false)
    const [isLoading, setIsLoding] = useState(false)
    const [error, setError] = useState()


    // const [formState, dispatchFormState] = useReducer(formReducer, {
    //     inputValues: {
    //         email: '',
    //         password: ''

    //     },
    //     inputValidities: {
    //         email: false,
    //         password: false
    //     },
    //     formIsValid: false
    // })


    useEffect(() => {
        if (error) {

            Alert.alert('An Error Occured', error, [{ text: 'Okay' }])
        }
    }, [error])



    const authHandler = async () => {



        // console.log("email:" + formState.inputValues.email)
        // console.log("password:" + formState.inputValues.password)


        // if (!formState.formIsValid) {
        //     // Show an error message if form is invalid
        //     ToastAndroid.showWithGravity("Please check your inputs", ToastAndroid.SHORT, ToastAndroid.BOTTOM);
        //     return;
        //   }

        //  dispatch(AuthAction.signUp(formState.inputValues.email,formState.inputValues.password))



        console.log("EMAIL:" + Email)
        console.log("PASSWORD:" + password)

       // dispatch(AuthAction.signUp(Email, password))
        ToastAndroid.showWithGravity("button is pressed", ToastAndroid.BOTTOM, ToastAndroid.show)


        let action;

        {isSignUp?
             (action=  AuthAction.signUp(Email, password)):
                (action=  AuthAction.login(Email, password))
        }

        setError(null)
        setIsLoding(true)
        try{
            dispatch(action)
            props.navigation.navigate('Drawer')
        }
        catch(err){
            setError(err.message)
        }
        setIsLoding(false)

       

        // setError(null)
        // setIsLoding(true)
        // try {

        //     await dispatch(Action);

        // }
        // catch (err) {
        //     setError(err.message)
        // }
        // setIsLoding(false)

        // console.log(error)


        // dispatch(AuthAction.signUp(formState.inputValues.email, formState.inputValues.password))




        // setEmail('');
        // setPassword('');

        // console.log("msg: "+ formState.inputValues.email +  formState.inputValues.password)

        // console.log("submit button is pressed") 

    }



    // const signupHandler = () => {
    //     dispatch(
    //       AuthAction.signUp(
    //         formState.inputValues.email,
    //         formState.inputValues.password
    //       )
    //     );
    //   };






    // const InputChangeHandler = useCallback((inputeIdentifires, InputValue, InputValidities) => {



    //     // if (InputValue.length > 0) {
    //     //     isValid = true
    //     //   }

    //     dispatchFormState({
    //         type: FORM_INPUT_UPDATE,
    //         value: InputValue,
    //         isValid: InputValidities,
    //         input: inputeIdentifires
    //     })


    // }, [dispatchFormState])






    return (
        <View style={{ flex: 1, width: '100%', height: '100%' }}>

            <KeyboardAvoidingView behavior='padding' keyboardVerticalOffset={50}  >

                <LinearGradient colors={['#D16BA5', '#86A8E7', '#5FFBF1']} style={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>

                    <View style={styles.container}>
                        <ScrollView>

                            <View styles={{ width: '80%' }}>

                                <Text style={styles.title}>LOGIN</Text>


                                <Input
                                    id='email'
                                    label="E-mail"
                                    errorText="In-valid email"
                                    keyboardType='email-address'
                                    required
                                    email
                                    autoCapitalize='none'
                                    value={Email}
                                    onInputChange={(text)=>setEmail(text)}
                                    initialValue=""
                                /> 
                                 <Input
                                    id='password'
                                    label="Password"
                                    errorText="in valid password"
                                    keyboardType='default'
                                    secureTextEntry
                                    required
                                    minLength={5}
                                    autoCapitalize='none'
                                    value={password}
                                    onChangeText={(text) => setPassword(text)}
                                    initialValue=""
                                />


                                {/* <View>
                                    <Text>Email</Text>
                                    <TextInput
                                        value={Email}
                                        onChangeText={(text) => setEmail(text)}
                                        keyboardType='default'
                                        required
                                        placeholder='Enter Youe email'
                                        borderColor='black'
                                        style={{ borderWidth: 1 }}
                                    />
                                </View>


                                <View>
                                    <Text>password</Text>
                                    <TextInput
                                        value={password}
                                        onChangeText={(text) => setPassword(text)}
                                        keyboardType='numeric'
                                        required
                                        placeholder='Enter Youe password'
                                        borderColor='black'
                                        style={{ borderWidth: 1 }}
                                    />
                                </View> */}







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

                                {/* <View>
                                    <Text>Email</Text>
                                    <TextInput
                                        id="email"
                                        // value={Email}
                                        onTextInput={InputChangeHandler}
                                        keyboardType='default'
                                        required
                                        placeholder='Enter Youe email'
                                        borderColor='black'
                                        style={{ borderWidth: 1 }}
                                    />
                                </View>

                               <View>
                                    <Text>password</Text>
                                    <TextInput
                                    id="password"
                                        // value={password}
                                        onTextInput={InputChangeHandler}
                                        keyboardType='numeric'
                                        required
                                        placeholder='Enter Youe password'
                                        borderColor='black'
                                        style={{ borderWidth: 1 }}
                                    />
                                </View>  */}


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
                                    onInputChange={InputChangeHandler}
                                // onChangeText={(text)=>setPassword(text)}
                                // style={styles.inputBox}
                                /> */}

                            </View>


                            <View>

                                {
                                    isLoading ? (<ActivityIndicator color={'red'} size={'large'} />) : (
                                        <MainButton style={styles.btn1}
                                            onPress={authHandler}>
                                            {isSignUp ? 'Sign Up' : 'Login'}
                                        </MainButton>
                                    )
                                }



                                <MainButton style={styles.btn2}
                                    onPress={() => setIsSignUp(prevState => !prevState)}>
                                    {`Switch to ${isSignUp ? 'Login' : 'Sign Up'}`}
                                </MainButton>

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

    title: {
        fontFamily: 'Quando-Regular',
        fontSize: 30,
        color: 'orange',
        textAlign: 'center'
    },

    btn1: {
        width: '100%',
        marginVertical: 5,
    },

    btn2: {
        width: '100%',
        marginVertical: 5
    }


})

export default AuthScreen



