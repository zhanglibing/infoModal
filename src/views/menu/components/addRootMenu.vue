<template>
    <el-dialog :title="`${form.ID?'编辑':'新增'}根菜单`" :visible.sync="dialogVisible"
               :close-on-click-modal="false"
               @close="hideDialog">
        <el-form :model="form" :rules="rules" ref="form" label-position="right" label-width="90px">
            <el-form-item label="菜单名" prop="PNAME">
                <el-input v-model="form.PNAME" placeholder="菜单名称" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="英文名" prop="PURL">
                <el-input v-model.trim="form.PURL" placeholder="菜单英文名,注意不能有空格" autocomplete="off"></el-input>
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
        <!--        <el-form :model="form" :rules="rules" ref="form" label-position="right" label-width="90px">-->
        <!--            <el-form-item label="菜单名" prop="NAME">-->
        <!--                <el-input v-model="form.NAME" placeholder="菜单名称" autocomplete="off"></el-input>-->
        <!--            </el-form-item>-->
        <!--            <el-form-item label="菜单URL" prop="DESCRIPTION">-->
        <!--                <el-input v-model="form.DESCRIPTION" autocomplete="off"></el-input>-->
        <!--            </el-form-item>-->
        <!--            <el-form-item label="菜单状态">-->
        <!--                <el-switch-->
        <!--                        v-model="form.PSTS"-->
        <!--                        :active-value="1"-->
        <!--                        :inactive-value="0"-->
        <!--                        active-text="启用"-->
        <!--                        inactive-text="暂停">-->
        <!--                </el-switch>-->
        <!--            </el-form-item>-->
        <!--        </el-form>-->
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
                    PNAME: "",
                    PURL: "",
                    PLOGOURL: "",
                    PDIS: "",
                    PSTS: 1,

                    // NAME: '',
                    // DESCRIPTION: '测试', //  说明
                    // PARENTCATEGORYID: 0, // 父节点
                    // PICTUREURL: '', //banner
                    // SHOWONHOMEPAGE: false,  //是否在首页显示
                    // INCLUDEINTOPMENU: true, //是否显示在菜单
                    // PUBLISHED: true,
                    // DISPLAYORDER: '', // 排序
                },
                rules: {
                    PNAME: [
                        {required: true, message: "请输入菜单名", trigger: "blur"},
                    ],
                    PURL: [
                        {required: true, message: "请输入菜单URL", trigger: "blur"},
                    ],
                },
            };
        },
        created() {
        },
        methods: {
            hideDialog() {
                this.$emit("hideDialog");
                this.$refs.form.resetFields();
                this.form = {
                    PNAME: "",
                    PURL: "",
                    PLOGOURL: "",
                    PDIS: "",
                    PSTS: 1,
                };
            },
            async addMenu() {
                this.$refs.form.validate((valid) => {
                    if (valid) {
                        const {add, updateCategory, updateMenu, addMenu,} = this.api.menu;
                        let fun = this.form.ID ? updateMenu : addMenu;
                        // let fun = this.form.ID ?updateCategory: add ;
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
                    const {ID} = newValue;
                    if (ID) {
                        this.form = {
                            ...this.from, ...newValue,
                        };
                        console.log(this.from);
                    }
                },
                deep: true,
            },
        },
    };
</script>

<style lang="scss" scoped>


</style>
