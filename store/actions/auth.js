


export const SIGN_UP = 'SIGN_UP';
export const SIGN_IN = 'SIGN_IN';


export const signUp = (email, password) =>{




    return async dispatch =>{


        console.log(email)
        console.log(password)

        const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCkbkjB-xIRYJjt7fNWnaV_csR53T2nDrA',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({
                email:email,
                password:password,
                returnSecureToken:true
            })
        }
        )

        console.log(response)

        if(!response.ok){
            throw new Error("SomeThing Went wrong")
        }
           
        const resData = await response.json()     
        console.log("resData: ")
        console.log(resData)
        console.log("resData: ")


        dispatch({ type: SIGN_UP }) 
    }

}


export const signIn = (email, password) =>{




    return async dispatch =>{


        console.log(email)
        console.log(password)

        const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithCustomToken?key=AIzaSyCkbkjB-xIRYJjt7fNWnaV_csR53T2nDrA',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({
                email:email,
                password:password,
                returnSecureToken:true
            })
        }
        )

        console.log(response)

        if(!response.ok){
            throw new Error("SomeThing Went wrong")
        }
           
        const resData = await response.json()     
        console.log("resData: ")
        console.log(resData)
        console.log("resData: ")


        dispatch({ type: SIGN_IN }) 
    }

}





