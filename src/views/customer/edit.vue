<template>
    <div class="customerEdit">
        <div class="top">
            <h2>{{pageType == 'add' ? '新增' : '编辑'}}用户
                <el-button type="primary" size="mini" style="vertical-align: top;" icon="el-icon-back"
                           @click="$router.go(-1)">
                    返回
                </el-button>
            </h2>
        </div>
        <el-card>
            <el-form label-position="right" ref="ruleForm" label-width="110px" :rules="rules" :model="newData">
                <el-form-item prop="username" label="登录账号">
                    <el-input v-model.trim="newData.username" :disabled="pageType == 'edit'" placeholder="请填写登录账号"
                              auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item prop="phone" label="手机号">
                    <el-input type="number" v-model.trim="newData.phone" placeholder="请填写用户手机号"
                              auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item prop="realname" label="真实姓名">
                    <el-input v-model.trim="newData.realname" placeholder="请填写真实姓名"
                              auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item prop="nickname" label="用户昵称">
                    <el-input v-model.trim="newData.nickname" placeholder="昵称"
                              auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item prop="password" label="登录密码">
                    <div class="psd-box">
                        <el-input :type="isShowPsd?'type':'password'" v-model.trim="newData.password"
                                  placeholder="请填写密码"
                                  auto-complete="off"></el-input>
                        <img v-if="isShowPsd" src="./image//psdShow.png" alt="" @click="isShowPsd=false">
                        <img v-else="" src="./image/psdHide.png" alt="" @click="isShowPsd=true">
                    </div>
                    <el-button type="primary" v-if="$route.query.type=='edit'" @click="changePwd">修改密码
                    </el-button>
                </el-form-item>
                <!--                <el-form-item prop="rolesId" label="客户角色">-->
                <!--                    <el-select v-model="newData.rolesId" default-first-option-->
                <!--                               placeholder="请选择角色">-->
                <!--                        <el-option v-for="item in $store.state.roleList"-->
                <!--                                   :key="item.id" :label="item.name" :value="item.id+''">-->
                <!--                        </el-option>-->
                <!--                    </el-select>-->
                <!--                </el-form-item>-->
                <el-form-item label="性别">
                    <el-radio v-model="newData.sex" label="M" border>男</el-radio>
                    <el-radio v-model="newData.sex" label="F" border>女</el-radio>
                </el-form-item>
                <el-form-item label="已启用">
                    <el-checkbox v-model="newData.isActive"></el-checkbox>
                </el-form-item>
                <el-form-item label="是否为内部人员">
                    <el-checkbox v-model="newData.isSystemUser"></el-checkbox>
                    <p>不勾选只能编辑企业自己的页面</p>
                </el-form-item>
                <el-form-item prop="remark" label="备注">
                    <el-input type="textarea" :rows="3" v-model="newData.remark" placeholder="备注"
                              auto-complete="off"></el-input>
                </el-form-item>

                <template v-if="pageType=='edit'">
                    <el-form-item label="创建日期">
                        <span>{{newData.createdAt}}</span>
                    </el-form-item>
                    <el-form-item label="更新时间">
                        <span>{{newData.updatedAt}}</span>
                    </el-form-item>
                </template>
                <div class="btn_box">
                    <el-button type="primary" @click="save" :loading="isHttp">保存</el-button>
                </div>
            </el-form>
        </el-card>
    </div>
</template>
<script>

    export default {
        data() {
            return {
                isHttp: false,
                isShowPsd: false, //登录密码是否可见
                pageType: this.$route.query.type,
                newData: {
                    username: '',
                    realName: '',
                    nickname: '',
                    rolesId: '',
                    sex: 'M',
                    remark: '',
                    phone: '',
                    isAdmin: false,
                    isActive: true,
                    password: '',
                    isSystemUser:true,
                },
                rules: {
                    username: [
                        {required: true, message: '登录账号不能为空', trigger: 'blur'},
                    ],
                    // phone: [
                    //     {required: true, message: '手机号不能为空', trigger: 'blur'}
                    // ],
                    // realname: [
                    //     {required: true, message: '真实姓名不能为空', trigger: 'blur'}
                    // ],
                    // rolesId: [
                    //     {required: true, message: '请选择用户角色', trigger: 'change'}
                    // ],
                },

            }
        },
        created() {
            // this.$store.dispatch('getRoles')
            if (this.pageType == 'edit') {
                this.getUserInfo();
            } else {
                this.rules.password = [
                    {required: true, message: '登录密码不能为空', trigger: 'blur'},
                ]
                this.newData.password = 123456
            }
            // this.$store.dispatch('getRoles', true);
        },
        methods: {
            //修改密码
            changePwd() {
                let {id, password} = this.newData;
                if (!password) {
                    return this.$message.error('密码不能为空')
                }
                this.api.user.changePsd({id, password:this.$md5(password)}).then(res => {
                    this.$message.success("修改密码成功")
                }).catch(res => {
                    this.$message.error(res.message)
                })
            },
            //获取个人信息
            async getUserInfo() {
                this.newData = await this.api.user.getUserInfo(this.$route.query.id)
            },
            //保存用户信息
            save() {
                this.$refs.ruleForm.validate((valid) => {
                    let option={
                        ...this.newData,
                    }
                    if (valid) {
                        this.isHttp = true;
                        this.api.user.saveAddUser(option).then(res => {
                            this.$message.success(res);
                            this.isHttp = false;
                            this.$router.back()
                        }).catch(res => {
                            this.isHttp = false;
                            this.$message.error(res);
                        })
                    } else {
                        return false;
                    }
                });

            },

        },
    }
</script>
<style lang="scss" scoped="">
    @import "../../common/css/mixins";

    .top {
        padding: 10px;
        position: relative;
        margin-bottom: 10px;
    }

    .el-select, .el-textarea, .el-input {
        width: 600px;

    }

    .psd-box {
        display: inline-block;

        .el-input {
            width: 500px;
        }

        position: relative;

        img {
            position: absolute;
            top: 6px;
            right: 10px;
            width: 32px;
            cursor: pointer;
        }
    }


    .btn_box {
        padding-left: 260px;
        padding-top: 10px;

        button {
            width: 180px;
        }
    }


</style>
