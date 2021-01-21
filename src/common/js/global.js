import Vue from 'vue'
import {axios, HOST} from '../../api/Ajax'
import api from '../../api';
import store from '../../vuex/store'
import moment from 'moment';

moment.locale('zh-cn');
import {test_status,} from './constant.js'

//判断是否为手机端
function IsPhone() {
    var userAgentInfo = navigator.userAgent;
    var Agents = new Array("Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod");
    var flag = false;
    for (var v = 0; v < Agents.length; v++) {
        if (userAgentInfo.indexOf(Agents[v]) > 0) {
            flag = true;
            break;
        }
    }
    return flag;
}

function initGlobal() {

//全局title
    Vue.filter('filterDateFromNow', (value) => {
        return moment(value).fromNow();
    });
    Vue.directive('title', {
        inserted: (el, binding) => {
            document.title = el.innerText;
            $(el).css({display: 'none'});
        },
        update: (el, binding) => {//组件更新后重新赋值
            document.title = el.innerText;
        },
    })

    Vue.filter('filterTest', (value) => {
        return test_status.find(val => val.value == value).label;
    });
    Vue.prototype.$http = axios;
    Vue.prototype.$HOST = HOST;
    Vue.prototype.api = api;
    Vue.prototype.IsPhone = IsPhone();

    Vue.prototype.$permissions = store.state.per;


}

export {
    initGlobal
}
