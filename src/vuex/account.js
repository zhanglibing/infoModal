import api from '../api'

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

const account = {
    state: {
        bankList: [],
        account: {},
        orderList: getSessionByName('orderList'),
    },
    mutations: {
        setBackList(state, val) { //激活登录状态
            state.bankList = val;
        },
        setAccount(state, val) {
            state.account = val;
        },
        setOrderList(state, val) {
            setSessionVal('orderList', val)
            state.orderList = val;
        },
    },
    getters: {},
    actions: {
        async getAccount({commit, state, rootState}) {
            let res = await api.account.getAccount();
            commit('setAccount', res);
            return res;
        },
        async getBankList({commit, state, rootState}) {
            const {data, count} = await api.bank.getBankList({
                page: 1,
                limit: 1000,
            });
            commit('setBackList', data);
        },
    }

}

export default account;
