


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



import { createStackNavigator } from "@react-navigation/stack";

import ProductOverviewScreen from "../screens/shop/ProductOverviewScreen";

import ProductDetailsScreen from "../screens/shop/ProductDetailsScreen";

const Stack = createStackNavigator()
const ProductNavigator = () => {
    return (
        
        <Stack.Navigator screenOptions={{ headerStyle: { backgroundColor: 'black' },headerTintColor:'white' }}>
            <Stack.Screen name="ProductOverview" component={ProductOverviewScreen} />
            <Stack.Screen name="ProductDetail" component={ProductDetailsScreen} />
        </Stack.Navigator>)
}

export default ProductNavigator;












