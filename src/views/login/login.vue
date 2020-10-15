<template>
    <wrapper>
        <div class="title_box">
            <p class="title">工业互联网信息模型联合实验室</p>
        </div>
        <p class="login_link" @click="goReg" style="cursor: pointer">新用户？
            创建账户
        </p>
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
                <template  v-if="!isReg">
                    <el-checkbox v-model="checked"></el-checkbox>
                    记住用户名
                </template>
            </div>
            <el-button type="primary" :loading="loading" @click="reg" v-if="isReg">注册</el-button>
            <el-button type="primary" :loading="loading" @click="login" v-else>登录</el-button>
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
                isReg: false,
            };
        },
        created() {
            const {type = ""} = this.$route.query;
            if (type == "reg") {
                this.isReg = true;
            }
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
            goReg() {
                this.isReg = true;
                this.username = "";
                this.password = "";
            },
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
                    password: this.$md5(this.password),
                };
                this.loading = true;
                this.api.login.login(option).then(res => {

                    if (this.checked) {
                        saveLogin(this.username, this.password);
                    } else {
                        clearLogin();
                    }
                    this.$store.commit("setUserInfo", res);
                    if (res.isSystemUser) {
                        this.$router.push("/admin/banner");
                        this.$message.success("登录成功");
                    } else {
                        // 外部人员
                        this.init(res.id);
                    }

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
                    password: this.$md5(this.password),
                };
                this.loading = true;
                this.api.login.reg(option).then(res => {
                    this.$message.success("注册成功");
                    this.isReg = false;
                    this.loading = false;
                }).catch(res => {
                    this.$message.error(res);
                    this.loading = false;
                });
            },
            async init(userId) {
                const data = await this.api.business.getContentByUser({userId});
                console.log(data);
                if (data) {
                    this.$router.push({path: "/admin/business/edit", query: {id: data.id}});
                } else {
                    this.$router.push("/admin/business/add");
                }
                this.$message.success("登录成功");

            },
        },
    };
</script>
<style lang="scss" scoped>

</style>
