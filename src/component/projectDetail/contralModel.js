import React,{Component} from 'react';
import {connect} from 'react-redux';					//链接view以及store
import {hashHistory} from 'react-router';				//路由跳转
import {
	setProDetail,
	selectFolder,
	selectBranch,
	commitBack,
	pullRemoteBranch
} from '../../store/projectDetail/Action';				//用于处理各请求的行为
import {bindActionCreators} from 'redux';       	    //用于链接异步redux的dispacth
import {
    Row,
    Col,
    Button,
    Icon,
    Modal,
    message,
} from 'antd';											//antd组件
import './projectDetail.less';

class contralModel extends Component{
	constructor(){
		super();
		this.state = {
			loading: false,
			modelVisible : false,		//支配是否出现
			modelCommitInfo : {},		//支配弹出框内的详细版本信息
			modelPrompt : null,
			modelType : null,
			currentSelect : null,
		};
	}
	
} 