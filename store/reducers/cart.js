import CartItem from "../../models/CartItem"
import { ADD_TO_CART } from "../actions/cart"

import { REMOVE_FROM_CART } from "../actions/cart"
import { ADD_ORDER } from "../actions/order"
import { DELETE_PRODUCT } from "../actions/products"

const initialState = {
    items: {},
    TotalAmount: 0,

}

export default (state = initialState, action) => {

    
    switch (action.type) {

        case 'ADD_TO_CART':

            const addedProduct = action.product      //action lidhel product or click karel product
            const productPrice = addedProduct.price
            const productTitle = addedProduct.title
            const productImage = addedProduct.imageUrl

            let UpadateOrNewCartItem;


            if (state.items[addedProduct.id]) {   //click karel product like m1 id valo product cart ma chhe?
                //product alredy in cart

                UpadateOrNewCartItem = new CartItem(
                    productImage,
                    state.items[addedProduct.id].quantity + 1,
                    productPrice,
                    productTitle,
                    state.items[addedProduct.id].sum + productPrice
                )

            }


            else {
                    // add karvano product cart ma
                 UpadateOrNewCartItem = new CartItem(productImage,1, productPrice, productTitle, productPrice);  //here (quantity, price, title, totalamount(same as product price))

            }

            return {
                ...state,  //copy existing state
                items: { ...state.items, [addedProduct.id]: UpadateOrNewCartItem },
                TotalAmount: state.TotalAmount + productPrice
        
            } 

            case 'REMOVE_FROM_CART':

            const selctedProduct = state.items[action.PID]
            const selectedProductQyantity = selctedProduct.quantity
            let UpdateCartItems;

            if(selectedProductQyantity >1){
                    //reduce 1 product
                      UpdateCartItems = new CartItem(
                        selctedProduct.productImage,
                        selctedProduct.quantity -1,
                        selctedProduct.productPrice,
                        selctedProduct.productTitle,
                        selctedProduct.sum - selctedProduct.productPrice
                        
                    )

                    UpdateCartItems = { ...state.items, [action.PID]:UpdateCartItems }

            }else{
                    // delete wh ole product
                     UpdateCartItems = {...state.items}
                    delete UpdateCartItems[action.PID]


 
            }

            return{
                 ...state,
                 items: UpdateCartItems,
                 TotalAmount: state.TotalAmount -selctedProduct.productPrice
            }


            case ADD_ORDER:
                return initialState


            case DELETE_PRODUCT:

            if(!state.items[action.pid]){  // for check karva action.id valo product chhe cart ma jo na hoi to existing state will return
                console.log("available in cart")
                return state
            }

            const updatedItems = {...state.items}
            const itemTotal = state.items[action.pid].sum 
            delete updatedItems[action.pid]
            
            
             return {
                ...state,
                items: updatedItems,
                TotalAmount: state.TotalAmount - itemTotal 

             }

    }
   

    return state

}
