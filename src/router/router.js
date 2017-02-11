import React,{Component}from 'react';
import { 
  Router, 
  Route, 
  hashHistory,
  IndexRedirect,
} from 'react-router';
import LoginPage from '../component/login/login';

class MainRouter extends Component{
  constructor(){
    super();
  }
  render(){
      return (
        <Router history={hashHistory}>
          <Route path="/">
            <IndexRedirect to="login"/>                           //跳转至某页面依赖IndexRedirect
            <Route path="login" component={LoginPage}/>
          </Route>
        </Router>
      )
    }
}


export default MainRouter;

// <Route path="regist" component={RegistPage}/>
// <Route path="staffList" component={StaffListPage}/>
// <Route path="fileCloud(/**)" component={FileCloud}/>