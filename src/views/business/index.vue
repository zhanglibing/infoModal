<template>
    <div class="classGood">
        <el-card>
            <div class="search-box">
                <label for=""><b>企业名称：</b>
                    <el-input placeholder="请输入" v-model.trim="name" clearable></el-input>
                </label>
                <el-button type="primary" icon="el-icon-search" @click="getList">搜索</el-button>
                <el-button type="primary" @click="add">新增</el-button>
            </div>
            <el-table :data="data"
                      ref="multipleTable"
                      :stripe="true" :size="size">
                <el-table-column prop="id" label="序号"></el-table-column>
                <el-table-column prop="name" label="企业名称"></el-table-column>
                <el-table-column prop="modelName" label="模型名称"></el-table-column>
                <el-table-column prop="testDoc" label="测试文档"></el-table-column>
                <el-table-column prop="hasTset" label="已测试项"></el-table-column>
                <el-table-column prop="user.username" label="创建者"></el-table-column>
                <el-table-column prop="createdAt" label="创建时间"></el-table-column>
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

    export default {
        data() {
            return {
                size: "mini",
                data: [],

                page: 1,
                limit: 10,
                count: 2,
                name: "",
            };
        },
        created() {
            this.getList();
        },
        methods: {
            handleSizeChange(val) {
                this.limit = val;
                this.getList();
            },
            handleCurrentChange(val) {
                this.page = val;
                this.getList();
            },
            async getList() {
                let params = {
                    page: this.page,
                    pageSize: this.limit,
                    name: this.name,
                };
                const {count, rows} = await this.api.business.getList(params);
                this.data = rows;
                this.count = count;
            },
            deleteProduct(id) {
                this.$confirm("确认删除该产品?", "提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning",
                }).then(() => {
                    this.api.business.deleteContent({id}).then(res => {
                        this.$message.success("删除成功!");
                        this.getList();
                    }).catch(err => {
                        this.$message.error(err);
                    });
                }).catch(() => {
                });
            },
            goDetail(id) {
                this.$router.push({path: "/admin/business/edit", query: {id}});
            },
            add() {
                this.$router.push("/admin/business/add");
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
