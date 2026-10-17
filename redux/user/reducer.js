import { RECEIVE_USER_ERROR, RECEIVE_USER_RESPONSE, SEND_USER_REQUEST } from "./type"

const initialState = {
    data:[],
    error:''
}

const userReducer = (state = initialState,action) =>{
    switch(action.type){
        case SEND_USER_REQUEST:
            return{
                ...state
            }
            case RECEIVE_USER_RESPONSE:
                return{
                    data:action.payload,error:''
                }

                case RECEIVE_USER_ERROR:
                    return{
                        data:[],error:action.payload
                    }
                    default:
                        return state
    }
}

export default userReducer