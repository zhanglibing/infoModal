import {axios, post, get} from "./Ajax";

//登录
function getList(params) {
    return get("/menu/list", params);
}

//登录
function add(params) {
    return post("/menu/add", params);
}

//登录
function update(params) {
    return post("/menu/update", params);
}

//登录
function detail(params) {
    return get("/menu/detail", params);
}

//删除
function deleteMenu(option) {
    return post("/menu/delete", option);
}

export default {
    getList,
    deleteMenu,
    add,
    update,
    detail,
};
