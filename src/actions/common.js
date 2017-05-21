import {request} from '../utils/request';
import {
  LOGIN_FLOW,
} from '../constants/type';
import * as API from '../api/index';

 export default {
     [LOGIN_FLOW]:API.login,
}
