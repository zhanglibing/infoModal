<template>
    <div class="classGood">
        <el-card>
            <div class="search-box">
                <el-button type="primary" @click="add">新增</el-button>
            </div>
            <el-table :data="data"
                      ref="multipleTable"
                      :stripe="true" :size="size">
                <el-table-column prop="ID" label="ID"></el-table-column>
                <el-table-column prop="INAME" label="Banner 名称"></el-table-column>
                <el-table-column prop="IDETAILS" label="超链接"></el-table-column>
                <el-table-column prop="BANNERIMGURL" label="缩略图">
                    <template slot-scope="{row}">
                        <el-image
                                style="width: 100px; height: 50px"
                                :src="row.BANNERIMGURL"
                                :preview-src-list="[row.BANNERIMGURL]">
                        </el-image>
                    </template>
                </el-table-column>
                <el-table-column prop="CREATEDATE" label="创建时间"></el-table-column>
                <el-table-column label="操作" width="180">
                    <template slot-scope="{row:{ISSHELF,ID,PSTS}}">
                        <el-button type="text" @click="goDetail(ID)">查看详情</el-button>
                        <el-divider direction="vertical"></el-divider>
                        <el-button type="text" @click="deleteProduct(ID)" style="color:red;">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination_wrapper">
                <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="page"
                        :page-sizes="[10, 20]"
                        :page-size="limit"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="count">
                </el-pagination>
            </div>
        </el-card>
    </div>
</template>
<script>
    import mixin from "../product/mixin";

    export default {
        mixins: [mixin],
        data() {
            return {
                PTYPE: "2", //产品大类型1心理课程2心理文章3心理fm
            };
        },
        methods: {
            goDetail(id) {
                this.$router.push({path: "/admin/banner/edit", query: {id}});
            },
            add() {
                this.$router.push("/admin/banner/add");
            },

        },
        computed: {},

    };
</script>
<style lang="scss" scoped="">

    .search-box {
        margin-bottom: 10px;

        label {
            display: inline-block;
            margin-right: 10px;

            b {
                margin-right: 4px;
            }

        }

        .el-input {
            width: 200px;
        }
    }

    .btn_box {
        margin-bottom: 15px;
    }
</style>
