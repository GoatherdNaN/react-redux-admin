/**
 * Created by Edlan on 2017/05/15.
 */
import {request} from '../utils/request';
import {
  GET_STATISTICS_DATA
} from '../constants/type';
import * as API from '../api/index';

 export default {
     [GET_STATISTICS_DATA]:API.getStatisticsData
}
