<template>
    <el-card class="box-card" shadow="hover">
        <div slot="header" class="clearfix">
            <span>菜单详细信息</span>
        </div>
        <el-form label-position="right" label-width="90px" v-if="data.ID">
            <el-form-item label="菜单名：">{{data.PNAME}}</el-form-item>
            <el-form-item label="菜单状态：">{{data.PSTS=='1'?'启用':'暂停'}}</el-form-item>
            <!--            <el-form-item label="菜单ID：">{{data.ID}}</el-form-item>-->
            <el-form-item label="菜单描述：">{{data.PDIS}}</el-form-item>
            <el-form-item label="菜单图标：">{{data.PLOGOURL}}</el-form-item>
            <el-form-item label="菜单URL：">{{data.PURL}}</el-form-item>
        </el-form>
    </el-card>
</template>
<script>
    export default {
        props: {
            data: {
                type: Object,
                default: () => {
                    return {};
                }
            }
        },
    }
</script>

<style lang="scss" scoped>

    .el-card {
        margin-bottom: 15px;

    }

    .el-form {
        display: flex;
        flex-wrap: wrap;

        .el-form-item {
            width: 45%;
            margin-bottom: 0;
        }
    }

</style>
