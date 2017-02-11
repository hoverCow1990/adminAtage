import React from 'react';
import {
  Form,
  Select, 
  InputNumber, 
  Switch, 
  Radio,
  Slider, 
  Button, 
  Upload, 
  Icon,
  message,
  Row,
  Col,
  Input,
}from 'antd';

//图片上传
const ViewPort = React.createClass({
  getInitialState() {
    return {
      fileList: [{
        uid: -1,
        name: '',
        status: 'done',
        url: '',
      }],
    };
  },
  handleChange(info) {
      let fileList = info.fileList;
      fileList = fileList.map((file) => {
        console.log(file.response);
        if (file.response) {
          file.url = file.response.url;
        }
        return file;
      });
      this.setState({ fileList });
    },
    beforeUpload(file){
    const isJPG = file.type === 'image/jpeg';
    if (!isJPG) {
      message.error('必须上传jpg格式');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('图片小于2mb');
    }
    return isJPG && isLt2M;
  },
    render() {
      const props = {
        action: '/upload.do',
        onChange: this.handleChange,
        multiple: true,
        beforeUpload : this.beforeUpload,
      };
    return (
      <Upload {...props} fileList={this.state.fileList}>
        <Button type="ghost">
          <Icon type="upload" /> upload
        </Button>
      </Upload>
    );
  },
});

const FormItem = Form.Item;
const Option = Select.Option;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

const FormInfo = Form.create()(React.createClass({
  getInitialState(){
    return {
      clause : [
        "紧从三个代表思想理念,党是对的,党永远对的,中国万岁",
        "上班时间少吃零食,多干活",
        "请忘记你的下班时间",
        "除了老板,不准在工作时间泡妞"
      ],
    }
  },
  handleSubmit(e) {
      e.preventDefault();
      var This = this;
      this.props.form.validateFields((err, values) => {
        if(!values.switch){
          this.props.showModal("老总表示,接受条款前不得提交");
          return;
        } 
          if(!err) {
            This.props.showModal("提交数据:" + JSON.stringify(values));
            This.props.changeSuccess(1)
          }
      });
    },
    checkName(rule, value, callback){
      if(/[\u4e00-\u9fa5]{2,}$/.test(value)){
        callback();                           //成功必定要回调一个空
        return;
      }
      callback('请输入正确的名字!')
    },
    clause(){
      const val = this.state.clause.map(function(item,index){
        return (<li key={"clause-"+(index+1)}>{index+1} . {item}</li>)
      })
      this.props.showModal(<ul>{val}</ul>);
    },
    checkPassword(rule, value, callback){
      if(value && value.length>4){
        callback();                          
        return;
      }
      callback('密码至少5位')
    },
  render(){
    const { getFieldDecorator } = this.props.form;
      const formItemLayout = {
        labelCol: { span: 6 },
        wrapperCol: { span: 14 },
      };
    return (
      <div className="step1 step">
        <Form horizontal onSubmit={this.handleSubmit}>
              <FormItem {...formItemLayout} label="员工姓名">
                {getFieldDecorator('userName', {
                    rules: [{required: true,validator:this.checkName,message: '请输入正确的名字!'}],
                    validateTrigger : 'onBlur',
                  })(
                  <Input placeholder="用户名" />            
                )}
              </FormItem>
              <FormItem {...formItemLayout} label="设置密码">
                {getFieldDecorator('password', {
                  rules: [{ required: true,validator:this.checkPassword,message: '密码至少5位'},],
                  validateTrigger : 'onBlur',
                })(
                  <Input placeholder="您的密码" />             
                )}
              </FormItem>
              <FormItem {...formItemLayout} label="员工职位">
                {getFieldDecorator('job', {
                  rules: [
                    { required: true, message: '请选择您的工种'},
                  ],
                })(
                  <Select placeholder="您的职位">
                    <Option value="it">IT大佬</Option>
                    <Option value="Person">人事王者</Option>
                    <Option value="finance">财务仙子</Option>
                    <Option value="Purchase">采购大神</Option>
                    <Option value="sale">销售老司机</Option>
                  </Select>
                )}
              </FormItem>
              <FormItem {...formItemLayout} label="年龄">
                {getFieldDecorator('age', { initialValue: 20 })(
                  <InputNumber min={1} max={70} />
                )}
                <span className="ant-form-text"> 岁</span>
              </FormItem>
              <FormItem {...formItemLayout} label="性别">
                {getFieldDecorator('sex')(
                  <RadioGroup>
                    <Radio value="male">男</Radio>
                    <Radio value="female">女</Radio>
                  </RadioGroup>
                )}
              </FormItem>
              <FormItem {...formItemLayout} label="职位级别">
                {getFieldDecorator('status',{
                  rules : [
                    { required: true, message: 'Please select your favourite colors!',}
                  ]
                })(
                  <Slider marks={{ 0: 'A', 20: 'B', 40: 'C', 60: 'D', 80: 'E', 100: 'F' }} />
                )}
              </FormItem>
              <FormItem {...formItemLayout} label="项目">
                {getFieldDecorator('item')(
                  <RadioGroup>
                    <RadioButton value="a">item 1</RadioButton>
                    <RadioButton value="b">item 2</RadioButton>
                    <RadioButton value="c">item 3</RadioButton>
                  </RadioGroup>
                )}
              </FormItem>
              <FormItem {...formItemLayout} label="头像照片">
                  <ViewPort />
              </FormItem>
              
          <FormItem {...formItemLayout} label="接受">
              <Row>
                  <Col span={4}>
                    {getFieldDecorator('switch', {valuePropName: 'checked'})(<Switch />)}
                  </Col>
                <Col span={6}>
                  <p onClick={this.clause} className="companyClause">阅读公司相关条款</p>
                </Col>
                </Row>
          </FormItem>    
              <FormItem wrapperCol={{ span: 12, offset: 6 }}>
                <Button type="primary" htmlType="submit">Submit</Button>
              </FormItem>
            </Form>
      </div>
    )
  }
}));

export default FormInfo;
