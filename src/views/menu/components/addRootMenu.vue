<template>
    <el-dialog :title="`${form.ID?'编辑':'新增'}根菜单`" :visible.sync="dialogVisible"
               :close-on-click-modal="false"
               @close="hideDialog">
        <el-form :model="form" :rules="rules" ref="form" label-position="right" label-width="120px">
            <el-form-item label="菜单名" prop="name">
                <el-input v-model="form.name" placeholder="菜单名称" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="英文名" prop="PURL">
                <el-input :disabled="form.url=='unit'" v-model.trim="form.url" placeholder="菜单英文名,注意不能有空格"
                          autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="显示顺序" prop="sort">
                <el-input-number v-model="form.sort" :min="0" :max="1000"
                                 label="显示顺序"></el-input-number>
            </el-form-item>
            <el-form-item label="首页是否展示">
                <el-switch
                        v-model="form.showType"
                        :active-value="1"
                        :inactive-value="0"
                        active-text="展示"
                        inactive-text="不展示">
                </el-switch>
            </el-form-item>
            <el-form-item v-if="form.showType==1" label="首页入口方法">
                <el-switch
                        v-model="form.listShowMore"
                        :active-value="true"
                        :inactive-value="false"
                        active-text="首页列表更多入口"
                        inactive-text="正常入口">
                </el-switch>
            </el-form-item>
            <el-form-item label="是否在导航栏展示">
                <el-switch
                        v-model="form.status"
                        :active-value="true"
                        :inactive-value="false"
                        active-text="展示"
                        inactive-text="不展示">
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
            dialogVisible: {
                type: Boolean,
                default: false,
            },
            data: {
                type: Object,
                default: () => {
                    return {};
                },
            },
        },
        data() {
            return {
                form: {
                    name: "",
                    url: "",
                    bannerUrl: "",
                    showType: "0", //是否在首页展示
                    status: true, //是否启用
                    sort: 0,
                    listShowMore: false,
                },
                rules: {
                    name: [
                        {required: true, message: "请输入菜单名", trigger: "blur"},
                    ],
                    url: [
                        {required: true, message: "请输入菜单URL", trigger: "blur"},
                    ],
                },
            };
        },
        created() {
            const {menus = [], ...other} = this.data;
            this.form = {
                ...this.form,
                ...other,
            };
        },
        methods: {
            hideDialog() {
                this.$emit("hideDialog");
                this.$refs.form.resetFields();
                this.form = {
                    name: "",
                    url: "",
                    bannerUrl: "",
                    showType: "0",
                    status: 1,
                };
            },
            async addMenu() {
                this.$refs.form.validate((valid) => {
                    if (valid) {
                        const {update, add} = this.api.menu;
                        let fun = this.form.id ? update : add;
                        fun({...this.form}).then(res => {
                            this.$message.success("操作成功");
                            this.$emit("hideDialog", true);
                        });
                    } else {
                        return false;
                    }
                });

            },
        },
        watch: {
            data: {
                handler(newValue, oldValue) {
                    const {id} = newValue;
                    if (id) {
                        this.form = {
                            ...this.form,
                            ...newValue,
                        };
                    }
                },
                deep: true,
            },
        },
    };
</script>

<style lang="scss" scoped>


</style>
