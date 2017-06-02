import {takeEvery} from 'redux-saga';
import {put,call} from 'redux-saga/effects';
import {
  LOGIN_FLOW,
  GET_INSTOCK_DATA,
  SET_INSTOCK_DATA,
  INSTOCK_EDIT,
  NEW_INSTOCK_LIST,
  SET_INSTOCK_NEWLIST,
  INSTOCK_DELETE,
  DELETE_INSERT,
  GET_STATISTICS_DATA,
  SET_STATISTICS_DATA
} from '../constants/type';
import commonMap from "../actions/common";
import actionMap from "../actions/page1";
import statisticsMap from "../actions/page3";

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
function* rootSagas(state) {
    if(LOGIN_FLOW == state.type){
      let instockListRes = yield call(commonMap[state.type],state.params);
      yield put({type:"LOGIN",payLoad:state.params})
    }
    if(GET_INSTOCK_DATA == state.type){
      let instockListRes = yield call(actionMap[state.type],state.params);
      yield put({type:SET_INSTOCK_DATA,payLoad:instockListRes})
    }
    if(INSTOCK_EDIT == state.type){
      yield call(actionMap[state.type],state.params);
    }
    if(NEW_INSTOCK_LIST == state.type){
      let newInstockListRes = yield call(actionMap[state.type],state.params);
      state.params = Object.assign(state.params,newInstockListRes);
      yield put({type:SET_INSTOCK_NEWLIST,payLoad:state.params})
    }
    if(INSTOCK_DELETE == state.type){
      let {listNumber}=state.params;
      yield call(actionMap[state.type],{listNumber});
      let payLoad={listNumber};
      payLoad.insertData=(yield call(actionMap[GET_INSTOCK_DATA],state.params.insertParams)).data[0];
      yield put({type:DELETE_INSERT,payLoad})
    }
    //统计
    if(GET_STATISTICS_DATA == state.type){
      let statisticDataRes = yield call(statisticsMap[state.type],state.params);
      yield put({type:SET_STATISTICS_DATA,payLoad:statisticDataRes})
    }
}
export default function* root() {
    yield* takeEvery("*", rootSagas);
}
