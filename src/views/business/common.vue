<template>
    <div class="customerEdit">
        <el-card>
            <el-form label-position="right" ref="ruleForm" label-width="130px" :rules="rules" :model="newData">
                <el-form-item prop="name" label="企业名称">
                    <el-input v-model.trim="newData.name" placeholder="企业名称"></el-input>
                </el-form-item>
                <el-form-item prop="modelName" label="模型名称">
                    <el-input v-model.trim="newData.modelName" placeholder="模型名称"></el-input>
                </el-form-item>
                <el-form-item prop="testDoc" label="测试文档">
                    <div class="testDoc">
                        <span v-if="newData.testDoc">{{newData.testDoc}}</span>
                        <uploadFile @getImgUrl="getImgUrl"></uploadFile>
                        <el-button v-if="newData.bannerUrl" @click="uploadFileByUrl">下载</el-button>
                    </div>
                </el-form-item>
                <el-form-item prop="hasTset" label="已测试项">
                    <el-input v-model.trim="newData.hasTset" placeholder="已测试项"></el-input>
                </el-form-item>
                <template v-if="type==='edit'">
                    <el-form-item label="创建时间">
                        {{newData.updatedAt}}
                    </el-form-item>
                </template>
                <el-form-item label="">
                    <el-button @click="$router.back()">取消</el-button>
                    <el-button type="primary" @click="save" :loading="isHttp">确定</el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>
<script>
    import uploadFile from "@/components/uploadFile";

    export default {
        components: {
            uploadFile,
        },
        props: {
            type: {
                type: String,
                default: "add",
            },
        },
        data() {
            return {
                menuData: [],
                childData: [],
                isHttp: false,
                newData: {
                    name: "",
                    modelName: "",
                    hasTset: "",
                    testDoc: "",
                    bannerUrl: "",
                },
                rules: {
                    name: [
                        {required: true, message: "合作单位名称不能为空", trigger: "blur"},
                    ],
                    modelName: [
                        {required: true, message: "跳转链接不能为空", trigger: "blur"},
                    ],
                    testDoc: [
                        {required: true, message: "跳转链接不能为空", trigger: "blur"},
                    ],
                    hasTset: [
                        {required: true, message: "已测试项不能为空", trigger: "blur"},
                    ],
                },
            };
        },
        created() {
            if (this.type === "edit") {
                this.getProduct();
            }
        },
        methods: {
            getImgUrl({url, name}) {
                this.newData.testDoc = name;
                this.newData.bannerUrl = url;
            },
            uploadFileByUrl(){
                window.open(this.newData.bannerUrl,'_self')
            },
            async getProduct() {
                try {
                    this.newData = await this.api.business.detail({id: this.$route.query.id});
                } catch (e) {
                    this.$message.error(e);
                }
            },
            //保存产品信息
            save() {
                this.$refs.ruleForm.validate((valid) => {
                    if (valid) {
                        this.isHttp = true;
                        const {add, update} = this.api.business;
                        const fun = this.type === "add" ? add : update;
                        fun(this.newData).then(res => {
                            this.isHttp = false;
                            this.$message.success(`${this.type === "add" ? "新增" : "更新"}成功`);
                            if (this.$store.state.userInfo.isSystemUser) {
                                this.$router.back();
                            } else {
                                if (res.id) {
                                    this.$router.replace({path: "/admin/business/edit", query: {id: res.id}});
                                }

                            }

                        }).catch(res => {
                            this.isHttp = false;
                            this.$message.error(res);
                        });
                    } else {
                        return false;
                    }
                });

            },
        },
    };
</script>
<style lang="scss" scoped="">

    .el-select, .el-textarea, .el-input {
        width: 600px;

    }

    .testDoc{
        display: flex;
        align-items: center;
        button{
            margin-right: 15px;
        }
        span{
            margin-right: 15px;
        }
    }

</style>
