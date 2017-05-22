import React from "react";
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import classnames from 'classnames';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import style from './index.less';
const FormItem = Form.Item;
class NormalLoginForm extends React.Component {
    state = {
      username:'',
      password:''
    }
    componentWillMount=()=>{
      if(localStorage.username){
        let username = localStorage.getItem('username');
        let password = localStorage.getItem('password');
        this.setState({
          username,
          password
        })
      }else{
        this.setState({
          username:'',
          password:''
        })
      }
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.login(values);
            }
        });
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        let {username,password} = this.state;
        return (
          <div className={style.wrapper}>
            <div className={style.body}>
              <header className={style.loginheader}>
                {username?username:'登陆'}
              </header>

              <section className={style.form}>

                <Form onSubmit={this.handleSubmit}>
                  <FormItem>
                    {getFieldDecorator('username', {
                      initialValue: username,
                      rules: [
                        {
                          required: true,
                          message: '请输入管理员账号',
                          type: 'string'
                        }
                      ]
                    })(
                      <Input type="text" addonBefore={<Icon type="user"/>} placeholder="请输入管理员账号"/>
                    )}
                  </FormItem>

                  <FormItem>
                    {getFieldDecorator('password', {
                      initialValue: password,
                      rules: [
                        {
                          required: true,
                          message: '请输入密码',
                          type: 'string'
                        }
                      ]
                    })(
                      <Input type="password" addonBefore={<Icon type="lock"/>} placeholder="请输入密码"/>
                    )}
                  </FormItem>
                  <FormItem>
                    {getFieldDecorator('isRemember', {
                      valuePropName: 'checked',
                      initialValue: true,
                    })(
                      <Checkbox>记住用户名和密码</Checkbox>
                    )}
                    <Button className={style.btn} type="primary" htmlType="submit">
                      登陆
                    </Button>
                  </FormItem>
                </Form>
              </section>
            </div>
          </div>
        );
    }
}
const WrappedNormalLoginForm = Form.create()(NormalLoginForm);
class Index extends  React.Component{
    constructor(props){
        super(props);
    }
    componentDidMount() {
    };
    render(){
        const { from } = this.props.location.state || { from: { pathname: '/' } }
        if (this.props.auth) {
            return (
                <Redirect to={from}/>
            )
        }
        return(
            <div>
              <WrappedNormalLoginForm {...this.props}/>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        auth:state.global.get("auth")
    }
};

const mapDispatchToProps = (dispatch) => ({
    login(params){
        dispatch({
            type:'LOGIN_FLOW',
            params:params
        })
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Index)
