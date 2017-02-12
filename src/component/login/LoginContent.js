import React,{Component} from 'react';
import Validtor from '../../validator/validator.js'; //用于验证是否符合名字格式
import LoginCookie from './LoginCookie';             //用于对cookie的设置
import {  
          Form, 
          Icon, 
          Input, 
          Button, 
          Checkbox,
          message
} from 'antd';                                      //antd组件

/*
 * Antd的From组件,用于登录验证以及发送请求
 * 验证   : 失去焦点时触发
 * 用户名 : 用户名为2-10字符以上首字母中文或英文
 * 密码   : 密码则为4-15位必须有数字以及字母
 * 登录成功后,若记住我勾选,cookie保存默认15天在src下setting文件更改
 * 作者:hoverCow 日期:2017/02/11
 */

const FormItem=Form.Item;
const NormalLoginForm = Form.create()(React.createClass({
  //登录成功后判断是否记住我来设置cookie值
  loginSucess(remember,userName,password){
    if(remember){
      LoginCookie.setLoginCookie(userName,password);
    }else{
      LoginCookie.deleLoginCookie();
    }
  },
  //密码账号失败时调用
  loginFail(){
    message.error('账号或者密码不正确');
  },
  //登录按键,将成功与失败回调传给Action内onDoLogin
  handleSubmit(e){
    e.preventDefault();
    let {loginSucess:sucess,loginFail:fail} = this;
    this.props.form.validateFields((err,values) => {
      let {userName,password,remember} = values;
      if (!err){
        this.props.onDoLogin({
          name:userName,
          password:password
        },()=>sucess(remember,userName,password),fail);
      };
    });
  },
  render(){
    const {getFieldDecorator} = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="login-form" action="">
          <FormItem>
            {getFieldDecorator('userName', {
              rules:[{required:true,validator:this.validator.checkName}],
              validateTrigger : 'onBlur',
              initialValue: LoginCookie.getLoginCookie("user"),
            })(<Input addonBefore={<Icon type="user" />} placeholder="用户名" />)}
          </FormItem>
          <FormItem>
            {getFieldDecorator('password', {
              rules: [{required: true,validator:this.validator.checkPassWord}],
              validateTrigger : 'onBlur',
              initialValue: LoginCookie.getLoginCookie("pass"),
            })(<Input addonBefore={<Icon type="lock" />} type="password" placeholder="密码" />)}
          </FormItem>
          <FormItem>
            {getFieldDecorator('remember',{valuePropName:'checked',
              initialValue : LoginCookie.isRemeber()})
            (<Checkbox onClick={(e) => LoginCookie.setRemeberCookie(e)}>记住我</Checkbox>)}
            <Button type="primary" htmlType="submit" className="login-form-button">登录</Button>
          </FormItem>
      </Form>
    );
  },
  validator : Validtor,
}));

/*
 * 登录界面组件,用户未登录是进行渲染
 * 作者:hoverCow 日期:2017/02/11
 */

class LoginContent extends Component{
  constructor(){
    super();
  }
  render(){
    let This = this;
    return (
      <figure className="loginWrapper">
          <NormalLoginForm onDoLogin={this.props.onDoLogin}/>
      </figure>
    )
  }
}

export default LoginContent;
