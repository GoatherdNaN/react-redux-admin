import React from "react";
import { Upload, Icon, Modal, message } from 'antd';

export default class UploadPic extends React.Component {
  state = {
    previewVisible: false,
    previewImage: ''
  };

  handleCancel = () => this.setState({ previewVisible: false })

  handlePreview = (file) => {
    console.log('//');
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  }

  handleChange = ({ fileList }) => this.props.getFileList(fileList)
  beforeUpload=(file,fileList)=>{
      if(file.type.indexOf("image/")==-1){
          alert("Only accept image type!");
          return false;
      }
      if(file.size>2*1024*1024){
          alert("file maxSize 2M!");
          return false;
      }
      return new Promise((resolve,reject)=>{
          let reader = new FileReader();
          reader.onload = (e)=>{
              let data = e.target.result;
              let img = new Image();
              img.onload = ()=>{
                  let w = img.width;
                  let h = img.height;
                  if(70>w){
                      message.error("上传图片宽度应不小于70px",2);
                      reject(false);
                  }else if(70>h){
                      message.error("上传图片高度应不小于70px",2);
                      reject(false);
                  }else{
                      this.setState({
                          fileData:{
                              width:w,
                              height:h
                          }
                      });
                      resolve(true);
                  }
              };
              img.src = data;
          };
          reader.readAsDataURL(file);
      });
  }
  render() {
    const { previewVisible, previewImage } = this.state;
    let {fileList}=this.props;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    return (
      <div className="clearfix">
        <Upload
          action="//jsonplaceholder.typicode.com/posts/"
          listType="picture-card"
          fileList={fileList}
          onPreview={this.handlePreview}
          onChange={this.handleChange}
          beforeUpload={this.beforeUpload}
        >
          {fileList.length >= 2 ? null : uploadButton}
        </Upload>
        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </div>
    );
  }
}
