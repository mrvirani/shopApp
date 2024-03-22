import { StyleSheet, Text, View, Image } from 'react-native'
import React, { useState } from 'react'


const ImageItem = (props) => {


    const [loading, setLoading] = useState(false)

    const onLoading = (value) => {
        setLoading(value)
    }




    // const handleLoadEnd = (value) => {
    //     setLoading(value);
    // };


    // const defaultImage = 'https://www.shutterstock.com/shutterstock/photos/1323007565/display_1500/stock-vector-colorful-gulaal-powder-color-indian-festival-for-happy-holi-card-with-gold-patterned-and-crystals-1323007565.jpg'

    // const [defaultImg, setDefaultImage] = useState(props.image)

    // const handleError = e => {
    //     // e.stopPropagation()
    //     setDefaultImage(defaultImage)
    // }



    return (
        <View>

            {/* {console.log(props.imagess)} */}

            <Image
                source={{ uri: props.imagess }}
                onLoadStart={() => onLoading(true)}
                onLoadEnd={() => onLoading(false)}
                 />

            {loading ? (
                <View>
                    {/* {console.log(props+"check image in imgeItem")} */}
                    <Image
                        source={{ uri: ' https://res.cloudinary.com/dobanpo5b/image/upload/v1710500001/neom-brFQojtwSzE-unsplash_1_sbbfju.jpg' }}
                        style={styles.image}
                        // onLoadStart={() => onLoading(true)}
                        // onLoadEnd={() => onLoading(false)}
                       />

                </View>
            ) : (
                <Image
                    style={styles.image}
                    // onLoadStart={() => onLoading(true)}
                    // onLoadEnd={() => onLoading(false)}
                    source={{
                        // uri: (defaultImg ? defaultImg : defaultImage) || defaultImage 
                        uri: props.imagess
                        

                    }}
                // onError={handleError}
                />
            )
            }




        </View>
    )
}

const styles = StyleSheet.create({

    image: {
        width: '100%',
        height: '60%',

    }

})


export default ImageItem