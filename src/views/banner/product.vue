<template>
    <el-dialog title="内容列表" :visible.sync="dialogVisible"
               :close-on-click-modal="false"
               @close="hideDialog">
        <el-card>
            <div class="search-box">
                <label for=""><b>一级菜单标签：</b>
                    <el-select @change="rootChange" v-model="rootId" clearable>
                        <el-option v-for="item in menuData" :key="item.ID" :value="item.ID"
                                   :label="item.PNAME">
                        </el-option>
                    </el-select>
                </label>
                <label for=""><b>二级菜单标签：</b>
                    <el-select @change="getList" v-model="categoryId" clearable>
                        <el-option v-for="item in childData" :key="item.ID" :value="item.ID"
                                   :label="item.PNAME">
                        </el-option>
                    </el-select>
                </label>
                <el-button type="primary" icon="el-icon-search" @click="getList">搜索</el-button>
            </div>
            <el-table :data="data"
                      :max-height="400"
                      ref="multipleTable"
                      :stripe="true" :size="size">
                <el-table-column label width="35">
                    <template slot-scope="scope">
                        <el-radio :label="scope.row.ID" v-model="radioId">&nbsp;</el-radio>
                    </template>
                </el-table-column>
                <el-table-column prop="ID" label="ID"></el-table-column>
                <el-table-column prop="TITLE" label="标题名称"></el-table-column>
                <el-table-column prop="ZPRICE" label="一级导航">
                    <template slot-scope="{row:{CATEGORYID}}">
                        {{getPname(CATEGORYID,"root")}}
                    </template>
                </el-table-column>
                <el-table-column prop="CATEGORYID" label="二级导航">
                    <template slot-scope="{row:{CATEGORYID}}">
                        {{getPname(CATEGORYID,"child")}}
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination_wrapper">
                <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="page"
                        :page-size="limit"
                        layout="total, prev, pager, next"
                        :total="count">
                </el-pagination>
            </div>
        </el-card>
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
        },
        data() {
            return {
                size: "mini",
                data: [],
                page: 1,
                limit: 10,
                count: 0,
                menuData: [],
                childData: [],
                rootId: "",
                categoryId: "",
                radioId: "", //选中的产品id
            };
        },
        created() {
            this.getRsPageModelByMID();

        },
        methods: {
            hideDialog() {
                this.$emit("hide");
            },
            submit() {
                if (!this.radioId) {
                    this.$message.error("请选择内容");
                    return;
                }
                this.$emit("setSelect", this.data.find(v => v.ID === this.radioId));
                this.hideDialog();
            },
            //获取菜单
            async getRsPageModelByMID() {
                const {data = []} = await this.api.menu.getRsPageModelByMID({});
                this.menuData = data;
                this.getList();
            },
            rootChange() {
                if (!this.rootId) {
                    this.childData = [];
                    this.categoryId = "";
                    return false;
                }
                const data = this.menuData.find(v => v.ID == this.rootId);
                this.childData = data.Children;
                this.getList();
            },
            handleSelectionChange(val) {
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
                    limit: this.limit,
                    categoryId: this.categoryIds,
                };
                const {data, count} = await this.api.product.getContentList(params);
                this.data = data;
                this.count = count;
            },
            getPname(CATEGORYID, type = "child") {
                let child = "";
                let parent = "";
                if (!CATEGORYID) {
                    return "";
                }
                this.menuData.some(v => {
                    if (v.Children.some(val => {
                        if (val.ID === CATEGORYID) {
                            child = val.PNAME;
                            return true;
                        }
                    })) {
                        parent = v.PNAME;
                        return true;
                    }
                });
                return type == "child" ? child : parent;
            },
        },
        computed: {
            categoryIds() {
                if (this.categoryId) {
                    return this.categoryId;
                }
                if (this.rootId) {
                    const data = this.menuData.find(v => v.ID == this.rootId).Children.map(v => v.ID);
                    return data.join(",");
                }
                return "";
            },
        },
    };
</script>
<style lang="scss" scoped="">
    .search-box {
        margin-bottom: 10px;

        label {
            display: inline-block;
            margin-right: 10px;

            b {
                margin-right: 4px;
            }
        }

        .el-select {
            width: 150px;
        }
    }

    .btn_box {
        margin-bottom: 15px;
    }
</style>
