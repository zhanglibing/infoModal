<template>
    <div class="customerEdit">
        <el-card>
            <el-form label-position="right" ref="ruleForm" label-width="130px" :rules="rules" :model="newData">
                <el-form-item prop="INAME" label="banner名称">
                    <el-input v-model.trim="newData.INAME" placeholder="banner名称"></el-input>
                </el-form-item>
                <el-form-item prop="BANNERIMGURL" label="banner展示图片">
                    <bannerUpload :imgPath="newData.BANNERIMGURL" @getImgUrl="getImgUrl"></bannerUpload>
                </el-form-item>
<!--                <el-form-item prop="IDIC" label="描述">-->
<!--                    <el-input type="textarea" v-model.trim="newData.IDIC" placeholder="描述"></el-input>-->
<!--                </el-form-item>-->
                <el-form-item prop="IDETAILS" label="超链接">
                    <el-input v-model.trim="newData.IDETAILS" placeholder="超链接"></el-input>
                </el-form-item>
                <template v-if="type==='edit'">
                    <el-form-item label="浏览人次">
                        {{newData.VISCOUNT}}
                    </el-form-item>
                    <el-form-item label="创建时间">
                        {{newData.CREATEDATE}}
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
    import bannerUpload from "@/components/bannerUpload";

    export default {
        props: {
            type: {
                type: String,
                default: "add",
            },
        },
        components: {
            bannerUpload,
        },
        data() {
            return {
                isHttp: false,
                PID: this.$route.query.id,
                newData: {
                    INAME: "",
                    XPRICE: "",
                    ZPRICE: "",
                    BANNERIMGURL: "https://element.eleme.cn/2.0/static/hamburger.50e4091.png",
                    ITYPE: 0, //产品类型0实体产品1虚拟产品
                    PTYPE: "2", //产品大类型1心理课程2心理文章3心理fm
                    IURL: "",
                    IDIC: "ceshi",
                    ISTOP: 0,
                    IDETAILS: "",
                },
                rules: {
                    INAME: [
                        {required: true, message: "banner名称", trigger: "blur"},
                    ],
                    BANNERIMGURL: [
                        {required: true, message: "banner不能为空", trigger: "blur"},
                    ],
                    // IDIC: [
                    //     {required: true, message: "描述不能为空", trigger: "blur"},
                    // ],
                    IDETAILS: [
                        {required: true, message: "超链接", trigger: "blur"},
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
                    this.newData = await this.api.product.getProductById({PID: this.PID});
                } catch (e) {
                    this.$message.error(e);
                }
            },
            //保存产品信息
            save() {
                this.$refs.ruleForm.validate((valid) => {
                    if (valid) {
                        this.isHttp = true;
                        const {updateProduct, addProduct} = this.api.product;
                        const fun = this.type === "add" ? addProduct : updateProduct;
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
                this.newData.BANNERIMGURL = url;
            },
        },
    };
</script>
