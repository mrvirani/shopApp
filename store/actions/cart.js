

export const ADD_TO_CART = 'ADD_TO_CART'

export const REMOVE_FROM_CART = 'REMOVE_FROM_CART'

export const addToCart = product =>{  //full product object recive karse
    return { type: ADD_TO_CART, product:product}
}

export const removeFromcart  = id =>{
    return { type:REMOVE_FROM_CART, PID: id }
}