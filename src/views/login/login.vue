<template>
    <wrapper>
        <div class="title_box">
            <p class="title">工业互联网信息模型联合实验室</p>
        </div>
        <div class="content_box">
            <div class="item">
                <p class="desc">账号</p>
                <input type="text" :maxLength="11" v-model.trim="username" placeholder="请输入账号" @keyup.enter="login">
            </div>
            <div class="item">
                <p class="desc">密码</p>
                <input type="password" placeholder="请输入密码" v-model.trim="password" @keyup.enter="login">
            </div>
            <div class="item">
                <p class="desc">验证码</p>
                <input type="text" placeholder="请输入密码" v-model.trim="vcode" @keyup.enter="login">
                <div class="img_box" @click="getVerifyCode">
                    <img :src="`http://47.100.204.170:90/api/Login/NumberVerifyCode?Random=${random}&CodeLength=4&VerifyCodeType=3`"
                         alt="">
                    <span>换一个</span>
                </div>
            </div>
        </div>
        <div class="btn_box">
            <div>
                <el-checkbox v-model="checked"></el-checkbox>
                记住用户名
<!--                <router-link to="/findpwd">忘记密码 ?</router-link>-->
            </div>
            <el-button type="primary" :loading="loading" @click="login">登录</el-button>
        </div>
    </wrapper>
</template>
<script>
    import wrapper from "./wrapper";
    import myMixin from "./mixin";
    import {saveLogin, getLogin, clearLogin} from "@/utils/cookie";

    export default {
        mixins: [myMixin],
        components: {
            wrapper,
        },
        data() {
            return {
                password: "12345678",
                vcode: "",
                random: Math.random(),
                checked: false,
                loading: false,
            };
        },
        mounted() {
            let {username = "", password = ""} = getLogin();
            this.username = username;
            this.password = password;
            if (username) {
                this.checked = true;
            }
        },
        methods: {
            getVerifyCode() {
                this.random = (Math.random()).toFixed(5);
            },
            login() {
                if (!this.checkLogin()) {
                    return;
                }
                let option = {
                    username: this.username,
                    password: this.password,
                    vcode: `${this.random}:${this.vcode}`,
                };
                this.loading = true;
                this.api.login.login(option).then(res => {
                    this.$message.success("登录成功");
                    if (this.checked) {
                        saveLogin(this.username, this.password);
                    } else {
                        clearLogin();
                    }
                    this.$store.commit("setToken", res);
                    this.loading = false;
                    this.api.login.getUserByLoginName(this.username).then(res => {
                        this.$store.commit("setUserInfo", res);
                        this.$router.push("/admin/banner");
                    });

                }).catch(res => {
                    this.$message.error(res);
                    this.loading = false;
                    this.getVerifyCode();
                });
            },
            // 核对信息
            checkLogin() {
                if (!this.checkUserName()) {
                    return false;
                }
                if (!this.password) {
                    this.$message.error("密码不能为空");
                    return false;
                }
                if (this.password.length < 8) {
                    this.$message.error("请输入正确的密码");
                    return false;
                }
                if (!this.vcode) {
                    this.$message.error("验证码不能为空");
                    return false;
                }
                return true;
            },
        },
    };
</script>
<style lang="scss" scoped>

</style>
