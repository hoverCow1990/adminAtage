import React,{Component} from 'react';
import {connect} from 'react-redux';					//链接view以及store
import {hashHistory} from 'react-router';				//路由跳转
import {setOtherUser} from '../../store/login/Action';	//用于发送获取其他用户信息的请求
import {doLink} from '../../store/link/Action';
import {bindActionCreators} from 'redux';       	    //用于链接异步redux的dispacth
import {OTHER_PAGE_SHOW_NUM} from '../../setting/setting';
import {
	Button,
	Icon,
	Pagination
} from 'antd';											//antd组件
import {ADMIN_MAX_STAR} from '../../setting/setting';	//最大星级数量的设置
import './otherPage.less';

/*
 *  他人信息页面
 *	点击后链接至otherPage/+用户id,运用的同样是homePage模板
 *  作者:hoverCow,日期:2017-02-15
 */

class OtherPage extends Component{
	constructor(){
		super();
		this.state={
			nowPagIndex:0,
		}
	}
	//如果刷新页面后登录时长超过服务器设置cookie时长返回登录页面
	//如果有cookie进行其他用户的数据dispatch
	componentWillMount(){
		this.props.setOtherUser();
	}
	//渲染其他用户的详情列表
	render(){
		let otherUser = this.props.otherUser
		if(void 0 === otherUser) return(<div></div>)
		return(
			<article className="otherUser baseWrapper">
				<div className='title-wrapper'>
					<h2 className="base-title"><span>1</span>员工列表</h2>
					<div className='base-add'></div>
				</div>
				<ul className="otherUser-list">
					{this.renderUserDeatil()}
				</ul>
				<div className='otherUser-footer'>
					<div className='otherUser-btn' onClick={()=>hashHistory.push('homePage')}>MyPage<Icon type="right-circle" /></div>
					<div className='otherUser-pag'>
					 	<Pagination defaultCurrent={this.state.nowPagIndex+1} 
					 		total={otherUser.length}
					 		current ={this.state.nowPagIndex+1} 
					 		onChange={(page)=>this.handlePag(page)} pageSize ={OTHER_PAGE_SHOW_NUM}/>
					</div>
				</div>
			</article>
		)
	}
	//根据其他用户的数据渲染li,点击跳转
	renderUserDeatil(){
		let userList = this.props.otherUser,
			stNum = this.state.nowPagIndex,
			edNum = stNum + OTHER_PAGE_SHOW_NUM;
		return userList.slice(stNum,edNum).map(list => 
			<li key={list.id} onClick={(id) => this.handleLink(list.id)}>
				<div className='list-info'>
					<div className="info-perview">
						<img src={'http://www.web-jackiee.com/templets/blog/demo/publicImage/adminAtage/master-'+list.id+'.jpg'}/>
					</div>
					<p className="id"><span className="tag">员工id</span><span className="text">{`000${list.id}`.slice(-4)}</span></p>
					<p className="name"><span className="tag">姓名</span><span className="text">{list.name}</span></p>
					<p className="num"><span className="tag">项目数</span><span className="text">{list.project.length}</span></p>
				</div>
			</li>
		)
	}
	//如果是用户本人操作则去个人主页,不然路由的跳转"otherPage/"+员工id
	handleLink(id){
		let {adminData,dispatch} = this.props;
		let isAdmin = id === adminData.id;
		let src = isAdmin?"homePage":"otherPage/"+id;
		isAdmin && dispatch(doLink('homePage')); 
		hashHistory.push(src);
	}
	handlePag(page) {
	    this.setState({
	    	nowPagIndex : --page
	    })
 	}
}


const getDataProps = state => ({
	adminData : state.adminData,
	otherUser : state.otherUser
})

//链接方法
const setFnProps = dispatch => ({
  dispatch,
  setOtherUser:bindActionCreators(setOtherUser,dispatch),
})


export default connect(getDataProps,setFnProps)(OtherPage);
