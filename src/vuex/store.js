/** 2017/10/5
 *author:zhanglibing
 *email:1053081179@qq.com
 *功能:
 */

import Vue from 'vue';
import Vuex from 'vuex';
import api from '../api';
import {getPer} from '@/utils/utils'

Vue.use(Vuex)

import customer from './customer'
import account from './account'
import invoice from './invoice'

//获取session值
function getSessionByName(name) {
    var val = 0;
    if (sessionStorage[name] != "-1" && sessionStorage[name]) {
        try {
            val = JSON.parse(sessionStorage[name]) || '';
        } catch (e) {

        }

    }
    return val;
}

//设置session值
function setSessionVal(name, val) {
    sessionStorage[name] = JSON.stringify(val);
}

//状态
const state = {
    userInfo: getSessionByName('myUserInfo'),
    token: getSessionByName('token') || '',
    roleList: getSessionByName('roleList'),
    activeShop: getSessionByName('activeShop'),
    per: getSessionByName('per') || {},

}

const mutations = {
    setUserInfo(state, val) {
        state.userInfo = val;
        setSessionVal('myUserInfo', val);
    },
    setToken(state, val) {
        state.token = val;
        setSessionVal('token', val);
    },
    setActiveShop(state, shopInfo) {
        state.activeShop = shopInfo;
        setSessionVal('activeShop', shopInfo);
    },
    setRoleList(state, list) {
        state.roleList = list;
        setSessionVal('roleList', list);
    },
    updateUserInfo(state, val) {
        state.userInfo = {...state.userInfo, ...val};
        setSessionVal('myUserInfo', val);
    },
    setPer(state, val) {
        state.per = val;
        setSessionVal('per', val);
    }

}


//
//权限配置
const getters = {
    getActiveShopId(state) {
        return state.activeShop ? state.activeShop.ID : '';
    }
}

const actions = {
    async getRoleList({commit, state}, bool = false) {
        const {data} = await api.menu.getRoleList({
            page: 1,
            limit: 100
        });
        commit('setRoleList', data);
    },

    // 获取当前登录权限
    async getPer({commit, state}) {
        const {data} = await api.user.getUserPer();
        console.log('后台返回的权限数据', data);
        console.log('前台整理后的权限', getPer(data));
        commit('setPer', getPer(data));
    },

}

export default new Vuex.Store({
    state, mutations, getters, actions,
    modules: {
        customer,
        account,
        invoice,
    }
})
