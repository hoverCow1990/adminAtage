import React from 'react';
import {
	Modal,
	Steps,
}from 'antd';
import FormInfo from "./step1/step1.js";
import FormTele from "./step2/step2.js";
import FormSucess from "./step3/step3.js";
import './regist.css';

const Step=Steps.Step;

const Regist=React.createClass({
	getInitialState() {
    	return { 
    		successStep : false,
    		step : 0,
    		visible: false,
    		modalInfo : "", 	
    	};
  	},
  	componentWillMount(){
  		// let url="/regist/step-" + this.state.step;
	   //  hashHistory.push(url);
  	},
  	handleOk() {
    	this.setState({
	      visible: false,
	    });
    	this.state.successStep && this.setState({
	    	step : this.state.successStep,
	    });
    },
  	showModal(val) {
	    this.setState({
	      visible: true,
	      modalInfo : val,
	    });
	},
    handleCancel(e) {
	    this.setState({
	      visible: false,
	    });
    },
    changeSuccess(num){
    	this.setState({
    		successStep : num
    	})
    },
    switchModule(){
    	let modal;   
    	switch(this.state.step){
    		case 0 :
    			modal=(<FormInfo changeSuccess={this.changeSuccess} showModal={this.showModal}/>);
    			break;
    		case 1 :
    			modal=(<FormTele changeSuccess={this.changeSuccess} showModal={this.showModal}/>);
    			break;
    		case 2 :
    			modal=(<FormSucess/>);
    			break;
    	};
    	return modal;
    },
	render(){
		return (
			<div className="myRegist viewWrapper">
				<div className="regist">
					<div className="step">
						<Steps current={this.state.step}>
						    <Step title="填写信息" description="填写您的基础信息" />
						    <Step title="手机验证" description="验证您的手机号" />
						    <Step title="完成" description="注册成功" />
						</Steps>
					</div>
					{this.switchModule()}
				</div>
				<Modal title="友情提示" visible={this.state.visible} onOk={this.handleOk} onCancel={this.handleCancel}>
			        {this.state.modalInfo}
			    </Modal>
			</div>
		)
	}
});

export default Regist;