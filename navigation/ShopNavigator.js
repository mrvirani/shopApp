


// import {createAppContainer} from 'react-navigation'
// import { createStackNavigator } from 'react-navigation-stack';
// import { Platform } from 'react-native'


// import ProductOverviewScreen from '../screens/shop/ProductOverviewScreen'

// // const ProductsNavigator = createStackNavigator({

// //     ProductOverview: ProductOverviewScreen
// // },{
// //     defaultNavigationOptions:{
// //         headerStyle:{
// //             backgroundColor:"black"
// //         },
// //         headerTintColor:"white"
// //     }
// // });




// export default createAppContainer(ProductsNavigator)


import React from "react";

import { Button } from 'react-native'

import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from '@react-navigation/drawer';


import ProductOverviewScreen from "../screens/shop/ProductOverviewScreen";
import ProductDetailsScreen from "../screens/shop/ProductDetailsScreen";
import UserProductScreen from "../screens/user/UserProductScreen";
import EditProductScreen from "../screens/user/EditProductScreen";
import CartScreens from "../screens/shop/CartScreens";
import OrderScreen from "../screens/shop/OrderScreen";
import AuthScreen from "../screens/user/AuthScreen";


const DefaultStackNavigatorOptionsStyle ={
        headerStyle:{
            backgroundColor:'#FF8E8F'
        },
        headerTintStyle:{
            fontFamily:'Quando-Regular'
        },
        headerTintColor:'white'
}

const Stack = createStackNavigator()
const ProductNavigator = ({navigation}) => {
    return (

        <Stack.Navigator screenOptions={DefaultStackNavigatorOptionsStyle}>
            <Stack.Screen name="Product Overview" component={ProductOverviewScreen}           />
            <Stack.Screen name="Product Detail" component={ProductDetailsScreen} />
            <Stack.Screen name="Add To cart" component={CartScreens}  />
            <Stack.Screen name="CartScreens" component={CartScreens} />
            <Stack.Screen name="OrderScreen" component={OrderScreen} />
        </Stack.Navigator>
        )
}

// screenOptions={{screenOptions:{headerStyle:{backgroundColor:'#FF*E*F'}}, headerTintColor:'white' }}

const OrderNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="order Screen" component={OrderScreen} />
        </Stack.Navigator>
    )
}

const AdminNavigator = () => {
    return (
        <Stack.Navigator screenOptions={DefaultStackNavigatorOptionsStyle}>
            <Stack.Screen name="Your Product" component={UserProductScreen} />
            <Stack.Screen name="Edit Product" component={EditProductScreen} />
        </Stack.Navigator>
    )
}


const Drawer = createDrawerNavigator()

const MainDrawer = () => {

    return(

    <Drawer.Navigator screenOptions={DefaultStackNavigatorOptionsStyle}>
        <Drawer.Screen name="Home" component={ProductNavigator} options={{
            title:'OverView Screen',
            // headerStyle:{
            //     backgroundColor:'#FF8E8F',
            // },
            // headerTintColor:'white',
            headerShown:false
            
        }}/>
        <Drawer.Screen name="Your Orders" component={OrderNavigator}  options={{headerShown:false}}/>
        <Drawer.Screen name="Admin" component={AdminNavigator} options={{headerShown:false}} />
    </Drawer.Navigator>

    )

}


const AuthStackNavigator =  createStackNavigator()

const AuthNavigator = () =>{
    return(

        <AuthStackNavigator.Navigator>
            <AuthStackNavigator.Screen name="Auth"  component={AuthScreen}  options={{headerShown:false}}/>
            <AuthStackNavigator.Screen name="Drawer" component={MainDrawer}  options={{headerShown:false}}/>
        </AuthStackNavigator.Navigator>
    )
}



export default MainDrawer;












