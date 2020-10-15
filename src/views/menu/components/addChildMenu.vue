<template>
    <el-dialog :title="`${form.ID?'编辑':'新增'}下级菜单`" :visible.sync="dialogVisible"
               :close-on-click-modal="false"
               @close="hideDialog">
        <el-form :model="form" ref="form" :rules="rules" label-position="right" label-width="90px">
            <el-form-item label="菜单名" prop="name">
                <el-input v-model="form.name" placeholder="菜单名称" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="英文名" prop="url">
                <el-input v-model.trim="form.url" placeholder="菜单英文名,注意不能有空格" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="显示顺序" prop="sort">
                <el-input-number v-model="form.sort" :min="0" :max="1000"
                                 label="显示顺序"></el-input-number>
            </el-form-item>
            <el-form-item label="展示类型">
                <el-switch
                        v-model="form.showType"
                        :active-value="0"
                        :inactive-value="1"
                        active-text="列表"
                        inactive-text="详情">
                </el-switch>
            </el-form-item>
            <el-form-item label="关联内容ID" prop="contentId" v-if="form.showType==1">
                <el-input v-model.trim="form.contentId" placeholder="关联内容ID" autocomplete="off"></el-input>
                <p style="color:red;">如果填写了关联内容ID，则直接跳转对应的内容详情否则将查找对应列表的第一个内容作为展示</p>
            </el-form-item>
            <el-form-item label="banner">
                <bannerUpload :imgPath="form.bannerUrl" @getImgUrl="getImgUrl"></bannerUpload>
            </el-form-item>
            <el-form-item label="菜单状态">
                <el-switch
                        v-model="form.status"
                        :active-value="true"
                        :inactive-value="false"
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
    import bannerUpload from "@/components/bannerUpload";

    export default {
        components: {
            bannerUpload,
        },
        props: {
            dialogVisible: {
                type: Boolean,
                default: false,
            },
            PPID: {
                type: String,
                default: "",
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
                    contentId: "",
                    status: true,
                    showType: 0,
                    sort: 0,
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
            this.form = {
                ...this.form,
                ...this.data,
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
                    showType: "",
                    status: 1,
                    sort: 0,
                };
            },
            async addMenu() {
                this.$refs.form.validate((valid) => {
                    if (valid) {
                        let params = {
                            ...this.form,
                        };
                        // 新增和编辑有错位
                        if (!params.parentId) {
                            params.parentId = this.PPID;
                        }
                        let fun = this.form.id ? this.api.menu.update : this.api.menu.add;
                        fun(params).then(res => {
                            this.$message.success("操作成功");
                            this.$emit("hideDialog", true);
                        });
                    } else {
                        return false;
                    }
                });

            },
            getImgUrl(url) {
                this.form.bannerUrl = url;
            },
        },
        watch: {
            data: {
                handler(newValue, oldValue) {
                    const {id} = newValue;
                    if (id) {
                        this.form = {...this.form, ...newValue};
                    }
                },
                deep: true,
            },
        },
    };
</script>

<style lang="scss" scoped>


</style>
