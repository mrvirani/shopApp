// import { LOGIN, SIGN_UP } from "../actions/auth";
import { AUTHENTICATE, LOGOUT } from "../actions/auth";

const initialState = {
    token:null,
    userId:null

};

export default(state= initialState, action) =>         {


    switch(action.type){

            case AUTHENTICATE:{
                return{
                    token:action.token,
                    userId:action.userId
                }
            }

            case LOGOUT:
                return initialState


        // case LOGIN:{
        //     return {
        //         token:action.token,
        //         userId: action.userId
        //     }

        // }

        // case SIGN_UP:{
        //     return { 
        //         token:action.token,
        //         userId: action.userId
        //     }


        // }

        default: 
        return state

    }

}