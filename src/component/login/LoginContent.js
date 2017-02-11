import React,{Component} from 'react';
import {  
          Form, 
          Icon, 
          Input, 
          Button, 
          Checkbox 
} from 'antd';

import '../../../node_modules/antd/dist/antd.css';

const FormItem=Form.Item;
const NormalLoginForm = Form.create()(React.createClass({
  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  },
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="login-form" action="">
          <FormItem>
            {getFieldDecorator('userName', {
              rules: [{ validator: this.checkName }
              ],
              validateTrigger : 'onBlur',
            })(
              <Input addonBefore={<Icon type="user" />} placeholder="用户名" />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: '请输入密码' }],
            })(
              <Input addonBefore={<Icon type="lock" />} type="password" placeholder="密码" />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('remember', {
              valuePropName: 'checked',
              initialValue: true,
            })(
              <Checkbox>记住我</Checkbox>
            )}
            <Button type="primary" htmlType="submit" className="login-form-button">
              登录
            </Button>
          </FormItem>
      </Form>
    );
  },
}));

class LoginContent extends Component{
  constructor(){
    super();
  }
  render(){
    return (
      <div className="loginWrapper">
          <NormalLoginForm/>
      </div>
    )
  }
}

export default LoginContent;
