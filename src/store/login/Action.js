import request from 'superagent';


//请求host地址
const REQUEST_BASE_URL = "http://101.200.129.112:9527";
//各请求地址
const API = {
	INIT  	 : '/deploy/init/', 	 //初始化用于检测是否登录
	LOGIN 	 : '/deploy/login/', 	 //登录
	LOGINOUT : '/deploy/logout/' 	 //登出
}


/*
 * 获取用户是否登录
 * 返回noLogin的布尔值,result示例:{noLogin: true, error: "please login"}
 * 请求由withCredentials带着cookie一起过去
 */

export const CHECK_LOGIN  = "CHECK_LOGIN";
export const getLoginData = noLogin => ({
	type : CHECK_LOGIN,
	noLogin
})

export const checkLogin = query => dispatch =>{
	request
		.get(REQUEST_BASE_URL + API.INIT)
		.withCredentials()
		.end((err,res) => {
			dispatch(getLoginData(res.body));
		})
}

export const GET_STUDENT = "GET_STUDENT";

const initList = list => ({
	type : GET_STUDENT,
	list,
});

export const getStudent = query => dispatch =>{
	request
		.get(REQUEST_BASE_URL + API.INIT)
		.end((err,res) => {
			if(err) throw new Error(err);
			dispatch(initList(res.body));
		})
}