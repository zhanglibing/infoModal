<template>
    <el-upload
            class="avatar-uploader"
            :action="getHttp()"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
        <img v-if="imageUrl" :src="imageUrl" class="avatar">
        <img v-else-if="imgPath" :src="imgPath" class="avatar">
        <div v-else class="empty_box">
            <span class="el-icon-plus"> </span>
            <p>{{desc||'点击上传身份证（人像面）'}}</p>
        </div>
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
                default: 'idCard'
            },
            desc: {
                type: String,
                default: ''
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
