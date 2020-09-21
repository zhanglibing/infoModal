<template>
    <el-dialog :title="`${form.ID?'编辑':'新增'}下级菜单`" :visible.sync="dialogVisible"
               :close-on-click-modal="false"
               @close="hideDialog">
        <el-form :model="form" ref="form" :rules="rules" label-position="right" label-width="90px">
            <el-form-item label="菜单名" prop="PNAME">
                <el-input v-model="form.PNAME" placeholder="菜单名称" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="菜单URL" prop="PURL">
                <el-input v-model="form.PURL" placeholder="菜单URL" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="菜单图标">
                <el-input v-model="form.PLOGOURL" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="菜单描述">
                <el-input type="textarea" v-model="form.PDIS" placeholder="菜单描述" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="菜单状态">
                <el-switch
                        v-model="form.PSTS"
                        :active-value="1"
                        :inactive-value="0"
                        active-text="启用"
                        inactive-text="暂停">
                </el-switch>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="hideDialog">取 消</el-button>
            <el-button type="primary" @click="addMenu">确 定</el-button>
        </div>
    </el-dialog>
</template>
<script>

    export default {
        
        props: {
             midType: {
                type: String,
                required: true,
            },
            dialogVisible: {
                type: Boolean,
                default: false,
            },
            PPID: {
                type: String,
                default: '',
            },
            data: {
                type: Object,
                default: () => {
                    return {};
                },
            }
        },
        data() {
            return {
                form: {
                    PNAME: '',
                    PURL: '',
                    PLOGOURL: '',
                    PDIS: '',
                    PSTS: 1
                },
                rules: {
                    PNAME: [
                        {required: true, message: '请输入菜单名', trigger: 'blur'},
                    ],
                    PURL: [
                        {required: true, message: '请输入菜单URL', trigger: 'blur'},
                    ],
                }
            }
        },
        methods: {
            hideDialog() {
                this.$emit('hideDialog');
                this.$refs.form.resetFields();
                this.form = {
                    PNAME: '',
                    PURL: '',
                    PLOGOURL: '',
                    PDIS: '',
                    PSTS: 1
                }
            },
            async addMenu() {
                this.$refs.form.validate((valid) => {
                    if (valid) {
                        let params = {
                            ...this.form,
                            midType:this.midType,
                        }
                        // 新增和编辑有错位
                        if (!params.PPID) {
                            params.PPID = this.PPID;
                        }
                        let fun = this.form.ID ? this.api.menu.updateMenu : this.api.menu.addMenu;
                        fun(params).then(res => {
                            this.$message.success('操作成功');
                            this.$emit('hideDialog', true);
                        })
                    } else {
                        return false;
                    }
                });

            }
        },
        watch: {
            data: {
                handler(newValue, oldValue) {
                    const {ID} = newValue;
                    if (ID) {
                        this.form = {...this.form, ...newValue};
                    }
                },
                deep: true
            }
        }
    }
</script>

<style lang="scss" scoped>


</style>
