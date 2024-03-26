


export const SIGN_UP = 'SIGN_UP';
export const LOGIN = 'LOGIN';


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

        console.log(response)

        if (!response.ok) {
            const errorResData = await response.json()

            console.log(errorResData)

            const errorId = errorResData.errors.message;
            console.log(errorId)

            if (errorId === 'INVALID_EMAIL') {
                message = 'You enter Invalid Email'
            } else if (errorId === 'EMAIL_NOT_FOUND') {
                message = 'This email id not valid'
            } else if (errorId === 'INVALID_PASSWORD') {
                message = 'This password is not valid'
            }
            throw new Error(message)
        }

        const resData = await response.json()
        console.log("resData: ")
        console.log(resData)
        console.log("resData: ")


        dispatch({ type: SIGN_UP })
    }

}


export const login = (email, password) => {




    return async dispatch => {

        console.log(email)
        console.log(password)

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

        console.log(response)

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
        console.log("resData: ")
        console.log(resData)
        console.log("resData: ")

        console.log(response.Error)


        dispatch({ type: LOGIN })
    }

}





