import { StyleSheet, Text, View, FlatList, ToastAndroid, ActivityIndicator, Button } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'

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

import * as ProductActions from '../../store/actions/products'

import {createShimmerPlaceholder} from 'react-native-shimmer-placeholder'
import LinearGradient from 'react-native-linear-gradient';

const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient)

const ProductOverviewScreen = (props) => {


    const products = useSelector(state => state.products.availableProducts)//so here we can get our products and store them in a constant products by calling a useselector

    const dispatch = useDispatch();

    const defaultImage = 'https://people.com/thmb/rsb20cJKBW_qjM3lQyfaItOYHJ0=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc():focal(614x449:616x451)/Holi-01-a63575dc03ed467f8922efe3992a4060.jpg'

    const [defaultImg, setDefaultImage] = useState('https://people.com/thmb/rsb20cJKBW_qjM3lQyfaItOYHJ0=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc():focal(614x449:616x451)/Holi-01-a63575dc03ed467f8922efe3992a4060.jpg')



    const [isLoding, setIsLoding] = useState(false)
    const [error, setError] = useState()




    const loadedProducts = useCallback(



        async () => {
            console.log("hi")

            setError(null)
            console.log("hhhhh")
            setIsLoding(true);

            try {
                await dispatch(ProductActions.fetchProduct());  // await function will wait for this dispatch function done
            } catch (err) {
                setError(err.message)
            }

            // try {
            // } catch (err) {
            //     setError(err)
            // }
            setIsLoding(false)

        }, [dispatch, setIsLoding, setError]

    )


    //this useffect when run ==> After the components is launched
    useEffect(() => {    //event is willFocus didFocus willBlur didBlur 
        const willFocusSub = props.navigation.addListener('focus', loadedProducts);

        return () => {  // clean up function  // this component is destroyes and there we can clean up theat listner
            willFocusSub.remove()   //load products rebuilds
        }
    }, [loadedProducts])

    useEffect(() => {

        loadedProducts()

        // const loadedProducts = () => {
        //     setIsLoding(true);
        //     dispatch(ProductActions.fetchProduct())
        //       .then(() => setIsLoding(false))
        //       .catch(error => {
        //         // Handle error if needed
        //         console.error('Error fetching products:', error);
        //         setIsLoding(false);
        //       });
        //   };

        //   loadedProducts();

    }, [dispatch, loadedProducts])





    // if(isLoding){
    //     return (<View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
    //         <ActivityIndicator size='large' color='red'/>
    //     </View>)
    // }



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


   


    // if (isLoding) {   // data fetch thata time lage tyare
    //     return <View style={styles.indicator}>
    //         <ActivityIndicator size='large' color={'red'} />
    //     </View>
    // }

    if (!isLoding && products.length === 0) {   //product item empty hoi tyare
        return <View style={styles.indicator}>
            <Text>No product is available.Please add first product!!!</Text>
        </View>
    }


    return (


        <View style={{ flex: 1 }}

        // animation={'wobble'}
        // Flippers="flipInX"
        // easing="ease-out" iterationCount="4" Fading Exits='fadeOut'
        // duration={1000}
        // delay={100}
        >



            <FlatList
                data={products}

                // onViewableItemsChanged={({item})=>{   this one is use for show flatlist item in console
                //     console.log(item)
                // }}

                keyExtractor={item => item.id.toString()}//this one is optional
                onRefresh={()=>loadedProducts()}
                refreshing={isLoding}
                renderItem={itemData =>
                    <View>
                        {/* {console.log(itemData.item.imageUrl)} */}

                            
            {/* <View style={{height:300, borderRadius:5, padding: 20, flex:1}}  > */}
            

                {/* <ShimmerPlaceholder style={{width:"100%", height:"60%"}} shimmerColors={["#c0c0c0","#e7e8e9", "#c0c0c0"]} >

                    
                </ShimmerPlaceholder> */}

                {/* <ShimmerPlaceholder  style={{ alignItems: 'center',width:"100%",height: '20%'}} > */}

                {/* <ShimmerPlaceholder  style={{ alignItems: 'center',height: '20%',marginTop: 10}} />
                <ShimmerPlaceholder  style={{ alignItems: 'center',height: '20%',marginTop: 10}} /> */}

                {/* </ShimmerPlaceholder>
                 */}

                 

            {/* </View> */}

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


const styles = StyleSheet.create({

    indicator: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export default ProductOverviewScreen;