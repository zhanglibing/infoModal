<template>
    <div class="classGood">
        <el-card>
            <div class="search-box">
                <label for=""><b>一级菜单标签：</b>
                    <el-select @change="rootChange" v-model="rootId" clearable>
                        <el-option v-for="item in menuData" :key="item.id" :value="item.id"
                                   :label="item.name">
                        </el-option>
                    </el-select>
                </label>
                <label for=""><b>二级菜单标签：</b>
                    <el-select @change="getList" v-model="categoryId" clearable>
                        <el-option v-for="item in childData" :key="item.id" :value="item.id"
                                   :label="item.name">
                        </el-option>
                    </el-select>
                </label>
                <el-button type="primary" icon="el-icon-search" @click="getList">搜索</el-button>
                <el-button type="primary" @click="add">新增</el-button>
            </div>
            <el-table :data="data"
                      ref="multipleTable"
                      :stripe="true" :size="size">
                <el-table-column prop="id" label="id"></el-table-column>
                <el-table-column prop="title" label="标题名称"></el-table-column>
                <el-table-column prop="ZPRICE" label="一级导航">
                    <template slot-scope="{row:{categoryId}}">
                        {{getPname(categoryId,"root")}}
                    </template>
                </el-table-column>
                <el-table-column prop="CATEGORYID" label="二级导航">
                    <template slot-scope="{row:{categoryId}}">
                        {{getPname(categoryId,"child")}}
                    </template>
                </el-table-column>
                <el-table-column prop="createdAt" label="创建时间"></el-table-column>
                <el-table-column label="操作" width="200">
                    <template slot-scope="scope">
                        <el-button type="text" @click="goDetail(scope.row.id)">查看详情</el-button>
                        <el-divider direction="vertical"></el-divider>
                        <el-button type="text" @click="deleteProduct(scope.row.id)" style="color:red;">删除</el-button>
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
    import mixins from "../partners/mixin";

    export default {
        mixins: [mixins],
        data() {
            return {
                PTYPE: 3,
                size: "mini",
                data: [],
                menuData: [],
                childData: [],
                rootId: "",
                categoryId: "",
            };
        },
        created() {
            this.getMenus();
        },
        methods: {
            //获取菜单
            async getMenus() {
                const data = await this.api.menu.getList({});
                this.menuData = data;
                this.getList();
            },
            rootChange() {
                if (!this.rootId) {
                    this.childData = [];
                    this.categoryId = "";
                    return false;
                }
                const data = this.menuData.find(v => v.id == this.rootId);
                this.childData = data.menus;
                this.getList();
            },
            getPname(categoryId, type = "child") {
                let child = "";
                let parent = "";
                if (!categoryId) {
                    return "";
                }
                this.menuData.some(v => {
                    if (v.menus.some(val => {
                        if (val.id == categoryId) {
                            child = val.name;
                            return true;
                        }
                    })) {
                        parent = v.name;
                        return true;
                    }
                });
                return type == "child" ? child : parent;
            },
            goDetail(id) {
                this.$router.push({path: "/admin/content/edit", query: {id}});
            },
            add() {
                this.$router.push("/admin/content/add");
            },
        },
        computed: {
            categoryIds() {
                if (this.categoryId) {
                    return this.categoryId;
                }
                if (this.rootId) {
                    const data = this.menuData.find(v => v.id == this.rootId).menus.map(v => v.id);
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

