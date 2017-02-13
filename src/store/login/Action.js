import request from 'superagent';
import {doLink} from '../link/Action';		//处理未登录时设置全局currentLink
import {hashHistory} from 'react-router';	//路由机制
import {message} from 'antd'; 				//antd组件

//请求host地址
const REQUEST_BASE_URL = "http://101.200.129.112:9527";
//各请求地址
const API = {
	INIT  	 : '/deploy/init/', 	 //初始化用于检测是否登录
	LOGIN 	 : '/deploy/login/', 	 //登录
	LOGINOUT : '/deploy/logout/', 	 //登出
	USER     : '/deploy/user/',
	DETAIL   : '/deploy/detail/',
    DEPLOY : '/deploy/deploy/',
    BRANCH : '/deploy/branch/'
}


/*
 * 获取用户是否登录
 * 返回noLogin的布尔值,result失败示例:{noLogin: true, error: "please login"}
 * 如果已经登录则返回{info:{..},project:[...],users:[...]}
 * 请求由withCredentials带着cookie一起过去
 */

//登录初始化
export const INIT_LOGIN  = "INIT_LOGIN";
const initLoginData = data => ({
	type : INIT_LOGIN,
	data
});

//获取其他用户信息
export const SET_OTHER_USER = "SET_OTHER_USER";
const setOtherUser = otherList => ({
	type : 	SET_OTHER_USER,
	otherList	
})

//用于远程服务器是否登录的验证,如果没有登录则跳转至登录页面,并提示优先登录
const cookieMiddleware = dispatch => res => {
	res = res.body;
	return new Promise((solve,reject) => {
		if(res.hasOwnProperty("noLogin") && res.noLogin){
			dispatch(doLink('login'));
			hashHistory.push('login');
			reject("没有登录");
			message.warning('麻烦请先登录');
			return;
		} 
		solve(res);
	})
}
//检测已登录后设置全局用户属性
export const initLogin = query => dispatch =>{
	request
		.get(REQUEST_BASE_URL + API.INIT)
		.withCredentials()
		.then(cookieMiddleware(dispatch))
		.then(res => {
			let {name,id,project} = res.info;
			dispatch(initLoginData({
				noLogin : false,
				name,
				id,
				project
			}));
			dispatch(setOtherUser(res.users));
		})
		.catch(err => {
			console.error(err);
		})
}


/*
 * 获取用户是否登录
 * 返回noLogin的布尔值,result示例:{noLogin: true, error: "please login"}
 * 如果成功触发initLogin获取资源
 */

export const DO_LOGIN = "DO_LOGIN";

export const doLogin = (query,sucess,fail) => dispatch =>{
	request
		.get(REQUEST_BASE_URL + API.LOGIN)
		.query(query)
		.withCredentials()
		.end((err,res) => {
			if(err) throw new Error(err);
			if(res.body.noLogin === true) return fail();
			sucess();
			dispatch(initLogin());
		})
}
