

// import { AsyncStorage } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage'; 

// export const SIGN_UP = 'SIGN_UP';
// export const LOGIN = 'LOGIN';

export const AUTHENTICATE = 'AUTHENTICATE'
export const LOGOUT = 'LOGOUT'

// let timer;

export const authenticate = (userId, token)=>{

    return dispatch({type: AUTHENTICATE, userId:userId, token:token})
    // return dispatch =>{
    //     dispatch(setLogoutTimer(expiryTime))  // authenticate thase tyare j logout function karshu
    // }
   
}

 
export const signUp = (email, password) => {

    return async dispatch => {


        console.log("EMAIL:"+ email)
        console.log("PASSWORD"+ password)

        const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCkbkjB-xIRYJjt7fNWnaV_csR53T2nDrA',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                    returnSecureToken: true
                })
            }
        )

        // console.log(response)

        // if (!response.ok) {
        //     const errorResData = await response.json()

        //     console.log(errorResData)

        //     const errorId = errorResData.errors.message;
        //     console.log(errorId)

        //     if (errorId === 'INVALID_EMAIL') {
        //         message = 'You enter Invalid Email'
        //     } else if (errorId === 'EMAIL_NOT_FOUND') {
        //         message = 'This email id not valid'
        //     } else if (errorId === 'INVALID_PASSWORD') {
        //         message = 'This password is not valid'
        //     }
        //     throw new Error(message)
        // }

        const resData = await response.json()
       
        // console.log(resData)
        console.log("Token is: " +resData.idToken)
            
            dispatch(authenticate(resData.localId, resData.idToken))

        // dispatch({ type: SIGN_UP , token:resData.idToken, userId: resData.localId})
            
        const expirationDate = new Date(new Date().getTime() + parseInt(resData.expiresIn) * 1000)
    saveDataToStorage(resData.idToken, resData.localId, expirationDate)     
    }

}


export const login = (email, password) => {




    return async dispatch => {

        // console.log(email)
        // console.log(password)

        const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCkbkjB-xIRYJjt7fNWnaV_csR53T2nDrA',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    password: password,  
                    returnSecureToken: true
                })
            }
        )

        // console.log(response)

        // if (!response.ok) {
        //     const errorResData = await response.json()

        //     console.log(errorResData)

        //     const errorId = errorResData.errors.message;
        //     console.log(errorId)

        //     if (errorId === 'INVALID_EMAIL') {
        //         message = 'You enter Invalid Email'
        //     } else if (errorId === 'EMAIL_NOT_FOUND') {
        //         message = 'This email id not valid'
        //     } else if (errorId === 'INVALID_PASSWORD') {
        //         message = 'This password is not valid'
        //     }
        //     throw new Error(message)
        // }

        const resData = await response.json()
        // console.log("resDataaaaaaaa in auth action: "+ resData)
      

        // console.log("response errorrrrr: "+response.Error)

        dispatch(authenticate(resData.localId, resData.idToken))
       // dispatch({ type: LOGIN , token:resData.idToken, userId: resData.localId})
            const expirationDate = new Date(new Date().getTime() + parseInt(resData.expiresIn) * 1000)
        saveDataToStorage(resData.idToken, resData.localId, expirationDate)     
    }
  
}


const saveDataToStorage = (token, userId, expirationDate) => {

    AsyncStorage.setItem('userData', JSON.stringify({
        token: token,
        userId: userId,
        expiryDate: expirationDate.toISOString()
    })) 
}


export const logOut = () =>{

    // clearLogoutTimer();
    // AsyncStorage.removeItem('userData');   // remove data to our localstorage  
    return { type: LOGOUT}
      
}

// const clearLogoutTimer =()=>{
//     if(timer){
//         clearTimeout(timer)  //also biltin function ==> clear timer
//     }
// }


// const setLogoutTimer = expirationTime => {
   
//    return dispatch=>{
//      timer = setTimeout(()=>{
   
//            dispatch(logOut())
//        }, expirationTime/1000)  //setTime out is bulit in method  logOut is called when expiration time is complate

//    }
// }



