import { Button, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useDispatch } from 'react-redux'
import * as AuthActions from "../store/actions/auth"

const Logout=(props) =>{

    const dispatch = useDispatch();
    
  return (
    <View style={{ flex: 1 }}>
    <SafeAreaView forceInset={{ top: 'always', horizontal: 'never' }}>
        <DrawerNavigatorItems {...props} />
        <Button title="LOGOUT" color='red'
            onPress={() => {
                dispatch(AuthActions.logOut())
                props.navigation.navigate("Auth")
            }}

        />
        <Text>LogOut</Text>
    </SafeAreaView>
</View>
  )
}

const styles = StyleSheet.create({})


export default Logout