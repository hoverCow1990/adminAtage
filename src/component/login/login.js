import React,{Component} from 'react';  
import {connect} from 'react-redux';            //connect
import LoginContent from './LoginContent';      //登录界面
import WelcomeContent from './WelcomeContent';  //欢迎界面
import {bindActionCreators} from 'redux';       //用于链接异步redux的dispacth
import {
    initLogin,                                  //初始化请求
    doLogin,                                    //登录请求
} from '../../store/login/Action';
import {
    Form,
    Spin
} from 'antd';                                  //antd组件
import '../../../node_modules/antd/dist/antd.css';  
import './login.less';            

const FormItem = Form.Item;

/*
 * 登录总界面
 * 根据用户登录请款渲染不同界面,
 * props内包含数据[adminData,otherUser],函数[dispatch,initLogin,doLogin]
 * 作者:hoverCow 日期:2017/02/11
 */

class LoginPage extends Component{
  //loginLodingTimer用于请求计时器
  constructor(){
    super();
    this.state = {
      loginLodingTimer : null,
      bgImgLoading : true,
    };
  }
  //未登录状态窜然LoginContent,反之渲染WelcomeContent
  render(){
    let {doLogin} = this.props;
    let showContent = this.props.adminData.noLogin === true?<LoginContent onDoLogin={doLogin}/>:<WelcomeContent/>;
    return (
      <section className="adminLoginWrapper">
        <div className={`initLoading ${this.state.bgImgLoading?'down':'up'}`}>
          <Spin spinning={true}></Spin>
        </div>
        <div className="myLogin viewWrapper">
          <div className="login">
              {showContent}
          </div>
        </div>
      </section>
    )
  }
  //组件完成是进行登录检测
  componentDidMount(){
    this.checkLogin();
    var img = document.createElement('img');
    img.src = "http://www.web-jackiee.com/templets/blog/demo/publicImage/adminAtage/bg-1.jpg";
    img.onload = () => this.setState({bgImgLoading : false});
  }
  //如下函数在渲染成功后调用,进行用户是否已经登录的检测,并获取相关数据
  checkLogin(){
    let self = this,
        {dispatch,adminData} = this.props;
    //Promise函数,执行后调用Action内checkLogin函数,发送请求当计时器检测到props中noLogin不为void0时调用回调
    const loginPromise = new Promise((solve,reject) => {
        dispatch(initLogin());
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
      .then((res) => {})
      .catch(err => console.error(err));
  }
}

//需要adminData以及otherUser数据
const setDateProps = state => {
  let {adminData,otherUser} = state;
  return {
    adminData,
    otherUser
  }
}
//链接方法
const setFnProps = dispatch => ({
  dispatch,
  initLogin:bindActionCreators(initLogin,dispatch),
  doLogin:bindActionCreators(doLogin,dispatch)
})

export default connect(setDateProps,setFnProps)(LoginPage);
