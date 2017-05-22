import Immutable from 'immutable';
import * as actions from "../actions/index";
const defaultState = Immutable.Map({
    num:1,
    language:[],
    nums:{numss:1}
});
export default (state = defaultState ,action)=>{
    switch (action.type){
        case actions.ADD:
            return state.update("num",num=>++num);
            break;
        case actions.GET_LANGUAGE:
            console.info("sds",action);
            return state.set("language",action.payLoad);
            break;
        default:
            return state;
            break;
    }
}
