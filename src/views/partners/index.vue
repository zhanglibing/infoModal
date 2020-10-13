<template>
    <div class="classGood">
        <el-card>
            <div class="search-box">
                <label for=""><b>合作单位：</b>
                    <el-input placeholder="请输入" v-model.trim="title" clearable></el-input>
                </label>
                <el-button type="primary" icon="el-icon-search" @click="getList">搜索</el-button>
                <el-button type="primary" @click="add">新增</el-button>
            </div>
            <el-table :data="data"
                      ref="multipleTable"
                      :stripe="true" :size="size">
                <el-table-column prop="id" label="ID"></el-table-column>
                <el-table-column prop="title" label="合作单位名称"></el-table-column>
                <el-table-column prop="bannerUrl" label="跳转链接"></el-table-column>
                <el-table-column prop="createAt" label="创建时间"></el-table-column>
                <el-table-column label="操作" width="200">
                    <template slot-scope="scope">
                        <el-button type="text" @click="goDetail(scope.row.id)">查看详情</el-button>
                        <el-divider direction="vertical"></el-divider>
                        <el-button type="text" @click="deleteProduct(scope.row.id)" style="color:red;">删除</el-button>
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
    import mixin from "./mixin";

    export default {
        mixins: [mixin],
        data() {
            return {
                PTYPE: "1", //产品大类型1心理课程2心理文章3心理fm
            };
        },
        methods: {
            goDetail(id) {
                this.$router.push({path: "/admin/partners/edit", query: {id}});
            },
            add() {
                this.$router.push("/admin/partners/add");
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
