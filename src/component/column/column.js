import React from 'react';
import { Timeline,Carousel,Popover} from 'antd';
import './column.css';

const Column=React.createClass({
	getInitialState(){
		return {
			data : [],
			carData : [],
			visible: false,
			carIndex: 0,
		}
	},
	componentWillMount(){
		const carouselData=[
			{
				src : "./image/car-1.jpg",
				key : "car-1",
				title : "这很大款",
				des : "小伙李又收到了公司送的一套新房子"
			},
			{
				src : "./image/car-2.jpg",
				key : "car-2",
				title : "新进员工",
				des : "老总表示卖力加班,可获得手机号"
			},
			{
				src : "./image/car-3.jpg",
				key : "car-3",
				title : "老牛笑开怀",
				des : "程序员鼓励师为老牛按摩肩膀"
			},
			{
				src : "./image/car-4.jpg",
				key : "car-4",
				title : "大年结婚",
				des : "这朋友从此过上了妻管严的日子"
			}
		];
		this.setState({
			carData : carouselData
		});
	},
	render (){
		const timeline=this.state.data.map(function(item){
			  	return (<Timeline.Item key={item.key}>{item.title} {item.time}</Timeline.Item>)
			}),
			  carData=this.state.carData.map(function(item,index){
			 	return (
		 			<div key={item.key}>
		 				<img src={require(item.src)}/>   
		 			</div>
			 	)
			}),
			bool=this.state.carData.length,
			json=bool?this.state.carData[this.state.carIndex]:false,
			title=json?json.title:"",
			des=json?json.des:"";
			const content=(
			  <div>
			    <p>{des}</p>
			  </div>
			);		  
		return(
			<div className="column">
				<h2 className="column-title">
					公司动态
				</h2>
				<p>Company dynamics</p>
				<Timeline>
				    {timeline}
				</Timeline>
				<h2 className="column-title">
					员工福利
				</h2>
				<p>Employee welfare</p>
				<div className="column-carousel" onMouseOver={this.popVisible} onMouseLeave={this.popHide}>
					<Popover content={content} title={title} visible={this.state.visible}></Popover>
					<Carousel afterChange={this.afterChange}>
					    {carData}
					</Carousel>	
				</div>
			</div>
		)
	},
	componentDidMount(){
		const data=[
			{
				title : "Create a services site",
				time : "2016-09-01",
				key : "timeInfo-1",
			},
			{
				title : "Solve initial network problems",
				time : "2016-10-02",
				key : "timeInfo-2",
			},
			{
				title : "Technical testing",
				time : "2016-10-26",
				key : "timeInfo-3",
			},
			{
				title : "Network problems being solved",
				time : "2015-11-17",
				key : "timeInfo-4",
			}

		];
		this.setState({
			data:data,
		});
	},
	popVisible(){
		this.setState({
			visible: true,
		});
	},
	popHide(){
		this.setState({
			visible: false,
		});
	},
	afterChange(current){
		this.setState({
			carIndex:current,
		});
	},
	changeURL(key){
		console.log(key);
	}
});

export default Column;