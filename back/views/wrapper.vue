<template>
    <div style="background: #fff;">
        <div class="header_box">
            <div class="content">
                <img src="../assets/logo.png" alt="">
                <div>
                    <p class="zh">工业互联网信息模型联合实验室</p>
                    <p class="en">Industrial Internet Information Model Joint Laboratory </p>
                </div>
            </div>
            <p class="name">中国信通院</p>
        </div>
        <div class="nav_box">
            <div class="content_box">
                <router-link tag="div" to="/home" class="home">首页</router-link>
                <router-link tag="div" :to="`/home/list/${item.PURL}`" class="other"
                             v-for="item in $store.state.menuList"
                             :key="item.ID">{{item.PNAME}}
                </router-link>
            </div>
        </div>
        <router-view class="page_wrapper" :key="$route.path"></router-view>
        <footer>
            Copyright© 工业互联网信息模型联合实验室
        </footer>
    </div>
</template>
<script>
    export default {
        created() {
            this.$store.dispatch("getMenuList");
        },
    };
</script>
<style lang="scss">
    .header_box {
        width: 1200px;
        margin: 0 auto;

        .content{
            display: flex;
            align-items: center;
            justify-content: center;
            padding-top: 20px;
            color:#000;
            img{
                width: 133px;
                height: 60px;
                margin-right: 20px;
            }
            .zh{
                font-size: 26px;
            }
            .en{
                font-size: 14px;
            }
        }
        .name{
            text-align: right;
            color:#000;
            margin-bottom: 10px;
        }
    }

    .nav_box {
        background: #02145F;
        height: 60px;
        width: 100%;

        .content_box {
            width: 1200px;
            margin: 0 auto;
            height: 60px;
            display: flex;
            align-items: center;

            & > div {
                margin-right: 20px;
                cursor: pointer;
                font-size: 16px;
                color: #fff;

                &.home.router-link-exact-active {
                    color: #F27102;
                    font-weight: bold;
                }

                &.other.router-link-active {
                    color: #F27102;
                    font-weight: bold;
                }
            }
        }
    }

    .page_wrapper {
        min-height: calc(100vh - 220px);
    }

    footer {
        background: #02145F;
        height: 50px;
        line-height: 50px;
        text-align: center;
        font-size: 14px;
        color: #fff;
    }

</style>
