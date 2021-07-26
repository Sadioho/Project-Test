import {
    GET_LIST_QUESTION,
    GET_LIST_QUESTION_SUCCESS, 
    GET_LIST_QUESTION_FAILED
  } from "../constants/question";  
  
  export function getListQuestion() { 
    return {
      type: GET_LIST_QUESTION, 
    };
  }
  
  export function getListQuestionSuccess(payload) {
    return {
      type: GET_LIST_QUESTION_SUCCESS,
      payload // payload: payload
    };
  }
  
  export function getListQuestionFailure(message = "") {
    return {
      type: GET_LIST_QUESTION_FAILED,
      message // message: message
    };
  }
  