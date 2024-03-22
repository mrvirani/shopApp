import { Button, Image, StyleSheet, Text, TouchableNativeFeedback, View } from 'react-native'
import React, { useState } from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'

import { Platform } from 'react-native'

import MainButton from '../MainButton'
import ImageItem from '../UI/ImageItem'

import FastImage from 'react-native-fast-image'
import { ActivityIndicator } from 'react-native'




const ProductItem = (props) => {


    let TouchableButton = TouchableOpacity

    // if(Platform.OS === "android"){
    //         TouchableButton = TouchableNativeFeedback
    // }


    const defaultImage = 'https://www.shutterstock.com/shutterstock/photos/1323007565/display_1500/stock-vector-colorful-gulaal-powder-color-indian-festival-for-happy-holi-card-with-gold-patterned-and-crystals-1323007565.jpg'

    const [defaultimg, setDefaultImage] = useState(props.image)

    const handleError = e => {
        // e.stopPropagation()
        setDefaultImage(defaultImage)
    }



    //   const [defaultText, setDefaultText] = useState(props.title)

    //   const handleText = e => {
    //       // e.stopPropagation()
    //       setDefaultText("hello")
    //     }




    const [imageLoaded, setImageLoaded] = useState(false)

    const handleImageLoad = () => {
        setImageLoaded(true)
    }

    


    const theamImage = 'https://res.cloudinary.com/dobanpo5b/image/upload/v1710500001/neom-brFQojtwSzE-unsplash_1_sbbfju.jpg'




    return (


        <TouchableButton activeOpacity={0.8} onPress={props.onSelectCard} useForeground>
            {/* {console.log(props.image+"checking images")} */}

            <View style={styles.product}>

                
                    {!imageLoaded && <Image source={{ uri: theamImage }} style={{ width: '100%', height: '60%' }} />}
                    <Image
                        source={{ uri: defaultimg }}
                        style={{width: '100%', height: '60%', display: imageLoaded ? 'flex' : 'none'}}
                        onError={handleError}
                        onLoadEnd={handleImageLoad} 
                    />
                

                {/* <View>
                        {!imageLoaded && <Image source={{uri: theamImage}} />}

                        <Image source={{uri:props.image}}
                        style={{width:100,height:100,display:imageLoaded?'flex':'none'}}
                        onLoadEnd={handleImageLoad}/>
                    
                    </View> */}



                {/* <FastImage
                    style={styles.image}
                    
                    
                    
                    source={{
                        uri: props.image,
                        priority: FastImage.priority.high,
                    
                    }}
                    
                  resizeMode={FastImage.resizeMode.contain}
                /> */}


                {/* <Image style={styles.image}



                    // imagess={props.image}
                source={{ uri: defaultimg }}
                onError={handleError}
              //  loadingIndicatorSource={{uri: 'https://res.cloudinary.com/dobanpo5b/image/upload/v1710500001/neom-brFQojtwSzE-unsplash_1_sbbfju.jpg'}}
                 
                /> */}

                <View style={styles.details}>
                    <Text style={styles.title} >{props.title}</Text>
                    <Text style={styles.price}>$ {props.price}</Text>
                </View>

                <View style={styles.row}>

                    {props.children}


                </View>
            </View>

        </TouchableButton>

    )
}

const styles = StyleSheet.create({

    product: {

        elevation: 5,
        borderRadius: 5,
        borderColor: 'red',
        height: 300,
        margin: 20,
        overflow: 'hidden',
        backgroundColor: 'white'

    },

    image: {
        width: '100%',
        height: '60%',

    },

    details: {
        alignItems: 'center',
        height: '20%',
        marginTop: 10

    },

    title: {
        fontSize: 20,
        color: 'black',
        fontFamily: 'Sofia-Regular'

    },

    price: {
        fontSize: 14,
        fontFamily: 'Quando-Regular',
        marginVertical: 5,
        marginBottom: 5

    },

    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '10%',
        marginHorizontal: 12
    },

    btn1: {
        backgroundColor: 'red',
        width: 120,
        height: 40
    },

    bt1Text: {
        alignItems: 'center',
        justifyContent: 'center',
        justifyContent: 'BebasNeue-Regular'
    },

    btn2: {
        backgroundColor: 'orange',
        width: 120,
        height: 40
    },

    btn2Text: {
        alignItems: 'center',
        justifyContent: 'center'
    }


})

export default ProductItem