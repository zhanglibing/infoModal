import {axios, post, get} from "./Ajax";

//登录
function getList(params) {
    return get("/business/list", params);
}

//登录
function add(params) {
    return post("/business/add", params);
}
//登录
function update(params) {
    return post("/business/update", params);
}
//登录
function detail(params) {
    return get("/business/detail", params);
}

//删除
function deleteContent(option) {
    return post("/business/delete", option);
}
//
function getContentByUser(option) {
    return get("/business/getByUserId", option);
}

export default {
    getList,
    deleteContent,
    add,
    update,
    detail,
    getContentByUser,
};
