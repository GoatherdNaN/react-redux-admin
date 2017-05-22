import {request} from '../utils/request';
import {
  GET_INSTOCK_DATA,
  INSTOCK_EDIT,
  NEW_INSTOCK_LIST,
  INSTOCK_DELETE,
} from '../constants/type';
import * as API from '../api/index';

 export default {
     [GET_INSTOCK_DATA]:API.getInstockList,
     [INSTOCK_EDIT]:API.instockEdit,
     [NEW_INSTOCK_LIST]:API.newInstockList,
     [INSTOCK_DELETE]:API.deleleItems,
}
