<template>
    <div>
        <div class="banner_box">
            <el-carousel height="450px">
                <el-carousel-item v-for="item in data" :key="item.ID">
                    <img :src="item.bannerUrl" alt="" class="banner_img"
                         @click="goBanner(item)">
                    <div class="tip_wrapper" @click="goBanner(item)">
                        <div class="title">
                            {{item.title}}
                        </div>
                        <div class="desc">
                            {{item.introduce}}
                        </div>
                        <div class="more_box">
                            <div class="more">了解更多</div>
                        </div>
                    </div>
                </el-carousel-item>
            </el-carousel>
        </div>
        <div class="news_wrapper" v-if="$store.state.menuList.length">
            <newBox :currentMenu="item" v-for="item in showHomeMenu" :key="item.id"></newBox>
        </div>
        <div class="partners">
            <div class="partners_list">
                <a :href="item.bannerUrl" target="_blank" v-for="item in partnersList"
                   :key="item.id">{{item.title}}</a>
            </div>
        </div>
    </div>
</template>
<script>
    import newBox from "./newBox";

    export default {
        components: {
            newBox,
        },
        data() {
            return {
                menuData: [],
                data: [],
                list: [],
                partnersList: [],
                bannerDetail: {},
            };
        },
        created() {
            this.getList();
            this.getPartnersList();
        },
        methods: {
            // 获取banner list
            async getList() {
                let params = {
                    page: 1,
                    limit: 10,
                    type: 0,
                };
                const {rows, count} = await this.api.content.getList(params);
                this.data = rows;
                this.count = count;
            },
            async getProduct(PID) {
                try {
                    const data = await this.api.product.getProductById({PID});
                    this.bannerDetail = {
                        ...this.bannerDetail,
                        PID: data,
                    };
                    this.data.some(v => {
                        if (v.ID === PID) {
                            v.IDIC = data.IDIC;
                            v.IDETAILS = data.IDETAILS;
                            return true;
                        }
                    });
                } catch (e) {
                    this.$message.error(e);
                }
            },
            async getPartnersList() {
                let params = {
                    page: 1,
                    pageSize: 100,
                    type: 1,
                };
                const {rows, count} = await this.api.content.getList(params);
                this.partnersList = rows;
            },
            goBanner(obj) {
                // content1: id,
                //     content: title,
                //     categoryId,
                console.log(obj)
                const {categoryId, content1} = obj;
                const menuData = this.getMenu(categoryId);
                this.$router.push(`/home/list/${menuData.parent.url}/${menuData.child.url}/${content1}`);
            },
            getMenu(categoryId) {
                let child;
                let parent;
                if (!categoryId) {
                    return "";
                }
                console.log(this.$store.state.menuList)
                this.$store.state.menuList.some(v => {
                    if (v.menus.some(val => {
                        if (val.id == categoryId) {
                            child = val;
                            return true;
                        }
                    })) {
                        parent = v;
                        return true;
                    }
                });
                return {
                    child,
                    parent,
                };
            },
        },
        computed: {
            showHomeMenu() {
                return this.$store.state.menuList.filter(v => v.showType == 1);
            },
        },

    };
</script>
<style lang="scss">
    .news_wrapper {
        display: flex;
        width: 1200px;
        margin: 20px auto 50px;
        flex-wrap: wrap;
    }


    .partners {
        background: #02145f;
        color: #fff;
        padding: 30px 0 0;
        border-bottom: 1px solid #636060;

        .partners_list {
            display: flex;
            max-width: 1200px;
            margin: 0 auto;
            flex-wrap: wrap;
            justify-content: center;

            a {
                margin-right: 40px;
                margin-bottom: 30px;

                &:hover {
                    text-decoration: underline;
                }
            }
        }
    }

    .el-carousel__item {
        cursor: pointer;
    }

    .banner_img {
        width: 100%;
        height: 100%;
    }

    .tip_wrapper {
        position: absolute;
        top: 225px;
        right: 100px;
        transform: translate(0, -50%);
        width: 400px;
        background: rgba(0, 0, 0, .6);
        color: #fff;
        border-radius: 6px;
        overflow: hidden;

        .title {
            background: #ee6c02;
            padding: 8px 15px;
            font-size: 16px;
        }

        .desc {
            padding: 15px;
            line-height: 30px;
        }

        .more_box {
            display: flex;
            justify-content: flex-end;
            padding: 10px 15px;

            .more {

            }
        }
    }
</style>
