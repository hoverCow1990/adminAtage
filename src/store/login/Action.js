import request from 'superagent';


//请求host地址
const REQUEST_BASE_URL = "http://101.200.129.112:9527";
//各请求地址
const API = {
	INIT  	 : '/deploy/init/', 	 //初始化用于检测是否登录
	LOGIN 	 : '/deploy/login/', 	 //登录
	LOGINOUT : '/deploy/logout/', 	 //登出
	USER     : '/deploy/user'
}


/*
 * 获取用户是否登录
 * 返回noLogin的布尔值,result示例:{noLogin: true, error: "please login"}
 * 请求由withCredentials带着cookie一起过去
 */

export const INIT_LOGIN  = "INIT_LOGIN";
const initLoginData = data => ({
	type : INIT_LOGIN,
	data
});

export const SET_OTHER_USER = "SET_OTHER_USER";
const setOtherUser = otherList => ({
	type : 	SET_OTHER_USER,
	otherList	
})

export const initLogin = query => dispatch =>{
	request
		.get(REQUEST_BASE_URL + API.INIT)
		.withCredentials()
		.end((err,res) => {
			res = res.body;
			if(res.hasOwnProperty("noLogin") && res.noLogin) return;
			let {name,id,project} = res.info;
			dispatch(initLoginData({
				noLogin : false,
				name,
				id,
				project
			}));
			dispatch(setOtherUser(res.users))
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