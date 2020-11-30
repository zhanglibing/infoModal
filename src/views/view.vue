<template>
    <div>
        <!--        <div class="card_box" v-if="detail.content1">-->
        <!--            <div class="upload_box">-->
        <!--                {{detail.content1}}-->
        <!--                <div class="btn" @click="uploadFileByUrl">下载专区,点击下载</div>-->
        <!--            </div>-->
        <!--        </div>-->
        <div class="card_box">
            <div class="title">
                <span class="name">{{detail.title}}</span>
                <div class="btn" v-if="detail.content1" @click="uploadFileByUrl">下载资料</div>
            </div>
            <div class="time">{{detail.createdAt.slice(0,10)}}</div>
            <div v-html="detail.content"></div>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                detail: {},
            };
        },
        created() {
            this.getProduct();
        },
        methods: {
            uploadFileByUrl() {
                window.open(this.detail.content2, '_self')
            },
            async getProduct() {
                try {
                    const data = await this.api.content.detail({id: this.$route.params.id});
                    data.content = data.content.replace(/<img/g, '<img style="max-width:100%"');
                    console.log(data.content)
                    this.detail = data;
                } catch (e) {
                    this.$message.error(e);
                }
            },
        },
    };
</script>
<style lang="scss" scoped>
    .card_box {
        width: 950px;
        background: #FFFFFF;
        box-shadow: 0px 0px 10px 2px rgba(194, 194, 194, 0.5);
        padding: 40px 60px;
        margin-bottom: 30px;
        box-sizing: border-box;
    }

    .title {
        font-size: 24px;
        color: #000;
        margin-bottom: 15px;
        position: relative;
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        .btn {
            width: 70px;
            font-size: 14px;
            background: #01135F;
            line-height: 24px;
            color: #fff;
            padding:4px 8px;
            border-radius: 4px;
            cursor: pointer;
            margin-left: 10px;
            text-align: center;

        }
    }

    .time {
        font-size: 12px;
        color: #999;
        margin-bottom: 15px;
    }

    .upload_box {
        display: flex;
        align-items: center;
        cursor: pointer;

        .btn {
            width: 160px;
            height: 40px;
            background: #01135F;
            line-height: 40px;
            color: #fff;
            text-align: center;
            margin-right: 10px;
            border-radius: 6px;
            margin-left: 10px;
        }
    }

    img {
        max-width: 100%;
    }
</style>
