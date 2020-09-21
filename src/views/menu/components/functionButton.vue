<template>
    <div>
        <el-card class="box-card" shadow="hover">
            <div slot="header" class="clearfix">
                <span>功能按钮列表</span>
                <el-button style="float: right; padding: 3px 0" type="text" @click="dialogVisible=true" :disabled="!isEdit">新增</el-button>
            </div>
            <el-table :data="list" :stripe="true" size="small">
                <el-table-column prop="BNO" label="功能ID"></el-table-column>
                <el-table-column prop="BNAME" label="功能名称"></el-table-column>
                <el-table-column prop="BDIC" label="备注"></el-table-column>
                <el-table-column label="操作" width="140">
                    <template slot-scope="scope">
                        <el-button type="text" style="color:red" @click="deleteFunction(scope.row.ID)" :disabled="!isEdit">删除</el-button>
                        <el-divider direction="vertical"></el-divider>
                        <el-button type="text" @click="editClick(scope.row)">查看详情</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
        <el-dialog :title="`${form.ID?'编辑':'新增'}功能按钮`"
                   :visible.sync="dialogVisible"
                   :close-on-click-modal="false"
                   @closed="hideDialog">
            <el-form v-if="dialogVisible" :model="form" ref="form" label-position="right" :rules="rules" label-width="80px">
                <el-form-item label="功能名称" prop="BNAME">
                    <el-input v-model="form.BNAME" placeholder="功能名称" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="功能ID" prop="BNO">
                    <el-input v-model="form.BNO" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="备注">
                    <el-input type="textarea" v-model="form.BDIC" placeholder="备注" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="hideDialog">取 消</el-button>
                <el-button type="primary" @click="addBtnModel" :disabled="!isEdit">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
    export default {
        props: {
           midType: {
                type: String,
                required: true,
            },
            pId: {
                type: String,
                required: true,
            }
        },
        data() {
            return {
                list: [],
                dialogVisible: false,
                form: {
                    BNAME: '',
                    BNO: '',
                    DBIC: '',
                },
                rules: {
                    BNAME: [
                        {required: true, message: '请输入功能名称', trigger: 'blur'},
                    ],
                    BNO: [
                        {required: true, message: '请输入功能ID', trigger: 'blur'},
                    ],
                },
                isEdit:this.$store.state.userInfo.ULOGINNAME=='13620676550',

            }
        },
        created() {
            this.getBtnModelByPid();
        },
        methods: {
            async getBtnModelByPid() {
                try {
                    this.list = await this.api.menu.getBtnModelByPid({pId:this.pId,midType:this.midTypes});
                } catch (e) {
                    this.$message.error(e);
                }

            },
            hideDialog() {
                this.dialogVisible = false;
                this.form = {
                    BNAME: '',
                    BNO: '',
                    DBIC: '',
                }
            },
            deleteFunction(id) {
                this.$confirm('确认删除该功能吗?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.api.menu.deleteBtnModel({btnId:id,midType:this.midType}).then(res => {
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                        this.getBtnModelByPid();
                    }).catch(err => {
                        this.$message.error(err)
                    })

                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            editClick(obj) {
                this.dialogVisible = true;
                this.form = {...obj};
            },
            // 新增菜单功能
            async addBtnModel() {
                this.$refs.form.validate((valid) => {
                    if (valid) {
                        let fun = this.form.ID ? this.api.menu.updateBtnModel : this.api.menu.addBtnModel;
                        let params = {
                            ...this.form,
                            midType:this.midType
                        }
                        if (!this.form.ID) {
                            params.pId = this.pId;

                        }
                        fun(params).then(res => {
                            this.$message.success('操作成功');
                            this.getBtnModelByPid();
                            this.hideDialog();
                        }).catch(e => {
                            this.$message.error(e);
                        })
                    } else {
                        return false;
                    }
                });
            }
        },
        watch: {
            pId() {
                this.getBtnModelByPid()
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>
