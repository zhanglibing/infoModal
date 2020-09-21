import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './vuex/store'
import './common/css/common.css'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
// import echarts from 'echarts'
import TreeView from "vue-json-tree-view"
import md5 from 'md5'


Vue.config.productionTip = false;
import {initGlobal} from './common/js/global';

initGlobal();

Vue.use(ElementUI);
Vue.use(TreeView)
// Vue.prototype.$echarts = echarts;
Vue.prototype.$md5 = md5;

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
