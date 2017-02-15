import React,{Component} from 'react';
import {connect} from 'react-redux';					//链接view以及store
import {hashHistory} from 'react-router';				//路由跳转
import {
	setProDetail,
	selectFolder,
	selectBranch,
	commitBack,
	pullRemoteBranch,
	deployFolder,
	checkoutRemoteBranch
} from '../../store/projectDetail/Action';				//用于处理各请求的行为
import {bindActionCreators} from 'redux';       	    //用于链接异步redux的dispacth
import {
    Row,
    Col,
    Button,
    Icon,
    Modal,
    message,
    Alert
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
			currentSelect : null
		};
	}
	//从params内获取url路径,实现发送文件id请求,渲染文件列表详情
	componentWillMount(){
		let name = this.props.params.name;
		this.props.setProDetail({repo_id:name});
	}
	//渲染整个文件列表系统,包括文件详情,版本信息以及推送更新等操作按键
	//项目描述若问description则直接显示为...
	render(){
		if(!Object.keys(this.props.projectDetail).length) return(<div></div>);
		let {name,folders,local_branches,remote_branches,description,active_branch,commit_info,deploy,url} = this.props.projectDetail;
		let isCommit = this.state.modelType === "commitModle";
		//若后台数据发生问题,则弹出错误报告
		if(void 0 === folders) {return (
			<Alert message="错误报告"
		    description="后台返回数据发生错误,请过几分钟测试,或联系 qq:547007933..."
		    type="error"
		    closable/>)
		}
		return(
			<article className="ProjectDetail baseWrapper">
				<section className="project-data">
					<div className='title-wrapper'>
						<h2 className="base-title"><span>1</span>项目信息</h2>
						<div className='base-link'><Button type="dashed">back</Button></div>
					</div>
					<Row>
						<Col span={6}>
							<div className="project-perview feature-perview">
								<img src={require(`../image/file-12.jpg`)}/>
							</div>
						</Col>
						<Col span={14}>
							<ul className="project-info info-list">
				                <li><span className="tag">项目名称:</span><span>{name}</span></li>
				                <li><span className="tag">项目文件:</span><div className="ant-breadcrumb">{this.getFolders(folders,deploy)}</div></li>
				                <li><span className="tag">本地分支:</span><div className="ant-breadcrumb">{this.getLocaleBranches(local_branches,active_branch)}</div></li>
				                <li><span className="tag">远程分支:</span><div className="ant-breadcrumb">{this.getRemoteBranches(remote_branches)}</div></li>
				                <li><span className="tag">项目描述:</span><span>{description=="description"?'...':description}</span></li>
					        </ul>
						</Col>
					</Row>
				</section>
				<section className="project-commit">
					<div className='title-wrapper title-next'>
						<h2 className="base-title"><span>2</span>文件操作</h2>
					</div>
					<div className="folder-contral">
						<Row>
							<Col span={6}>
								<div className="folder-perview">
									<img src={require(`./image/folder-2.png`)}/>
								</div>
							</Col>
							<Col span={16}>
								<div className="current-title currentFolder">当前文件名称 :<span>{deploy}</span></div>
								<div className="current-title currentBranch">当前项目分支 :<span>{active_branch}</span></div>
								<div className="current-title currentCommit">当前项目版本 :<span>{this.getCommitTime(commit_info[commit_info.length-1].time,Date.prototype.toLocaleString)}</span></div>
								<div className="button-group">
									<Button type="primary" onClick={()=>this.handlePull()}>更新远程至本地仓库</Button>
								    <Button type="primary" onClick={()=>this.handleDeploy()}>在本地云盘上线</Button>
								    <Button type="primary"><a href={url} target="blank">预览git仓库</a></Button>
								    <Button type="primary">预览本地云盘</Button>
								</div>
							</Col>
						</Row>
					</div>
				</section>
				<section className="project-commit">
					<div className='title-wrapper title-next'>
						<h2 className="base-title"><span>3</span>版本选择</h2>
					</div>
					<div className="commit-step">
						<ul>
							{this.getCommitStep(commit_info)}
						</ul>
					</div>
				</section>
				<Modal title="Commit-版本信息" visible={this.state.modelVisible}
					closable={!this.state.loading} onCancel={()=>this.cancelModal()}
		            footer={[
			            <Button disabled={this.state.loading} key="back" size="large" onClick={()=>this.cancelModal()}>返回</Button>,
			            <Button key="submit" 
			            	type="primary" 
			            	size="large" loading={this.state.loading}
			            	onClick={()=>this.handleSubmit()}>{isCommit?"选择该版本":"确定"}
			            </Button>
		          	]}
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
	getLocaleBranches(branches,active){
		return Object.keys(branches).map(key => 
			<span key={key}>
				<span className={`ant-breadcrumb-link${key==active?" active":''}`} 
					onClick={()=>this.handleLocaleBranches(key)}>
						{key}
				</span>
				<span className="ant-breadcrumb-separator">/</span>
			</span>)
	}
	getRemoteBranches(branches){
		return Object.keys(branches).filter(branch=>branch!='origin/HEAD').map(key => 
			<span key={key}>
				<span className='ant-breadcrumb-link' 
					onClick={()=>this.handleRemoteBranches(key)}>
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
	//匹配上午或者下午至am或者pm
	getCommitTime(date,fn){
		return fn.call(new Date(date*1000)).replace(/上午|下午/g,$0 => {
			switch($0){
				case '上午':
					return 'am-';
				case '下午': 
					return 'pm-';
			}
		});
	}
	//负责弹出层组件的渲染内容,数据来自state.modelCommitInfo
	modelDetail(modelDate){
		let modelType = this.state.modelType;
		let {modelCommitInfo,modelPrompt} = this.state;
		if(null === modelType || modelType == 'commitModle' && !Object.keys(modelCommitInfo).length) return;
		switch(modelType){
			case 'folderModle' :
				return this.renderPromptModel(modelPrompt,'您是否要切换','为上传文件');
			case 'brancheModle' :
				return this.renderPromptModel(modelPrompt,'您是否要切换','为本地分支');
			case 'checkoutRemoteModle' :
				return this.renderPromptModel(modelPrompt,'您是否要拉取','入本地分支');
			case 'pullModle'  :
				return this.renderPromptModel(modelPrompt,'您是否确定要更新远程仓库至本地仓库');
			case 'deployModle'  :
				return this.renderPromptModel(modelPrompt,'您是否确定要上线该项目');
			case 'commitModle':
				return this.renderCommitModle(modelCommitInfo);
			default :
				return (<p></p>)
		}
	}
	//渲染模态框的切换分支以及文件的展示
	renderPromptModel(promptDate,str1='',str2=''){
		return (<p className="modelPrompt">{str1}<span>{promptDate}</span>{str2}</p>)
	}
	//渲染模态框的切换commit版本号的详细信息展示
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
	//进行点击文件已经为当前active文件,不是才弹出模态框
	handleFolders(value){
		if(this.props.projectDetail.deploy == value) return;
		this.showModal(value,'folderModle')
	}
	//进行点击分支已经为当前active文件,不是才弹出模态框
	handleLocaleBranches(value){
		if(this.props.projectDetail.active_branch == value) return;
		this.showModal(value,'brancheModle')
	}
	//进行拷贝远程分支至本地
	handleRemoteBranches(value){
		value = value.replace(/^origin\//,"");
		this.showModal(value,'checkoutRemoteModle');
	}
	//更新远程分支
	handlePull(){
		this.showModal('','pullModle');
	}
	//上传文件至本地服务器
	handleDeploy(){
		this.showModal('','deployModle');
	}
	//antd组件展示model框,根据点击传参的modelType设置当前的modelType
	//如果传入data为string[文件以及分支切换]的提示信息则设置modelPrompt
	//如果data为对象,说明是commit分支的点击需要设置modelCommitInfo
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
	//antd组件的提交按钮!根据modelType判断,用于最后发送数据,以及传入成功回调以及成功提示信息
	handleSubmit() {
		if(this.state.loading) return;
		let{name} = this.props.params;
		let{modelType,modelCommitInfo,modelPrompt} = this.state;
	    switch(modelType){
	    	case 'folderModle'  :
	    		this.props.selectFolder({repo_id:name,deploy:modelPrompt},
	    			this.handleLoadingSucess.bind(this,`成功切换文件为${modelPrompt}`),
	    			this.handleLoadingFail.bind(this,'切换文件失败'));
	    		break;
	    	case 'brancheModle' :
	    		this.props.selectBranch({repo_id:name,branch:modelPrompt},
	    			this.handleLoadingSucess.bind(this,`成功切换本地分支为${modelPrompt}`),
	    			this.handleLoadingFail.bind(this,'切换支线失败'))
	    		break;
	    	case 'checkoutRemoteModle' :
	    		this.props.selectBranch({repo_id:name,branch:modelPrompt},
	    			this.handleLoadingSucess.bind(this,`成功拉取远程分支${modelPrompt}至本地`),
	    			this.handleLoadingFail.bind(this,'拉取失败了'))
	    		break;
	    	case 'pullModle'  :
				this.props.pullRemoteBranch({repo_id:name},
					this.handleLoadingSucess.bind(this,'成功更新远程仓库至本地'),
	    			this.handleLoadingFail.bind(this,'更新远程仓库失败'))
				break;
			case 'deployModle'  :
				this.props.deployFolder({repo_id:name},
					this.handleLoadingSucess.bind(this,'成功上线该文件'),
	    			this.handleLoadingFail.bind(this,'您的上线失败了'))
				break;	
	    	case 'commitModle'  :
	    		this.props.commitBack({repo_id:name,sha:modelCommitInfo.sha},
	    			this.handleLoadingSucess.bind(this,`成功回退版本至${modelCommitInfo.sha}`),
	    			this.handleLoadingFail.bind(this,'回退版本失败'))
	    		break;
	    }
	    this.setState({loading:true});
	}
	//成功后进行回调关闭loading以及模态框
	handleLoadingSucess(str){
		this.setState({loading:false,modelVisible:false});
		message.success(str);
	}
	//失败后进行回调关闭loading以及模态框
	handleLoadingFail(str){
		this.setState({loading:false,modelVisible:false});
		message.error(str);
	}
}

//projectDetail数据
const getDataProps = state => ({
	projectDetail : state.projectDetail,
});

//链接方法
const setFnProps = dispatch => ({
  dispatch,
  setProDetail         :bindActionCreators(setProDetail,dispatch),
  selectFolder         :bindActionCreators(selectFolder,dispatch),
  selectBranch         :bindActionCreators(selectBranch,dispatch),
  commitBack           :bindActionCreators(commitBack,dispatch),
  pullRemoteBranch     :bindActionCreators(pullRemoteBranch,dispatch),
  deployFolder         :bindActionCreators(deployFolder,dispatch),
  checkoutRemoteBranch :bindActionCreators(checkoutRemoteBranch,dispatch),
})
//链接数据层
export default connect(getDataProps,setFnProps)(ProjectDetail);
