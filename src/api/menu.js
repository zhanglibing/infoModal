import {post} from './Ajax';



//菜单接口
/*
* 新增菜单
* */
function addMenu(params) {
    return post('/Rsau/AddRsPageModel', params);
}

/*
* 更新菜单
* */
function updateMenu(params) {
    return post('/Rsau/UpdateRsPageModel', params);
}

/*
* 获取所有菜单
* */
function getRsPageModelByMID() {
    return post('/Rsau/GetRsPageModelByMID', {});
}

/*
* 删除菜单
* rsPageId 菜单id
* */
function deleteMenu(rsPageId) {
    return post('/Rsau/DelRsPageModel', {rsPageId});
}


// 功能接口

/*
* 获取菜单中的功能
* pId 菜单id
* */
function getBtnModelByPid(pId) {
    return post('/Rsau/GetBtnModelByPid', {pId});
}

/*
* 增加菜单功能
* */
function addBtnModel(params) {
    return post('/Rsau/AddBtnModel', params);
}

/*
* 增加菜单功能
* */
function updateBtnModel(params) {
    return post('/Rsau/UpdateBtnModel', params);
}

/*
* 删除菜单中的功能
* btnId 菜单id
* */
function deleteBtnModel(btnId) {
    return post('/Rsau/DelBtnModel', {btnId});
}

/*
* 删除菜单中的功能

NAME:'',
DESCRIPTION
PARENTCATEGORYID:0,
PICTUREURL:'',
SHOWONHOMEPAGE:false,
INCLUDEINTOPMENU
PUBLISHED
DISPLAYORDER
*
*
* */
function add(params) {
    return post('/Category/AddCategory', params);
}

/*
* 删除菜单中的功能
* cid 菜单id
* */
function del(params) {
    return post('/Category/DeleteCategory', params);
}

/*
* */
function updateCategory(params) {
    return post('/Category/UpdateCategory', params);
}

/*
cid
* */
function getCategory(params) {
    return post('/Category/GetCategory', params);
}

/*
* */
function getCategoryList(params) {
    return post('/Category/SelectCategory', params);
}


export default {
    deleteMenu,
    deleteBtnModel,
    addMenu,
    updateMenu,
    getRsPageModelByMID,
    getBtnModelByPid,
    addBtnModel,
    updateBtnModel,
    add,
    del,
    updateCategory,
    getCategory,
    getCategoryList,
}
