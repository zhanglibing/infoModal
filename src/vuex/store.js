/** 2017/10/5
 *author:zhanglibing
 *email:1053081179@qq.com
 *功能:
 */

import Vue from 'vue';
import Vuex from 'vuex';
import api from '../api';
import {getPer} from '@/utils/utils'

Vue.use(Vuex);


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
    menuList: [],
    isHttpMenu: false,
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
    setMenuList(state, val) {
        state.menuList = val;
        state.isHttpMenu = true;
        // setSessionVal('menuList', val);
    }

}


//
//权限配置
const getters = {
    // getActiveShopId(state) {
    //     return state.activeShop ? state.activeShop.ID : '';
    // }
}

const actions = {
    async getMenuList({commit, state}, bool = false) {
        if (state.isHttpMenu) {
            return state.menuList;
        }
        let {data} = await api.menu.getRsPageModelByMID({})
        data = data.sort((a, b) => a.PINDEX - b.PINDEX)
        commit('setMenuList', data);
        return data;
    },

}

export default new Vuex.Store({
    state, mutations, getters, actions,
})
