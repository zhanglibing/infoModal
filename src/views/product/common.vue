<template>
    <div class="customerEdit">
        <el-card>
            <el-form label-position="right" ref="ruleForm" label-width="130px" :rules="rules" :model="newData">
                <el-form-item prop="INAME" label="标题">
                    <el-input v-model.trim="newData.INAME" placeholder="标题"></el-input>
                </el-form-item>

                <el-form-item prop="IDETAILS" label="内容">
                    <editor ref="editor" :msg="newData.IDETAILS"></editor>
                </el-form-item>
                <el-form-item prop="IURL" label="文件上传">
                    <UploadAuth @getPath="getVideoInfo"></UploadAuth>
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
                    <el-button v-if="isShowSave" type="primary" @click="save" :loading="isHttp">确定</el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>
<script>
    import mixinDetail from "./mixinDetail";

    export default {
        mixins: [mixinDetail],
        data() {
            return {
                isHttp: false,
                videoUrl: "",
                newData: {
                    INAME: "",
                    XPRICE: "0",
                    ZPRICE: "0",
                    BANNERIMGURL: "",
                    ITYPE: 0, //产品类型0实体产品1虚拟产品
                    PTYPE: "1", //产品大类型1心理课程2心理文章3心理fm
                    IURL: "123",
                    IDIC: "ceshi",
                    ISTOP: 0,
                    IDETAILS: "",
                },
                rules: {
                    INAME: [
                        {required: true, message: "标题不能为空", trigger: "blur"},
                    ],
                    IDETAILS: [
                        {required: true, message: "内容不能为空", trigger: "blur"},
                    ],
                },
            };
        },
    };
</script>
<style lang="scss" scoped="">

    .el-select, .el-textarea, .el-input {
        width: 600px;

    }

    .smscode_box {
        display: flex;
        align-items: center;

        img_box {
            margin-left: 10px;
        }
    }


</style>
