<template>
    <div>
        <div class="banner_box">
            <el-carousel height="450px">
                <el-carousel-item v-for="item in data" :key="item.ID">
                    <img :src="item.BANNERIMGURL" alt="" class="banner_img" @click="goBanner(item.IDETAILS)">
                    <div class="tip_wrapper">
                        <div class="title">
                            {{item.INAME}}
                        </div>
                        <div class="desc">
                            {{item.IDIC}}
                        </div>
                        <div class="more_box">
                            <div class="more" @click="goBanner(item.IDETAILS)">了解更多</div>
                        </div>
                    </div>
                </el-carousel-item>
            </el-carousel>
        </div>
        <div class="news_wrapper" v-if="$store.state.menuList.length">
            <newBox :currentMenu="item" v-for="item in showHomeMenu" :key="item.ID"></newBox>
        </div>
        <div class="partners">
            <div class="partners_list">
                <a :href="item.BANNERIMGURL" target="_blank" v-for="item in partnersList"
                   :key="item.ID">{{item.INAME}}</a>
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
                    PTYPE: 2, //产品大类型1心理课程2心理文章3心理fm
                    PNAME: "",
                    PSTS: -1,
                };
                const {data, count} = await this.api.product.getProductList(params);
                this.data = data;
                data.forEach(val => this.getProduct(val.ID));
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
                    limit: 10,
                    PTYPE: 3, //产品大类型1心理课程2心理文章3心理fm
                    PNAME: "",
                    PSTS: -1,
                };
                const {data, count} = await this.api.product.getProductList(params);
                this.partnersList = data;
            },
            goBanner(obj) {
                const {ID, CATEGORYID} = JSON.parse(obj);
                const menuData = this.getMenu(CATEGORYID);
                this.$router.push(`/home/list/${menuData.parent.PURL}/${menuData.child.PURL}/${ID}`);
            },
            getMenu(CATEGORYID) {
                let child;
                let parent;
                if (!CATEGORYID) {
                    return "";
                }
                this.$store.state.menuList.some(v => {
                    if (v.Children.some(val => {
                        if (val.ID === CATEGORYID) {
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
                return this.$store.state.menuList.filter(v => v.PDIS == "1");
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
            background: #f3d548;
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
