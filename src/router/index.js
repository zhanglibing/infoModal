import Vue from "vue";
import Router from "vue-router";
import login from "@/views/login/login";
import page from "@/views/page";
import store from '../vuex/store';

const routerPush = Router.prototype.push;

Router.prototype.push = function push(location) {

    return routerPush.call(this, location).catch(error => error)

}


Vue.use(Router);
const routers = new Router({
    // mode: "history",
    routes: [
        {
            path: "/",
            name: "login",
            component: login,
        },
        {
            path: "/login",
            name: "login",
            component: login,
        },

        {
            path: "/admin",
            component: resolve => require(["@/views/admin"], resolve),
            meta: {auth: true},
            showMenu: true,  //展示菜单栏
            title: '基础',
            children: [
                {
                    path: "banner",
                    icon: "el-icon-menu",
                    component: resolve => require(["@/views/banner/index"], resolve),
                    title: "banner管理",
                },
                {
                    path: "banner/edit",
                    icon: "el-icon-menu",
                    component: resolve => require(["@/views/banner/edit"], resolve),
                    title: "banner编辑",
                    hideMenu:true,
                },
                {
                    path: "banner/add",
                    icon: "el-icon-menu",
                    component: resolve => require(["@/views/banner/add"], resolve),
                    title: "banner编辑",
                    hideMenu:true,
                },
                {
                    path: "menu",
                    icon: "el-icon-menu",
                    component: resolve => require(["@/views/menu/index"], resolve),
                    title: "菜单管理",
                },
                {
                    path: "content",
                    icon: "el-icon-menu",
                    component: resolve => require(["@/views/product/index"], resolve),
                    title: "内容管理",
                },
            ],
        },

        {
            path: "/404",
            name: "404",
            component: resolve => require(["@/views/404"], resolve),

        },
        {path: "*", redirect: "/404"},
    ],
    scrollBehavior(to, from, savedPosition) {
        return {x: 0, y: 0};
    },
});

// 全局判断登录访问权限
routers.beforeEach((to, from, next) => {
    if (to.matched.some(m => m.meta.auth)) {// 对路由进行验证
        document.title = to.name + ` / 咨询师中台`;
        if (store.state.userInfo) { // 已经登陆
            // let {authId,authIds}=to.meta;
            // let permissions = store.state.userInfo.permissions;
            // let flag = false;
            // if ((authIds && authIds.length)||authId) {
            //     flag = authIds?permissions.some(v => authIds.includes(v)):true;
            //     if (!permissions.includes(authId)&&flag) {
            //         alert('暂无次页面权限，请联系管理员');
            //         next({path:'/'});
            //     }
            // }
            next()
        } else {
            next({path: '/'})
        }
    } else {
        next()
    }
})
export default routers;
