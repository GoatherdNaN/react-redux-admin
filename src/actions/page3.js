import {request} from '../utils/request';
import {
  GET_STATISTICS_DATA
} from '../constants/type';
import * as API from '../api/index';

 export default {
     [GET_STATISTICS_DATA]:API.getStatisticsData
}
