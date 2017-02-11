import React,{Component} from 'react';
import { Form,Icon,Input,Button, Checkbox,Row,Col,message} from 'antd';
import '../../../node_modules/antd/dist/antd.css';
import './login.less';
import {connect} from 'react-redux';
import {
  checkLogin,
  getStudent
} from '../../store/login/Action';
import LoginContent from './LoginContent';
import WelcomeContent from './WelcomeContent';


const FormItem=Form.Item;

// const NormalLoginForm=Form.create()(React.createClass({
//   handleSubmit(e) {
//     e.preventDefault();
//     console.log(this.props.form.validateFields)
//     this.props.form.validateFields((err, values) => {
//       if (!err) {
//         var val=values;
//           val.src="http://img.dongqiudi.com/uploads/avatar/2014/10/20/8MCTb0WBFG_thumb_1413805282863.jpg";
//           val.num="052124566";
//           val.job="IT大佬";
//           val.lastLogin="2016.12.28";
//           this.props.forLog(val);
//           message.success('登录成功',2);
//       }
//     });
//   },
//   checkName(rule, value, callback){
//     if(/[\u4e00-\u9fa5]{2,}$/.test(value)){
//       callback();                           //成功必定要回调一个空
//       return;
//     }
//     callback('请输入正确的名字!')
//   },
//   render() {
// }));

// const Welcome=React.createClass({
//     render() {
//       var info=this.props.info;
//       return (
//         <div className="loginSucess">
//           <Row >
//             <Col span={8}>
//               <img role="presentation" src={info.src}/>
//             </Col>
//             <Col span={14} offset={2}>
//               <h2>欢迎您登录成功</h2>
//               <ul>
//                 <li>登录员工:<span>{info.userName}</span></li>
//                 <li>员工编号:<span>{info.num}</span></li>
//                 <li>职位:<span>{info.job}</span></li>
//                 <li>上次登录时间:<span>{info.lastLogin}</span></li>
//               </ul>
//             </Col>
//           </Row>
//         </div>
//       )
//     }
// });

// const Login=React.createClass({
//   render() {
//       let props=this.props,
//           dom=props.hasLogin?<Welcome info={props.loginData}/>:<NormalLoginForm forLog={props.forLogin}/>;
//       return (
//         <div className="myLogin viewWrapper">
//           <div className="login">
//             <div className="loginWrapper">
//               {dom}
//             </div>
//           </div>
//         </div>
//     );
//   }
// });


// const {getFieldDecorator}=this.props.form;
//     return (
//         <Form onSubmit={this.handleSubmit} className="login-form" action="">
//           <FormItem>
//             {getFieldDecorator('userName', {
//               rules: [{ validator: this.checkName }
//               ],
//               validateTrigger : 'onBlur',
//             })(
//               <Input addonBefore={<Icon type="user" />} placeholder="用户名" />
//             )}
//           </FormItem>
//           <FormItem>
//             {getFieldDecorator('password', {
//               rules: [{ required: true, message: '请输入密码' }],
//             })(
//               <Input addonBefore={<Icon type="lock" />} type="password" placeholder="密码" />
//             )}
//           </FormItem>
//           <FormItem>
//             {getFieldDecorator('remember', {
//               valuePropName: 'checked',
//               initialValue: true,
//             })(
//               <Checkbox>记住我</Checkbox>
//             )}
//             <Button type="primary" htmlType="submit" className="login-form-button">
//               登录
//             </Button>
//           </FormItem>
//         </Form>
//     );


class LoginPage extends Component{
  constructor(){
    super();
    this.state = {
      loginLodingTimer : null,
      num : 2
    };
  }
  render(){
    //未登录状态显示登录界面,反之显示用户信息
    let showContent = this.props.adminData.noLogin === true?<LoginContent/>:<WelcomeContent/>;
    return (
      <section className="adminLoginWrapper">
        <div className="myLogin viewWrapper">
          <div className="login">
              {showContent}
          </div>
        </div>
      </section>
    )
  }
  componentDidMount(){
    this.checkLogin();
  }

  /*
   * 如下函数在渲染成功后调用,进行用户是否已经登录的检测
   *
   */

  checkLogin(){
    let self = this,
        {dispatch,adminData} = this.props;

    //Promise函数,执行后调用Action内checkLogin函数,发送请求当计时器检测到props中noLogin不为void0时调用回调

    const loginPromise = new Promise((solve,reject) => {
        dispatch(checkLogin());
        this.state.loginLodingTimer = setInterval(()=>{
          if(void 0 !== this.props.adminData.noLogin){
            clearInterval(this.state.loginLodingTimer);
            solve();
          };
    },20)});

    //Promise函数,执行后调用Timeout,当时间超过3秒进行报错处理,示意请求超时失败

    const timeOutPromise = new Promise((solve,reject) => {
        setTimeout(() => {
          clearInterval(self.state.loginLodingTimer);
          reject('request timeout');
      },3000)});

    //Promise.race接受一对数组,如上两primise对象任意一个先完成优先调用该回调检验3秒后超时,拒绝请求

    const promiseList = Promise.race([loginPromise,timeOutPromise]);
    promiseList
      .then((res) => {
        // console.log(this.props.adminData.noLogin);
      })
      .catch(err => console.error(err));
  }
}

const setDateProps = state => {
  let {adminData,student} = state;
  return {
    adminData,
    student
  }
}
import {bindActionCreators} from 'redux';
const setFnProps = dispatch => ({
  dispatch,
  getStudent:bindActionCreators(getStudent,dispatch)
})

export default connect(setDateProps,setFnProps)(LoginPage);
