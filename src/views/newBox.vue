<template>
    <div class="new_box">
        <div class="model_box">
            <span class="name"><img src="../assets/icon1.png" alt="">{{currentMenu.PNAME}}</span>
            <router-link :to="`/home/list/${currentMenu.PURL}`">更多 ></router-link>
        </div>
        <div class="new_item" v-for="item in list" :key="item.ID"
             @click="goView(item)">
            <span class="time">{{item.CREATEDDATE.slice(0,10)}}</span>
            <div class="new_name">{{item.TITLE}}</div>
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
                    limit: 10,
                    categoryId: this.currentMenu.Children.map(v => v.ID).join(','),
                };
                const {data, count} = await this.api.product.getContentList(params);
                this.list = data;
                this.count = count;
            },
            goView({ID, CATEGORYID}) {
                const {PURL, Children = []} = this.currentMenu;
                const childUrl = Children.find(v => v.ID == CATEGORYID) || {};
                this.$router.push(`/home/list/${PURL}/${childUrl.PURL || ""}/${ID}`);
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

</style>
