import {
    GET_DATA_ACCOUNT,
    GET_DATA_ACCOUNT_SUCCESS, 
    GET_DATA_ACCOUNT_FAILED 
  } from "../constants/account"; 
  
export function getDataAccount(){
    return{
        type:GET_DATA_ACCOUNT  
    }
}

export function getDataAccountSuccess(payload){
    return{
        type:GET_DATA_ACCOUNT_SUCCESS,
        payload:payload
    }
}

export function getDataAccountFailure(message){
    return{
        type:GET_DATA_ACCOUNT_FAILED,
        message:message

    }
}

