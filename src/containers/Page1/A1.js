import React from 'react';
import moment from 'moment';
import {connect} from 'react-redux';
import {Button, Input, Row, Col, DatePicker, Select } from 'antd';
import InstockList from '../../components/Page1/InstockList';
import MyModal from '../../components/Page1/MyModal';
import {getDateToday,getDateBefore1Months} from '../../utils/common';
const { RangePicker } = DatePicker;
const [Option,Search] = [Select.Option,Input.Search];
class Index extends React.Component{
    constructor(props){
        super(props);
    }
    state = {
      visible: false,
      status:'',
      beginTime:getDateBefore1Months(),
      endTime:getDateToday(),
      page:0
    }
    componentWillMount=()=>{
        this.props.getInstockData({
          pageSize:8,
          toPageOne:Date.parse(new Date())
        });
    }
    showModal=()=>{
      this.setState({
        visible: true,
      });
    }
    closeModal=()=>{
      this.setState({
        visible: false,
      });
    }
    changeStatus=status=>{
      this.setState({
        status
      })
    }
    changeTime=(value, dateString)=>{
      let [beginTime,endTime] = dateString;
      this.setState({
        beginTime,
        endTime
      })
    }
    searchInstock = (pageSize,page=1) => {
      let {getInstockData} = this.props;
      let {status, beginTime, endTime} = this.state;
      let params = {
        status,
        beginTime,
        endTime,
        pageSize:8,
        page
      }
      if (pageSize && !pageSize.target) {
          params.pageSize = pageSize;
      }
      getInstockData(params);
    }
    handSearch=()=>{
      this.setState({
        toPageOne:Date.parse(new Date())
      },()=>{
        this.searchInstock();
      })
    }
    render(){
      let {instockData, instockEdit, newInstockList, deleleItems} = this.props;
      let instockList = instockData?instockData.data:[];
      let total = instockData?instockData.total:0;
      let {pageSize, visible, status, beginTime, endTime, toPageOne} = this.state;
        return(
            <div>
              {visible&&
                <MyModal
                  showModal={this.showModal}
                  closeModal={this.closeModal}
                  visible={visible}
                  title='新建入库单'
                  newInstockList={newInstockList}
                />
              }
                <Row style={{backgroundColor:'#fff',height:60,paddingTop:18,marginBottom:12}}>
                  <Col span="5" offset="1">
                    <RangePicker
                      format='YYYY/MM/DD'
                      onChange={this.changeTime}
                    />
                  </Col>
                  <Col span="3" offset="1">
                    <Select placeholder='选择状态' style={{ width: 120 }} onChange={this.changeStatus}>
                      <Option value="1">新建</Option>
                      <Option value="2">已入库</Option>
                    </Select>
                  </Col>
                  <Col span="1">
                    <Button type="primary" icon="search" onClick={this.handSearch}>搜索</Button>
                  </Col>
                  <Col span="2" offset="9">
                    <Button type="primary" icon="plus" onClick={this.showModal}>新建入库单</Button>
                  </Col>
                </Row>
                <Row>
                  <Col span="24">
                    <InstockList
                      total={total}
                      toPageOne={toPageOne}
                      searchInstock={this.searchInstock}
                      instockList={instockList}
                      instockEdit={instockEdit}
                      deleleItems={deleleItems}
                      status={status}
                      beginTime={beginTime}
                      endTime={endTime}/>
                  </Col>>
                </Row>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        instockData:state.page1.get("instockData")
    }
};
// shape="circle"
const mapDispatchToProps = (dispatch) => ({
    getInstockData(params){
        dispatch({
            type:'GET_INSTOCK_DATA',
            params:params
        })
    },
    instockEdit(params){
      dispatch({
        type:'INSTOCK_EDIT',
        params:params
      })
    },
    newInstockList(params){
      dispatch({
        type:'NEW_INSTOCK_LIST',
        params:params
      })
    },
    deleleItems(params){
      dispatch({
        type:'INSTOCK_DELETE',
        params:params
      })
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Index)
