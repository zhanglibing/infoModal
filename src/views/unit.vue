<template>
    <div class="page_wrapper">
        <div class="banner_box">
            <img src="../../static/images/unit_bg.png" alt="">
        </div>
        <el-card>
            <el-table :data="data"
                      ref="multipleTable"
                      :stripe="true" :size="size">
                <el-table-column type="index" label="序号" width="50"></el-table-column>
                <el-table-column prop="name" label="单位名称"></el-table-column>
                <el-table-column prop="industry" label="所属行业"></el-table-column>
                <el-table-column prop="modelName" label="信息模型名称"></el-table-column>
                <el-table-column prop="modelIntroduce" label="信息模型介绍"></el-table-column>
                <el-table-column prop="contactName" width="70" label="联系人"></el-table-column>
                <el-table-column prop="phone" label="联系电话"></el-table-column>
                <el-table-column prop="testDoc" label="测试文档">
                    <template slot-scope="{row:{testDoc,bannerUrl}}">
                        {{testDoc}}
                        <a style="color:#02145F;text-decoration: underline;margin-left: 10px;" v-if="bannerUrl"
                           :href="bannerUrl" target="_blank">下载</a>
                    </template>
                </el-table-column>
                <el-table-column prop="createdAt" label="创建时间">
                    <template slot-scope="{row}">
                        {{row.createdAt.replace('T',' ').slice(0,19)}}
                    </template>
                </el-table-column>
            </el-table>
            <div class="entry">
                <el-button type="primary" @click="dialogVisible=true">申请测试</el-button>
            </div>
        </el-card>
        <el-dialog
                title="上传测试文档"
                :visible.sync="dialogVisible"
                width="60%"
                :before-close="ialogVisible = false">
            <div>
                <el-form label-position="right" ref="ruleForm" label-width="130px" :rules="rules" :model="newData">
                    <el-form-item prop="name" label="单位名称">
                        <el-input v-model.trim="newData.name" :maxLength="100" placeholder="单位名称"></el-input>
                    </el-form-item>
                    <el-form-item prop="industry" label="所属行业">
                        <el-input v-model.trim="newData.industry" placeholder="所属行业"></el-input>
                    </el-form-item>
                    <el-form-item prop="modelName" label="信息模型名称">
                        <el-input v-model.trim="newData.modelName" :maxLength="100" placeholder="信息模型名称"></el-input>
                    </el-form-item>
                    <el-form-item prop="modelIntroduce" label="信息模型介绍">
                        <el-input type="textarea" v-model="newData.modelIntroduce" placeholder="信息模型介绍"></el-input>
                    </el-form-item>
                    <el-form-item prop="contactName" label="联系人">
                        <el-input v-model.trim="newData.contactName" :maxLength="8" placeholder="信息模型名称"></el-input>
                    </el-form-item>
                    <el-form-item prop="phone" label="联系方式">
                        <el-input v-model.trim="newData.phone"  :maxLength="11" placeholder="信息模型名称"></el-input>
                    </el-form-item>
                    <el-form-item prop="testDoc" label="测试文档">
                        <div class="testDoc">
                            <span v-if="newData.testDoc">{{newData.testDoc}}</span>
                            <uploadFile @getImgUrl="getImgUrl"></uploadFile>
<!--                            <el-button v-if="newData.bannerUrl" @click="uploadFileByUrl">下载</el-button>-->
                        </div>
                    </el-form-item>
                </el-form>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="save">确 定</el-button>
            </span>
        </el-dialog>

    </div>

</template>
<script>
    import uploadFile from "@/components/uploadFile";

    export default {
        components: {
            uploadFile,
        },
        data() {
            return {
                size: "mini",
                data: [],

                page: 1,
                limit: 10,
                count: 2,
                title: "",
                dialogVisible:false,
                newData: {
                    name: "",
                    modelName: "",
                    // hasTset: "",
                    testDoc: "",
                    bannerUrl: "",
                    industry: '',
                    modelIntroduce: '',
                    phone: '',
                    contactName: '',
                },
                rules: {
                    name: [
                        {required: true, message: "单位名称不能为空", trigger: "blur"},
                    ],
                    modelName: [
                        {required: true, message: "信息模型名称不能为空", trigger: "blur"},
                    ],
                    contactName: [
                        {required: true, message: "联系人不能为空", trigger: "blur"},
                    ],
                    phone: [
                        {required: true, message: "联系方式不能为空", trigger: "blur"},
                    ],
                    testDoc: [
                        {required: true, message: "请上传测试文档", trigger: "blur"},
                    ],
                },
            };
        },
        created() {
            this.getList();
        },
        methods: {
            getImgUrl({url, name}) {
                this.newData.testDoc = name;
                this.newData.bannerUrl = url;
            },
            handleSizeChange(val) {
                this.limit = val;
                this.getList();
            },
            handleCurrentChange(val) {
                this.page = val;
                this.getList();
            },
            async getList() {
                let params = {
                    page: this.page,
                    pageSize: 1000,
                    title: this.title,
                    status: 2,
                };
                const {count, rows} = await this.api.business.getList(params);
                this.data = rows;
                this.count = count;
            },
            //保存产品信息
            save() {
                this.$refs.ruleForm.validate((valid) => {
                    if (valid) {
                        this.isHttp = true;
                        this.api.business.add(this.newData).then(res => {
                            this.isHttp = false;
                            this.$message.success(`新增成功,等待审核。。。`);
                            this.dialogVisible=false;
                        }).catch(res => {
                            this.isHttp = false;
                            this.$message.error(res);
                        });
                    } else {
                        return false;
                    }
                });

            },
        },
        computed: {},

    };
</script>
<style lang="scss" scoped="">

    .page_wrapper {
        max-width: 1200px;
        margin: 20px auto 50px;
    }

    .banner_box {
        width: 100%;
        margin-bottom: 20px;

        img {
            width: 100%;
        }
    }

    .entry {
        display: flex;
        justify-content: center;
        padding: 30px;
    }
</style>
