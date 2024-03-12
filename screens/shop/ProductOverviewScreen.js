import { StyleSheet, Text, View, FlatList } from 'react-native'
import React, { useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'

import ProductItem from '../../components/shop/ProductItem'

import * as cartActions from '../../store/actions/cart'

// import { HeaderButtons, Item } from 'react-navigation-header-buttons';

// import HeaderButton from '../../UI/HeaderButton'

import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import CustomHeaderButton from '../../components/UI/CustomHeaderButton'

import CartScreens from './CartScreens'

import ProductDetailsScreen from './ProductDetailsScreen'
import MainButton from '../../components/MainButton'

const ProductOverviewScreen = (props) => {

    const products = useSelector(state => state.products.availableProducts)//so here we can get our products and store them in a constant products by calling a useselector

    const dispatch = useDispatch();

    const selectItemHandler = (id,title) => {
        props.navigation.navigate('Product Detail',
            {
                productId: id,
                productTitle:title
            });
    }


    useEffect(() => {

        props.navigation.setOptions({
            title: "OverView Screen",
            headerLeft: () => {
                return (
                    <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                        <Item iconName='bars' title='bars' onPress={() => props.navigation.toggleDrawer()} />
                    </HeaderButtons>
                )
            },
            headerRight: () => {
                return (
                    <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                        <Item iconName='shopping-cart' title="shoping cart" onPress={() => props.navigation.navigate('Add To cart')} />
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

        <FlatList
            data={products}
            keyExtractor={item => item.id.toString()}//this one is optional
            renderItem={itemData => <View>
                <ProductItem
                    image={itemData.item.imageUrl}
                    title={itemData.item.title}
                    price={itemData.item.price}
                    onSelectCard={() => {selectItemHandler(itemData.item.id,itemData.item.title) }}  //itemData.id point out model's single product and it's id we have to shere on next screen
                    // onAddToCartScreen={() => {
                    //     // console.log(itemData.item)
                    //     // console.log("helloooooo")
                    //     dispatch(cartActions.addToCart(itemData.item))
                    // }}
                >

                    <MainButton style={{ backgroundColor: 'green' }} onPress={ ()=> selectItemHandler(itemData.item.id,itemData.item.title)} >
                        Details Screen
                    </MainButton>

                    <MainButton style={{ backgroundColor: 'orange' }} onPress={()=> dispatch(cartActions.addToCart(itemData.item))}>
                        Add to Cart
                    </MainButton>

                </ProductItem>

            </View>}
        />

    )





}


const styles = StyleSheet.create({})

export default ProductOverviewScreen;