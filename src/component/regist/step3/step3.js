import React from 'react';
import {
  Icon,
}from 'antd';
import "./step3.css";

const FormSucess = React.createClass({
  render(){
    return (
      <div className="registSucess">
        <div><Icon type="smile-o" /><p>恭喜你注册成功</p></div>
        <h4>welcome to HoverCow Company</h4>
      </div>
    )
  }
})

export default FormSucess;
