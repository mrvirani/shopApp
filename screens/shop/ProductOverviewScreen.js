import { StyleSheet, Text, View, FlatList } from 'react-native'
import React from 'react'

import { useSelector } from 'react-redux'

import ProductItem from '../../components/shop/ProductItem'

const ProductOverviewScreen = (navigation) => {

    const products = useSelector(state => state.products.availableProducts)//so here we can get our products and store them in a constant products by calling a useselector

    return (

        <FlatList
            data={products}
            keyExtractor={item => item.id}//this one is optional
            renderItem={itemData => <View>
                <ProductItem
                    image={itemData.item.imageUrl}
                    title={itemData.item.title}
                    price={itemData.item.price}
                    onViewDetails={() => { navigation.navigate('ProductDetail'); }}
                    onAddToCartScreen={() => { }}
                /></View>}
        />

    )



}


const styles = StyleSheet.create({})

export default ProductOverviewScreen;