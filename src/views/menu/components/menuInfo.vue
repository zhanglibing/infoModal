<template>
    <el-card class="box-card" shadow="hover">
        <div slot="header" class="clearfix">
            <span>{{data.PLVL==1?'一级':'二级'}}菜单详细信息</span>
        </div>
        <el-form label-position="right" label-width="90px" v-if="data.ID">
            <el-form-item label="菜单名：">{{data.PNAME}}</el-form-item>
            <el-form-item label="菜单URL：">{{data.PURL}}</el-form-item>
            <el-form-item label="菜单状态：">{{data.PSTS=='1'?'启用':'暂停'}}</el-form-item>
            <el-form-item label="banner：" v-if="data.PLVL>1">
                <el-image
                        style="width: 100px; height: 50px"
                        :src="data.PLOGOURL"
                        :preview-src-list="[data.PLOGOURL]">
                </el-image>
            </el-form-item>
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
        created() {
            console.log(this.data)
        }
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
