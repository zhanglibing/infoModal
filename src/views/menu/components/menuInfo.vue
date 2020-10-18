<template>
    <el-card class="box-card" shadow="hover" v-if="data.id">
        <div slot="header" class="clearfix">
            <span>{{data.parentId==0?"一级":"二级"}}菜单详细信息</span>
        </div>
        <el-form label-position="right" label-width="110px" v-if="data.id">
            <el-form-item label="菜单名：">{{data.name}}</el-form-item>
            <el-form-item label="英文名：">{{data.url}}</el-form-item>
            <el-form-item label="是否在导航栏展示：" v-if="data.parentId==0">{{data.status?"展示":"不展示"}}</el-form-item>
            <el-form-item label="启用状态：" v-else>{{data.status?"启用":"禁用"}}</el-form-item>
            <el-form-item label="banner：" v-if="data.parentId!==0">
                <el-image
                        style="width: 100px; height: 50px"
                        :src="data.bannerUrl"
                        :preview-src-list="[data.bannerUrl]">
                </el-image>
            </el-form-item>
            <el-form-item label="首页是否展示：" v-if="data.parentId==0">
                {{data.showType==1?"展示":"不展示"}}
            </el-form-item>
            <el-form-item label="显示顺序：">
                {{data.sort}}
            </el-form-item>
            <el-form-item label="展示类型" v-if="data.parentId!=0">
                {{data.showType==0?'列表':'详情'}}
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
                },
            },
        },
        created() {
            console.log(this.data);
        },
    };
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
