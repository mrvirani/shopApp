import PRODUCTS from '../../data/dummy-data'
import Product from '../../models/product';
import { CREATE_PRODUCT, DELETE_PRODUCT, SET_PRODUCT, UPDATE_PRODUCT } from '../actions/products';

const initialState = {
    availableProducts: PRODUCTS,
    userProducts: PRODUCTS.filter(prod=> prod.ownerId ==='u1')
};

export default  (state= initialState,action)=> {
   
   switch(action.type){

    case SET_PRODUCT:


        return{
            
            availableProducts: action.products,
            userProducts: action.products.filter(prod=> prod.ownerId ==='u1')
            
        }


    case DELETE_PRODUCT: // for delete product we have it delete from userOwerview Screen , userProduct SCrren and also from cart screen (for cart screen we go on cart reducer)

        return{
            ...state,   //below userProduct will keep all product which one is not match with action.pid
            userProducts: state.userProducts.filter(product=> product.id !== action.pid),
            availableProducts:state.availableProducts.filter(product=> product.id !== action.pid)
        
        }

        case CREATE_PRODUCT:

        const newProduct = new Product(
            action.productData.id,
             'u1', 
             action.productData.title, 
             action.productData.imageUrl,
             action.productData.description,
             action.productData.price)

        return{
            ...state,
            availableProducts:state.availableProducts.concat(newProduct),  //OLDPRODUCT + NEWPRODUCT
            userProducts: state.userProducts.concat(newProduct)

        }

        case UPDATE_PRODUCT:

        //========== this is for product screen product =============

        const productIndex= state.userProducts.findIndex(prod => prod.id === action.pid)


        console.log("jhjhjh"+productIndex)
        const updatedproduct = new Product(
            action.pid,
            state.userProducts[productIndex].ownerId,   //In which place i have use state. somthing then it,s i have place same value as it is(value not changed)
            action.productData.title,
            action.productData.imageUrl,  // in which place i have use action. somthing then this place i have changed value depending on action
            action.productData.description,
            state.userProducts[productIndex].price,  // here i have to take same value as product so we use state. ...
        )


        const updateUserProduct = [...state.userProducts]  // copy our state's userproduct as an array
        updateUserProduct[productIndex] = updatedproduct  //perticuler index parni product parni item par updated product ne place karshu

        //=================================================

        //=============== this is for main owerview scrren,s product changes ====================
        const availableProductIndex = state.availableProducts.findIndex(prod => prod.id === action.pid)

        const updateAvailableProduct = [...state.availableProducts]
        updateAvailableProduct[availableProductIndex] = updatedproduct  

        //==================================================

        return{
                ...state,
                userProducts:updateUserProduct,
                availableProducts:updateAvailableProduct
        }
   }
   
   
   
    return state;
}