<template>
    <div class="customerEdit">
        <el-card>
            <el-form label-position="right" ref="ruleForm" label-width="130px" :rules="rules" :model="newData">
                <el-form-item prop="title" label="合作单位名称">
                    <el-input v-model.trim="newData.title" placeholder="合作单位名称"></el-input>
                </el-form-item>

                <el-form-item prop="bannerUrl" label="跳转链接">
                    <el-input v-model.trim="newData.bannerUrl" placeholder="跳转链接"></el-input>
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
    export default {
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
                    title: "",
                    bannerUrl: "",
                    type: 1,
                    content1: "",
                    content: "qwe",
                    categoryId: "",
                },
                rules: {
                    title: [
                        {required: true, message: "合作单位名称不能为空", trigger: "blur"},
                    ],
                    bannerUrl: [
                        {required: true, message: "跳转链接不能为空", trigger: "blur"},
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
            async getProduct() {
                try {
                    this.newData = await this.api.content.detail({id: this.$route.query.id});
                } catch (e) {
                    this.$message.error(e);
                }
            },
            //保存产品信息
            save() {
                this.$refs.ruleForm.validate((valid) => {
                    if (valid) {
                        this.isHttp = true;
                        const {add, update} = this.api.content;
                        const fun = this.type === "add" ? add : update;
                        fun(this.newData).then(res => {
                            this.isHttp = false;
                            this.$message.success(`${this.type === "add" ? "新增" : "更新"}成功`);
                            this.$router.back();
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

    .smscode_box {
        display: flex;
        align-items: center;

        img_box {
            margin-left: 10px;
        }
    }


</style>
