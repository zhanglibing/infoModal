<template>
    <div style="background: #fff;">
        <div class="header_box">
            <div class="content">
                <img src="../assets/logo.png" alt="">
                <div>
                    <p class="zh">工业互联网信息模型联合实验室</p>
                    <p class="en">Industrial Internet Information Model Joint Laboratory </p>
                </div>
            </div>
            <p class="name">中国信通院</p>
        </div>
        <div class="nav_box">
            <div class="content_box">
                <router-link tag="div" to="/home" class="home">首页</router-link>
                <div v-for="item in showMenu"
                     :key="item.id">
                    <router-link tag="div" :to="`/home/list/${item.url}`" class="other">
                        {{item.name}}
                    </router-link>
                    <div class="select_box">
                        <router-link class="child_item" tag="div"
                                     :to="`/home/list/${item.url}/${child.url}${child.contentId&&child.showType==1?'/'+child.contentId:''}`"
                                     v-for="child in item.menus"
                                     :key="child.id"
                        >{{child.name}}
                        </router-link>
                    </div>
                </div>
                <router-link tag="div" to="/home/unit" class="home">联合单位</router-link>
            </div>
        </div>
        <router-view class="page_wrapper" :key="$route.path"></router-view>
        <footer>
            Copyright© 工业互联网信息模型联合实验室
        </footer>
    </div>
</template>
<script>
    export default {
        created() {
            this.$store.dispatch("getMenuList");
        },
        computed: {
            showMenu() {
                return this.$store.state.menuList.filter(val => val.status);
            }
        }
    };
</script>
<style lang="scss" scoped>
    .header_box {
        width: 1200px;
        margin: 0 auto;

        .content {
            display: flex;
            align-items: center;
            justify-content: center;
            padding-top: 20px;
            color: #000;

            img {
                width: 133px;
                height: 60px;
                margin-right: 20px;
            }

            .zh {
                font-size: 26px;
            }

            .en {
                font-size: 14px;
            }
        }

        .name {
            text-align: right;
            color: #000;
            margin-bottom: 10px;
        }
    }

    .nav_box {
        background: #02145F;
        height: 60px;
        width: 100%;
        position: relative;
        z-index: 10;

        .content_box {
            width: 1200px;
            margin: 0 auto;
            height: 60px;
            display: flex;
            align-items: center;

            & > div {
                margin-right: 20px;
                cursor: pointer;
                font-size: 16px;
                line-height: 20px;
                color: #fff;
                position: relative;
                padding: 20px 0;

                &:hover {
                    .select_box {
                        height: auto;
                    }
                }

                .select_box {
                    position: absolute;
                    left: 0;
                    top: 60px;
                    background: #02145F;
                    min-width: 160px;
                    height: 0;
                    overflow: hidden;
                    transition: all 0.4s;

                    .child_item {
                        padding: 10px 16px;
                        color: #fff;
                        font-size: 14px;
                        transition: all .3s;

                        &:hover, &.router-link-active {
                            background: #001A89;
                        }
                    }
                }

                &.home.router-link-exact-active {
                    color: #F27102;
                    font-weight: bold;
                }

                .other.router-link-active, .active {
                    color: #F27102;
                    font-weight: bold;
                }
            }
        }
    }

    .page_wrapper {
        min-height: calc(100vh - 220px);
    }

    footer {
        background: #02145F;
        height: 50px;
        line-height: 50px;
        text-align: center;
        font-size: 14px;
        color: #fff;
    }

</style>
