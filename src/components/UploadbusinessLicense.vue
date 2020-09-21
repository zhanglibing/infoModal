<template>
    <el-upload
            class="upload-demo"
            :action="getHttp()"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
            multiple
            :limit="1"
            :file-list="fileList">
        <el-button size="small" icon="el-icon-upload2" type="primary">上传文件</el-button>
        <div slot="tip" class="el-upload__tip">支持扩展名：.rar .zip .doc .docx .pdf .jpg...</div>
    </el-upload>
</template>
<script>
    export default {
        props: {
            field: {
                type: String,
                required: true,
            },
            imgPath: {
                type: String,
                default: ''
            },
            imgType: {
                type: String,
                default: 'license'
            }
        },
        data() {
            return {
                fileList: [
                    // {
                    //     name: 'food.jpeg',
                    //     url:'',
                    // }
                ],
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
                    this.$emit('getImgInfo', {[this.field]: data});
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
            beforeAvatarUpload(file) {
                const isLt5M = file.size / 1024 / 1024 < 5;
                if (!isLt5M) {
                    this.$message.error('上传图片大小不能超过 5MB!');
                }
                return isLt5M;
            },
            handleRemove() {
                this.$emit('getImgInfo', {[this.field]: ''})
            },
        }
    }
</script>
<style lang="scss">
    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
        width: 192px;
        height: 108px;
    }

    .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }

    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 192px;
        height: 108px;
        line-height: 178px;
        text-align: center;
    }

    .el-icon-picture {
        font-size: 80px;
    }

    .avatar {
        width: 192px;
        height: 108px;
        display: block;
    }

    .empty_box {
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        span {
            font-size: 18px;
        }

        p {
            font-size: 12px;
        }
    }
</style>
