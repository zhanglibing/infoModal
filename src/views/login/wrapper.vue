<template>
    <div class="login">
        <div><img src="../../common/image/logo.png" alt=""></div>
        <div class="wrapper">
            <div class="bg_box">
                <img src="../../../static/images/login_bg.png" alt="">
            </div>
            <div class="login-box">
                <slot></slot>
            </div>
        </div>
        <footerModel></footerModel>
    </div>
</template>
<script>
    import footerModel from '@/components/footerModel';
    export default {
        components: {
            footerModel
        },
    }
</script>
<style lang="scss" scoped>
    @import "../../common/css/mixins";

    .login {
        padding: 30px 40px;
        box-sizing: border-box;
        height: calc(100vh);
        position: relative;
        background: rgba(240, 242, 245, 1);
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        min-height: 700px;

        .wrapper {
            width: 1000px;
            height: 500px;
            margin: 0 auto;
            display: flex;
            background: #fff;

            & > div {
                flex: 1;
            }

            .bg_box {
                width: 500px;
                height: 500px;
            }
        }


        .login-box {
            padding: 50px;

            .title_box {
                margin-bottom: 30px;

                .title {
                    height: 30px;
                    font-size: 22px;
                    font-family: PingFangSC-Medium, PingFang SC;
                    font-weight: 500;
                    color: rgba(0, 0, 0, 1);
                    line-height: 30px;
                    margin-bottom: 8px;
                }

                .login_link {
                    height: 22px;
                    font-size: 16px;
                    font-family: PingFangSC-Medium, PingFang SC;
                    font-weight: 500;
                    color: rgba(0, 0, 0, 1);
                    line-height: 22px;

                    a {
                        color: #003D99;
                        cursor: pointer;
                    }
                }
            }

            .content_box {
                margin-bottom: 20px;

                .item {
                    padding-top: 15px;
                    position: relative;

                    .desc {
                        font-size: 12px;
                        color: rgba(102, 102, 102, 1);
                        line-height: 18px;
                    }

                    input {
                        width: 100%;
                        height: 28px;
                        border: none;
                        border-bottom: 2px solid #EFEFEF;
                        transition: all 0.4s;

                        &:focus {

                            border-bottom: 2px solid #003D99;
                        }
                    }

                    .img_box {
                        width: 130px;
                        position: absolute;
                        bottom: 10px;
                        right: 0;
                        display: flex;
                        align-items: center;
                        justify-content: space-between;

                        img {
                            width: 70px;
                            height: 32px;
                            cursor: pointer;
                        }

                        span {
                            cursor: pointer;
                            font-size: 12px;
                            color: #666;
                            flex: 1;
                            text-align: right;
                        }
                    }
                }
            }


            .btn_box {
                display: flex;
                justify-content: space-between;
                align-items: center;

                p {
                    a {
                        color: #003D99;
                        cursor: pointer;
                    }
                }

                button {
                    font-size: 16px;
                }
            }
        }
    }


</style>
