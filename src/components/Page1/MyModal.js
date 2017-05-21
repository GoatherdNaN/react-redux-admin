import React from "react";
import moment from 'moment';
import { Modal, Input, DatePicker, Select, message } from 'antd';
import {getDateBefore1Months} from '../../utils/common';
import style from './style.less';

const Option = Select.Option;

export default class MyModal extends React.Component {
  constructor(props) {
      super(props);
  }
  state = {
    ModalText: '编辑',
    username:'',
    date:moment((new Date()), 'YYYY-MM-DD HH:mm:ss'),
    createTime:moment((new Date()), 'YYYY-MM-DD HH:mm:ss'),
    status:'1',
    isChange:false
  }
  componentWillMount = () => {
    let {editData} = this.props;
    if(!editData)return;
    let {username, date, createTime, status} = editData;
    this.setState({
      username,
      date:moment(date),
      createTime:moment(createTime),
      status
    });
  }
  handleOk = () => {
    let {title} = this.props;
    let { username, date, createTime, status, isChange} = this.state;
    if(!username){
      // alert('请输入入库用户名');
      message.error('请输入入库用户名',1);
      return
    }
    date = date.format("YYYY-MM-DD HH:mm:ss");
    createTime = createTime.format("YYYY-MM-DD HH:mm:ss");
    if(isChange&&'编辑' === title) {
      let {editData, instockEdit} = this.props;
      let {listNumber} = editData;
      instockEdit({
        listNumber,
        username,
        date,
        createTime,
        status
      });
    }else if ('新建入库单' === title){
      let {newInstockList} = this.props;
      newInstockList({
        username,
        date,
        createTime,
        status
      })
    }
    this.props.closeModal();
  }
  handleCancel = () => {
    this.props.closeModal();
  }
  changeDate = (date) => {
    this.setState({
      date,
      isChange:true
    })
  }
  changeCreateTime = (createTime) => {
    this.setState({
      createTime,
      isChange:true
    })
  }
  changeStatus = (status) => {
    this.setState({
      status,
      isChange:true
    })
  }
  changeUserName = (e) => {
    let username = e.target.value;
    this.setState({
      username,
      isChange:true
    })
  }
  render() {
    let {title, visible} = this.props;
    let { username, date, createTime, status} = this.state;
    return (
      <div>
        <Modal
          title={title}
          visible={visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <h3>入库时间</h3>
          <DatePicker
            showTime
            size="large"
            style={{width:'100%'}}
            value={date}
            format="YYYY-MM-DD HH:mm:ss"
            placeholder="入库时间"
            onChange={this.changeDate}
          />

          <h3>创建时间</h3>
          <DatePicker
            showTime
             size="large"
            style={{width:'100%'}}
            value={createTime}
            format="YYYY-MM-DD HH:mm:ss"
            placeholder="创建时间"
            onChange={this.changeCreateTime}
          />

          <h3>状态</h3>
          <Select value={status+''} placeholder="请选择状态" size="large" style={{ width: '100%' }} onChange={this.changeStatus}>
            <Option value="1">新建</Option>
            <Option value="2">已出库</Option>
          </Select>

          <h3>入库用户</h3>
          <Input value={username} size="large" style={{ fontSize: 13 }} placeholder="请输入入库用户名" onChange={this.changeUserName}/>

        </Modal>
      </div>
    );
  }
}
