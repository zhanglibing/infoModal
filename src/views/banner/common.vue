<template>
    <div class="customerEdit">
        <el-card>
            <el-form label-position="right" ref="ruleForm" label-width="130px" :rules="rules" :model="newData">
                <el-form-item prop="INAME" label="banner名称">
                    <el-input v-model.trim="newData.INAME" placeholder="banner名称"></el-input>
                </el-form-item>
                <el-form-item prop="BANNERIMGURL" label="banner展示图片">
                    <bannerUpload :imgPath="newData.BANNERIMGURL" @getImgUrl="getImgUrl"></bannerUpload>
                </el-form-item>
                <el-form-item prop="IDIC" label="描述">
                    <el-input type="textarea" v-model.trim="newData.IDIC" placeholder="描述"></el-input>
                </el-form-item>
                <el-form-item prop="IDETAILS" label="超链接">
                    <el-input v-model.trim="newData.IDIC" placeholder="超链接"></el-input>
                </el-form-item>
                <template v-if="type==='edit'">
                    <el-form-item label="浏览人次">
                        <el-input v-model.trim="newData.VISCOUNT" placeholder="浏览人次"></el-input>
                    </el-form-item>
                    <el-form-item label="状态">
                        <el-tag :type="newData.PSTS|filterTag">{{newData.PSTS|filterStatus}}</el-tag>
                    </el-form-item>
                    <el-form-item label="创建时间">
                        {{newData.CREATEDATE}}
                    </el-form-item>
                </template>

                <el-form-item label="">
                    <el-button @click="$router.back()">取消</el-button>
                    <el-button v-if="isShowSave" type="primary" @click="save" :loading="isHttp" :disabled="newData.ISSHELF">确定</el-button>
                    <el-button v-if="isShowSubmit" type="primary" @click="submit" :loading="isHttp" :disabled="newData.ISSHELF">提交审核</el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>
<script>
    import mixinDetail from '../product/mixinDetail'
    export default {
        mixins:[mixinDetail],
        data() {
            return {
                newData: {
                    INAME: '',
                    XPRICE: '',
                    ZPRICE: '',
                    BANNERIMGURL: '',
                    ITYPE: 0, //产品类型0实体产品1虚拟产品
                    PTYPE: '2', //产品大类型1心理课程2心理文章3心理fm
                    IURL: '',
                    IDIC: '',
                    ISTOP: 0,
                    IDETAILS: '',
                },
                rules: {
                    INAME: [
                        {required: true, message: 'banner名称', trigger: 'blur'}
                    ],
                    BANNERIMGURL: [
                        {required: true, message: 'banner不能为空', trigger: 'blur'}
                    ],
                    IDIC: [
                        {required: true, message: '描述不能为空', trigger: 'blur'}
                    ],
                    IDETAILS: [
                        {required: true, message: '超链接', trigger: 'blur'}
                    ],
                },
            }
        },
    }
</script>
