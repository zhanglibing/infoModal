<template>
    <el-dialog title="子标签管理" :visible.sync="dialogVisible" :close-on-click-modal="false" @close="hideDialog">
        <el-button type="primary" size="mini" icon="el-icon-plus" @click="add">新增</el-button>
        <el-table :data="data" :stripe="true" size="small" row-key="ID" max-height="400">
            <el-table-column prop="LNO" label="子标签编号" width="130"></el-table-column>
            <el-table-column prop="LNAME" label="子标签名称">
                <template slot-scope="scope">
                    <el-input v-if="scope.row.isEdit||scope.row.isAdd" v-model="scope.row.LNAME" size="mini"></el-input>
                    <span v-else>{{scope.row.LNAME}}</span>
                </template>
            </el-table-column>
            <el-table-column label="操作" width="160">
                <template slot-scope="scope">
                    <template v-if="scope.row.isEdit||scope.row.isAdd">
                        <el-button size="mini" @click="cancel(scope.row)">取消</el-button>
                        <el-button size="mini" type="primary" @click="submit(scope.row)">确定</el-button>
                    </template>
                    <template v-else>
                        <el-button size="mini" type="text" icon="el-icon-delete"
                                   @click="deleteLable(scope.row.ID)"></el-button>
                        <el-divider direction="vertical"></el-divider>
                        <el-button size="mini" type="text" icon="el-icon-edit" @click="edit(scope.row)"></el-button>
                    </template>

                </template>
            </el-table-column>
        </el-table>
        <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="page"
                :page-sizes="[10, 20]"
                :page-size="limit"
                layout="total, prev, pager, next"
                :total="count">
        </el-pagination>
    </el-dialog>
</template>
<script>

    export default {
        props: {
            activeId: {
                type: String,
                required: true,
            }
        },
        data() {
            return {
                dialogVisible: true,
                data: [],
                page: 1,
                limit: 10,
                count: 2,
                lname: '',
            }
        },
        created() {
            this.getList();
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
            hideDialog() {
                this.$emit('hideDialog');
            },
            add() {
                this.data.unshift({
                    isAdd: true,
                    LNAME: '',
                })
            },
            async getList() {
                let params = {
                    page: this.page,
                    limit: this.limit,
                    lname: this.lname,
                    ltid: this.activeId,
                }
                const {data, count} = await this.api.label.getChildLabelList(params);
                this.data = data;
                this.count = count;
            },
            cancel(obj) {
                if (!obj.ID) {
                    this.data.splice(0, 1);
                } else {
                    obj.isEdit = false;
                }
                this.data = [...this.data];
            },
            edit(obj) {
                this.data.forEach(val => {
                    val.isEdit = false;
                })
                obj.isEdit = true;
                this.data = [...this.data];
            },
            submit(params) {
                if (!params.LNAME) {
                    this.message.error('标签名称不能为空');
                    return false;
                }
                const {addChildLabel, updateChildLabel} = this.api.label;
                const {ID = ''} = params;

                const fun = ID ? updateChildLabel : addChildLabel;
                fun({...params, LTYPEID: this.activeId}).then(res => {
                    this.$message.success(`${ID ? '保存成功' : '新增成功'}`);
                    this.getList();
                }).catch(e => {
                    this.$message.error(e);
                })
            },
            deleteLable(id) {
                this.$confirm('确认删除该标签组吗?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.api.label.deleteChildLabel(id).then(res => {
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
        }
    }
</script>

<style lang="scss" scoped>


</style>
