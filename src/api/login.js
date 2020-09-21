import {axios, post} from './Ajax';
import store from '../vuex/store';
import router from '../router/index'


/*
* 带验证码登录
*
* username:
* password
* vcode  图片验证码
* */
function login(option) {
    return post('/Login/CheckLoginV', option);
}

/*
* 根据登录名查询用户
* ULoginName  登录帐号
*/
function getUserByLoginName(ULoginName) {
    return post('/User/GetUserByLoginName', {ULoginName})
}

/*
* 退出登录
* */
function loginOut() {
    return new Promise((resolve, reject) => {
        axios.get('/Login/LoginOut', {params: {Token: store.getters.getToken}}).then(res => {
            let {code, data, msg} = res;
            if (code == 0) {
                resolve(data);
                store.commit('setUserInfo', null);
                store.commit('setToken', null);
                store.commit('setActiveShop', null);
                router.push('/')
            }
            reject(msg)
        })
    })
}

/*
* 获取图片验证码
* Random 账号或者key值，key是js生成的随机数。
* CodeLength 验证码长度4-6位，默认4位，如超出范围区间则默认为4
* VerifyCodeType  验证码图片类型1数字2字母3数字与字母;默认3
* */
// function getVerifyCode(params){
//   params.CodeLength=4;
//   params.VerifyCodeType=3;
//   return new Promise((resolve,reject)=>{
//     axios.post('/Login/NumberVerifyCode', params).then(res => {
//       let {code, data,msg} = res;
//       if(code==200){
//         resolve(data)
//       }
//       reject(msg)
//     })
//   })
// }

/*
* 用户注册
* loginName 手机号
* pwd 密码
* mid  系统ID
* smscode 短信验证码
* */
function regUser(option) {
    return post('/Login/RegUser', option);
}


/*
* 发送短信验证码
* ToPhoneNumber 手机号
* CodeLength 验证码长度4-6位，默认4位，如超出范围区间则默认为4
* VerifyCodeType  验证码类型1数字2字母3数字与字母;默认3
* */
function sendMsg(params) {
    params.CodeLength = 4;
    params.VerifyCodeType = 1;
    return post('/Login/SendMsg', params);
}

export default {
    regUser,
    login,
    loginOut,
    sendMsg,
    getUserByLoginName,
}
