<template>
    <div class="customerEdit">
        <el-card>
            <el-form label-position="right" ref="ruleForm" label-width="130px" :rules="rules" :model="newData">
                <el-form-item prop="INAME" label="合作单位名称">
                    <el-input v-model.trim="newData.INAME" placeholder="合作单位名称"></el-input>
                </el-form-item>

                <el-form-item prop="BANNERIMGURL" label="跳转链接">
                    <el-input v-model.trim="newData.BANNERIMGURL" placeholder="跳转链接"></el-input>
                </el-form-item>
                <template v-if="type==='edit'">
                    <el-form-item label="创建时间">
                        {{newData.CREATEDATE}}
                    </el-form-item>
                </template>
                <el-form-item label="">
                    <el-button @click="$router.back()">取消</el-button>
                    <el-button type="primary" @click="save" :loading="isHttp">确定</el-button>
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
                menuData: [],
                childData: [],
                isHttp: false,
                newData: {
                    INAME: "",
                    XPRICE: "0",
                    ZPRICE: "0",
                    BANNERIMGURL: "",
                    ITYPE: 0, //产品类型0实体产品1虚拟产品
                    PTYPE: "3", //产品大类型1心理课程2心理文章3心理fm
                    IURL: "null",
                    IDIC: "null",
                    ISTOP: 0,
                    IDETAILS: "null",

                },
                rules: {
                    INAME: [
                        {required: true, message: "合作单位名称不能为空", trigger: "blur"},
                    ],
                    BANNERIMGURL: [
                        {required: true, message: "跳转链接不能为空", trigger: "blur"},
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
