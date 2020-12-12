<template>
    <div class="customerEdit">
        <el-card>
            <el-form label-position="right" ref="ruleForm" label-width="130px" :rules="newData.isLink?rules1:rules"
                     :model="newData">
                <el-form-item prop="title" label="标题">
                    <el-input v-model.trim="newData.title" placeholder="标题"></el-input>
                </el-form-item>
                <el-form-item prop="isLink" label="是否有外链">
                    <el-checkbox v-model="newData.isLink">跳转链接</el-checkbox>
                    <!--                    <p style="color:red;">勾选后,跳转到指定链接</p>-->
                </el-form-item>
                <template v-if="newData.isLink">
                    <el-form-item prop="link" label="链接地址">
                        <el-input v-model.trim="newData.link" placeholder="链接地址"></el-input>
                    </el-form-item>
                </template>
                <template v-else>
                    <el-form-item prop="isIntroduction" label="是否需要摘要">
                        <el-checkbox v-model="newData.isIntroduction">需要摘要</el-checkbox>
                        <p style="color:red;">勾选后,首页展示模块会显示摘要</p>
                    </el-form-item>
                    <el-form-item prop="introduce" label="摘要" v-if="newData.isIntroduction">
                        <el-input type="textarea" style="width:100%;" v-model.trim="newData.introduce" placeholder="摘要"></el-input>
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
                </template>

                <el-form-item prop="orderby" label="显示顺序权重:">
                    <el-input-number v-model="newData.orderby" :min="0" :max="100000"
                                     label="显示顺序权重"></el-input-number>
                    <p style="color:red">权重越高，排序越靠前</p>
                </el-form-item>
                <el-form-item prop="bannerUrl" label="banner图片:">
                    <bannerUpload :imgPath="newData.bannerUrl" @getImgUrl="getBannerUrl"></bannerUpload>
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
    import bannerUpload from "@/components/bannerUpload";

    export default {
        components: {
            uploadFile,
            editor,
            bannerUpload,
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
                    isLink: false,
                    link: '',
                    ordery: 0,
                    introduce: '',
                    isIntroduction: false,
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
                rules1: {
                    title: [
                        {required: true, message: "标题不能为空", trigger: "blur"},
                    ],
                    link: [
                        {required: true, message: "跳转链接不能为空", trigger: "blur"},
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
                if (!this.newData.isLink) {
                    this.newData.content = this.$refs.editor.getUEContent();
                }
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
            getBannerUrl(url) {
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
