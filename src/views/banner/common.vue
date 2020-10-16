<template>
    <div class="customerEdit">
        <el-card>
            <el-form label-position="right" ref="ruleForm" label-width="130px" :rules="rules" :model="newData">
                <el-form-item prop="title" label="banner名称:">
                    <el-input v-model.trim="newData.title" placeholder="banner名称"></el-input>
                </el-form-item>
                <el-form-item prop="introduce" label="介绍:">
                    <el-input type="textarea" v-model.trim="newData.introduce" placeholder="介绍"></el-input>
                </el-form-item>
                <el-form-item prop="bannerUrl" label="banner展示图片:">
                    <bannerUpload :imgPath="newData.bannerUrl" @getImgUrl="getImgUrl"></bannerUpload>
                </el-form-item>
                <el-form-item prop="content" label="选择跳转内容:">
                    <span style="margin-right: 10px;">{{newData.content}}</span>
                    <el-button type="primary" size="mini" @click="dialogVisible=true">选择产品</el-button>
                </el-form-item>
                <el-form-item label="创建时间:" v-if="newData.id">
                    {{newData.createdAt}}
                </el-form-item>
                <el-form-item label="">
                    <el-button @click="$router.back()">取消</el-button>
                    <el-button type="primary" @click="save" :loading="isHttp">确定</el-button>
                </el-form-item>
            </el-form>
            <Product :dialogVisible="dialogVisible" @setSelect="setSelect" @hide="dialogVisible=false"></Product>
        </el-card>
    </div>
</template>
<script>
    import bannerUpload from "@/components/bannerUpload";
    import Product from "./product";

    export default {
        props: {
            type: {
                type: String,
                default: "add",
            },
        },
        components: {
            bannerUpload,
            Product,
        },
        data() {
            return {
                dialogVisible: false,
                isHttp: false,
                PID: this.$route.query.id,
                newData: {
                    title: "",
                    bannerUrl: "https://element.eleme.cn/2.0/static/hamburger.50e4091.png",
                    type: 0,
                    content1: '',
                    content: '',
                    categoryId: '',
                    content2: '',
                },
                rules: {
                    title: [
                        {required: true, message: "banner名称", trigger: "blur"},
                    ],
                    bannerUrl: [
                        {required: true, message: "请上传banner图片", trigger: "blur"},
                    ],
                    content: [
                        {required: true, message: "请选择跳转内容", trigger: "blur"},
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
            setSelect({id, title, categoryId}) {
                this.newData = {
                    ...this.newData,
                    content1: id,
                    content: title,
                    categoryId,

                };
            },
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
            getImgUrl(url) {
                this.newData.bannerUrl = url;
            },
        },
    };
</script>
