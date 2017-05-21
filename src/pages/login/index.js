/**
 * Created by braveran on 4/14 0014.
 */
import React from "react";
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import classnames from 'classnames';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import style from './index.less';
const FormItem = Form.Item;
class NormalLoginForm extends React.Component {
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.login();
                console.log('Received values of form: ', values);
            }
        });
    };
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
          <div className={style.wrapper}>

      <div className={style.body}>
        <header className={style.loginheader}>
          {this.props.auth.toString()}
        </header>

        <section className={style.form}>

          <Form onSubmit={this.handleSubmit}>
            <FormItem>
              {getFieldDecorator('account', {
                rules: [
                  {
                    required: true,
                    message: '请输入管理员账号',
                    type: 'string'
                  }
                ]
              })(
                <Input type="text" addonBefore={<Icon type="user"/>}/>
              )}
            </FormItem>

            <FormItem>
              {getFieldDecorator('password', {
                rules: [
                  {
                    required: true,
                    message: '请输入密码',
                    type: 'string'
                  }
                ]
              })(
                <Input type="password" addonBefore={<Icon type="lock"/>}/>
              )}
            </FormItem>
            <Button className={style.btn} type="primary" htmlType="submit">Sign In</Button>
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
    componentDidMount=()=>{
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
    login(){
        dispatch({
            type:'LOGIN_FLOW',
            params:{
                username:"ee",
                pwd:"123"
            }
        })
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Index)
