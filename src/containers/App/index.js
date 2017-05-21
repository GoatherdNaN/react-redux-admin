import React from 'react';
import {connect} from 'react-redux';
import {Menu, Icon, Button, Row, Col, Breadcrumb} from 'antd';
import A1 from '../Page1/A1';
import A2 from '../Page2/A2';
import A3 from '../Page3/A3';
import Loading from '../../components/Common/Loading/index';
import style from './index.less';

const [SubMenu,MenuItemGroup] = [Menu.SubMenu,Menu.ItemGroup];

export const MENU = {
    "1": {
        breadcrumb: [
            '入库管理', "A1"
        ],
        template: <A1/>
    },
    "2": {
        breadcrumb: [
            '出库管理', "A2"
        ],
        template: <A2/>
    },
    "3": {
        breadcrumb: [
            '经营统计', "A3"
        ],
        template: <A3/>
    }
};

class Index extends React.Component {
    constructor(props) {
        super(props);
    }
    state = {
        current: '1',
        openKeys: ['sub1']
    }
    chooseMenu=item=>{
        this.setState({current: item.key});
    }
    onOpenChange=(openKeys)=>{
        const state = this.state;
        const latestOpenKey = openKeys.find(key => !(state.openKeys.indexOf(key) > -1));
        const latestCloseKey = state.openKeys.find(key => !(openKeys.indexOf(key) > -1));
        let nextOpenKeys = [];
        if (latestOpenKey) {
            nextOpenKeys = this.getAncestorKeys(latestOpenKey).concat(latestOpenKey);
        }
        if (latestCloseKey) {
            nextOpenKeys = this.getAncestorKeys(latestCloseKey);
        }
        this.setState({openKeys: nextOpenKeys});
    }
    getAncestorKeys=key=>{
        const map = {
            sub1: ['sub1'],
            sub2: ['sub2'],
            sub3:['sub3']
        };
        return map[key] || [];
    }
    render() {
        let {displayStatus} = this.props;
        let {current} = this.state;
        return (
            <div>
                <header className={style.header}>
                    <Row>
                        <Col span={3}>
                            <div>ReactManager</div>
                        </Col>
                        <Col span={2} offset={19}>
                            <Button ghost icon="logout" onClick={() => {
                                this.props.loginOut()
                            }}>Logout</Button>
                        </Col>
                    </Row>
                </header>

                <main className={style.main}>
                    <div className={style.menu}>
                        <Menu
                          mode="inline"
                          theme="dark"
                          openKeys={this.state.openKeys}
                          selectedKeys={[this.state.current]}
                          style={{width: 200}}
                          onOpenChange={this.onOpenChange}
                          onClick={this.chooseMenu}
                        >
                            <SubMenu key="sub1" title={< span > <Icon type="global"/> < span > 入库管理 < /span></span >}>
                                <Menu.Item key="1">A1</Menu.Item>
                            </SubMenu>
                            <SubMenu key="sub2" title={< span > <Icon type="shopping-cart"/> < span > 出库管理 < /span></span >}>
                                <Menu.Item key="2">A2</Menu.Item>
                            </SubMenu>
                            <SubMenu key="sub3" title={< span > <Icon type="pie-chart"/> < span > 经营统计 < /span></span >}>
                                <Menu.Item key="3">A3</Menu.Item>
                            </SubMenu>
                        </Menu>
                    </div>

                    <div className={style.content}>
                      <Breadcrumb className={style.breadcrumb}>
                          {
                              MENU[current].breadcrumb.map((item,index)=>{
                                  return <Breadcrumb.Item key={index}>{item}</Breadcrumb.Item>
                              })
                          }
                      </Breadcrumb>
                      <div className={style.temprouter}>
                          {
                              MENU[current].template
                          }
                      </div>
                    </div>
                </main>
                <Loading displayStatus={displayStatus}/>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
      displayStatus:state.global.get("displayStatus")
    }
};
const mapDispatchToProps = (dispatch) => ({
    loginOut() {
        dispatch({type: 'LOGIN_OUT'})
    }
});
export default connect(mapStateToProps, mapDispatchToProps)(Index)
