<template>
    <div class="classGood">
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
                <el-button type="primary" @click="add">新增</el-button>
            </div>
            <el-table :data="data"
                      ref="multipleTable"
                      :stripe="true" :size="size">
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
                <el-table-column prop="CREATEDDATE" label="创建时间"></el-table-column>
                <el-table-column label="操作" width="200">
                    <template slot-scope="scope">
                        <el-button type="text" @click="goDetail(scope.row.ID)">查看详情</el-button>
                        <el-divider direction="vertical"></el-divider>
                        <el-button type="text" @click="deleteProduct(scope.row.ID)" style="color:red;">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination_wrapper">
                <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="page"
                        :page-sizes="[10, 20]"
                        :page-size="limit"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="count">
                </el-pagination>
            </div>
        </el-card>
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
                count: 0,
                PNAME: "",
                menuData: [],
                childData: [],
                rootId: "",
                categoryId: "",
            };
        },
        created() {
            this.getRsPageModelByMID();

        },
        methods: {
            //获取菜单
            async getRsPageModelByMID() {
                const {data = []} = await this.api.menu.getRsPageModelByMID({});
                this.menuData = data;
                this.getList();
            },
            rootChange() {
                if (!this.rootId) {
                    this.childData = [];
                    this.categoryId = '';
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
            // 删除内容
            deleteProduct(cid) {
                this.$confirm("确认删除该产品?", "提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning",
                }).then(() => {
                    this.api.product.delContent({cid}).then(res => {
                        this.$message.success("删除成功!");
                        this.getList();
                    }).catch(err => {
                        this.$message.error(err);
                    });
                }).catch(() => {
                });
            },
            goDetail(id) {
                this.$router.push({path: "/admin/content/edit", query: {id}});
            },
            add() {
                this.$router.push("/admin/content/add");
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

        .el-input {
            width: 200px;
        }
    }

    .btn_box {
        margin-bottom: 15px;
    }
</style>
