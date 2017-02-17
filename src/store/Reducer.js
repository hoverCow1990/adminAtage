import {combineReducers} from 'redux';
//各各功能数据的合并

//用户信息
import {
	adminData,
	otherUser,
} from './login/Reducer';
//文件详情
import {
	projectDetail,
} from './projectDetail/Reducer';
//侧导航高亮以及文件分页
import {
	currentLink,
	currentPagination
} from './link/Reducer';
//云盘
import {
	fileClouds
} from './fileCloud/Reducer';
//合并数据
const reducer = combineReducers({
	currentLink,
	adminData,
	otherUser,
	projectDetail,
	currentPagination,
	fileClouds
})

export default reducer;