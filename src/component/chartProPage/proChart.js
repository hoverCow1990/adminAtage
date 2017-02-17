import React,{Component} from 'react';
import ReactEcharts from 'echarts-for-react';

class ProChart extends Component{
	constructor(){
		super();
		this.state = {
			title:{
				text: '-员工个人项目数-',
        		subtext: 'Number of individual employees',
        		textStyle:{
        			color:'#999',
        			fontSize:13
        		}
			},
			legend: {
		        bottom : 0,
		        left : 0,
		        // orient: 'vertical',
		        textStyle:{
		        	color:'#c5c5c5'
		        },
		        data:[]
		    },
		    calculable : true,
		    series : [
		        {
		            name:'项目数',
		            type:'pie',
		            radius : [30, 90],
		            center : [188,220],
		            roseType : 'area',
		            x: '60%',               // for funnel
		            max: 40,                // for funnel
		            sort : 'ascending',     // for funnel
		            itemStyle : {
		                normal : {
		                    label : {
		                        position : 'outter',
		                        formatter : '{c}\n\n{b}'
		                    },
		                },
		                emphasis : {
		                	label : {
		                        position : 'outter',
		                         formatter : '{c}\n\n{b}'
		                    },
		                    shadowBlur : 4,
		                    shadowOffsetX :1,
		                    shadowOffsetY :2,
		                }
	            	},
		            data:[]
		        }
		    ],
		}
	}
	componentWillMount(){
		let {select,data} = this.props;
		this.initChartData(data);
	}
	render(){
		return (
			<div className='pro-charts'>
				<ReactEcharts
				    option={this.state} 
				    style={{height:450}} 
				    onEvents={this.onEvents()} />
			</div>
		)
	}
	onEvents(){
		return {
			mousedown : (params) => {
				this.props.showModel(params.name);
			}
		}
	}
	initChartData(allUser){
		let lastLegend = this.state.legend,
			lastSeries = this.state.series[0],
			legendArr = new Array(),
			seriesArr = new Array();
		allUser.forEach( item =>{
			let value = item.project.length,
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