<template>
    <el-upload
            class="avatar-uploader"
            :style="styles"
            :action="getHttp()"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
        <img v-if="imageUrl" :src="imageUrl" class="avatar">
        <img v-else-if="imgPath" :src="imgPath" class="avatar">
        <i v-else class="el-icon-picture avatar-uploader-icon"></i>
    </el-upload>
</template>
<script>
    export default{
        props: {
            index: {
                type: Number,
                required: 0,
            },
            imgPath: {
                type: String,
                default: ''
            },
            id:{
                default: 0
            },
            styles:{
                type:Object,
                default:()=>{
                    return {
                        width:'400px',
                        height:'178px',
                    }
                }
            }
        },
        data(){
            return {
                imageUrl: '',
            }
        },
        methods: {
            getHttp(){ //返回上传图片host
                return `${apiHost}Media/UploadingFormFile?prefix=banner`;
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
    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
        width:100%;
        height:100%;
    }

    .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }

    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 100%;
        height: 100%;
        line-height: 1;
        text-align: center;
    }

    .el-icon-picture {
        font-size: 80px;
        line-height: 178px;
    }

    .avatar {
        width: 100%;
        height: 100%;
        display: block;
    }
</style>
