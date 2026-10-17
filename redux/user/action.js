import { getUserInfo } from "@/services/auth"
import { RECEIVE_USER_ERROR, RECEIVE_USER_RESPONSE, SEND_USER_REQUEST } from "./type"

export const sendUserRequest = ()=>{
    return{
        type:SEND_USER_REQUEST
    }
}

export const reciveUserResponse = (data)=>{
    return{
        type:RECEIVE_USER_RESPONSE,
        payload:data
    }
}

export const reciveUserError = (error)=>{
    return{
        type:RECEIVE_USER_ERROR,
        payload:error
    }
}

export const getUserAction = (id)=>{
    return async(dispatch)=>{
        dispatch(sendUserRequest())

        try{
            const user = await getUserInfo(id)
            dispatch(reciveUserResponse(user))
        } catch(error){
            dispatch(reciveUserError(error.message))
        }       
    }
}