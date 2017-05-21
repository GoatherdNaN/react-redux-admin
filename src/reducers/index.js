import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux';
import global from './global'
import page1 from './page1'
import page3 from './page3'
export default combineReducers({
    routing: routerReducer,
    global,
    page1,
    page3
})
