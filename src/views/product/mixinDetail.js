import editor from "@/components/editor/editor";
import bannerUpload from "@/components/bannerUpload";

export default {
    components: {
        editor,
        bannerUpload,
    },
    props: {
        type: {
            type: String,
            default: "add",
        },
    },
    data() {
        return {
            isHttp: false,
            PID: this.$route.query.id,
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
                if (this.newData.IURL) {
                    this.getVideoUrl();
                }
            } catch (e) {
                this.$message.error(e);
            }
        },
        getVideoUrl() {
            this.api.file.getPlayURL({videoId: this.newData.IURL}).then(res => {
                this.videoUrl = res.PlayInfoList[0].PlayURL;
            });
        },
        //保存产品信息
        save() {
            // this.newData.IDETAILS = this.$refs.editor.getUEContent();
            this.newData.Full = this.$refs.editor.getUEContent();
            this.$refs.ruleForm.validate((valid) => {
                if (valid) {
                    this.isHttp = true;
                    const {updateProduct, addProduct, addContent} = this.api.product;
                    const fun = this.type === "add" ? addContent : updateProduct;
                    alert(1)
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
        getVideoInfo(url) {
            this.newData.IURL = url;
        },
    },
    computed: {

    },
};
