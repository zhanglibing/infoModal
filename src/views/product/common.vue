<template>
    <div class="customerEdit">
        <el-card>
            <el-form label-position="right" ref="ruleForm" label-width="130px" :rules="rules" :model="newData">
                <el-form-item prop="title" label="标题">
                    <el-input v-model.trim="newData.title" placeholder="标题"></el-input>
                </el-form-item>

                <el-form-item prop="content" label="内容">
                    <editor ref="editor" :msg="newData.content"></editor>
                </el-form-item>
                <el-form-item prop="testDoc" label="文件上传">
                    <div class="testDoc">
                        <span v-if="newData.content1">{{newData.content1}}</span>
                        <uploadFile @getImgUrl="getImgUrl" style="margin-right: 10px;"></uploadFile>
                        <el-button v-if="newData.content2" @click="uploadFileByUrl">下载</el-button>
                    </div>
                </el-form-item>
                <el-form-item prop="IDETAILS" @change="rootChange" label="关联一级菜单">
                    <el-select @change="rootChange" v-model="rootId">
                        <el-option v-for="item in menuData" :key="item.id" :value="item.id"
                                   :label="item.name">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop="categoryId" label="关联二级菜单">
                    <el-select v-model="newData.categoryId">
                        <el-option v-for="item in childData" :key="item.id" :value="item.id"
                                   :label="item.name"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="创建时间" v-if="newData.ID">
                    {{newData.createdAt}}
                </el-form-item>
                <el-form-item label="">
                    <el-button @click="$router.back()">取消</el-button>
                    <el-button type="primary" @click="save" :loading="isHttp">确定</el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>
<script>
    import editor from "@/components/editor/editor";
    import uploadFile from "@/components/uploadFile";

    export default {
        components: {
            uploadFile,
            editor,
        },
        props: {
            type: {
                type: String,
                default: "add",
            },
        },
        data() {
            return {
                isHttp: false,
                id: this.$route.query.id,
                menuData: [],
                childData: [],
                newData: {
                    type: 3,
                    title: "",
                    content: "",
                    categoryId: "",
                    content1: '',
                    content2: '',
                },
                rules: {
                    title: [
                        {required: true, message: "标题不能为空", trigger: "blur"},
                    ],
                    content: [
                        {required: true, message: "内容不能为空", trigger: "blur"},
                    ],
                    categoryId: [
                        {required: true, message: "请选择二级菜单", trigger: "change"},
                    ],
                },
                rootId: "",
            };
        },
        created() {
            this.getMenus();

        },
        methods: {
            getImgUrl({url, name}) {
                this.newData.content1 = name;
                this.newData.content2 = url;
            },
            uploadFileByUrl() {
                window.open(this.newData.content2, '_self')
            },
            //获取菜单
            async getMenus() {
                let data = await this.api.menu.getList({});
                this.menuData = data;
                if (this.type === "edit") {
                    this.getProduct();
                }
            },
            rootChange() {
                const data = this.menuData.find(v => v.id == this.rootId);
                this.childData = data.menus;
            },
            // 获取产品详情
            async getProduct() {
                try {
                    this.newData = await this.api.content.detail({id: this.id});
                    this.init();
                } catch (e) {
                    this.$message.error(e);
                }
            },
            init() {
                const {categoryId} = this.newData;
                this.menuData.some(v => {
                    if (v.menus.some(val => val.id == categoryId)) {
                        this.rootId = v.id;
                        this.rootChange();
                        this.newData.categoryId = Number(categoryId);
                        return true;
                    }
                });
            },
            //保存产品信息
            save() {
                this.newData.content = this.$refs.editor.getUEContent();
                this.$refs.ruleForm.validate((valid) => {
                    if (valid) {
                        this.isHttp = true;
                        const {add, update} = this.api.content;
                        const fun = this.type === "add" ? add : update;
                        fun(this.newData).then(res => {
                            this.isHttp = false;
                            this.$message.success(`${this.type === "add" ? "新增" : "更新"}成功`);
                            this.$router.back();
                        }).catch(res => {
                            this.isHttp = false;
                            this.$message.error(res);
                        });
                    } else {
                        return false;
                    }
                });

            },
            getVideoInfo(url) {
                this.newData.bannerUrl = url;
            },
        },


    };
</script>
<style lang="scss" scoped="">

    .el-select, .el-textarea, .el-input {
        width: 600px;

    }

    .testDoc {
        display: flex;
        align-items: center;

        button {
            margin-right: 15px;
        }

        span {
            margin-right: 15px;
        }
    }


</style>
