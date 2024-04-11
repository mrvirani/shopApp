import Product from "../../models/product"
import products from "../reducers/products"

export const DELETE_PRODUCT = 'DELETE_PRODUCT'

export const CREATE_PRODUCT = 'CREATE_PRODUCT'

export const UPDATE_PRODUCT = 'UPDATE_PRODUCT'

export const SET_PRODUCT = 'SET_PRODUCT'

export const fetchProduct = () => {

    return async (dispatch,getState) => {


        //any asyc code you can want...
        const userId = getState().auth.userId;
        console.log(userId);
        try {


            //here use of fetch to not only fetching or get data but but we can also get, post, put, delete any kind of request send
            const response = await fetch('https://shopapp-18e5a-default-rtdb.firebaseio.com/Products.json'
                // {
                // method: 'GET',   //no need in Get request it's by default
                // headers: {                //no need in Get request it's by default
                //     'Content-Type': 'application/json' 
                // },
                //  body: JSON.stringify({   ////no need in Get request it's by default
                //     title,
                //     description,
                //     imageUrl,
                //     price
                // })

                // }
            )


          

            const resData = await response.json();

            console.log("fetch data product",resData)
            const loadedProducts = []

            // console.log(response)
            // console.log(response.ok)

            if (!response.ok) {   // when status code is not 200
                throw new Error('Something went wrong!!!')
            }

            for (const key in resData) {
                loadedProducts.push(new Product(key, resData[key].ownerId, resData[key].title,  resData[key].imageUrl, resData[key].description, resData[key].price))
                // console.log("title: " + resData[key].title)
                // console.log("price: " + resData[key].price)
                // console.log("imageUrl: " + resData[key].imageUrl)
                // console.log("description: " + resData[key].description)

            }


            dispatch({
                type: SET_PRODUCT,
                products: loadedProducts,
                UserProducts: loadedProducts.filter(prod => prod.ownerId === userId) });

        } catch (err) {
            //here we do more - send to cutom analytics server 
            throw err
        }


    }
}


export const deleteProduct = productId => {



    return async (dispatch,getState) => {

        const token = getState().auth.token;

        //here use of fetch to not only fetching or get data but but we can also get, post, put, delete any kind of request send
        const response = await fetch(`https://shopapp-18e5a-default-rtdb.firebaseio.com/Products/${productId}.json?auth=${token}`, {
            method: 'DELETE',

        })

        // console.log(response)

        if(!response.ok){
            throw new Error('SomeThing went wrong')
        }


        dispatch({ type: DELETE_PRODUCT, pid: productId })
    }


}

export const createProduct = (title, imageUrl, description, price) => {

    return async (dispatch,getState) => {

        
            const token = getState().auth.token
            const userId = getState().auth.userId

           

        //any asyc code you can want...

        //here use of fetch to not only fetching or get data but but we can also get, post, put, delete any kind of request send
        const response = await fetch(`https://shopapp-18e5a-default-rtdb.firebaseio.com/Products.json?auth=${token}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title,
                imageUrl,
                description,
                price,
                ownerId: userId
            })

        })

        const resData = await response.json();

        console.log("create product ",resData)

        if(!response.ok){
            throw new Error('SomeThing went wrong  mmmmmmmm')
        }


        dispatch({
            type: CREATE_PRODUCT, productData: {
                id: resData.name,
                title,
                description,
                imageUrl,
                price,
                ownerId:userId

            }
        })




    }


}

export const updateProduct = (id, title,imageUrl, description) => {


    return async  (dispatch,getState)=>{

        // console.log("whole data of users : "+getState)  // anathi complete data malse redux store no je usethi 

        const token = getState().auth.token

       const response =  await fetch(`https://shopapp-18e5a-default-rtdb.firebaseio.com/Products/${id}.json?auth=${token}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title,
                description,
                imageUrl
            }),

            
            
        })

        if(!response.ok){
            throw new Error('SomeThing went wrong')
        }
        
        dispatch({
           type: UPDATE_PRODUCT, pid: id, productData: {
               title: title,
               imageUrl: imageUrl,
               description: description,
               // price=price     // js feature is if properties and value have same name then you can pass direct value(Foe EXAMPLE we show above in createPRODUCT)
           }
       })  //// this will be coment because when we update any product then i ahve to not change price so....
       

    }

    }