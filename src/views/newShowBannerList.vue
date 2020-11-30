<template>
    <div class="list_box">
        <ul>
            <li class="new_item" v-for="item in list" :key="item.id" @click="goView(item.id)">
                <div class="banner_box">
                    <el-image
                            style="width: 125px; height: 83px"
                            :src="item.bannerUrl"
                            fit="contain"></el-image>
                </div>
                <div class="content">
                    <div class="left">
                        <div class="time1"><i class="el-icon-date"></i>{{item.createdAt.slice(0,10)}}</div>
                        <div class="new_name">
                            {{item.title}}
                        </div>
                    </div>
                    <div class="el-icon-arrow-right">

                    </div>
                </div>
            </li>
        </ul>
        <div class="more" @click="loadingMore" v-if="count>page*limit">加载更多</div>
    </div>
</template>
<script>
    export default {
        props: {
            categoryId: {
                type: String,
                require: true,
            },
        },
        data() {

            return {
                list: [],
                page: 1,
                limit: 10,
                count: 0,
            };
        },
        created() {
            this.getContentList();
        },
        methods: {
            goView(id) {
                this.$router.push(`${this.$route.path}/${id}`);
            },
            async getContentList() {
                let params = {
                    page: this.page,
                    pageSize: this.limit,
                    categoryId: this.categoryId,
                    type: 3,
                };
                const {rows, count} = await this.api.content.getList(params);
                this.list = this.list.concat(rows);
                this.count = count;
            },
            loadingMore() {
                this.page = this.page + 1;
                this.getContentList();
            },
        },
    };
</script>
<style lang="scss" scoped>
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
            border-bottom: 1px solid #d5d5d5;
            padding-bottom: 10px;
            padding-top: 10px;
            transition: all 0.3s;

            &:hover {
                transform: translate(30px,0);
                .time1, .new_name {
                    color: #02145F;
                }

            }

            .banner_box {
                width: 125px;
                height: 83px;
                margin-right: 20px;
                display: flex;
                align-items: center;
                justify-content: center;

                img {
                    max-width: 100%;
                    min-height: 100%;
                }
            }

            .content {
                flex: 1;
                max-width: calc(100% - 135px);
                display: flex;
                justify-content: space-between;
                align-items: center;

                .time1 {
                    color: #666;
                    transition: all 0.3s;
                    width:100%;
                    i {
                        margin-right: 6px;
                    }
                }

                .new_name {
                    flex: 1;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    color: #000;
                    transition: all 0.3s;
                }

                .el-icon-arrow-right {
                    background: #dcdcdc;
                    padding: 6px;
                    border-radius: 50%;
                    color: #fff;

                }
            }
        }

        .more {
            text-align: center;
            cursor: pointer;
            line-height: 26px;
            margin: 10px;
        }
    }
</style>
