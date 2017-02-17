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
import FileCloud from '../component/fileCloud/fileCloud';
import OtherPage from '../component/otherPage/otherPage';
import chartProPage from '../component/chartProPage/chartProPage';
import chartAdminPage from '../component/chartAdminPage/chartAdminPage';
import DefaultPage from '../component/page404/page404';

/*
 *  路由机制
 *  login为登录页面渲染登录页LoginPage
 *  homePage/[用户id]渲染项目详情ProjectDetail
 *  homePage或者otherPage/:id 渲染本人或者其他用户首页HomePage
 *  fileCloud/../....后面任意路径渲染云盘页 FileCloud
 *  otherPage渲染所有用户页面OtherPage
 *  剩余没匹配到的渲染404页面DefaultPage
 *  作者:hoverCow,日期:2017-02-12
 */


class MainRouter extends Component{
  constructor(){
    super();
  }
  render(){
      return (
        <Router history={hashHistory}>
          <Route path="/">
            <IndexRedirect to="login"/>                                     
              <Route path="/login"    component={LoginPage}/> 
              <Route path="homePage/:name" component={ProjectDetail}/>
              <Route path="homePage" component={HomePage} />
              <Route path="fileCloud(/**)" component={FileCloud} />
              <Route path="otherPage/:id" component={HomePage} />
              <Route path="otherPage" component={OtherPage} />
              <Route path="chart-deploy" component={chartProPage} />
              <Route path="chart-admin" component={chartAdminPage} />
              <Route path="*" component={DefaultPage} />
          </Route>
        </Router>
      )
    }
}


export default MainRouter;

//<Route path="otherPage/:id/:name" component={ProjectDetail} />