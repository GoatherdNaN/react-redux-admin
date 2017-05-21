import React from "react";
import {Pagination} from 'antd';
import style from './style.less';

const pageSizeOptions = ['8','12','16'];
export default class MyPagination extends React.Component {
    constructor(props) {
        super(props);
    }
    state = {
      current:1,
      pageSize:8
    }
    componentWillReceiveProps(nextProps) {
      let {toPageOne} = nextProps;
      if(this.props.toPageOne!==toPageOne){
        this.setState({
          current:1
        })
      }
    }
    changePagination=(page, pageSize)=>{
      let {searchInstock,getPageInfo} = this.props;
      this.setState({
        current:page
      },()=>{
        getPageInfo(pageSize,page);
        this.props.searchInstock(pageSize,page);
      })
    }
    changePageSize=pageSize=>{
      this.setState({
        pageSize
      })
    }
    render(){
      let {current,pageSize} = this.state;
      let {total} =this.props;
      return(
        <div className={style.paginationbox}>
          <Pagination
            total={total}
            current={current}
            pageSize={pageSize}
            showSizeChanger
            showQuickJumper
            pageSizeOptions={pageSizeOptions}
            onChange={this.changePagination}
            onShowSizeChange={this.changePageSize}
            showTotal={(total, range) =>`总共${total}条数据`}
          />
        </div>
      )
    }
  }
