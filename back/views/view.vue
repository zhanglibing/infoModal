<template>
    <div>
        <div class="card_box">
            <div class="title">{{detail.INAME}}</div>
            <div class="time">{{detail.CREATEDATE.slice(0,10)}}</div>
            <div v-html="detail.IDETAILS"></div>
        </div>
        <div class="card_box">
            <div class="upload_box">
                <div class="btn">下载专区</div>
                点击下载
            </div>

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
            async getProduct() {
                try {
                    this.detail = await this.api.product.getProductById({PID: this.$route.params.id});
                    console.log(this.detail);
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
        }
    }
</style>
