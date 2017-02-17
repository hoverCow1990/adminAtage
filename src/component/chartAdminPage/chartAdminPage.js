import React,{Component} from 'react';
import {connect} from 'react-redux';					//链接view以及store
import {initLogin} from '../../store/login/Action';		//用于侧导航显示行为
import {bindActionCreators} from 'redux';       	    //用于链接异步redux的dispacth\
import {hashHistory} from 'react-router';				//路由跳转
import ReactEcharts from 'echarts-for-react';
import './chartAdminPage.less';

/*
 *  项目线新图
 *  作者:hoverCow,日期:2017-02-17
 */

class ChartAdminPage extends Component{
	constructor(){
		super();
		this.state = {
		    legend: {
		        data:['scatter1','scatter2']
		    },
		    toolbox: {
		        show : true,
		        feature : {
		            mark : {show: true},
		            dataZoom : {show: true},
		            dataView : {show: true, readOnly: false},
		            restore : {show: true},
		            saveAsImage : {show: true}
		        }
		    },
		    xAxis : [
		        {
		            type : 'value',
		            splitNumber: 4,
		            scale: true
		        }
		    ],
		    yAxis : [
		        {
		            type : 'value',
		            splitNumber: 4,
		            scale: true
		        }
		    ],
		    series : [
		        {
		            name:'scatter1',
		            type:'scatter',
		            symbolSize: function (value){
		                return Math.round(value[2] / 5);
		            },
		            data: randomDataArray()
		        },
		        {
		            name:'scatter2',
		            type:'scatter',
		            symbolSize: function (value){
		                return Math.round(value[2] / 5);
		            },
		            data: randomDataArray()
		        }
		    ]
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
		if(allUser.length === 0) return null;
		console.log(1);
		return (
			<section className='chart-wrapper baseWrapper'>
				<div className='pro-charts'>
				<ReactEcharts
				    option={this.state} 
				    style={{height:700}} 
				    onEvents={(this.onEvents())}  />
				</div>
			</section>
		)
	}
	onEvents(){
		return {}
	}
	
}

const random = () => {
    var r = Math.round(Math.random() * 100);
    return (r * (r % 2 == 0 ? 1 : -1));
}

const randomDataArray= () => {
    var d = [];
    var len = 100;
    while (len--) {
        d.push([
            random(),
            random(),
            Math.abs(random()),
        ]);
    }
    return d;
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


export default connect(getDataProps,setFnProps)(ChartAdminPage);




