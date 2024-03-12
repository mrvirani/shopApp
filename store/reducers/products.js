import PRODUCTS from '../../data/dummy-data'
import { DELETE_PRODUCT } from '../actions/products';

const initialState = {
    availableProducts: PRODUCTS,
    userProducts: PRODUCTS.filter(prod=> prod.ownerId ==='u1')
};

export default  (state= initialState,action)=> {
   
   switch(action.type){
    case DELETE_PRODUCT: // for delete product we have it delete from userOwerview Screen , userProduct SCrren and also from cart screen (for cart screen we go on cart reducer)

        return{
            ...state,   //below userProduct will keep all product which one is not match with action.pid
            userProducts: state.userProducts.filter(product=> product.id !== action.pid),
            availableProducts:state.availableProducts.filter(product=> product.id !== action.pid)
        
        }


   }
   
   
    return state;
}