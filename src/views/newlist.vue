<template>
    <div class="list_box">
        <ul>
            <li class="new_item" v-for="item in list" :key="item.ID" @click="goView(item.ID)">
                <span class="time">{{item.CREATEDDATE.slice(0,10)}}</span>
                <div class="new_name">
                    {{item.TITLE}}
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
                    limit: this.limit,
                    categoryId:this.categoryId,
                };
                const {data, count} = await this.api.product.getContentList(params);
                this.list = this.list.concat(data);
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

        .more {
            text-align: center;
            cursor: pointer;
            line-height: 26px;
            margin: 10px;
        }
    }
</style>
