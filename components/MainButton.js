import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'

const MainButton = (props) => {
  return (
    <TouchableOpacity onPress={props.onPress} >

      <View style={{...styles.Button,...props.style}}>
        <Text style={styles.ButtonText}>{props.children}
        </Text>
      </View>

    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({

  Button: {
    width:100,
    height:50,
    justifyContent:'center',
    backgroundColor:'#FEDBD0',
    borderRadius:5
},

ButtonText: {
    color:'black',
    textAlign:'center',
    fontFamily:'InriaSans-Light'
}

})

export default MainButton