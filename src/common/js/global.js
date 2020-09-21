import Vue from 'vue'
import {axios, HOST} from '../../api/Ajax'
import api from '../../api';
import store from '../../vuex/store'
import moment from 'moment';

moment.locale('zh-cn');
import {SHOP_STATE_MAP, Consultant_STATE, Counseling_status, payDesc} from './constant.js'

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
            document.title = el.innerText + '/ 咨询师中台';
            $(el).css({display: 'none'});
        },
        update: (el, binding) => {//组件更新后重新赋值
            document.title = el.innerText + '/ 咨询师中台';
        },
    })

    //全局过滤器
    Vue.filter('filterShopStatus', (value) => {
        return SHOP_STATE_MAP[value];
    });
    Vue.filter('filterConsultantStatus', (value) => {
        return Consultant_STATE.find(val => val.value == value).label;
    });
    Vue.filter('filterCounselingStatus', (value) => {
        return Counseling_status.find(val => val.value == value).label;
    });

    Vue.filter('filterTime', (value) => {
        return value ? moment(value).format('YYYY-MM-DD HH:mm:ss') : '-';
    })

    Vue.filter('filterSource', (value) => {
        return '幸福谋方';
    })

    //课程审核状态 和 咨询服务审核状态
    Vue.filter('filterStatus', (value) => {
        let obj = {
            0: '未提交',
            1: '待审核',
            2: '审核通过',
            3: '审核不通过',
        }
        return obj[value];
    })
    Vue.filter('filterTag', (value) => {
        let obj = {
            0: 'info',
            1: 'info',
            2: 'success',
            3: 'danger',
        }
        return obj[value];
    })

    Vue.filter('filterSex', (value) => {
        const obj = {
            1: '男',
            2: '女',
            3: '未知',
        }
        return obj[value];
    })

    Vue.filter('filterCouponStatus', (value) => {
        const obj = {
            0: '待发布',
            1: '已发布',
            2: '已禁用',
            3: '已过期',
            4: '未使用',
            5: '已使用',
            6: '已过期',
        }
        return obj[value];
    })
    Vue.filter('filterPayDesc', (value) => {
        return payDesc[value];
    })
    Vue.prototype.$http = axios;
    Vue.prototype.$HOST = HOST;
    Vue.prototype.api = api;
    Vue.prototype.IsPhone = IsPhone();

    Vue.prototype.$permissions = store.state.per;


}

export {
    initGlobal
}
