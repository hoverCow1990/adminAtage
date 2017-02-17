import React,{Component} from 'react';
import {connect} from 'react-redux';					//链接view以及store
import {initLogin} from '../../store/login/Action';		//用于侧导航显示行为
import {bindActionCreators} from 'redux';       	    //用于链接异步redux的dispacth\
import {hashHistory} from 'react-router';				//路由跳转
import {
	Button,
	Row,
	Col,
    Modal,
    Icon
} from 'antd';
import './chartProPage.less';
import ProChart from './proChart';
import ComChart from './comChart';
import {ADMIN_MAX_STAR} from '../../setting/setting';

/*
 *  项目线新图
 *  作者:hoverCow,日期:2017-02-17
 */

class chartProPage extends Component{
	constructor(){
		super();
		this.state={
			select : null,
			modelVisible : false,		//模态框的显示隐藏
			modelDetail : null,
			modelLink : '',
		}
	}
	componentWillMount(){
		this.props.initLogin();
	}
	shouldComponentUpdate(nextProps){
		return nextProps.otherUser.length !== 0;
	}
	render(){
		let allUser = this.props.otherUser;
		if(allUser.length === 0) return(null);
		return (
			<section className='chart-wrapper baseWrapper'>
				<div className='title-wrapper'>
					<h2 className="base-title"><span>1</span>项目数据信息</h2>
				</div>
				<div className='chart-container'>
					<Row>
						<Col span={12}>
							<ProChart data={allUser} select={this.state.select} showModel={(name)=>this.showModel(name)}/>
						</Col>
						<Col span={12}>
							<ComChart data={allUser} select={this.state.select} showModel={(name)=>this.showModel(name)}/>
						</Col>
					</Row>
				</div>
				<Modal title="员工信息" visible={this.state.modelVisible}
					onCancel={()=>this.hideModal()}
		            footer={[
			            <Button key="back" size="large" onClick={()=>this.hideModal()}>返回</Button>,
			            <Button key="submit" type="primary" size="large"
			            	onClick={()=>hashHistory.push(this.state.modelLink)}>确定
			            </Button>
		          	]}
		        >
		         	<div className='chart-model-detail'>
		         		{this.getDetail()}
		         	</div>
		        </Modal>
			</section>
		)
	}
	showModel(name){
		let modelDetail = this.props.otherUser.find(item => item.name === name),
			modelLink = modelDetail.name === this.props.adminData.name?'homePage':`otherPage/${modelDetail.id}`;
		this.setState({
			modelVisible : true,
			modelDetail,
			modelLink
		})
	}
	hideModal(){
		this.setState({
			modelVisible : false,
		})
	}
	getDetail(){
		let modelDetail = this.state.modelDetail;
		if(null=== modelDetail) return null;
		console.log(modelDetail)
		let {id,name,project} = modelDetail,
			len = project.length;
		return (
			<Row>
				<Col span={10}>
					<div className='detail-perviewer'>
						<img src={'http://www.web-jackiee.com/templets/blog/demo/publicImage/adminAtage/master-'+modelDetail.id+'.jpg'}/>
					</div>
				</Col>
				<Col span={14}>
					<ul>
						<li><span>id:</span><p>{`0000${id}`.slice(-4)}</p></li>
						<li><span>姓名:</span><p>{name}</p></li>
						<li><span>员工等级:</span><p>{this.getStar(len)}</p></li>
						<li><span>最近项目名称:</span><p>{len?project[0].name:'无'}</p></li>
					</ul>
				</Col>
			</Row>
		);
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
}


//链接adminDate数据otherUser数据,以及当前分页列表数据
const getDataProps = state => ({
	adminData 		  : state.adminData,
	otherUser 		  : state.otherUser,
})

//链接方法
const setFnProps = dispatch => ({
  dispatch,
  initLogin:bindActionCreators(initLogin,dispatch),
})


export default connect(getDataProps,setFnProps)(chartProPage);




