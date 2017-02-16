import React,{Component}from 'react';
import {Row,Col} from 'antd';
import MainRouter from '../router/router';
import SlideNav from "./slideNav/slideNav";
// import Column from "./column/column.js";
// import Login from "./login/login.js";
// import Regist from "./regist/regist.js";
// import Staff from "./staff/staff.js";
// import FileCloud from './fileCloud/fileCloud.js';
import {Provider} from 'react-redux';
import '../../node_modules/antd/dist/antd.css';
import './App.css';
import './global.less';

// var hasLogin=false,
//     loginData={
//           userName : null,
//           num : null,
//           job : null,
//           src : null,
//           lastLogin : null,
//     }; 

// //登录页面
// const LoginPage=React.createClass({
//   getInitialState() {
//       return {
//         hasLogin : hasLogin,
//         loginData : loginData,
//       }
//   },
//   forLogin(data) {
//       loginData=data;
//       hasLogin=true;
//       this.setState({
//         hasLogin : hasLogin,
//         loginData : data,
//       })
//   },
//   render() {
//     return(
//       <div className="loginBox app-Box">
//         <Login hasLogin={this.state.hasLogin} loginData={this.state.loginData} forLogin={this.forLogin}/>
//       </div>
//     )
//   } 
// });

// //注册页面
// const RegistPage=React.createClass({
//     render() {
//         return(
//           <div className="registBox app-Box">
//             <Regist />
//           </div>
//       )
//     }
// });

// //忘记密码
// const StaffListPage=React.createClass({
//   render (){
//     return(
//       <div className="staffBox app-Box">
//           <Staff />
//       </div>
//     )
//   }
// });

import store from '../store/store';

/*
 *  App主要结构,分左中右
 *  左:侧导航,中:首要面板(路由支配),右:信息专栏
 *  作者:hoverCow,日期:2017-02-10
 */

class App extends Component{
  constructor(){
    super();
  }
  render(){
    return (
      <Provider store={store}>
        <div className="MyAdmin">
          <Row>
            <Col span={4}>
              <SlideNav/>
            </Col>
            <Col span={20}>
              <MainRouter/>
            </Col>
          </Row>
        </div>
      </Provider>
    );
  }
} 



export default App;
