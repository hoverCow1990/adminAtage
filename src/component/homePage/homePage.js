import React,{Component} from 'react';
import {connect} from 'react-redux';					//链接view以及store
import {hashHistory} from 'react-router';				//路由跳转
import {doLink} from '../../store/link/Action'; 		//用于侧导航显示行为
import {bindActionCreators} from 'redux';       	    //用于链接异步redux的dispacth
import {
	initLogin,
	clonePro
} from '../../store/login/Action';						//用于侧导航显示行为
import {
	doPagination
} from '../../store/link/Action';						//用于侧导航显示行为
import {
    Row,
    Col,
    Button,
    Icon,
    Pagination,
    Modal,
    message
} from 'antd';											//antd组件
import {ADMIN_MAX_STAR} from '../../setting/setting';	//最大星级数量的设置
import './homePage.less';



/*
 *  个人首页[渲染个人信息页以及别人项目信息页]
 *  展示用户基本信息,进入时检测服务器cookie,若没有返回登录界面
 *  如果当前渲染对象不是用户本人,则不显示查看文件详情的功能
 *	初始化项目分页为0,每页最多3个,点击时利用项目id链接值projectDetail
 *  作者:hoverCow,日期:2017-02-13
 */

class HomePage extends Component{
	//初始分页showPageination为0,之后根据分页点击值,来渲染项目数据
	//isOther判断当前渲染的登录用户还是其他用户
	constructor(){
		super();
		this.state = {
			loading: false,				//是否在clone
			modelVisible : false,		//支配是否出现
			addUrl : '',				//clone git地址Input值
			addName: '',				//clone 项目名字Input值
			currentPag : 1,
		}
	}
	//如果刷新页面后登录时长超过服务器设置cookie时长返回登录页面
	componentWillMount(){
		this.props.initLogin();
	}
	//基本信息运用adminData数据,项目运用project数据
	render(){
		let isOther = this.props.params.id;
		if(isOther && !this.props.otherUser.length) return(<div></div>);
		let data = isOther?this.props.otherUser.find(item=>item.id==isOther):this.props.adminData;
		let{name,id,project} = data;
		if(!id) return(<div></div>)
		return(
			<article className="homePage baseWrapper">
				<section className="ueser-data">
					<div className='title-wrapper'>
						<h2 className="base-title"><span>1</span>用户信息</h2>
					</div>
					<Row>
						<Col span={6}>
							<div className="user-perview feature-perview">
								<img src={'http://www.web-jackiee.com/templets/blog/demo/publicImage/adminAtage/master-'+id+'.jpg'}/>
							</div>
						</Col>
						<Col span={13}>
							<ul className="user-info info-list">
				                <li><span className="tag">用户id:</span><span>{`000${id}`.slice(-4)}</span></li>
				                <li><span className="tag">用户姓名:</span><span>{name}</span></li>
				                <li><span className="tag">项目数量:</span><span>{project.length}</span></li>
				                <li><span className="tag">gitHub:</span><span>{`https:/\/github.com\/letyougo`}</span></li>
				                <li><span className="tag">用户等级:</span><span>{this.getStar(project.length)}</span></li>
				            </ul>
						</Col>
					</Row>
				</section>
				<section className="user-project">
					<div className='title-wrapper title-next'>
						<h2 className="base-title"><span>2</span>展示项目</h2>
						<div className='base-add' style={{'display':isOther?'none':'block'}}><Button type="dashed" onClick={()=>this.handleClone()}>新增 +</Button></div>
					</div>
					<Row>	
						{this.getProject(project)}
					</Row>
					<div className='project-tab'>
					<Pagination current = {isOther?this.state.currentPag:this.props.currentPagination+1} defaultPageSize={3} total={project.length} onChange={(page)=>this.handleCurrentPagination(page)}/>
					</div>
				</section>
				<Modal title="新增Github项目" visible={this.state.modelVisible}
					closable={!this.state.loading} onCancel={()=>this.cancelModal()}
		            footer={[
			            <Button disabled={this.state.loading} key="back" size="large" onClick={()=>this.cancelModal()}>返回</Button>,
			            <Button key="submit" 
			            	type="primary" 
			            	size="large" loading={this.state.loading}
			            	onClick={()=>this.handleSubmit()}>Clone
			            </Button>
		          	]}
		        >
		         	<div className="cloneForm">
		         		<div><p>Github地址:</p><input type='text' onChange={(e) => this.setState({addUrl:e.target.value})}/></div>
		         		<div><p>新项目名:</p><input type='text' onChange={(e) => this.setState({addName:e.target.value})} /></div>
		         	</div>
		        </Modal>
			</article>
		)
	}
	//根据项目数量给定星级评定,最大星级数可以在setting内进行修改
	getStar(length){
	    let IconArr = [];
	    length = Math.min(ADMIN_MAX_STAR,length);
	    for(let i=0;i<length;i++){
	      IconArr.push(<Icon type="star" key={i}/>);
	    }
	    return length?IconArr:"暂时没有等级!";
	}
	//根据请求而来的用户project数据进行操作,显示的区间有state内currentPagination用slice来渲染
	getProject(project){
		let num   = this.props.params.id !== void 0?this.state.currentPag -1:this.props.currentPagination,
			stNum = num*3,
			enNum = stNum + 3,
			btnStyle = this.props.params.id?'none':'block';
		return project.slice(stNum,enNum).map(({description,id,name,url},index) => 
			(<Col key={id} span={8}>
				<section className="project-platform">
					<div className="platform-container">
						<img src={'http://www.web-jackiee.com/templets/blog/demo/publicImage/adminAtage/file-' + id%34 +'.jpg'}/>
						<ul className="platform-info">
							<li><span>名称:</span>{name}</li>					
							<li><span>描述:</span>{description=="description"?'暂未描述...':description}</li>
							<li><span>地址:</span>{url.replace(/^https:\/\//,'')}</li>
						</ul>
						<div className="platfrom-entrance" style={{'display':btnStyle}} onClick={()=>this.handleGoDetail(id)}>
							<p className="ent-detail"><Icon type="eye" />moreDetail</p>
						</div>
					</div>
				</section>
			</Col>));
	}
	//处理分页标签的点击事件
	handleCurrentPagination(currentPagination){
		if(this.props.params.id !== void 0){
			this.setState({currentPag : currentPagination});
			return;
		}
		currentPagination = --currentPagination;
		this.props.dispatch(doPagination(currentPagination));
	}
	//如果是自己的项目则homePage/项目id,其他用户则otherPage/用户id/项目id
	handleGoDetail(id){
		hashHistory.push(`homePage/${id}`);
	}
	//弹出clone模态框
	handleClone(){
		this.setState({
	      modelVisible: true,
	    });
	}
	//取消clone模态框
	cancelModal() {
	    this.setState({
	      modelVisible: false,
	    });
	}
	//提交下载进行发送请求
	//只支持http clone所以得转换地址
	handleSubmit(){
		var {addName:name,addUrl:url} = this.state;
		if(name === ''||url===''){
			message.error('文件名或者地址不得为空');
			return;
		}
		url = url.replace(/^git@github.com:/,'https://github.com/'); 
		this.setState({loading:true});
		this.props.clonePro({url,name},() => {
			message.success(`克隆${name}成功咯`);
			this.setState({
		      modelVisible: false,
		      loading : false,
		    });
		},()=>{
			message.error('克隆失败了~~请检查您的地址');
			this.setState({
		      loading : false,
		    });
		});
	}
}

//链接adminDate数据otherUser数据,以及当前分页列表数据
const getDataProps = state => ({
	adminData 		  : state.adminData,
	otherUser 		  : state.otherUser,
	currentPagination : state.currentPagination,
})

//链接方法
const setFnProps = dispatch => ({
  dispatch,
  initLogin:bindActionCreators(initLogin,dispatch),
  clonePro :bindActionCreators(clonePro,dispatch),
})


export default connect(getDataProps,setFnProps)(HomePage);
