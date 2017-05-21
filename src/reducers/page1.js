import Immutable from 'immutable';
import * as actions from "../constants/type";
import {deepCopy,insertKey} from "../utils/common";
const defaultState = Immutable.Map({
    instockData:null
});
export default (state = defaultState ,action)=>{
    switch (action.type){
        case actions.SET_INSTOCK_DATA:
            return state.update("instockData",(instockData)=>{
              action.payLoad.data=insertKey(action.payLoad.data);
              return action.payLoad
            })
            break;
        case actions.INSTOCK_EDIT:
            return state.update("instockData",(instockData)=>{
              let needEditDateIndex = instockData.data.findIndex((n)=>n.listNumber === action.params.listNumber);
              instockData.data[needEditDateIndex].key=needEditDateIndex;
              instockData.data[needEditDateIndex]=Object.assign(instockData.data[needEditDateIndex],action.params);
              return instockData
            })
            break;
        case actions.SET_INSTOCK_NEWLIST:
            return state.update("instockData",(instockData)=>{
              let newDate = deepCopy(instockData);
              newDate.data.unshift(action.payLoad);
              newDate.data.pop();
              newDate.data = insertKey(newDate.data);
              return newDate
            })
            break;
        case actions.DELETE_INSERT:
            return state.update("instockData",(instockData)=>{
              let dataCopy = deepCopy(instockData);
              let needEditDateIndex = dataCopy.data.findIndex((n)=>n.listNumber === action.payLoad.listNumber);
              dataCopy.data.splice(needEditDateIndex,1);
              dataCopy.data.push(action.payLoad.insertData);
              dataCopy.data = insertKey(dataCopy.data);
              return dataCopy
            })
            break;
        default:
            return state;
            break;
    }
}
