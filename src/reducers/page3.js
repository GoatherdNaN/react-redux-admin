import Immutable from 'immutable';
import * as actions from "../constants/type";
import {deepCopy} from "../utils/common";
const defaultState = Immutable.Map({
    statisticsData:null
});
export default (state = defaultState ,action)=>{
    switch (action.type){
        case actions.SET_STATISTICS_DATA:
            return state.update("statisticsData",(statisticsData)=>{
              return action.payLoad
            })
            break;
        default:
            return state;
            break;
    }
}
