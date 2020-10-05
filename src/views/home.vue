<template>
    <div>
        <div class="banner_box">
            <el-carousel height="450px">
                <el-carousel-item v-for="item in data" :key="item.ID">
                    <img :src="item.BANNERIMGURL" alt="" class="banner_img">
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
    </div>
</template>
<script>
    export default {
        data() {
            return {
                menuData: [],
                data: [],
                list: [],
            };
        },
        created() {
            this.getList();
            this.getContentList();
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
                console.log(data)
                this.count = count;
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
            goView(url, id) {
                this.$router.push(`/home/list/${url}/newmodel/${id}`);
            },
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
                border-bottom: 1px solid rgba(0, 0, 0, 0.25);
                margin-bottom: 10px;
                padding: 4px;

                .name {
                    font-size: 18px;
                    color: #000;
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
                    color: #02145F;
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

    .el-carousel__item h3 {
        color: #475669;
        font-size: 14px;
        opacity: 0.75;
        line-height: 150px;
        margin: 0;
    }

    .el-carousel__item:nth-child(2n) {
        background-color: #99a9bf;
    }

    .el-carousel__item:nth-child(2n+1) {
        background-color: #d3dce6;
    }

    .banner_img {
        width: 100%;
        height: 100%;
    }
</style>
