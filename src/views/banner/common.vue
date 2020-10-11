<template>
    <div class="customerEdit">
        <el-card>
            <el-form label-position="right" ref="ruleForm" label-width="130px" :rules="rules" :model="newData">
                <el-form-item prop="INAME" label="banner名称:">
                    <el-input v-model.trim="newData.INAME" placeholder="banner名称"></el-input>
                </el-form-item>
                <el-form-item prop="IDIC" label="介绍:">
                    <el-input type="textarea" v-model.trim="newData.IDIC" placeholder="介绍"></el-input>
                </el-form-item>
                <el-form-item prop="BANNERIMGURL" label="banner展示图片:">
                    <bannerUpload :imgPath="newData.BANNERIMGURL" @getImgUrl="getImgUrl"></bannerUpload>
                </el-form-item>
                <el-form-item prop="IDETAILS" label="选择跳转内容:">
                    <span style="margin-right: 10px;">{{newData.IDETAILS.TITLE}}</span>
                    <el-button type="primary" @click="dialogVisible=true">选择产品</el-button>
                </el-form-item>
                <el-form-item label="创建时间:" v-if="newData.ID">
                    {{newData.CREATEDATE}}
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
                    INAME: "",
                    XPRICE: "",
                    ZPRICE: "",
                    BANNERIMGURL: "https://element.eleme.cn/2.0/static/hamburger.50e4091.png",
                    ITYPE: 0, //产品类型0实体产品1虚拟产品
                    PTYPE: "2", //产品大类型1心理课程2心理文章3心理fm
                    IURL: "",
                    IDIC: "",
                    ISTOP: 0,
                    IDETAILS: "",
                    IFROM: "",
                },
                rules: {
                    INAME: [
                        {required: true, message: "banner名称", trigger: "blur"},
                    ],
                    BANNERIMGURL: [
                        {required: true, message: "请上传banner图片", trigger: "blur"},
                    ],
                    IDETAILS: [
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
            setSelect({ID, TITLE, CATEGORYID}) {
                this.newData.IDETAILS = {
                    ID,
                    TITLE,
                    CATEGORYID,
                };
            },
            async getProduct() {
                try {
                    const data = await this.api.product.getProductById({PID: this.PID});
                    data.IDETAILS=JSON.parse(data.IDETAILS);
                    this.newData=data;
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
                        fun({...this.newData,IDETAILS:JSON.stringify(this.newData.IDETAILS)}).then(res => {
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
