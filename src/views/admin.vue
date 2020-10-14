<template>
    <el-container>
        <el-header height="64px">
            <div class="header_content">
                <div class="shop_info">
                    <b class="name">工业互联网信息模型联合实验室</b>
                </div>
                <div class="user_info">
                    <span class="username">
                      当前账户：{{userInfo.username}}
                  </span>
                    <div class="menu_icon">
                        <el-button size="mini" @click="loginOut">退出登录</el-button>
                        <el-button size="mini" @click="$router.push('/home')">首页</el-button>
                    </div>
                </div>
            </div>
        </el-header>
        <div class="container maxH ">
            <div class="aside" :class="{active:collapse}">
                <div class="menu_list_box" v-if="!isShowMenu&&userInfo.isSystemUser">
                    <el-menu
                            class="el-menu-vertical-demo"
                            @open="handleOpen"
                            background-color=" rgba(0, 21, 41, 1);"
                            text-color="#666"
                            :default-active="activePath"
                            :router="true"
                            :collapse="collapse"
                            active-text-color="#fff">
                        <template v-for="item in menus">
                            <template v-if="item.subs">
                                <el-submenu :index="item.index" v-if="item.isShow">
                                    <template slot="title">
                                        <i :class="item.icon"></i>
                                        <span>{{item.title}}</span>
                                    </template>
                                    <!--                                    :class="`${$route.path.includes(item.index)?'is-active':''}`"-->
                                    <el-menu-item v-for="(subItem,i) in item.subs" :key="i" :index="subItem.index"
                                                  :style="{color:$route.path.includes(item.index)?'#fff':'#666'}"
                                    >
                                        {{subItem.title}}
                                    </el-menu-item>
                                </el-submenu>
                            </template>
                            <template v-else>
                                <!--                                :class="`${$route.path.includes(item.index)?'is-active':''}`"-->
                                <el-menu-item :index="item.index"
                                              :style="{color:$route.path.includes(item.index)?'#fff':'#666'}"
                                >
                                    <i :class="item.icon"></i>
                                    <span>{{ item.title }}</span>
                                </el-menu-item>
                            </template>
                        </template>
                    </el-menu>
                </div>

            </div>
            <div class="main-container">
                <div class="bread_box" v-if="userInfo.isSystemUser">
                    <el-breadcrumb separator="/">
                        <el-breadcrumb-item v-for="item in routerList"
                                            :key="item.path"
                                            :to="{path:item.path}">
                            {{item.name}}
                        </el-breadcrumb-item>
                    </el-breadcrumb>
                </div>
                <transition name="move" mode="out-in">
                    <div class="page_content">
                        <keep-alive>
                            <router-view v-if="$route.meta.keepAlive"></router-view>
                        </keep-alive>
                        <router-view v-if="!$route.meta.keepAlive"></router-view>
                    </div>
                </transition>
                <footerModel v-if="!$route.meta.hideFooter"></footerModel>
            </div>
        </div>
    </el-container>
</template>
<script>
    import footerModel from '../components/footerModel'
    import {mapState} from 'vuex';

    export default {
        components: {
            footerModel
        },
        data() {
            return {
                collapse: false,
                items: [],
                activeModelType: '/basic',  // 当前激活的模块
                menus: []
            };
        },
        created() {
            console.log(this.$route.path)
            // 初始化选中模块
            this.initMenu();
        },
        methods: {
            initMenu() {
                let showMenu = this.$router.options.routes[3];
                let arr = [];
                showMenu.children.forEach(val => {
                    if (val.hideMenu) {
                        return false;
                    }
                    let item = {
                        index: showMenu.path + "/" + val.path,
                        title: val.title,
                        icon: val.icon,
                    };
                    arr.push(item);
                });

                this.menus = arr;
            },
            handleOpen() {

            },
            //注销登录
            loginOut() {
                this.$store.commit('setUserInfo', null);
                this.$router.push('/')
                // this.api.login.loginOut();
            },
        },
        computed: {
            ...mapState(['userInfo']),
            activePath() {
                return this.$route.path;
            },
            isShowMenu() {
                return this.$route.path.includes('mall');
            },
            routerList() {
                return this.$route.matched.filter(v => v.path !== '/admin');
            },
        },
    };
</script>
<style lang="scss" scoped="">
    @import "../common/css/mixins";


    .container {
        width: 100%;
        display: flex;

        .main-container {
            flex: 1;
            position: relative;
            width: calc(100vw - 237px);
            min-height: calc(100vh - 64px);
            display: flex;
            flex-direction: column;
            background: #fff;

            .bread_box {
                height: 50px;
                background: #fff;
                display: flex;
                align-items: center;
                padding-left: 30px;
                border-bottom: 1px solid #EFEFEF;
            }

            .page_content {
                /*min-height: calc(100vh - 170px);*/
                padding: 10px;
                flex: 1;
            }

        }
    }

    .el-header {
        position: relative;
        z-index: 2;
        background: rgba(0, 40, 77, 1);
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        padding: 0;

        .header_content {
            flex: 1;
            border-bottom: 1px solid #EFEFEF;
            height: 100%;
            display: flex;
            justify-content: space-between;
            padding: 0 20px;

            & > div {
                display: flex;
                align-items: center;
                color: #fff;

            }

            .shop_info {
                .name {
                    font-size: 18px;
                }

            }

            .user_info {
                .avatar {
                    width: 32px;
                    height: 32px;
                    border-radius: 50%;
                    overflow: hidden;
                    margin-right: 15px;

                    img {
                        width: 100%;
                        height: 100%;
                    }
                }

                .menu_icon {
                    cursor: pointer;
                    position: relative;
                    height: 100%;
                    display: flex;
                    align-items: center;
                    padding-left: 20px;

                    &:hover {
                        .drow_box {
                            display: block;
                        }
                    }

                    .drow_box {
                        display: none;
                        position: absolute;
                        top: 64px;
                        width: 200px;
                        right: -10px;
                        padding-top: 10px;

                        .box {
                            background: #fff;
                            border: 1px solid #ebeef5;
                            border-radius: 4px;
                            box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);
                        }

                        .popper__arrow {
                            position: absolute;
                            top: -10px;
                            right: 15px;
                            border: 10px solid transparent;
                            border-bottom-color: #fff;
                        }

                        li {
                            display: flex;
                            padding: 0 30px;
                            font-size: 16px;
                            align-items: center;
                            line-height: 48px;
                            color: rgba(0, 0, 0, 0.65);

                            &:hover {
                                background: #EFEFEF;
                            }

                            span {
                                margin-right: 14px;
                            }
                        }
                    }
                }
            }
        }
    }

    .aside {
        display: flex;
        background: rgba(0, 21, 41, 1);


        .menu_list_box {
            .current_module {
                display: flex;
                justify-content: center;
                align-items: center;
                height: 50px;
                border-bottom: 1px solid #EFEFEF;
                border-right: 1px solid #EFEFEF;
                font-size: 16px;

                .icon_box {
                    padding: 0 8px;
                    display: flex;
                    align-items: center;
                    cursor: pointer;
                }
            }
        }

        .el-menu-vertical-demo:not(.el-menu--collapse) {

            min-height: calc(100vh - 120px);
            background: rgba(0, 21, 41, 1);

            .el-menu-item {
                padding: 0 20px !important;
                height: 40px !important;
                line-height: 40px !important;
                color: #fff !important;
                background: rgba(0, 21, 41, 1) !important;

                &.is-active {
                    background: #0398FF !important;
                    color: #fff !important;
                }
            }

            .el-submenu__title {
                /*width: 150px;*/
                /*min-width: 150px;*/
                padding: 0 20px !important;
                height: 40px !important;
                line-height: 40px !important;

                &.is-active {
                    background: #0398FF !important;
                }
            }

            .el-menu {
                .el-menu-item {
                    height: 36px;
                    line-height: 36px;
                    padding: 0 35px !important;
                }
            }
        }

        .el-menu--collapse {
            .el-menu-item {
                padding: 0 20px !important;
                height: 40px;
                line-height: 40px;

                &.is-active {
                    background: #0398FF !important;
                }
            }
        }
    }


</style>
