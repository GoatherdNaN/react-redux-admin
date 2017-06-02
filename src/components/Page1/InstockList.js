import React from "react";
import moment from 'moment';
import {Table, Icon, Input, Button} from "antd";
import MyModal from './MyModal';
import MyPagination from '../Common/MyPagination/index';
import {deepCopy,compare} from '../../utils/common';
import style from './style.less';
const {Column} = Table;

export default class InstockList extends React.Component {
    constructor(props) {
        super(props);
    }
    state = {
      instockList:[],
      instockEdit:[],
      visible: false,
      editData: null,
      searchText: '',
      filterDropdownVisible: false,
      filtered: false,
      paginationVisible:true,
      page:1,
      pageSize:8
    }
    componentWillReceiveProps=nextProps=>{
      let {instockList} = nextProps;
      if(instockList!==this.props.instockList){
        this.setState({
          instockList
        })
      }
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
    edit=(record)=>{
      let editData = record;
      this.setState({
        editData
      },()=>{
        this.showModal();
      });
    }
    getPageInfo=(pageSize,page)=>{
      this.setState({
        pageSize,
        page
      })
    }
    delete=(record)=>{
      let {deleleItems,status,beginTime,endTime} = this.props;
      let {instockList,pageSize,page} = this.state;
      let listNumber = instockList.find((item)=>item.listNumber==record.listNumber).listNumber;
      let insetParams={
        page:page*pageSize+1,
        pageSize:1,
        status,
        beginTime,
        endTime
      };
      let params={
        listNumber,
        insetParams
      };
      deleleItems(params);
    }
    onInputChange = (e) => {
      this.setState({
        searchText: e.target.value
      });
    }
    onSearch = () => {
      let { searchText,instockList } = this.state;
      let instockListCopy = deepCopy(instockList);
      const reg = new RegExp(searchText, 'gi');
      this.setState({
        paginationVisible: false,
        filterDropdownVisible: false,
        filtered: !!searchText,
        instockList: instockListCopy.map((record) => {
          const match = record.username.match(reg);
          if (!match) {
            return null;
          }
          return record
        }).filter(record => !!record),
      });
    }
    resetList = () => {
      let {instockList} = this.props;
      this.setState({
        instockList,
        filterDropdownVisible:false,
        paginationVisible:true
      })
    }
    changeFilterDropdownVisible=(filterDropdownVisible)=>{
      this.setState({
         filterDropdownVisible
        }, () => this.searchInput.focus())
    }
    handleSort=(a,b) => (+moment(a.date).format('X'))-(+moment(b.date).format('X'))
    handleCreateTimeSort=(a, b) => (+moment(a.createTime).format('X'))-(+moment(b.createTime).format('X'))
    render() {
      let { visible, editData, searchText, instockList, filterDropdownVisible, paginationVisible} = this.state;
      let {instockEdit, searchInstock, total, toPageOne} = this.props;
      const filterDropdown = (
        <div className="custom-filter-dropdown">
          <Input
            ref={ele => this.searchInput = ele}
            placeholder="Search Username"
            value={searchText}
            onChange={this.onInputChange}
            onPressEnter={this.onSearch}
          />
          <Button type="primary" onClick={this.onSearch}>Search</Button>
          <Button onClick={this.resetList}>Reset List</Button>
        </div>
      );
      const filterIcon = <Icon type="search" style={{ color: this.state.filtered ? '#108ee9' : '#aaa' }} />;
      let instockListForShow = [];
      if(instockList.length){
        instockListForShow = deepCopy(instockList);
        instockListForShow.map((item,key)=>{
          item.status = '1' === instockList[key].status+'' ? '新建' : '已入库';
        })
      }
      return (
          <div>
            {visible&&
              <MyModal
                closeModal={this.closeModal}
                visible={visible}
                editData={editData}
                instockEdit={instockEdit}
                title='编辑'
              />
            }
            <Table
              dataSource={instockListForShow}
              pagination={false}
              expandedRowRender={
                record =>
                <div className={style.descriptionbox}>
            			<div className={style.itemleft}>
            				<img src={record.imgUrl}/>
            			</div>
            			<p className={style.itemright}>
            				{record.description}
            			</p>
            		</div>
              }
              >
                <Column title="入库单编号" dataIndex="listNumber" key="listNumber"/>
                <Column
                  title="入库用户"
                  dataIndex="username"
                  key="username"
                  filterIcon={filterIcon}
                  filterDropdown={filterDropdown}
                  filterDropdownVisible={filterDropdownVisible}
                  onFilterDropdownVisibleChange={this.changeFilterDropdownVisible}/>
                <Column
                  title="入库时间" dataIndex="date" key="date" sorter={this.handleSort}/>
                <Column title="创建时间" dataIndex="createTime" key="createTime" sorter={this.handleCreateTimeSort}/>
                <Column title="状态" dataIndex="status" key="status"/>
                <Column title="Action" key="action" render={(text, record, index) => (
                    <span>
                        <span className={style.operate} onClick={()=>this.edit(record)}>编辑</span>
                        <span className="ant-divider"/>
                        <span className={style.operate} onClick={()=>this.delete(record)}>删除</span>
                    </span>
                )}/>
            </Table>
            {paginationVisible&&
              <MyPagination
                total={total}
                toPageOne={toPageOne}
                searchInstock={searchInstock}
                getPageInfo={this.getPageInfo}
              />
            }
          </div>
        )
    }
}
