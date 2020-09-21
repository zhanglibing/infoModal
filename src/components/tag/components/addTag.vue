<template>
    <el-dialog :title="`${form.ID?'编辑':'新增'}标签组`"
               :close-on-click-modal="false"
               :visible.sync="dialogVisible" @close="hideDialog">
        <el-form :model="form" label-position="right" label-width="90px">
            <el-form-item label="标签组名称">
                <el-input v-model="form.LTYPENAME" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="备注">
                <el-input type="textarea" v-model="form.LTYPEDIC" placeholder="备注" autocomplete="off"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="hideDialog">取 消</el-button>
            <el-button type="primary" @click="submit">确 定</el-button>
        </div>
    </el-dialog>
</template>
<script>

    export default {
        props: {
            dialogVisible: {
                type: Boolean,
                default: false,
            },
            editObj: {
                type: Object,
                default: () => {
                    return {};
                }
            },
            type:{
                required:true,
            }
        },
        data() {
            return {
                form: {
                    LTYPENAME: '',
                    // LTTYPE: 2,
                    LTYPEDIC:'',
                }
            }
        },
        methods: {
            hideDialog(isRefresh = false) {
                this.form = {
                    LTYPENAME: '',
                    LTTYPE: this.type,
                    LTYPEDIC:''
                }
                this.$emit('hideDialog', isRefresh);
            },
            submit() {
                const {LTYPENAME, ID = ""} = this.form;
                if (!LTYPENAME) {
                    this.$message.error("标签组名称不能为空");
                    return;
                }
                const {addLabel, updateLabel} = this.api.label;
                const fun = ID ? updateLabel : addLabel;
                fun({...this.form, LTTYPE: this.type}).then(res => {
                    this.$message.success(`${ID ? "保存成功" : "新增成功"}`);
                    this.hideDialog(true);
                }).catch(e => {
                    this.$message.error(e);
                });
            },
        },
        watch: {
            editObj: {
                handler: function (newVal, oldVal) {
                    this.form = {
                        ...this.form,
                        ...newVal
                    }
                },
                deep: true,
            }
        }
    }
</script>

<style lang="scss" scoped>


</style>
