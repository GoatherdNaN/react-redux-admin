import React from "react";
import moment from 'moment';
import { Modal, Input, DatePicker, Select, message } from 'antd';
import {getDateBefore1Months} from '../../utils/common';
import UploadPic from './UploadPic';
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
    writeNum: 0,
    isChange:false,
    fileList: []
  }
  componentWillMount = () => {
    let {editData} = this.props;
    if(!editData)return;
    let {username, date, createTime, status, imgUrl} = editData;
    let fileList=[{
      uid: -1,
      name: 'xxx.png',
      status: 'done',
      url: imgUrl
    }]
    this.setState({
      username,
      date:moment(date),
      createTime:moment(createTime),
      status,
      fileList
    });
  }
  componentDidMount=()=>{
    this.checkWord();
  }
  checkWord=()=>{
      let len = 100;
      let userNameDom = this.refs.username;
      let str = userNameDom.refs.input.value;
      let writeNum = str.length;
      this.setState({
          writeNum: writeNum
      });
  }
  handleOk = () => {
    let {title} = this.props;

    let { username, date, createTime, status, isChange, fileList, writeNum} = this.state;
    if(!username){
      message.error('请输入入库用户名',2);
      return
    }
    if(20<writeNum){
      message.error('用户名长度不得超过20个字符',2);
      return
    }
    if(!fileList.length){
      message.error('请至少上传一张图片作为头像',2);
      return
    }
    if(1<fileList.length){
      message.error('头像只能选择一张，请把另外一张删除再上传',2);
      return
    }

    let params={
      username,
      status,
      date : date.format("YYYY-MM-DD HH:mm:ss"),
      createTime : createTime.format("YYYY-MM-DD HH:mm:ss"),
      imgUrl : fileList[0].url || fileList[0].thumbUrl,
    };

    if(isChange&&'编辑' === title) {
      let {editData, instockEdit} = this.props;
      params.listNumber = editData.listNumber;
      instockEdit(params);
    }else if ('新建入库单' === title){
      let {newInstockList} = this.props;
      newInstockList(params);
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
    this.checkWord();
    let username = e.target.value;
    this.setState({
      username,
      isChange:true
    })
  }
  getFileList=(fileList)=>{
    this.setState({
      fileList,
      isChange:true
    })
  }
  render() {
    let {title, visible} = this.props;
    let { username, date, createTime, status, fileList, writeNum} = this.state;
    let isMore = writeNum > 20 ? true : false;
    return (
      <div>
        <Modal
          title={title}
          visible={visible}
          width={800}
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
          <Input value={username} size="large" style={{ fontSize: 13 }} placeholder="请输入入库用户名" onChange={this.changeUserName} ref="username"/>
          <div className={style.writeNumBox}>
              {isMore&&<span className={style.red}>*</span>}
              <span className={isMore?style.red:''}>{writeNum}</span>
              <span>/20</span>
          </div>
          <h3>图片上传</h3>
          <UploadPic fileList={fileList} getFileList={this.getFileList}/>
        </Modal>
      </div>
    );
  }
}
