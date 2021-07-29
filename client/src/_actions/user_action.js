import axios from "axios";
import {LOGIN_USER,REGISTER_USER} from './types';

export function loginUser(dataTosubmit) {
    // 파라미터로 body객체를 받음 

    const request =  axios.post('api/users/login',dataTosubmit)
    .then(response=> response.data )

    // reducer에 넘기는 작업을 함 
    return {
        type:LOGIN_USER,
        payload : request
    }
}

export function registerUser(dataTosubmit) {
    // 파라미터로 body객체를 받음 

    const request =  axios.post('api/users/register',dataTosubmit)
    .then(response=> response.data )

    // reducer에 넘기는 작업을 함 
    return {
        type:REGISTER_USER,
        payload : request
    }
}