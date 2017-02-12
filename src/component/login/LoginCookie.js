import {LOGIN_COOKIE_TIME} from '../../setting/setting'; //默认cookie保留时间

/*
 * cookie设置机制
 * 用于登录成功后进行user以及password的保存,
 * 以及任意操作的对记住我保存!
 * 作者:hoverCow 日期:2017/02/11
 */
const LoginCookie = {
  //设置登录cookie的user以及pass,time如果不传则调用默认时间
  setLoginCookie(name,pass,time=LOGIN_COOKIE_TIME){
    let strsec = getsec(time);
    let exp = new Date();
    exp.setTime(exp.getTime()+strsec*1);
    document.cookie = `user=${escape(name)};expires=${exp.toGMTString()}`;
    document.cookie = `pass=${escape(pass)};expires=${exp.toGMTString()}`;
    function getsec(str){
      let time = str.substring(1,str.length)*1;
      let type = str.substring(0,1);
      switch (type){
        case "s":
          return time*1000;
        case "h":
          return time*60*60*1000;
        case "d":
          return time*24*60*60*1000;
      }
    }
  },
  //删除user以及pass的cookie
  deleLoginCookie(){
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval=this.getLoginCookie("user");
    if(cval!=null){
      document.cookie = `user=${escape("")};expires=${exp.toGMTString()}`;
      document.cookie = `pass=${escape("")};expires=${exp.toGMTString()}`;
    }
  },
  //获取登录cookie
  getLoginCookie(name){
      var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
      if(arr=document.cookie.match(reg)){
        return unescape(arr[2]);
      }
      return null;
  },
  //调用cookie,判断是否记住我
  isRemeber(){
    let bool = this.getLoginCookie("remember");
    return bool === "true" || bool === null;
  },
  //设置记住我的cookie,如果为false,直接删除user以及password的cookie
  setRemeberCookie(e){
   let val = e.target.checked;
   document.cookie = `remember=${escape(val)};`;
   !val && this.deleLoginCookie()
  },
}

export default LoginCookie;
