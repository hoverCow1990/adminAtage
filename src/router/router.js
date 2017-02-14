import React,{Component}from 'react';
import { 
  Router, 
  Route, 
  hashHistory,
  IndexRedirect,
} from 'react-router';
import LoginPage from '../component/login/login';
import HomePage from '../component/homePage/homePage';
import ProjectDetail from '../component/projectDetail/projectDetail';

class MainRouter extends Component{
  constructor(){
    super();
  }
  render(){
      return (
        <Router history={hashHistory}>
          <Route path="/">
            <IndexRedirect to="login"/>                           //跳转至某页面依赖IndexRedirect
              <Route path="/login"    component={LoginPage}/>
              <Route path="homePage/:name" component={ProjectDetail}/>
              <Route path="homePage" component={HomePage} />
          </Route>
        </Router>
      )
    }
}


export default MainRouter;

// <Route path="regist" component={RegistPage}/>
// <Route path="staffList" component={StaffListPage}/>
// <Route path="fileCloud(/**)" component={FileCloud}/>