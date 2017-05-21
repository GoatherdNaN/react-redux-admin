/**
 * Created by edlan on 2017/05/15.
 */
import React from 'react';
import {connect} from 'react-redux';
import echarts from 'echarts';
import moment from 'moment';
import style from './style.less';
import classnames from 'classnames';
import {Button, Row, Col, DatePicker, Select, notification, Icon } from 'antd';
import {getCurrentMonth,getCurrentWeek,getDateBeforeWeek} from '../../utils/common';
import FirstChart from '../../components/Page3/FirstChart';
import SecondChart from '../../components/Page3/SecondChart';

const Option = Select.Option;

class A3 extends React.Component{
    constructor(props){
        super(props);
    }
    state = {
      queryWay:"1",
      dateString:moment(new Date()).format('YYYY/MM/DD')
    }
    componentDidMount=()=>{
      this.handSearch();
      this.openMessage();
    }
    openMessage=()=>{
      notification.open({
        duration: 5,
        style: {marginTop: 20},
        message: '搜索功能提示',
        icon: <Icon type="info-circle-o" style={{ color: '#108ee9' }} />,
        description: '左侧是时间处理的方式选择，右侧选择某天，选择的时间将按照你选择的方式处理。如选择按年处理，将显示右侧时间所在年的数据！',
      });
    }
    changeQueryWay=(queryWay)=>{
      this.setState({
        queryWay
      })
    }
    changeTime=(time,dateString)=>{
      this.setState({
        dateString
      })
    }
    handSearch=()=>{
      let [beginDate,endDate] = Array.from({length:2},()=>'');
      let {queryWay,dateString}=this.state;
      dateString=dateString.replace(/\//g,'-');
      // "1"年份 "2"月份 "3"自然周 "4"日 "5"最近一周
      switch(queryWay){
          case '1':
              beginDate=dateString.split("-")[0]+'-01-01';
              endDate=dateString.split("-")[0]+'-12-31';
              break;
          case '2':
              beginDate=getCurrentMonth(dateString).monthFirstDay;
              endDate=getCurrentMonth(dateString).monthLastDay;
              break;
          case '3':
              beginDate=getCurrentWeek(dateString).weekFirstDay;
              endDate=getCurrentWeek(dateString).weekLastDay;
              break;
          case '4':
              beginDate=dateString;
              endDate=dateString;
              break;
          case '5':
              beginDate=getDateBeforeWeek(dateString);
              endDate=dateString;
              break;
          default:
              beginDate=dateString.split("-")[0]+'-01-01';
              endDate=dateString.split("-")[0]+'-12-31';
      }
      this.props.getStatisticsData({
        beginDate,
        endDate
      });
    }
    disabledDate=current=>{
      return current && current.valueOf() > Date.now();
    }
    disabledDateTime=()=>{
      return {
        disabledHours: () => range(0, 24).splice(4, 20),
        disabledMinutes: () => range(30, 60),
        disabledSeconds: () => [55, 56],
      };
    }
    render(){
      let {queryWay, dateString} = this.state;
      let {statisticsData} = this.props;
        return(
            <div>
              <Row className={classnames(style.statistics,style.headerbox)}>
                <Col span="2" offset="1">
                  <Select value={queryWay} placeholder='选择查询方式' style={{ width: 142 }} onChange={this.changeQueryWay}>
                    <Option value="1">年份</Option>
                    <Option value="2">月份</Option>
                    <Option value="3">自然周</Option>
                    <Option value="4">日</Option>
                    <Option value="5">最近一周</Option>
                  </Select>
                </Col>
                <Col span="3" offset="1">
                  <DatePicker
                    value={moment(dateString,'YYYY/MM/DD')}
                    format='YYYY/MM/DD'
                    disabledDate={this.disabledDate}
                    disabledTime={this.disabledDateTime}
                    onChange={this.changeTime}
                  />
                </Col>
                <Col span="1">
                  <Button type="primary" icon="search" onClick={this.handSearch}>搜索</Button>
                </Col>
              </Row>
              <Row className={classnames(style.statistics,style.firstchart)}>
                <Col span="24">
                    <FirstChart statisticsData={statisticsData}/>
                </Col>
              </Row>
              <section className={style.centerbox}>
                <div className={classnames(style.statistics,style.centeritem)}>
                  <SecondChart id='main2'/>
                </div>
                <div className={classnames(style.statistics,style.centeritem)}>
                  <SecondChart id='main3'/>
                </div>
              </section>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
  return {
      statisticsData:state.page3.get("statisticsData")
  }
};
// shape="circle"
const mapDispatchToProps = (dispatch) => ({
    getStatisticsData(params){
        dispatch({
            type:'GET_STATISTICS_DATA',
            params:params
        })
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(A3)
