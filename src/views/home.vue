<template>
    <div>
        <div class="banner_box">
            <el-carousel height="450px">
                <el-carousel-item v-for="item in data" :key="item.ID"

                >
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
            <div class="new_box">
                <div class="model_box">
                    <span class="name"><img src="../assets/icon1.png" alt="">{{$store.state.menuList[0].PNAME}}</span>
                    <router-link :to="`/home/list/${$store.state.menuList[0].PURL}`">更多 ></router-link>
                </div>
                <div class="new_item" v-for="item in list" :key="item.ID"
                     @click="goView($store.state.menuList[0].PURL,item.ID)">
                    <span class="time">{{item.CREATEDATE.slice(0,10)}}</span>
                    <div class="new_name">{{item.INAME}}</div>
                </div>
            </div>
            <div class="new_box">
                <div class="model_box">
                    <span class="name"><img src="../assets/icon2.png" alt="">{{$store.state.menuList[1].PNAME}}</span>
                    <router-link :to="`/home/list/${$store.state.menuList[1].PURL}`">更多 ></router-link>
                </div>
                <div class="new_item" v-for="item in list" :key="item.ID"
                     @click="goView($store.state.menuList[0].PURL,item.ID)">
                    <span class="time">{{item.CREATEDATE.slice(0,10)}}</span>
                    <div class="new_name">{{item.INAME}}</div>
                </div>
            </div>
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
    export default {
        data() {
            return {
                menuData: [],
                data: [],
                list: [],
                partnersList: [],
                bannerDetail: {}
            };
        },
        created() {
            this.getList();
            this.getContentList();
            this.getPartnersList();
        },
        methods: {
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
                data.forEach(val => this.getProduct(val.ID))
                this.count = count;
            },
            async getProduct(PID) {
                try {
                    const data = await this.api.product.getProductById({PID});
                    this.bannerDetail = {
                        ...this.bannerDetail,
                        PID: data,
                    }
                    this.data.some(v => {
                        if (v.ID === PID) {
                            v.IDIC = data.IDIC;
                            v.IDETAILS = data.IDETAILS;
                            return true;
                        }
                    })
                    console.log(this.data)
                } catch (e) {
                    this.$message.error(e);
                }
            },
            async getContentList() {
                let params = {
                    page: 1,
                    limit: 10,
                    PTYPE: 1, //产品大类型1心理课程2心理文章3心理fm
                    PNAME: '',
                    PSTS: -1,
                };
                const {data, count} = await this.api.product.getProductList(params);
                this.list = data;
                this.count = count;
            },
            async getPartnersList() {
                let params = {
                    page: 1,
                    limit: 10,
                    PTYPE: 3, //产品大类型1心理课程2心理文章3心理fm
                    PNAME: '',
                    PSTS: -1,
                };
                const {data, count} = await this.api.product.getProductList(params);
                this.partnersList = data;
            },
            goView(url, id) {
                this.$router.push(`/home/list/${url}/newmodel/${id}`);
            },
            goBanner(ID) {
                this.$router.push(`/home/list/info/newmodel/${ID}`);
            }
        },
    };
</script>
<style lang="scss">
    .news_wrapper {
        display: flex;
        width: 1200px;
        margin: 20px auto 50px;

        .new_box {
            flex: 1;
            max-width: 580px;
            line-height: 30px;

            &:first-child {
                margin-right: 40px;
            }

            .model_box {
                display: flex;
                align-items: center;
                justify-content: space-between;
                border-bottom: 1px solid #F27102;
                margin-bottom: 10px;
                padding: 4px;

                .name {
                    font-size: 18px;
                    color: #F27102;
                    display: flex;
                    align-items: center;

                    img {
                        margin-right: 6px;
                    }
                }
            }
        }

        .new_item {
            display: flex;
            align-items: center;
            cursor: pointer;

            &:hover {
                .time, .new_name {
                    color: #F27102;
                }

            }

            .time {
                width: 90px;
                margin-right: 6px;
                color: #666;
                transition: all 0.3s;
            }

            .new_name {
                flex: 1;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                color: #000;
                transition: all 0.3s;
            }
        }
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
