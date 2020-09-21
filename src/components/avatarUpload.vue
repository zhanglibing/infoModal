<template>
    <el-upload
            class="avatar-uploader"
            :action="getHttp()"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
        <el-button size="small" type="primary">点击上传</el-button>
    </el-upload>
</template>
<script>

    export default {
        props: {
            imgPath: {
                type: String,
                default: ''
            },
            imgType: {
                type: String,
                default: 'avatar'
            }
        },
        data() {
            return {
                imageUrl: '',
            }
        },
        methods: {
            getHttp() { //返回上传图片host
                return `${apiHost}Media/UploadingFormFile?prefix=${this.imgType}`;
            },
            handleAvatarSuccess(res, file) {
                let {code, data} = res;
                if (code == 0) {
                    this.$message.success("上传成功");
                    this.imageUrl = data;
                    this.$emit('getImgUrl', data);
                } else {
                    this.$message.error("上传失败");
                }
            },
            beforeAvatarUpload(file) {
                const isLt5M = file.size / 1024 / 1024 < 5;
                if (!isLt5M) {
                    this.$message.error('上传图片大小不能超过 5MB!');
                }
                return isLt5M;
            },
        }
    }
</script>
<style lang="scss">
</style>
