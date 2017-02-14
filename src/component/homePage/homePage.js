import React,{Component} from 'react';
import {connect} from 'react-redux';					//链接view以及store
import {hashHistory} from 'react-router';				//路由跳转
import {initLogin} from '../../store/login/Action';		//用于侧导航显示行为
import {doLink} from '../../store/link/Action'; 		//用于侧导航显示行为
import {bindActionCreators} from 'redux';       	    //用于链接异步redux的dispacth
import {
    Row,
    Col,
    Button,
    Icon,
    Pagination 
} from 'antd';											//antd组件
import {ADMIN_MAX_STAR} from '../../setting/setting';	//最大星级数量的设置
import './homePage.less';

/*
 *  个人首页
 *  展示用户基本信息,进入时检测服务器cookie,若没有返回登录界面
 *	初始化项目分页为0,每页最多3个,点击时利用项目id链接值projectDetail
 *  作者:hoverCow,日期:2017-02-13
 */

class HomePage extends Component{
	//初始分页showPageination为0,之后根据分页点击值,来渲染项目数据
	constructor(){
		super();
		this.state = {
			showPagination : 0,
		}
	}
	//如果刷新页面后登录时长超过服务器设置cookie时长返回登录页面
	componentWillMount(){
		let {initLogin} = this.props;
		initLogin(this.showProject);
	}
	//基本信息运用adminData数据,项目运用project数据
	render(){
		let{name,id,project} = this.props.adminData;
		return(
			<article className="homePage baseWrapper">
				<section className="ueser-data">
					<h2 className="base-title"><span>1</span>用户信息</h2>
					<Row>
						<Col span={6}>
							<div className="user-perview feature-perview">
								<img src={require("../image/master.jpg")}/>
							</div>
						</Col>
						<Col span={12}>
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
					<h2 className="base-title"><span>2</span>展示项目</h2>
					<Row>	
						{this.getProject()}
					</Row>
					<div className='project-tab'>
					<Pagination defaultCurrent={this.state.showPagination+1} defaultPageSize={3} total={project.length} onChange={()=>this.handleShowPagination()}/>
					</div>
				</section>
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
	//根据请求而来的用户project数据进行操作,显示的区间有state内showPagination用slice来渲染
	getProject(){
		let stNum = this.state.showPagination,
			enNum = stNum + 3;
		return this.props.adminData.project.slice(stNum,enNum).map(({description,id,name,url},index) => 
			(<Col key={id} span={8}>
				<section className="project-platform">
					<div className="platform-container">
						<img src={require(`../image/file-${id}.jpg`)}/>
						<ul className="platform-info">
							<li><span>名称:</span>{name}</li>					
							<li><span>描述:</span>{description=="description"?'暂未描述...':description}</li>
							<li><span>地址:</span>{url.replace(/^https:\/\//,'')}</li>
						</ul>
						<div className="platfrom-entrance" onClick={()=>this.handleGoDetail(id)}>
							<p className="ent-detail"><Icon type="eye" />moreDetail</p>
						</div>
					</div>
				</section>
			</Col>));
	}
	//处理分页标签的点击事件
	handleShowPagination(showPagination){
		this.setState({
			showPagination
		});
	}
	handleGoDetail(id){
		hashHistory.push(`homePage/${id}`)
	}
}


const getDataProps = state => ({
	adminData : state.adminData
})

//链接方法
const setFnProps = dispatch => ({
  dispatch,
  initLogin:bindActionCreators(initLogin,dispatch),
})


export default connect(getDataProps,setFnProps)(HomePage);
