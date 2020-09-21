<template>
    <div class="customerEdit">
        <el-card>
            <el-form label-position="right" ref="ruleForm" label-width="130px" :rules="rules" :model="newData">
                <el-form-item prop="INAME" label="文章标题">
                    <el-input v-model.trim="newData.INAME" placeholder="文章标题"></el-input>
                </el-form-item>
                <el-form-item prop="XPRICE" label="C端展示现价">
                    <el-input type="number" v-model.trim="newData.XPRICE" placeholder="现价">
                        <template slot="append">元</template>
                    </el-input>
                </el-form-item>
                <el-form-item prop="ZPRICE" label="C端展示原价">
                    <el-input type="number" v-model.trim="newData.ZPRICE" placeholder="原价">
                        <template slot="append">元</template>
                    </el-input>
                </el-form-item>
                <el-form-item prop="BANNERIMGURL" label="banner展示图片">
                    <bannerUpload :imgPath="newData.BANNERIMGURL" @getImgUrl="getImgUrl"></bannerUpload>
                </el-form-item>
                <el-form-item label="产品类型：">
                    虚拟产品
                </el-form-item>
                <el-form-item prop="IDIC" label="文章描述">
                    <el-input type="textarea" v-model.trim="newData.IDIC" placeholder="文章描述"></el-input>
                </el-form-item>
                <el-form-item prop="IDETAILS" label="文章详情">
                    <editor ref="editor" :msg="newData.IDETAILS"></editor>
                </el-form-item>
                <template v-if="type==='edit'">
                    <el-form-item label="来源">
                        {{newData.IFROM||'幸福谋方'}}
                    </el-form-item>
                    <el-form-item label="是否置顶">
                        <el-switch
                                v-model="newData.ISTOP"
                                :active-value="1"
                                :inactive-value="0">
                        </el-switch>
                    </el-form-item>
                    <el-form-item label="浏览人次">
                        <el-input v-model.trim="newData.VISCOUNT" placeholder="浏览人次"></el-input>
                    </el-form-item>
                    <el-form-item label="评论人次">
                        <el-input v-model.trim="newData.COMTCOUNT" placeholder="评论人次"></el-input>
                    </el-form-item>
                    <el-form-item label="购买人次">
                        <el-input v-model.trim="newData.BUYCOUNT" placeholder="购买人次"></el-input>
                    </el-form-item>
                    <el-form-item label="收藏人次">
                        <el-input v-model.trim="newData.COLLCOUNT" placeholder="收藏人次"></el-input>
                    </el-form-item>
                    <el-form-item label="审核状态">
                        <el-tag :type="newData.PSTS|filterTag">{{newData.PSTS|filterStatus}}</el-tag>
                        <div v-if="newData.PSTS==3">
                            不通过原因：{{newData.AUINFO}}
                        </div>
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
                        {required: true, message: '文章标题不能为空', trigger: 'blur'}
                    ],
                    XPRICE: [
                        {required: true, message: '现价不能为空', trigger: 'blur'}
                    ],
                    ZPRICE: [
                        {required: true, message: '原价不能为空', trigger: 'blur'}
                    ],
                    BANNERIMGURL: [
                        {required: true, message: 'banner不能为空', trigger: 'blur'}
                    ],
                    IDIC: [
                        {required: true, message: '描述不能为空', trigger: 'blur'}
                    ],
                    IDETAILS: [
                        {required: true, message: '详情不能为空', trigger: 'blur'}
                    ],
                },
            }
        },
    }
</script>
