import * as API from '../constants/url';
import {request} from '../utils/request';
const METHOD = {
    GET: 'get',
    POST: 'post',
    PUT: 'put',
    DELETE: 'delete'
};
export const login = (params) => request(API.LOGIN, params, METHOD.POST);
//入库
export const getInstockList = (params) => request(API.GET_INSTOCK_DATA, params, METHOD.POST);
export const instockEdit = (params) => request(API.INSTOCK_EDIT, params, METHOD.POST);
export const newInstockList = (params) => request(API.NEW_INSTOCK_LIST, params, METHOD.POST);
export const deleleItems = (params) => request(API.INSTOCK_DELETE, params, METHOD.GET);;
//统计
export const getStatisticsData = (params) => request(API.GET_STATISTICS_DATA, params, METHOD.POST);
