/** 2018/10/5
 *author:zhanglibing
 *email:1053081179@qq.com
 *功能:
 */

//检查密码格式
function checkPassword(str) {
  if(str.length < 6) {
    return false;
  }
  return true;
}
//检查手机号码格式
function checkPhone(phone) {
  var preg = /^1[3456789]\d{9}$/;
  if(preg.test(phone)) {
    return true;
  }
  return false;
}


//获取当前年月日 星期
function getTime(type=false){
  var myDate=new Date();
  if(type){
    myDate = type;
  }
  var year=myDate.getFullYear();    //获取完整的年份(4位,1970-????)
  var month=myDate.getMonth()+1;       //获取当前月份(0-11,0代表1月)
  var day=myDate.getDate();        //获取当前日(1-31)
  var seven=myDate.getDay();         //获取当前星期X(0-6,0代表星期天)
  var h=myDate.getHours();
  var s=myDate.getMinutes();
  var m=myDate.getSeconds();
  month=(month<10)?("0"+month):month;
  day=(day<10)?("0"+day):day;
  h=(h<10)?("0"+h):h;
  s=(s<10)?("0"+s):s;
  m=(m<10)?("0"+m):m;
  if(!type){
    return year+'年'+month+'月'+day+'日 '+h+":"+s;
  }else{
    return year+'-'+month+'-'+day+' '+h+":"+s+':'+m;
  }

}

//保存用户信息
function saveUserInfo(data) {
  var string_userInfo = JSON.stringify(data);//数组转换成字符串
  sessionStorage.setItem("ss_userInfo", string_userInfo);
}
//获取用户信息
function getUserInfo() {
  return JSON.parse(sessionStorage.getItem("ss_userInfo")); //将字符串转换为数组
}
function setCookie(name, value) {
  var Days = 3;
  var exp = new Date();
  exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
  document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
}

function setTime(val){ //解决日期插件获取北京时间
  var src = new Date(val);
  var dest = new Date(src.getTime() + 8*3600*1000);  //解决8小时时间差   北京时间
  return dest;
}

//转义  将html标签转义
function HTMLEncode(html) {
  var temp = document.createElement("div");
  (temp.textContent != null) ? (temp.textContent = html) : (temp.innerText = html);
  var output = temp.innerHTML;
  temp = null;
  return output;
}
//反转义 将html标签反转义
function HTMLDecode(text) {
  var temp = document.createElement("div");
  temp.innerHTML = text;
  var output = temp.innerText || temp.textContent;
  temp = null;
  return output;
}
function textDecode(str){
  if(!str){return "";}
  str = str.replace(/_@/g, '<br/>');//IE9、FF、chrome
  str = str.replace(/\s/g, '&nbsp;');//空格处理
  return str;
}
function textAreaDecode(str){
  if(str){
    str = str.replace(/_@/g, '\n').replace(/_#/g, '\r');
  }
  return str;
}
function textEncode(str){
  if(str){
    str = str.replace(/\n/g, '_@').replace(/\r/g, '_#');
  }
  return str;
}
// 将对象拼接成 key1=val1&key2=val2&key3=val3 的字符串形式
function obj2params(obj) {
  var result = '';
  var item;
  for (item in obj) {
    result += '&' + item + '=' + encodeURIComponent(obj[item]);
  }

  if (result) {
    result = result.slice(1);
  }

  return result;
}


export {
  checkPhone,
  getTime,
  saveUserInfo,
  getUserInfo,
  setCookie,
  setTime,
  textAreaDecode,
  textDecode,
  obj2params
}
