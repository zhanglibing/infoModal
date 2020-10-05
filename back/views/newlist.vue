<template>
    <div class="list_box">
        <ul>
            <li class="new_item" v-for="item in 10" :key="item" @click="goView(12)">
                <span class="time">2020-09-26</span>
                <div class="new_name">
                    关于举办2020年全国工业互联网安全技术技能0赛的预通知关于举办2020年全国工业互联网安全技术技年全国工业互联网安全技术技年全国工业互联网安全技术技能
                </div>
            </li>
        </ul>
        <div class="more">加载更多</div>
    </div>
</template>
<script>
    export default {
        data() {
            return {};
        },
        created() {
        },
        methods: {
            goView(id) {
                this.$router.push(`${this.$route.path}/601D1C8B2EC24598B517D34354BF8FF3`)
            }
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

            .time {
                width: 90px;
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
</style>
