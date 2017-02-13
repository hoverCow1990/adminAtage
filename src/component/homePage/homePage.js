import React,{Component} from 'react';
import {connect} from 'react-redux';			//链接view以及store
import {hashHistory} from 'react-router';		//路由跳转
import {initLogin} from '../../store/login/Action'; //用于侧导航显示行为
import {doLink} from '../../store/link/Action'; //用于侧导航显示行为
import {bindActionCreators} from 'redux';       //用于链接异步redux的dispacth
import {
    Row,
    Col,
    Button,
    Icon,
    Menu, 
    Dropdown
} from 'antd';
import {ADMIN_MAX_STAR} from '../../setting/setting';
import './homePage.less';
/*
 *  个人首页
 *  利用路由支配主界面动向
 *  作者:hoverCow,日期:2017-02-13
 */

class HomePage extends Component{
	constructor(){
		super();
	}
	//如果刷新页面后登录时长超过服务器设置cookie时长返回登录页面
	componentWillMount(){
		let {adminData,initLogin,dispatch} = this.props;
		initLogin();
	}
	render(){
		let{name,id,project} = this.props.adminData;
		return(
			<article className="homePage">
				<section className="ueser-data">
					<h2><span>1</span>用户信息</h2>
					<Row>
						<Col span={6}>
							<div className="user-perview">
								<img src={require("../image/master.jpg")}/>
							</div>
						</Col>
						<Col span={12}>
							<ul className="user-info">
				                <li><span>用户id:</span><span>{`000${id}`.slice(-4)}</span></li>
				                <li><span>用户姓名:</span><span>{name}</span></li>
				                <li><span>项目数量:</span><span>{project.length}</span></li>
				                <li><span>gitHub:</span><span>{`https:/\/github.com\/letyougo`}</span></li>
				                <li><span>用户等级:</span><span>{this.getStar(project.length)}</span></li>
				            </ul>
						</Col>
					</Row>
				</section>
				<section className="ueser-project">
					<h2><span>2</span>展示项目</h2>
					<Row>	
						{this.getProject()}
					</Row>
				</section>
			</article>
		)
	}
	//根据羡慕数量给定星级评定
	getStar(length){
	    let IconArr = [];
	    length = Math.min(ADMIN_MAX_STAR,length);
	    for(let i=0;i<length;i++){
	      IconArr.push(<Icon type="star" key={i}/>);
	    }
	    return length?IconArr:"暂时没有等级!"
	}
	getProject(){
		return this.props.adminData.project.map(({description,id,name,url},index) => 
			(<Col key={id} span={8}>
				<section className="project-platform">
					<div className="platform-container">
						<img src={require(`../image/file-${index+1}.jpg`)}/>
						<ul className="2">
							<li><span>名称:</span>{name}</li>					
							<li><span>描述:</span>{description=="description"?'暂未描述..':''}</li>
							<li><span>地址:</span>{url.replace(/^https:\/\//,'')}</li>
						 </ul>
						<Dropdown overlay={this.getLinkMenu(id)}>
					      <Button>
					        more <Icon type="down" />
					      </Button>
					    </Dropdown>
					</div>
				</section>
			</Col>));
	}
	getLinkMenu(id){
		return (
			<Menu onClick={(e)=>this.handleMenuClick(e)}>
			    <Menu.Item key="1">详细信息</Menu.Item>
			    <Menu.Item key="2">本地文件</Menu.Item>
			    <Menu.Item key="3">跳转Git</Menu.Item>
			</Menu>
		)
	}
	handleMenuClick(e){
		console.log(e.key);
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
