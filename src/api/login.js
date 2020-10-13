import {axios, post} from "./Ajax";

//登录
function login(option) {
    return post("/user/login", option);
}
//注册
function reg(option) {
    return post("/user/reg", option);
}

export default {
    login,
    reg,
};
