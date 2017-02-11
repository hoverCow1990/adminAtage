import React from 'react';
import {
   Form, 
   Input, 
   Select, 
   Row, 
   Col, 
   Checkbox, 
   Button,
}from 'antd';
import "./step2.css";

const FormItem = Form.Item;
const Option = Select.Option;

const FormTele = Form.create()(React.createClass({
  getInitialState() {
    return {
      passwordDirty: false,
      valCode : '',
      okTime : 0,
    };
  },
  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if(!values.agreement){
      	this.props.showModal("请在接受框内打勾,谢谢");
      	return;
      };
      if(values.captcha !== this.state.valCode){
      	this.props.showModal("您输入的验证码不正确,请重新填写");
      	return;
      }
      if (!err) {
      	delete values.prefix;
      	delete values.captcha;
      	delete values.agreement;
      	this.props.showModal("提交数据:" + JSON.stringify(values));
      	this.props.changeSuccess(2);
      }
    });
  },
  checkConfirm(rule, value, callback) {
    const form = this.props.form;
    if (value && this.state.passwordDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  },
  checkTele(rule,value,callback){
  	if(/^1[34578]\d{9}$/.test(value)){
  	 	callback();                           //成功必定要回调一个空
        return;
    }
    callback('请输入正确的名字!');
  },
  getValCode(){
  	var valCode = "",
  		This = this;
  	for(let i=0;i<4;i++){
  		valCode += Math.floor(Math.random()*10).toString();
  	}
  	this.props.showModal("老牛没法给您的手机发送验证码,您本次的验证码为[ "+ valCode +" ]");
  	this.setState({
  		valCode : valCode,
  		okTime : 60,
  	});
  	var timer = setInterval(function(){
  		var t = --This.state.okTime;
  		This.setState({
  			okTime : t,
  		})
  		if(!t) clearInterval(timer);
  	},1000)
  },
  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        span: 14,
        offset: 6,
      },
    };
    const prefixSelector = getFieldDecorator('prefix', {
      initialValue: '86',
    })(
      <Select className="icp-selector">
        <Option value="86">+86</Option>
      </Select>
    );
    return (
      <Form horizontal onSubmit={this.handleSubmit}>
        <FormItem
          {...formItemLayout}
          label="手机号码"
        >
    	{getFieldDecorator('tele', {
            rules: [{ required: true,validator:this.checkTele,message: '输入正确的手机号'},],
              validateTrigger : 'onBlur',
            })(
              <Input addonBefore={prefixSelector} />
            )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="验证码"
          extra="我们必须确定您的手机号."
        >
          <Row gutter={8}>
            <Col span={12}>
              {getFieldDecorator('captcha', {
                rules: [{ required: true, message: 'Please input the captcha you got!' }],
              })(
                <Input size="large" />
              )}
            </Col>
            <Col span={12}>
              <Button size="large" onClick={this.getValCode} disabled={this.state.okTime!==0}>{!this.state.okTime?"获取验证码":"请过" + this.state.okTime + "s后再次获取"}</Button>
            </Col>
          </Row>
        </FormItem>
        <FormItem {...tailFormItemLayout} style={{ marginBottom: 8 }}>
          {getFieldDecorator('agreement', {
            valuePropName: 'checked',
          })(
            <Checkbox>I had read the <a>agreement</a></Checkbox>
          )}
        </FormItem>
        <FormItem {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit" size="large">Register</Button>
        </FormItem>
      </Form>
    );
  },
}));

export default FormTele;
