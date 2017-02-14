//请求host地址
export const REQUEST_BASE_URL = "http://101.200.129.112:9527";
//各请求地址
export const API = {
	INIT  	   : '/deploy/init/', 	     //初始化用于检测是否登录
	LOGIN 	   : '/deploy/login/', 	     //登录
	LOGINOUT   : '/deploy/logout/', 	 //登出
	USER       : '/deploy/user/',		 //用户信息
	DETAIL     : '/deploy/detail/',	     //项目信息
    DEPLOY     : '/deploy/deploy/',
    BRANCH     : '/deploy/branch/',
    EDITDEPLOY : '/deploy/editDeploy/',
}