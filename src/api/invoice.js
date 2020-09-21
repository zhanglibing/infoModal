import {axios, post} from "./Ajax";
import store from "../vuex/store";

// 账户信息

function getSid() {
    return {sid: store.state.activeShop.ID};
}

/**
 * 新增邮寄地址
 *  EMAIL
 * ISMR 是否默认；1是0否
 * SID  店铺ID
 * */
function addEmail(params) {
    return post("/FP/AddFPEmail", {...params, ...getSid()});
}

/**
 * 获取单个店铺账户余额信息
 *  EMAIL
 ISMR 是否默认；1是0否
 SID  店铺ID
 * */
function updateEmail(params) {
    return post("/FP/UpdateFPEmail", {...params, ...getSid()});
}

/*
* 删除
* fpemid 地址iD
* sid  店铺id
* **/
function deleteEmail(params) {
    return post("/FP/DelFPEmail", {...params, ...getSid()});
}

/*
*
* 获取邮寄地址列表
* **/
function getEmailList(params = {page: 1, limit: 30}) {
    return post("/FP/SelectFPEmail", {...params, ...getSid()});
}

/*
* 获取单个邮寄地址信息
* */
function getEmailById(fpemdid) {
    return post("/FP/GetFPEmail", {fpemdid});
}

/*
* 获取单个邮寄地址信息
* fpemdid
*  ismr  1 默认  0非默认
* */
function setDefaultEmail(params) {
    return post("/FP/SetMRFPEmail", {...params, ...getSid()});
}


function addAddress(params) {
    return post("/FP/AddFPAddress", {...params, ...getSid()});
}

function deleteAddress(params) {
    return post("/FP/DelFPAddress", {...params, ...getSid()});
}

function updateAddress(params) {
    return post("/FP/UpdateFPAddress", {...params, ...getSid()});
}

function getAddressList(params) {
    return post("/FP/SelectFPAddress", {...params, ...getSid()});
}

function getAddressById(fpaddid) {
    return post("/FP/GetFPAddress", {fpaddid});
}

function setDefaultAddress(params) {
    return post("/FP/SetMRFPAddress", {...params, ...getSid()});
}

/*
* 获取抬头信息
* */
function getTaiTou() {
    return post("/FP/GetFPTaiTou", getSid());
}

/*
* 获取抬头信息
* */
function updateTaiTou(params) {
    return post("/FP/UpdateFPTaiTou", {...params, ...getSid()});
}

export default {
    addEmail,
    updateEmail,
    deleteEmail,
    getEmailList,
    getEmailById,
    setDefaultEmail,
    addAddress,
    deleteAddress,
    updateAddress,
    getAddressList,
    getAddressById,
    setDefaultAddress,
    getTaiTou,
    updateTaiTou,

};
