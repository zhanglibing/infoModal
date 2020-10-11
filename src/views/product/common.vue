<template>
    <div class="customerEdit">
        <el-card>
            <el-form label-position="right" ref="ruleForm" label-width="130px" :rules="rules" :model="newData">
                <el-form-item prop="TITLE" label="标题">
                    <el-input v-model.trim="newData.TITLE" placeholder="标题"></el-input>
                </el-form-item>

                <el-form-item prop="FULL" label="内容">
                    <editor ref="editor" :msg="newData.FULL"></editor>
                </el-form-item>
                <el-form-item prop="IDETAILS" @change="rootChange" label="关联一级菜单">
                    <el-select @change="rootChange" v-model="rootId">
                        <el-option v-for="item in menuData" :key="item.ID" :value="item.ID"
                                   :label="item.PNAME">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop="CATEGORYID" label="关联二级菜单">
                    <el-select v-model="newData.CATEGORYID">
                        <el-option v-for="item in childData" :key="item.ID" :value="item.ID"
                                   :label="item.PNAME"></el-option>
                    </el-select>
                </el-form-item>
                <!--                <el-form-item prop="IURL" label="文件上传">-->
                <!--                    <UploadAuth @getPath="getVideoInfo"></UploadAuth>-->
                <!--                </el-form-item>-->
                <el-form-item label="创建时间" v-if="newData.ID">
                    {{newData.CREATEDDATE}}
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

    export default {
        components: {
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
                PID: this.$route.query.id,
                menuData: [],
                childData: [],
                newData: {
                    TITLE: "",
                    SHORT: "测试",
                    FULL: "",
                    CATEGORYID: "",
                    PICTUREURL: "null",
                    PUBLISHED: true,
                    FILEURL: "null", //关联文件
                    ALLOWCOMMENTS: false,
                    METAKEYWORDS: "ceshi ", //关键字
                    STARTDATEUTC: "",
                    ENDDATEUTC: "",
                    METADESCRIPTION: "ceshi ",
                    METATITLE: "ceshi",
                },
                rules: {
                    TITLE: [
                        {required: true, message: "标题不能为空", trigger: "blur"},
                    ],
                    FULL: [
                        {required: true, message: "内容不能为空", trigger: "blur"},
                    ],
                    CATEGORYID: [
                        {required: true, message: "请选择二级菜单", trigger: "change"},
                    ],
                },
                rootId: "",
            };
        },
        created() {
            this.getRsPageModelByMID();
            if (this.type === "edit") {
                this.getProduct();
            }
        },
        methods: {
            //获取菜单
            async getRsPageModelByMID() {
                const {data = []} = await this.api.menu.getRsPageModelByMID({});
                this.menuData = data;
            },
            rootChange() {
                const data = this.menuData.find(v => v.ID == this.rootId);
                this.childData = data.Children;
            },
            // 获取产品详情
            async getProduct() {
                try {
                    this.newData = await this.api.product.getContent({cid: this.PID});
                    this.init();
                } catch (e) {
                    this.$message.error(e);
                }
            },
            init() {
                const CATEGORYID = this.newData.CATEGORYID;
                this.menuData.some(v => {
                    if (v.Children.some(val => val.ID === CATEGORYID)) {
                        this.rootId = v.ID;
                        this.rootChange();
                        return true;
                    }
                });
            },
            getVideoUrl() {
                this.api.file.getPlayURL({videoId: this.newData.IURL}).then(res => {
                    this.videoUrl = res.PlayInfoList[0].PlayURL;
                });
            },
            //保存产品信息
            save() {
                this.newData.FULL = this.$refs.editor.getUEContent();
                this.$refs.ruleForm.validate((valid) => {
                    if (valid) {
                        this.isHttp = true;
                        const {addContent, updateContent} = this.api.product;
                        const fun = this.type === "add" ? addContent : updateContent;
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
                this.newData.IURL = url;
            },
        },


    };
</script>
<style lang="scss" scoped="">

    .el-select, .el-textarea, .el-input {
        width: 600px;

    }

    .smscode_box {
        display: flex;
        align-items: center;

        img_box {
            margin-left: 10px;
        }
    }


</style>
