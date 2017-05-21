/**
 * Created by edlan on 3/27 0027.
 */
import {LOCATION_CHANGE} from 'react-router-redux';
import Immutable from 'immutable';
import {LOADING} from '../constants/type';
const defaultState = Immutable.fromJS({
    displayStatus:'show',
    hasBack: false,
    routeAction: 'PUSH',
    auth:sessionStorage.auth || false
});
export default (state = defaultState, action) => {
    switch (action.type) {
        case LOADING:
            return state.update("displayStatus",(displayStatus)=>{
              if(action.payLoad){
                displayStatus = 'show';
              } else {
                displayStatus = 'hide';
              }
              return displayStatus
            });
            break;
        case LOCATION_CHANGE:
            return state.withMutations(i => {
                i
                    .set('hasBack', action.payload.pathname !== '/')
                    .set('routeAction', action.payload.action)
            });
            break;
        case 'LOGIN':
            return state.update("auth",(auth)=>{
              if ('admin' === action.payLoad.username && 123456 == action.payLoad.password) {
                sessionStorage.setItem("auth",true);
                if(action.payLoad.isRemember){
                  localStorage.setItem("username",action.payLoad.username);
                  localStorage.setItem("password",action.payLoad.password);
                } else if(!action.payLoad.isRemember&&sessionStorage.username){
                  localStorage.removeItem("username");
                  localStorage.removeItem("password");
                }
                return true;
              }
              alert('用户名或密码错误');
              return false;
            });
        case 'LOGIN_OUT':
            sessionStorage.removeItem("auth");
            return state.set("auth",false);
        default:
            return state;
    }
}
