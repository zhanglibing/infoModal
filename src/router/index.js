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
            path: "/home",
            component: resolve => require(["@/views/wrapper"], resolve),
            name: 'home',
            children: [
                {
                    path: "",
                    component: resolve => require(["@/views/home"], resolve),
                    name: 'home',
                },
                {
                    path: "list/:name/:child?/:id?",
                    component: resolve => require(["@/views/list"], resolve),
                    name: 'home',
                }
            ]
        },
        {
            path: "/admin",
            component: resolve => require(["@/views/admin"], resolve),
            meta: {auth: true},
            showMenu: true,  //展示菜单栏
            title: '后台管理',
            name: '后台管理',
            children: [
                {
                    path: "banner",
                    icon: "el-icon-menu",
                    component: page,
                    title: "banner管理",
                    name: "banner管理",
                    children: [
                        {
                            path: "",
                            icon: "el-icon-menu",
                            component: resolve => require(["@/views/banner/index"], resolve),
                            title: "banner列表",
                            name: "banner列表",
                        },
                        {
                            path: "edit",
                            icon: "el-icon-menu",
                            component: resolve => require(["@/views/banner/edit"], resolve),
                            title: "banner编辑",
                            name: "banner编辑",
                            hideMenu: true,
                        },
                        {
                            path: "add",
                            icon: "el-icon-menu",
                            component: resolve => require(["@/views/banner/add"], resolve),
                            title: "banner新增",
                            name: "banner新增",
                            hideMenu: true,
                        },
                    ]
                },

                {
                    path: "menu",
                    icon: "el-icon-menu",
                    component: resolve => require(["@/views/menu/index"], resolve),
                    title: "菜单管理",
                    name: "菜单管理",
                },
                {
                    path: "content",
                    icon: "el-icon-menu",
                    component: page,
                    title: "内容管理",
                    name: "内容管理",
                    children: [
                        {
                            path: "",
                            icon: "el-icon-menu",
                            component: resolve => require(["@/views/product/index"], resolve),
                            title: "内容管理列表",
                            name: "内容管理列表",
                        },
                        {
                            path: "edit",
                            icon: "el-icon-menu",
                            component: resolve => require(["@/views/product/edit"], resolve),
                            title: "内容编辑",
                            name: "内容编辑",
                            hideMenu: true,
                        },
                        {
                            path: "add",
                            icon: "el-icon-menu",
                            component: resolve => require(["@/views/product/add"], resolve),
                            title: "内容新增",
                            name: "内容新增",
                            hideMenu: true,
                        },
                    ]
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
