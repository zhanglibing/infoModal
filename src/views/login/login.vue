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
        </div>
        <div class="btn_box">
            <div>
                <el-checkbox v-model="checked"></el-checkbox>
                记住用户名
            </div>
            <el-button type="primary" :loading="loading" @click="login">登录</el-button>
            <el-button type="primary" :loading="loading" @click="reg">注册</el-button>
        </div>
    </wrapper>
</template>
<script>
    import wrapper from "./wrapper";
    import {saveLogin, getLogin, clearLogin} from "@/utils/cookie";

    export default {
        components: {
            wrapper,
        },
        data() {
            return {
                password: "",
                username: "",
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
            // 核对手机号
            checkUserName() {
                if (!this.username) {
                    this.$message.error("账号不能为空");
                    return false;
                }
                if (!this.password) {
                    this.$message.error("密码不能为空");
                    return false;
                }
                return true;
            },
            login() {
                if (!this.checkUserName()) {
                    return;
                }
                let option = {
                    username: this.username,
                    password: this.password,
                };
                this.loading = true;
                this.api.login.login(option).then(res => {
                    this.$message.success("登录成功");
                    if (this.checked) {
                        saveLogin(this.username, this.password);
                    } else {
                        clearLogin();
                    }
                    this.$store.commit("setUserInfo", res);
                    this.$router.push("/admin/banner");
                    this.loading = false;
                }).catch(res => {
                    this.$message.error(res);
                    this.loading = false;
                });
            },
            reg() {
                if (!this.checkUserName()) {
                    return;
                }
                let option = {
                    username: this.username,
                    password: this.password,
                };
                this.loading = true;
                this.api.login.reg(option).then(res => {
                    this.$message.success("注册成功");
                    this.loading = false;
                }).catch(res => {
                    this.$message.error(res);
                    this.loading = false;
                });
            },
        },
    };
</script>
<style lang="scss" scoped>

</style>
