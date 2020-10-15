<template>
    <div class="page_wrapper">
        <div class="banner_box">
            <img src="../../static/images/unit_bg.png" alt="">
        </div>
        <el-table :data="data"
                  ref="multipleTable"
                  :stripe="true" :size="size">
            <el-table-column prop="id" label="序号"></el-table-column>
            <el-table-column prop="name" label="企业名称"></el-table-column>
            <el-table-column prop="modelName" label="模型名称"></el-table-column>
            <el-table-column prop="testDoc" label="测试文档">
                <template slot-scope="{row:{testDoc,bannerUrl}}">
                    {{testDoc}}
                    <a style="color:#02145F;text-decoration: underline;margin-left: 10px;" v-if="bannerUrl" :href="bannerUrl" target="_blank">下载</a>
                </template>
            </el-table-column>
            <el-table-column prop="hasTset" label="已测试项"></el-table-column>
            <el-table-column prop="createdAt" label="创建时间"></el-table-column>
        </el-table>
    </div>

</template>
<script>

    export default {
        data() {
            return {
                size: "mini",
                data: [],

                page: 1,
                limit: 10,
                count: 2,
                title: "",
            };
        },
        created() {
            this.getList();
        },
        methods: {
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
                };
                const {count, rows} = await this.api.business.getList(params);
                this.data = rows;
                this.count = count;
            },
        },
        computed: {},

    };
</script>
<style lang="scss" scoped="">

   .page_wrapper{
       max-width: 1200px;
       margin: 20px auto 50px;
   }
    .banner_box{
        width:100%;
        margin-bottom: 20px;
        img{
            width:100%;
        }
    }
</style>
