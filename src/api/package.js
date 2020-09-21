import {post, get} from './Ajax';

/*
* 新增套餐
* */
function addPackage(option) {
    return post('/SMeal/AddMeal', option);
}

/*
* 更新套餐
* */
function updatePackage(option) {
    return post('/SMeal/UpdateMeal', option);
}

/**
 * 删除套餐
 * ID 套餐id
 * */

function detetePackage(option) {
    return post('/SMeal/DelMeal', option);
}

/**
 * 商家 下架
 * ID 套餐id
 * STS  1 是  0 否  是否上架0否1是
 * */

function setPackage(option) {
    return post('/SMeal/SetMealSts', option);
}

/**
 * 查询套餐列表
 * PTYPE 套餐类别
 * page
 * limit
 * */

function getPackageList(option) {
    return post('/SMeal/GetMealList', option);
}

/**
 * 查询套餐
 * ID 套餐id
 * */

function getPackageById(option) {
    return post('/SMeal/GetMealById', option)
}

/**
 * 浏览套餐
 * PID 套餐id
 * */

function viewPackageById(option) {
    return get('/SMeal/SetMealViscount', option);
}


/**
 * 获取选择套餐子列表
 * ID 套餐ID
 * ptype 产品类型
 * */

function getSelectMealList(option) {
    return post('/SMeal/SelectMealList', option);
}

/**
 * 获取选择套餐子列表
 * ID 套餐ID
 * ptype 产品类型
 * */

function getMealList(option) {
    return post('/SMeal/GetMealChlidList', option);
}

/**
 * 新增子套餐列表
 * ID 套餐ID
 * ListId 子列表ID
 * ptype 产品类型
 * */

function addMeal(option) {
    return post('/SMeal/AddMealList', option);
}

/**
 * 删除子套餐列表
 * ID 套餐ID
 * ListStr 子子列表ID，使用分号分割
 * */

function deleteMeal(option) {
    return post('/SMeal/DelMealList', option);
}

export default {
    addPackage,
    updatePackage,
    detetePackage,
    setPackage,
    getPackageList,
    getPackageById,
    viewPackageById,
    deleteMeal,
    addMeal,
    getSelectMealList,
    getMealList,
}
