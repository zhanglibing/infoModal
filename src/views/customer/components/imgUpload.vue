<template>
  <el-upload
    class="avatar-uploader"
    :action="getHttp()"
    :show-file-list="false"
    :on-success="handleAvatarSuccess"
    :before-upload="beforeAvatarUpload">
    <img v-if="imageUrl" :src="imageUrl" class="avatar">
    <img v-else-if="imgPath" :src="imgPath" class="avatar">
    <i v-else class="el-icon-picture avatar-uploader-icon"></i>
    <!--<i v-else class="el-icon-plus avatar-uploader-icon"></i>-->
  </el-upload>
</template>
<script>
  export default{
    props: {
      CustomerId:{

      },
      imgPath: {
        type: String,
        default: ''
      }
    },
    data(){
      return {
        imageUrl: '',
      }
    },
    methods: {
      getHttp(){ //返回上传图片host
        return `${apiHost}PictureHandle/AsyncUploadNew`;
      },
      handleAvatarSuccess(res, file) {
        let {Code, Picture} = res;
        if (Code == '200') {
          this.imageUrl = Picture.imageUrl;
          let option={
            CustomerId:this.CustomerId,
            pictureId:Picture.pictureId
          }
          this.$http.post('CustomerHandle/UploadfyTemp',option).then(res=>{
              let {Code}=res.data;
            this.$message.success("上传成功");
          })
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
  }

  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }

  .el-icon-picture {
    font-size: 80px;
  }

  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
