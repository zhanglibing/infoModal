<template>
    <div class="classGood">
        <div class="search-box">
            <label for=""><b>标签组：</b>
                <el-input placeholder="请输入标签组" v-model.trim="lname" clearable></el-input>
            </label>
            <el-button type="primary" icon="el-icon-search" @click="getList">搜索</el-button>
        </div>
        <div class="btn_box">
            <el-button size="mini" icon="el-icon-plus" type="primary" @click="addDialogVisible=true">添加</el-button>
        </div>
        <el-table :data="data" :stripe="true" :size="size">
            <el-table-column prop="LTYPENO" label="标签组编号"></el-table-column>
            <el-table-column prop="LTYPENAME" label="标签组名称"></el-table-column>
            <el-table-column prop="LTYPEDIC" label="描述"></el-table-column>
            <el-table-column prop="CNAME" label="创建人"></el-table-column>
            <el-table-column prop="CREATETIME" label="创建时间"></el-table-column>
            <el-table-column label="操作" width="220">
                <template slot-scope="scope">
                    <el-button type="text" @click="deleteLabel(scope.row.ID)">删除</el-button>
                    <el-divider direction="vertical"></el-divider>
                    <el-button type="text" @click="edit(scope.row)">查看详情</el-button>
                    <el-divider direction="vertical"></el-divider>
                    <el-button type="text" @click="editChildTag(scope.row.ID)">子标签管理</el-button>
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
        <add-tag :dialogVisible="addDialogVisible" :type="type" :editObj="editObj" @hideDialog="hideDialog"></add-tag>
        <child-tag v-if="activeId" :activeId="activeId" @hideDialog="hideDialog"></child-tag>
    </div>
</template>
<script>
    import addTag from './components/addTag';
    import childTag from './components/childTag';

    export default {
        props: {
            type: {
                default: '1',
            }
        },
        components: {
            addTag,
            childTag,
        },
        data() {
            return {
                size: 'mini',
                addDialogVisible: false,
                data: [],
                page: 1,
                limit: 10,
                count: 2,
                lname: '',
                editObj: {},
                activeId: '',
            }
        },
        created() {
            this.getList()
        },
        methods: {
            handleSizeChange(val) {
                this.limit = val;
                this.getList()
            },
            handleCurrentChange(val) {
                this.page = val;
                this.getList();
            },
            hideDialog(refresh = false) {
                this.addDialogVisible = false;
                this.editObj = {};
                this.activeId = '';
                if (refresh) {
                    this.getList();
                }
            },
            async getList() {
                let params = {
                    page: this.page,
                    limit: this.limit,
                    lname: this.lname,
                    lttype: this.type,

                }
                const {data, count} = await this.api.label.getLabelList(params);
                this.data = data;
                this.count = count;
            },

            deleteLabel(id) {
                this.$confirm('确认删除该标签组吗?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.api.label.deleteLabel(id).then(res => {
                        this.$message.success('删除成功!');
                        this.getList();
                    })

                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            edit(obj) {
                this.editObj = obj;
                this.addDialogVisible = true;
            },
            editChildTag(id) {
                this.activeId = id;
            }

        },
        computed: {}

    }
</script>
<style lang="scss" scoped="">

    .search-box {
        margin-bottom: 15px;

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
