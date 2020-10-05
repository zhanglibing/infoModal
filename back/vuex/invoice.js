import api from '../api'

const invoice = {
    state: {
        addressList: [],
        taiTouInfo: null,
    },
    mutations: {
        setAddressList(state, val) { //激活登录状态
            state.addressList = val;
        },
        setTaiTou(state, val) { //抬头信息
            state.taiTouInfo = val;
        },
    },
    getters: {
        getDefaultAddress: state => {
            return state.addressList.filter(val => val.ISMR == 1)[0] || null;
        },

    },
    actions: {
        async getAddress({commit, state, rootState}) {
            const {data} = await api.invoice.getAddressList();
            commit('setAddressList', data);
        },
        async getTaiTou({commit, state, rootState}) {
            const data = await api.invoice.getTaiTou();
            commit('setTaiTou', data);
            return data;
        },
    }

}

export default invoice;
