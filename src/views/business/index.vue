<template>
    <div class="classGood">
        <el-card>
            <div class="search-box">
                <label for=""><b>企业名称：</b>
                    <el-input placeholder="请输入" v-model.trim="name" clearable></el-input>
                </label>
                <label for=""><b>审核状态：</b>
                    <el-select v-model="status" clearable>
                        <el-option v-for="item in test_status" :key="item.value" :value="item.value"
                                   :label="item.label"></el-option>
                    </el-select>
                </label>
                <el-button type="primary" icon="el-icon-search" @click="getList">搜索</el-button>
                <el-button type="primary" @click="exportList" icon="el-icon-download">导出excel</el-button>
                <el-button type="primary" @click="add">新增</el-button>
            </div>
            <el-table :data="data"
                      ref="multipleTable"
                      :stripe="true" :size="size">
                <el-table-column prop="id" label="序号" width="50"></el-table-column>
                <el-table-column prop="name" label="单位名称"></el-table-column>
                <el-table-column prop="industry" label="所属行业"></el-table-column>
                <el-table-column prop="modelName" label="信息模型名称"></el-table-column>
                <el-table-column prop="modelIntroduce" label="信息模型介绍"></el-table-column>
                <el-table-column prop="contactName" label="联系人"></el-table-column>
                <el-table-column prop="phone" label="联系电话"></el-table-column>
                <el-table-column prop="status" label="审核状态">
                    <template slot-scope="{row}">
                        {{row.status|filterTest}}
                    </template>
                </el-table-column>
                <el-table-column prop="testDoc" label="测试文档">
                    <template slot-scope="{row:{testDoc,bannerUrl}}">
                        {{testDoc}}
                        <a style="color:#02145F;text-decoration: underline;margin-left: 10px;" v-if="bannerUrl"
                           :href="bannerUrl" target="_blank">点击下载</a>
                    </template>
                </el-table-column>
                <el-table-column prop="user.username" label="创建者"></el-table-column>
                <el-table-column prop="createdAt" label="创建时间"></el-table-column>
                <el-table-column label="操作" width="220">
                    <template slot-scope="scope">
                        <template v-if="scope.row.status==1">
                            <el-button type="text" @click="audit(scope.row.id,2)">审核通过</el-button>
                            <el-divider direction="vertical"></el-divider>
                        </template>
                        <template v-if="scope.row.status==2">
                            <el-button style="color:red;" type="text" @click="audit(scope.row.id,1)">撤销</el-button>
                            <el-divider direction="vertical"></el-divider>
                        </template>
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
    import {test_status} from '@/common/js/constant'

    export default {
        data() {
            return {
                test_status: test_status,
                size: "mini",
                data: [],

                page: 1,
                limit: 10,
                count: 2,
                name: "",
                status: '',
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
                    status: this.status,
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
            audit(id, status = 2) {
                let tip = status == 2 ? '确认审核通过吗？' : '确认撤销通过吗？'
                this.$confirm(tip, "提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning",
                }).then(() => {
                    this.api.business.audit({id, status}).then(res => {
                        this.$message.success("操作成功!");
                        this.getList();
                    }).catch(err => {
                        this.$message.error(err);
                    });
                }).catch(() => {
                });
            },
            exportList() {
                window.open(`${this.$HOST}business/download?name=${this.name}&status=${this.status}`, '_self')
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
