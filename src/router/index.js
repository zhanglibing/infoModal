import Vue from "vue";
import Router from "vue-router";
import login from "@/views/login/login";
import page from "@/views/page";
import store from "../vuex/store";

const routerPush = Router.prototype.push;

Router.prototype.push = function push(location) {

    return routerPush.call(this, location).catch(error => error);

};


Vue.use(Router);
const routers = new Router({
    // mode: "history",
    routes: [
        // {
        //     path: "/",
        //     name: "login",
        // },
        {
            path: "/login",
            name: "login",
            component: login,
        },
        {
            path: "/",
            component: resolve => require(["@/views/wrapper"], resolve),
            name: "首页",
            children: [
                {
                    path: "",
                    component: resolve => require(["@/views/home"], resolve),
                    name: "首页",
                },
                {
                    path: "unit",
                    component: resolve => require(["@/views/unit"], resolve),
                    name: "测试工作",
                },
                {
                    path: "list/:name/:child?/:id?",
                    component: resolve => require(["@/views/list"], resolve),
                    name: "home",
                },
            ],
        },
        {
            path: "/admin",
            component: resolve => require(["@/views/admin"], resolve),
            meta: {auth: true},
            showMenu: true,  //展示菜单栏
            title: "后台管理",
            name: "后台管理",
            children: [
                {
                    path: "customer",
                    component: page,
                    title: "用户管理",
                    name: "用户管理",
                    icon: "el-icon-setting",
                    meta: {
                        auth: true,
                    },
                    children: [
                        {
                            path: "",
                            component: resolve => require(["@/views/customer/list"], resolve),
                            title: "账户列表",
                            name: "账户列表",
                        },
                        {
                            path: "role",
                            component: resolve => require(["@/views/customer/role"], resolve),
                            name: "用户列表",
                            title: "用户列表",
                            meta: {
                                auth: true,
                            },
                        },
                        {
                            path: "edit",
                            name: "用户详情",
                            title: "用户详情",
                            component: resolve => require(["@/views/customer/edit"], resolve),
                            hidMenu: true,
                        },
                    ],
                },
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
                    ],
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
                    ],
                },
                {
                    path: "business",
                    icon: "el-icon-menu",
                    component: page,
                    title: "联合单位管理",
                    name: "联合单位管理",
                    children: [
                        {
                            path: "",
                            icon: "el-icon-menu",
                            component: resolve => require(["@/views/business/index"], resolve),
                            title: "联合单位管理列表",
                            name: "联合单位管理列表",
                        },
                        {
                            path: "edit",
                            icon: "el-icon-menu",
                            component: resolve => require(["@/views/business/edit"], resolve),
                            title: "联合单位管理编辑",
                            name: "联合单位管理编辑",
                            hideMenu: true,
                        },
                        {
                            path: "add",
                            icon: "el-icon-menu",
                            component: resolve => require(["@/views/business/add"], resolve),
                            title: "联合单位管理新增",
                            name: "联合单位管理新增",
                            hideMenu: true,
                        },
                    ],
                },
                {
                    path: "partners",
                    icon: "el-icon-menu",
                    component: page,
                    title: "合作单位管理",
                    name: "合作单位管理",
                    children: [
                        {
                            path: "",
                            icon: "el-icon-menu",
                            component: resolve => require(["@/views/partners/index"], resolve),
                            title: "合作单位列表",
                            name: "合作单位列表",
                        },
                        {
                            path: "edit",
                            icon: "el-icon-menu",
                            component: resolve => require(["@/views/partners/edit"], resolve),
                            title: "合作单位编辑",
                            name: "合作单位编辑",
                            hideMenu: true,
                        },
                        {
                            path: "add",
                            icon: "el-icon-menu",
                            component: resolve => require(["@/views/partners/add"], resolve),
                            title: "合作单位新增",
                            name: "合作单位新增",
                            hideMenu: true,
                        },
                    ],
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
    document.title = `工业互联网信息模型联合实验室-` + to.name;
    if (to.matched.some(m => m.meta.auth)) {// 对路由进行验证
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
            next();
        } else {
            next({path: "/login"});
        }
    } else {
        next();
    }
});
export default routers;
