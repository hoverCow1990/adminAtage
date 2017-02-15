import request from 'superagent';
// import {message} from 'antd'; 				//antd组件
import {cookieMiddleware} from '../cookieMiddleware'	//中间件
import {
	REQUEST_BASE_URL,
	API
} from '../requestApi/requestApi';        	//各类请求的Api地址以及请求根地址

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

//检测已登录后设置全局用户属性
export const initLogin = () => dispatch =>{
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
			dispatch(setOtherUserDate(res.users));
		})
		.catch(err => console.error(err));
}

/*
 * 获取用户是否登录
 * query一个{name,password}
 * 返回noLogin的布尔值,result示例:{noLogin: true, error: "please login"}
 * 如果成功触发initLogin获取资源,之后将在一段时间内请求带有cookie
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

/*
 * 用户登出,不需要传入任何query
 */

export const DO_LOGOUT  = "DO_LOGOUT";
export const doLogoutData = () => ({
	type : DO_LOGOUT ,
});

export const doLogout = () => dispatch => {
	request
		.get(REQUEST_BASE_URL + API.LOGINOUT)
		.withCredentials()
		.end((err,res) => {
			if(err) throw new Error(err);
			dispatch(doLogoutData());
		})
}

/*
 * 获取其他用户信息
 */

export const SET_OTHER_USER = "SET_OTHER_USER";
const setOtherUserDate = otherList => ({
	type : 	SET_OTHER_USER,
	otherList	
})

export const setOtherUser = () => dispatch => {
	request
		.get(REQUEST_BASE_URL + API.INIT)
		.withCredentials()
		.then(cookieMiddleware(dispatch))
		.then(res => {
			dispatch(setOtherUserDate(res.users))
		})
		.catch(err => console.error(err));
}

/*
 * 克隆一个git地址
 * query一个地址以及文件名{url,name}
 * 返回
 */

export const CLONE_PRO = "CLONE_PRO";
const cloneProDate = project => ({
	type : 	CLONE_PRO,
	project
})

export const clonePro = (query,success,fail) => dispatch => {
	request
		.get(REQUEST_BASE_URL + API.CLONE)
		.query(query)
		.withCredentials()
		.then(cookieMiddleware(dispatch))
		.then(res => {
			console.log('1'+res.admin);
			console.log('2'+res.admin.project);
			dispatch(cloneProDate(res.admin.project))
			success&&success();
		})
		.catch(err => {
			fail&&fail();
		});
}