<template>
    <el-upload
      class="avatar-uploader"
      :action="getHttp()"
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload">
      <img v-if="imageUrl" :src="imageUrl" class="avatar">
      <img v-else-if="AvatarUrl" :src="AvatarUrl" class="avatar">
      <i v-else class="el-icon-picture avatar-uploader-icon"></i>
    </el-upload>
</template>
<script>
 import {HOST} from '../../../api/Ajax'
  export default{
    props: {
      id: {
        required: true,
      },
      AvatarUrl: {
        type: String,
        default: ''
      },
      type:{
          type:Number,
          default:1
      }
    },
    data(){
      return {
        imageUrl: '',
      }
    },
    methods: {
      getHttp(){ //返回上传图片host
        return `${HOST}CustomerHandle/UploadIDPicture?customerId=${this.id}&type=${this.type}`;
      },
      handleAvatarSuccess(res, file) {
        let {Code,UploadIDPicture} = res;
        if (Code == '200') {
          this.$message.success("上传成功");
          this.imageUrl = UploadIDPicture.IDPictureUrl;
          this.$emit('getImgId',{type:this.type,path:this.imageUrl,id:UploadIDPicture.IDPictureId});
        } else {
          this.$message.error("上传失败");
        }
      },
      beforeAvatarUpload(file) {
        const isLt5M = file.size / 1024 / 1024 < 5;
        if (!isLt5M) {
          this.$message.error('上传头像图片大小不能超过 5MB!');
        }
        return isLt5M;
      },
    }
  }
</script>
<style lang="scss" scoped="">
  .avatar-uploader {
    width:100%;
    height:100%;
    .el-upload {
      width:150px;
      height:150px;
      cursor: pointer;
      position: relative;
      text-align: center;
      display: block;
    }
  }

  .avatar-uploader-icon {
    font-size: 60px;
    color: #8c939d;
    width:150px;
    height: 150px;
    line-height: 150px;
    text-align: center;
  }
  .avatar {
    width: 150px;
    height: 150px;
    display: block;
  }
  .click{
    width:100px;
    height:30px;
    position: absolute;
    bottom:-40px;
    left:-5px;
  }
  .el-upload__input{
    width:150px;height:150px;
  }
</style>
