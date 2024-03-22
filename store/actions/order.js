import Order from "../../models/Order"



export const ADD_ORDER = 'ADD_ORDER'

export const SET_ORDER = 'SET_ORDER'




export const addOrder = (cartItems, totalAmount) => {



        return async dispatch => {

                const date = new Date()

                const response = await fetch('https://shopapp-18e5a-default-rtdb.firebaseio.com/orders/u1.json', {
                        method: 'POST',
                        headers: {
                                'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                                cartItems,
                                totalAmount,
                                date:date.toString() 
                        }),



                })  

                if (!response.ok) {
                        throw new Error('SomeThing went wrong!!')
                }


                const resData = await response.json();




                dispatch(

                        { type: ADD_ORDER, orderData: { id: resData.name, items: cartItems, amount: totalAmount, date: date } }

                )

        }


}


export const fetchOrder =()=>{

        
        return async dispatch =>{
                //any asyc code you can write here

                try{

                        const response = await fetch('https://shopapp-18e5a-default-rtdb.firebaseio.com/orders/u1.json'
                        )
        
                        if(!response.ok){
                                throw new Error('Something went wrong!!![Fetch Order]')
                        }
        
        
                        const resData = await response.json();
                        const loadedOrders = []
        
                        for(const key in resData){
                                loadedOrders.push(new Order(key,resData[key].cartItems, resData[key].totalAmount, new Date(resData[key].date)))
                        }

                    
        
        
        
                        dispatch({ type:SET_ORDER, orders:loadedOrders})
                        
                }catch(err){
                        throw err
                }

               






                
        }

}



