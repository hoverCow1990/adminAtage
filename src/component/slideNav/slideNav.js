import React,{Component} from 'react';
import {Menu,Icon} from 'antd';
import { 
    hashHistory,
} from 'react-router';
import {connect} from 'react-redux';     //connect
import {doLink} from '../../store/link/Action';
import './slideNav.css';

const SubMenu = Menu.SubMenu,
	  stUrl = window.location.hash,
	  nowUrl = stUrl?stUrl.match(/[^\/]+$/)[0]:"login";
/*
 *  antd的Menu组件展示侧导航部分
 *  利用路由支配主界面动向
 *  作者:hoverCow,日期:2017-02-12
 */
class SlideNav extends Component{
	constructor(){
		super();
	}
	//渲染左边导航部分
	render(){
		return (
			<nav className="childNav">
				<div className="nav-title"><span><Icon type="share-alt" /></span>HoverCow Company</div>
		        <Menu
		          theme="dark"
		          onClick={(e) => this.handlerLink(e)}
		          defaultOpenKeys={this.handlerOpenKeys()}
		          selectedKeys={[this.props.currentLink]}
		          mode="inline">
			        <SubMenu key="sub1" title={<span><Icon type="unlock" /><span>登录管理</span></span>}>
			            <Menu.Item key="login">登录界面</Menu.Item>
			            <Menu.Item key="regist">注册管理</Menu.Item>
			        </SubMenu>
			        <SubMenu key="sub2" title={<span><Icon type="bars" /><span>我的个人主页</span></span>}>
			            <Menu.Item key="homePage">主页界面</Menu.Item>
			          </SubMenu>
			        <SubMenu key="sub3" title={<span><Icon type="file-text" /><span>公司文件</span></span>}>
			            <Menu.Item key="fileCloud">文件列表</Menu.Item>
			        </SubMenu>
			        <SubMenu key="sub4" title={<span><Icon type="pay-circle" /><span>公司财务信息管理</span></span>}>
			            <Menu.Item key="pay">支出</Menu.Item>
			            <Menu.Item key="income">收入</Menu.Item>
			            <Menu.Item key="profit">收益线性图</Menu.Item>
			        </SubMenu>
		        </Menu>
		    </nav>
		)
	}
	handlerOpenKeys(){
		switch(this.props.currentLink){
			case 'login' :
			case 'regist':
				return ['sub1'];
			case 'homePage' :
				return ['sub2'];
			case 'fileCloud' :
				return ['sub3'];
			case 'pay' :
			case 'income':
			case 'profit':
				return ['sub4'];
			default :
				return [];
		}
	}
	//控制路由跳转以及store内currentPath值
	handlerLink(e){
		let path = e.key;
		this.props.dispatch(doLink(path));
		hashHistory.push(path); //用hashHistory 处理Router组件外的链接如果用的BrowserHistory则一样
	}
}

const setDateProps = state =>({
	currentLink : state.currentLink
});

export default connect(setDateProps)(SlideNav);
