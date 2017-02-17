//请求host地址
export const REQUEST_BASE_URL = "http://101.200.129.112:9527";

//各登录以及用户信息请求地址
export const MAIN_API = {
	INIT  	   : '/deploy/init/', 	     //初始化用于检测是否登录
	LOGIN 	   : '/deploy/login/', 	     //登录
	LOGINOUT   : '/deploy/logout/', 	 //登出
	USER       : '/deploy/user/',		 //用户信息
	DETAIL     : '/deploy/detail/',	     //项目信息
    DEPLOY     : '/deploy/deploy/',      //本地文件上线
    BRANCH     : '/deploy/branch/',      //将远程分支拉复制到本地
    CHECKOUT   : '/deploy/checkout/',	 //切换远程分支
    EDITDEPLOY : '/deploy/editDeploy/',	 //切换需要上传的文件
    RESET      : '/deploy/reset/',       //切换commit
    PULL 	   : '/deploy/pull/',		 //更新远程仓库至本地
    CLONE      : '/deploy/clone/'        //克隆一个git项目
}

//各云盘请求地址
export const FILE_CLOUD_API = {
    GET_FOLDER    : '/file/get/',
    RENAME_FOLDER : '/file/rename/',
    NEW_FOLDER    : '/file/mkdir/',
    REMOVE_FOLDER : '/file/remove/',
    COPY_FOLDER   : '/file/copy',
    CUT_FOLDER    : '/file/move',
}