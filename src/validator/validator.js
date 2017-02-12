export default {
	//用户名验证姓名为2-10字符首字母中文或英文!
  checkName(rule, value, callback){
    if(/[a-zA-Z\u4e00-\u9fa5].{1,9}$/.test(value)){
      callback();                           
      return;
    }
    callback('用户名为2-10字符首字母中文或英文!')
  },
  //密码验证为4-15位必须有数字以及字母
  checkPassWord(rule, value, callback){
    if(/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{4,15}$/.test(value)){
      callback();                           
      return;
    }
    callback('密码为4-15位必须有数字以及字母');
  }
}