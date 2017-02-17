import React,{Component} from 'react';
import ReactEcharts from 'echarts-for-react';
import {hashHistory} from 'react-router';				//路由跳转

class ProChart extends Component{
	constructor(){
		super();
		this.state ={
		    tooltip : {
		        trigger: 'item',
		        formatter: "{a} <br/>{b} : {c} ({d}%)"
		    },
		    legend: {
		        bottom : 0,
		        left : 0,
		        data:[]
		    },
		    title:{
				text: '-员工业绩得分-',
        		subtext: 'Employee performance score',
        		textStyle:{
        			color:'#999',
        			fontSize:13
        		}
			},
		    calculable : true,
		    series : [
		        {
		            name:'员工业绩',
		            type:'pie',
		            radius : ['25%', '58%'],
		            center:[230,226],
		            label: {
						normal: {
							show: true,
							position: 'inside',
							formatter : '{c}\n\n{b}',
						},
						emphasis: {
							show: true,
							formatter : '{c}\n\n{b}',
						},
					},
		            data:[]
		        }
		    ]
		}
	}
	onEvents(){
		return {
			mousedown : (params) => {
				this.props.showModel(params.name);
			}
		}
	}
	componentWillMount(){
		let {select,data} = this.props;
		this.initChartData(data);
	}
	render(){
		let onEvents = {};
		return (
			<div className='pro-charts'>
				<ReactEcharts
				    option={this.state} 
				    style={{height:450}} 
				    onEvents={this.onEvents()}  />
			</div>
		)
	}
	initChartData(allUser){
		let lastLegend = this.state.legend,
			lastSeries = this.state.series[0],
			legendArr = new Array(),
			seriesArr = new Array();
		allUser.forEach( item =>{
			let value = 100*(item.project.length+30),
				name = item.name;
			legendArr.push(name);
			seriesArr.push({value,name});
		});
		let legend = Object.assign(lastLegend,{data:legendArr}),
			series = [Object.assign(lastSeries,{data:seriesArr})];

		this.setState({
			legend,
			series
		});
	}
}

export default ProChart;