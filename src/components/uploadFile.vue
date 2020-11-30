<template>
    <el-upload
            class="upload-demo"
            :action="getHttp()"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
        <el-button type="primary">点击上传测试文档</el-button>
    </el-upload>
</template>
<script>
    export default {
        props: {
            index: {
                type: Number,
                required: 0,
            },
            imgPath: {
                type: String,
                default: "",
            },
        },
        data() {
            return {
                name: "",
                imageUrl: "",
            };
        },
        created() {
        },
        methods: {
            getHttp() { //返回上传图片host
                return `${apiHost}upload`;
            },
            handleAvatarSuccess(res, file) {
                let {code, data} = res;
                if (code == 200) {
                    this.$message.success("上传成功");
                    this.imageUrl = data;
                    this.$emit("getImgUrl", {url: data, name: this.name});
                } else {
                    this.$message.error("上传失败");
                }
            },
            beforeAvatarUpload(file) {
                this.name = file.name;
                const isLt5M = file.size / 1024 / 1024 < 50;
                if (!isLt5M) {
                    this.$message.error("上传图片大小不能超过 20MB!");
                }
                return isLt5M;
            },
        },
    };
</script>
<style lang="scss">


</style>
