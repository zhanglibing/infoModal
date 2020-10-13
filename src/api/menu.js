import {axios, post, get} from "./Ajax";

//登录
function getList(params) {
    return get("/content/list", params);
}

//登录
function add(params) {
    return post("/content/add", params);
}
//登录
function update(params) {
    return post("/content/update", params);
}
//登录
function detail(params) {
    return get("/content/detail", params);
}

//删除
function deleteMenu(option) {
    return post("/content/delete", option);
}

export default {
    getList,
    deleteMenu,
    add,
    update,
    detail,
};
