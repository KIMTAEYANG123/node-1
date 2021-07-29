import {LOGIN_USER, REGISTER_USER} from '../_actions/types';

// 이전 스테이트와 액션을 넘기고 다음 스테이트를 만듦
export default function(state ={}, action){
    switch (action.type) {
        case LOGIN_USER:
            return {...state, loginSuccess: action.payload}
            break;
        case REGISTER_USER:
            return {...state, register : action.payload}
            break;
        default:
            return state;
    }
}