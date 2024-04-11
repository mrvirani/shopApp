


import { StyleSheet, Text, View, ActivityIndicator } from 'react-native'
import React, { useEffect } from 'react'

import AsyncStorage from '@react-native-async-storage/async-storage';

import {useDispatch} from 'react-redux'

import * as authAction from 'react-redux'
import { AUTHENTICATE } from '../store/actions/auth'


export default function StartUpScreen(props) {

    const dispatch = useDispatch();

    useEffect(()=>{
            const tryLogin = async() =>{
                    const userData= await AsyncStorage.getItem('userData');
                   
                   if(!userData){
                    props.navigation.navigate('Auth')
                    return;
                   }

                       
                    const transformedData = JSON.parse(userData)
                    const {token, userId, expiryDate} = transformedData;


                    const expirationDate = new Date(expiryDate)

                    if(expirationDate <= new Date || !token || !userId ){
                        props.navigation.navigate('Auth')
                        return;

                    }

                   // const expirationTime = expirationDate.getTime() - new Date().getTime()  

                    props.navigation.navigate('Drawer')  
                    
                    dispatch(authAction.authenticate(userId,token, expirationTime) )

            }
            tryLogin()
    },[dispatch])


  return (

    <View style={styles.screen}>
        <ActivityIndicator size='large' color='red' />
    </View>



  )
}

const styles = StyleSheet.create({


    screen:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    }

})

















