import React,{Component} from 'react';
import {Menu,Icon} from 'antd';
import { 
    hashHistory,
} from 'react-router';
import {connect} from 'react-redux';     //connect
import {doLink} from '../../store/link/Action';
import './slideNav.less';

const SubMenu = Menu.SubMenu;
/*
 *  antd的Menu组件展示侧导航部分
 *  利用路由支配主界面动向
 *  作者:hoverCow,日期:2017-02-12
 */
class SlideNav extends Component{
	constructor(){
		super();
		this.state={
			openKeys :[]
		}
	}
	//渲染左边导航部分onClick为二级导航点击事件用于支配路由,selectedKeys为当前高亮的二级导航
	//onOpenChange为点击一级导航的回调,openKeys为当前展开的一级菜单
	render(){
		return (
			<nav className="childNav">
				<div className="nav-title"><span><Icon type="share-alt" /></span>HoverCow Company</div>
		        <Menu
		          theme="dark"
		          onClick={(item) => this.handlerLink(item)}
		          onOpenChange={(item) => this.handlerSelect(item)}
		          openKeys = {this.handlerOpenKeys()}
		          selectedKeys={[this.props.currentLink]}
		          mode="inline">
			        <SubMenu key="sub1" title={<span><Icon type="unlock" /><span>登录管理</span></span>}>
			            <Menu.Item key="login">登录界面</Menu.Item>
			        </SubMenu>
			        <SubMenu key="sub2" title={<span><Icon type="bars" /><span>公司员工主页</span></span>}>
			            <Menu.Item key="homePage">我的主页</Menu.Item>
			            <Menu.Item key="otherPage">所有用户</Menu.Item>
			          </SubMenu>
			        <SubMenu key="sub3" title={<span><Icon type="file-text" /><span>公司文件</span></span>}>
			            <Menu.Item key="fileCloud">文件列表</Menu.Item>
			        </SubMenu>
			        <SubMenu key="sub4" title={<span><Icon type="bar-chart" /><span>公司人员数据图</span></span>}>
			            <Menu.Item key="chart-deploy">项目数据</Menu.Item>
			            <Menu.Item key="chart-admin">我的数据</Menu.Item>
			        </SubMenu>
		        </Menu>
		    </nav>
		)
	}
	//判断当前展开的模块,首次加载用checkCurrentLink判断展开模块
	//之后根据用户的点击操作
	handlerOpenKeys(){
		let openKeys = this.state.openKeys;
		if(!openKeys.length) return this.checkCurrentLink();
		return openKeys;
	}
	checkCurrentLink(){
		switch(this.props.currentLink){
			case 'login' :
			case 'regist':
				return ['sub1'];
			case 'homePage' :
			case 'otherPage' :
				return ['sub2'];
			case 'fileCloud' :
				return ['sub3'];
			case 'chart-deploy':
			case 'chart-admin':
				return ['sub4'];
			default :
				return [];
		}
	}
	//控制路由跳转以及store内currentPath值
	handlerLink(item){
		let path = item.key;
		this.props.dispatch(doLink(path));
		hashHistory.push(path); //用hashHistory 处理Router组件外的链接如果用的BrowserHistory则一样
	}
	//用于用户点击后执行一级菜单的展开
	handlerSelect(item){
		this.setState({
			openKeys : item
		});
	}
}

const setDateProps = state =>({
	currentLink : state.currentLink
});

export default connect(setDateProps)(SlideNav);
