import React,{Component} from 'react';
import {connect} from 'react-redux';					//链接view以及store
import {hashHistory} from 'react-router';				//路由跳转
import {
	setProDetail,
	selectFolder
} from '../../store/projectDetail/Action';		//用于侧导航显示行为
import {bindActionCreators} from 'redux';       	    //用于链接异步redux的dispacth
import {
    Row,
    Col,
    Button,
    Icon,
    Modal,
} from 'antd';											//antd组件
import './projectDetail.less';

/*
 *  个人首页
 *  进行本地分支的切换,commit版本的回退,远程pull,以及项目上线
 *  作者:hoverCow,日期:2017-02-13
 */

class ProjectDetail extends Component{
	//负责回退版本详情弹出框
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
	//从params内获取url路径,实现发送文件id请求,渲染文件列表详情
	componentWillMount(){
		let id = this.props.params.name;
		this.props.setProDetail({repo_id:id});
	}
	//渲染整个文件列表系统,包括文件详情,版本信息以及推送更新等操作按键
	//项目描述若问description则直接显示为...
	render(){
		if(!Object.keys(this.props.projectDetail).length) return(<div></div>);
		let {name,folders,local_branches,remote_branches,description,active_branch,commit_info,deploy} = this.props.projectDetail;
		return(
			<article className="ProjectDetail baseWrapper">
				<section className="project-data">
					<h2 className="base-title"><span>1</span>项目信息</h2>
					<Row>
						<Col span={6}>
							<div className="project-perview feature-perview">
								<img src={require(`../image/file-${this.props.params.name}.jpg`)}/>
							</div>
						</Col>
						<Col span={14}>
							<ul className="project-info info-list">
				                <li><span className="tag">项目名称:</span><span>{name}</span></li>
				                <li><span className="tag">项目文件:</span><div className="ant-breadcrumb">{this.getFolders(folders,deploy)}</div></li>
				                <li><span className="tag">本地分支:</span><div className="ant-breadcrumb">{this.getBranches(local_branches,active_branch)}</div></li>
				                <li><span className="tag">远程分支:</span><div className="ant-breadcrumb">{this.getBranches(remote_branches)}</div></li>
				                <li><span className="tag">项目描述:</span><span>{description=="description"?'...':description}</span></li>
					        </ul>
						</Col>
					</Row>
				</section>
				<section className="project-commit">
					<h2 className="base-title"><span>2</span>版本回退</h2>
					<div className="commit-step">
						<ul>
							{this.getCommitStep(commit_info)}
						</ul>
					</div>
				</section>
				<Modal title="Commit-版本信息" visible={this.state.modelVisible}
		          onOk={()=>this.handleSubmit()} onCancel={()=>this.cancelModal()}
		          okText ={this.state.modelType == 'commitModle'?'回退该版本':'确定'} iconType='up-circle'
		          >
		          {this.modelDetail()}
		        </Modal>
			</article>
		)
	}
	//根据获取数据内的folders数组进行渲染,如果当前文件名=获取数据内deploy的文件名则渲染为active状态
	getFolders(folders,deploy){
		return folders.map(value => 
			<span key={value}>
				<span className={`ant-breadcrumb-link${value==deploy?' active':''}`}
					onClick={()=>this.handleFolders(value)}>{value}</span>
				<span className="ant-breadcrumb-separator">/</span>
			</span>);
	}
	//对支线进行,包括本地和远程,如果该支线名等于获取数据内active_branch则渲染为active状态
	getBranches(branches,active){
		return Object.keys(branches).map(key => 
			<span key={key}>
				<span className={`ant-breadcrumb-link${key==active?" active":''}`} 
					onClick={()=>this.handleBranches(key)}>
						{key.replace(/^origin\//,"")}
				</span>
				<span className="ant-breadcrumb-separator">/</span>
			</span>)
	}
	//根据获取数据内的commit_info进行版本列表渲染,调用new Date换算时间戳
	getCommitStep(commit){
		return commit.map((item,index) => 
		<li key={index}>
			<div className="tag" onClick={()=>this.showModal(item,'commitModle')}>{index+1}</div>
			<div className="info">
				<p>{this.getCommitTime(item.time,Date.prototype.toLocaleDateString)}</p>
				<p>{item.message}</p>
			</div>
		</li>)
	}
	//获取时间戳函数,根据传进来的fn调用不同函数达到是否获取详细日期-时间或仅仅日期
	getCommitTime(date,fn){
		return fn.call(new Date(date*1000));
	}
	//负责弹出层组件的渲染内容,数据来自state.modelCommitInfo
	modelDetail(modelDate){
		let modelType = this.state.modelType;
		let {modelCommitInfo,modelPrompt} = this.state;
		if(null === modelType || modelType == 'commitModle' && !Object.keys(modelCommitInfo).length) return;
		switch(modelType){
			case 'commitModle':
				return this.renderCommitModle(modelCommitInfo);
			case 'folderModle' :
				return this.renderPromptModel(modelPrompt,'为上传文件');
			case 'brancheModle' :
				return this.renderPromptModel(modelPrompt,'为本地分支');
			default :
				return (<p></p>)
		}
	}
	renderCommitModle(modelDate){
		let data = {
			'推送者': modelDate.author.name,
			'email':modelDate.author.email,
			'描述信息':modelDate.message,
			'推送时间':this.getCommitTime(modelDate.time,Date.prototype.toLocaleString),
			'版本指针':modelDate.sha
		};
		let arr = new Array();
		for(let [key,value] of Object.entries(data)){
			arr.push(<p className="modelKey" key={key}><span>{key}</span>{value}</p>)
		}
		return arr;
	}
	renderPromptModel(promptDate,str){
		return (<p className="modelPrompt">您是否要切换<span>{promptDate}</span>{str}</p>)
	}
	handleFolders(value){
		if(this.props.projectDetail.deploy == value) return;
		this.showModal(value,'folderModle')
	}
	handleBranches(value){
		if(this.props.projectDetail.active_branch == value) return;
		this.showModal(value,'brancheModle')
	}
	//antd组件展示model框
	showModal(data,modelType) {
		let state = 'string' === typeof data?{modelPrompt:data}:{modelCommitInfo:data};
	    this.setState({
	      modelVisible: true,
	      modelType,
	      ...state
	    });
	}
	//antd组件关闭model框
	cancelModal(e) {
	    this.setState({
	      modelVisible: false,
	    });
	}
	//antd组件用于回退版本号的点击
	handleSubmit() {
		let{name} = this.props.params;
		let{modelType,modelCommitInfo,modelPrompt} = this.state;
	    switch(modelType){
	    	case 'folderModle' :
	    		this.props.selectFolder({repo_id:name,deploy:modelPrompt},this.handleLoading.bind(this));
	    		this.setState({loading:true});
	    		break;
	    }
	}
	handleLoading(){
		this.setState({loading:false,modelVisible:false});
	}
}

const getDataProps = state => ({
	projectDetail : state.projectDetail
});

//链接方法
const setFnProps = dispatch => ({
  dispatch,
  setProDetail:bindActionCreators(setProDetail,dispatch),
  selectFolder:bindActionCreators(selectFolder,dispatch)
})


export default connect(getDataProps,setFnProps)(ProjectDetail);
