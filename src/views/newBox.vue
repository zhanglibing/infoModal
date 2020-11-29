<template>
    <div class="new_box">
        <div class="model_box">
            <span class="name"><img src="../assets/icon1.png" alt="">{{currentMenu.name}}</span>
            <router-link :to="`/list/${currentMenu.url}`">更多 ></router-link>
        </div>
        <div class="new_item" v-for="item in list" :key="item.ID"
             @click="goView(item)">
            <span class="time">{{item.createdAt.slice(0,10)}}</span>
            <div class="new_name"><span class="name">{{item.title}}</span> <span class="more" v-if="isShowListMore">更多</span></div>
        </div>
    </div>
</template>
<script>
    export default {
        props: {
            currentMenu: {
                type: Object,
                required: true,
            },
            isShowListMore: {
                type: Boolean,
                default: false,
            }
        },
        data() {
            return {
                menuData: [],
                list: [],
            };
        },
        created() {
            this.getContentList();
        },
        methods: {
            async getContentList() {
                let params = {
                    page: 1,
                    pageSize: 10,
                    type: 3,
                    categoryId: this.currentMenu.menus.map(v => v.id).join(","),
                };
                const {rows, count} = await this.api.content.getList(params);
                this.list = rows;
                this.count = count;
            },
            goView({id, categoryId, isLink, link}) {
                if(isLink){
                    window.open(link,'_blank');
                    return false;
                }
                const {url, menus = []} = this.currentMenu;
                const childUrl = menus.find(v => v.id == categoryId) || {};
                console.log(`/list/${url}/${childUrl.url || ""}/${id}`);
                this.$router.push(`/list/${url}/${childUrl.url || ""}/${id}`);
            },
        },
    };
</script>
<style lang="scss">
    .new_box {
        flex: 1;
        max-width: 580px;
        min-width: 580px;
        line-height: 30px;
        margin-bottom: 30px;

        &:nth-child(2n - 1) {
            margin-right: 40px;
        }

        .model_box {
            display: flex;
            align-items: center;
            justify-content: space-between;
            border-bottom: 2px solid #F27102;
            margin-bottom: 10px;
            padding: 4px;

            .name {
                font-size: 18px;
                font-weight: bold;
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
            display: flex;
            align-items: center;
            justify-content: space-between;
            .name{
                white-space:nowrap;
                overflow:hidden;
                text-overflow:ellipsis;
                flex: 1;
                padding-right: 10px;
            }
            .more{
                width:60px;
            }
        }
    }

</style>
