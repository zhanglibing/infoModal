<template>
    <div class="customer">
        <el-card class="search-box">
            <label for=""><b>登录账号</b>
                <el-input placeholder="请输入登录账号" v-model.trim="username" clearable></el-input>
            </label>
            <label for=""><b>用户昵称</b>
                <el-input placeholder="请输入用户昵称" v-model.trim="nickname" clearable></el-input>
            </label>
            <el-button type="primary" icon="el-icon-search" @click="getList">搜索</el-button>
            <el-button type="primary" icon="el-icon-plus" @click="addCustomer">添加账户</el-button>
        </el-card>
        <el-card>
            <el-table :data="tableData" border style="width: 100%"
                      v-loading="loading"
                      element-loading-text="拼命加载中"
                      element-loading-spinner="el-icon-loading"
                      element-loading-background="rgba(0, 0, 0, 0.8)"
                      size="small"
                      :stripe="true">
                <el-table-column prop="username" label="登录账号" min-width="120"></el-table-column>
                <el-table-column prop="realname" label="真实姓名" min-width="120"></el-table-column>
                <el-table-column prop="nickname" label="昵称" min-width="120"></el-table-column>
                <el-table-column prop="isSystemUser" label="角色" min-width="120">
                    <template slot-scope="{row}">
                        <el-tag :type="row.isSystemUser?'success':'danger'">{{row.isSystemUser?"内部人员":"外部人员"}}</el-tag>

                    </template>
                </el-table-column>
                <el-table-column prop="sex" label="性别" min-width="120">
                    <template slot-scope="{row:{sex}}">
                        {{sex?sex=="M"?"男":"女":"未知"}}
                    </template>
                </el-table-column>
                <el-table-column label="已启用" min-width="65">
                    <template slot-scope="scope">
                        <i class="el-icon-success" v-if="scope.row.isActive" style="color: green;font-size:18px;"></i>
                        <i class="el-icon-error" v-else="" style="color: red;font-size:18px;"></i>
                    </template>
                </el-table-column>
                <el-table-column label="创建日期" min-width="140">
                    <template slot-scope="scope">
                        <i class="el-icon-time"></i>
                        <span>{{scope.row.createdAt}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="190">
                    <template slot-scope="scope">
                        <el-button type="info" size="mini" icon="el-icon-edit-outline" @click="editClick(scope.row.id)">
                            编辑
                        </el-button>
                        <el-button :disabled="scope.row.username=='admin'" type="danger" size="mini" icon="el-icon-delete" @click="deleteCus(scope.row.id)">删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="block">
                <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="page"
                        :page-sizes="[10, 20]"
                        :page-size="pageSize"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="total">
                </el-pagination>
                <el-button icon="el-icon-refresh" class="refresh" @click="getList"></el-button>
            </div>
        </el-card>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                loading: true,
                username: "",
                nickname: "",
                roleList: [],
                tableData: [],
                page: 1,
                pageSize: 10,
                total: 0,
            };
        },
        created() {
            this.getList();
            // this.$store.dispatch('getRoles')
        },
        methods: {
            handleSizeChange(val) {
                this.pageSize = val;
                this.getList();
            },
            handleCurrentChange(val) {
                this.page = val;
                this.getList();
            },
            //获取列表
            async getList() {
                this.loading = true;
                let option = {
                    page: this.page,
                    pageSize: this.pageSize,
                    username: this.username,
                    nickname: this.nickname,
                };
                let {rows, count} = await this.api.user.getUserList(option);
                this.loading = false;
                this.tableData = rows;
                this.total = count;
            },
            //删除用户
            deleteCus(id) {
                this.$confirm("确认删除该用户吗?", "提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning",
                }).then(() => {
                    this.api.user.deleteUserById(id).then(res => {
                        this.$message.success("删除成功");
                        this.getList();
                    });
                });

            },
            //客户编辑
            editClick(id) {
                this.$router.push({path: "/admin/customer/edit", query: {type: "edit", id: id}});
            },
            //新增客户
            addCustomer() {
                this.$router.push({path: "/admin/customer/edit", query: {type: "add"}});
            },
        },
    };
</script>
<style lang="scss" scoped="">
    .top {
        position: relative;

        button {
            position: absolute;
            top: 5px;
            right: 30px;
        }
    }

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


</style>
