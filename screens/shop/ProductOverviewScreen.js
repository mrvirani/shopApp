import { StyleSheet, Text, View, FlatList, ToastAndroid, } from 'react-native'
import React, { useEffect, useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'

import ProductItem from '../../components/shop/ProductItem'
import { ListItem, SearchBar } from "react-native-elements"; 

import * as cartActions from '../../store/actions/cart'

// import { HeaderButtons, Item } from 'react-navigation-header-buttons';

// import HeaderButton from '../../UI/HeaderButton'

import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import CustomHeaderButton from '../../components/UI/HeaderButton'

import CartScreens from './CartScreens'

import ProductDetailsScreen from './ProductDetailsScreen'
import MainButton from '../../components/MainButton'


import * as Animatable from 'react-native-animatable';


const ProductOverviewScreen = (props) => {

    const products = useSelector(state => state.products.availableProducts)//so here we can get our products and store them in a constant products by calling a useselector

    const dispatch = useDispatch();

    const defaultImage = 'https://people.com/thmb/rsb20cJKBW_qjM3lQyfaItOYHJ0=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc():focal(614x449:616x451)/Holi-01-a63575dc03ed467f8922efe3992a4060.jpg'

    const [defaultImg, setDefaultImage] = useState('https://people.com/thmb/rsb20cJKBW_qjM3lQyfaItOYHJ0=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc():focal(614x449:616x451)/Holi-01-a63575dc03ed467f8922efe3992a4060.jpg')


    const selectItemHandler = (id, title) => {
        props.navigation.navigate('Product Detail',
            {
                productId: id,
                productTitle: title
            });
    }


    useEffect(() => {

        props.navigation.setOptions({
            title: "OverView Screen",
            headerLeft: () => {
                return (
                    <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                        <Item iconName='bars' title='bars' onPress={() => props.navigation.toggleDrawer()} style={{ marginLeft: 15 }} />
                    </HeaderButtons>
                )
            },
            headerRight: () => {
                return (
                    <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                        <Item iconName='shopping-cart' title="shoping cart" onPress={() => props.navigation.navigate('Add To cart')} style={{ marginRight: 12 }} />
                    </HeaderButtons>
                )
            }


        }, [])
    })




    // useEffect(()=>{
    //     headerTitle:'hhhhh',
    //     headerRight=()=>(
    //         <HeaderButtons HeaderButtonComponent={HeaderButton}>
    //             <Item title="cart" iconName='star' iconSize={20}
    //             onPress={()=>{
    //                 props.navigation.navigate('CartScreens')
    //             }}
    //             />
    //         </HeaderButtons>
    //     )


    // },[])



    return (

        <View
            // animation={'wobble'}
            // Flippers="flipInX"
            // easing="ease-out" iterationCount="4" Fading Exits='fadeOut'
            // duration={1000}
            // delay={100}
            >
                

            {/* <SearchBar
            
            placeholder= "seach Here..."
            lightTheme
            round 
          value={this.state.searchValue} 
          onChangeText={(text) => this.searchFunction(text)} 
          autoCorrect={false}

            /> */}

            <FlatList
                data={products}

                // onViewableItemsChanged={({item})=>{   this one is use for show flatlist item in console
                //     console.log(item)
                // }}
                
                keyExtractor={item => item.id.toString()}//this one is optional
                renderItem={itemData =>
                    <View>
                        {/* {console.log(itemData.item.imageUrl)} */}
                        <ProductItem
                            image={itemData.item.imageUrl}
                            title={itemData.item.title}
                            price={itemData.item.price}
                            onSelectCard={() => { selectItemHandler(itemData.item.id, itemData.item.title) }}  //itemData.id point out model's single product and it's id we have to shere on next screen
                        // onAddToCartScreen={() => {
                        //     // console.log(itemData.item)
                        //     // console.log("helloooooo")
                        //     dispatch(cartActions.addToCart(itemData.item))
                        // }}
                        >

                            <MainButton style={{ backgroundColor: 'green' }} onPress={() => selectItemHandler(itemData.item.id, itemData.item.title)} >
                                Details Screen
                            </MainButton>

                            <MainButton style={{ backgroundColor: 'orange' }} onPress={() =>
                                dispatch(cartActions.addToCart(itemData.item), ToastAndroid.showWithGravity('Product is Added in Cart...', ToastAndroid.SHORT, ToastAndroid.BOTTOM, 25, 50))


                            }>
                                Add to Cart
                            </MainButton>

                        </ProductItem>

                    </View>


                }

            />

        </View>

    )





}


const styles = StyleSheet.create({})

export default ProductOverviewScreen;