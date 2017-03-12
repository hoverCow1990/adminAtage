import React,{Component}  from 'react';
import {Row,Col}          from 'antd';
import MainRouter         from '../router/router';
import SlideNav           from "./slideNav/slideNav";
import {Provider}         from 'react-redux';
import store              from '../store/store';
import '../../node_modules/antd/dist/antd.css';
import './App.css';
import './global.less';

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
