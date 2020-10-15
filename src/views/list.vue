<template>
    <div>
        <div class="bread_box">
            当前位置：
            <router-link to="/home">首页</router-link>
            / {{currentMenu.name}}
        </div>
        <div class="page_box">
            <div class="nav_box">
                <div class="nav_bg">
                    <ul>
                        <router-link tag="li"
                                     :to="`/home/list/${$route.params.name}/${item.url}${item.contentId&&item.showType==1?'/'+item.contentId:''}`"
                                     v-for="item in navs"
                                     :key="item.id">
                            {{item.name}}
                        </router-link>
                    </ul>
                    <div class="position">
                        <img src="../assets/position.png" alt="">
                    </div>
                </div>

            </div>
            <div class="content_box" v-if="currentChild">
                <div class="banner_box" v-if="currentChild.bannerUrl">
                    <el-image :src="currentChild.bannerUrl"></el-image>
                </div>
                <new-list v-if="$route.params.child&&!$route.params.id" :categoryId="currentChild.id"></new-list>
                <views v-if="$route.params.id"></views>
            </div>
        </div>
    </div>
</template>
<script>
    import newList from "./newlist";
    import views from "./view";

    export default {
        components: {
            newList,
            views,
        },
        data() {
            return {
                navs: [],
                currentMenu: {},
                currentChild: null,
            };
        },
        created() {
            this.init();
        },
        methods: {
            async init() {
                const {name, child, id} = this.$route.params;
                const data = await this.$store.dispatch("getMenuList");
                this.currentMenu = data.find(v => v.url == name);
                this.navs = data.find(v => v.url == name).menus.filter(v=>v.status);
                if (!child && this.navs.length && !id) {
                    const child = this.navs[0];
                    this.$router.push(`/home/list/${name}/${child.url}${child.contentId && child.showType == 1 ? '/' + child.contentId : ''}`);
                } else {
                    this.currentChild = this.navs.find(v => v.url === child);
                }
            },
            goView(id) {
                this.$router.push(`${this.$route.path}/id`);
            },
        },
    };
</script>
<style lang="scss" scoped>
    .bread_box {
        width: 1200px;
        margin: 0 auto 10px;
        height: 50px;
        line-height: 50px;
        color: #000;
    }

    .page_box {
        width: 1200px;
        margin: 0 auto;
        display: flex;

        .nav_box {
            min-width: 234px;
            width: 234px;
            height: 258px;
            background: #02145F;
            box-shadow: 0px 0px 5px 0px rgba(187, 187, 187, 0.38);
            margin-right: 15px;
            box-sizing: border-box;
            padding: 20px 12px 0;

            .nav_bg {
                background: #fff;
            }

            ul {
                background: #fff;

                li {
                    position: relative;
                    line-height: 60px;
                    /*box-shadow: 0px 0px 5px 0px rgba(187, 187, 187, 0.38);*/
                    border-bottom: 1px solid rgba(187, 187, 187, 0.38);
                    padding-left: 40px;
                    font-size: 16px;
                    color: #000000;
                    text-shadow: 0px 0px 5px rgba(187, 187, 187, 0.38);
                    cursor: pointer;

                    &:hover, &.router-link-active {
                        color: #F27102;
                        font-weight: bold;
                    }

                    &.router-link-active {
                        &:before {
                            position: absolute;
                            top: 15px;
                            left: 15px;
                            content: '';
                            display: block;
                            width: 6px;
                            height: 29px;
                            background: #F27102;
                            box-shadow: 0px 0px 5px 0px rgba(187, 187, 187, 0.38);
                        }
                    }
                }
            }

            .position {
                width: 100%;

                img {
                    width: 218px;
                    margin-left: -4px;
                    margin-top: -4px;
                }
            }
        }

        .content_box {
            flex: 1;
            max-width: 946px;

            .banner_box {
                margin-bottom: 30px;

                .el-image {
                    height: 200px;
                    width: 100%;
                }
            }

            .list_box {
                min-height: 100px;
                background: #FFFFFF;
                box-shadow: 0px 0px 10px 2px rgba(194, 194, 194, 0.5);
                padding: 40px 60px;
                margin-bottom: 60px;

                .new_item {
                    display: flex;
                    width: 100%;
                    align-items: center;
                    margin-bottom: 10px;
                    line-height: 30px;
                    cursor: pointer;

                    .time {
                        width: 80px;
                        margin-right: 6px;
                        color: #666;
                    }

                    .new_name {
                        flex: 1;
                        white-space: nowrap;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        color: #000;
                    }
                }

                .more {
                    text-align: center;
                    cursor: pointer;
                    line-height: 26px;
                    margin: 10px;
                }
            }
        }

    }
</style>
