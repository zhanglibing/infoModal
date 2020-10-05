import api from '../api'

const customer ={
  state:{
    roleList:[],
    classType:[],
  },
  mutations:{
    setRoleList(state,val){ //激活登录状态
      state.roleList=val;
    },
    setClass(state,val){ //激活登录状态
      state.classType=val;
    },
  },
  getters:{
     getFromSourse:state=>{
        return state.classType.filter(val=>val.ParentCategoryId==39)
     }
  },
  actions:{
    async getUserRole ({commit, state }) {
      if(state.roleList.length){return false;}
      let res = await api.user.getRoleList();
      commit('setRoleList',res);
    },
    async getClass ({commit, state }) {
      let res = await api.good.getClass(39)
      commit('setClass',res);
    },
  }

}

export default customer;
