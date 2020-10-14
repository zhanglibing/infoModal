<template>
    <el-card>
        <div class="add_root">
            <el-button type="primary" @click="isShowRootDialog=true">新增根菜单</el-button>
        </div>
        <div class="flex_box">
            <div class="menu_box">
                <el-card shadow="hover">
                    <el-tree
                            :data="data"
                            node-key="ID"
                            default-expand-all
                            :props="defaultProps"
                            :default-expanded-keys="[2, 3]"
                            @node-click="nodeClick"
                            :default-checked-keys="[1]">
                        <div class="custom-tree-node" slot-scope="{ node, data }">
                            <div :class="`flex_box ${clickId==data.id?'active':''}`">
                                <span>{{ data.name }}
                                    <span v-if="data.parentId==0"
                                          style="color:red;font-size:10px;"> 顺序：{{data.sort}}</span></span>
                                <div class="tree_btn_box" v-if="clickId==data.id">
                                    <template>
                                        <i v-if="data.parentId==0" class="el-icon-circle-plus"
                                           @click="() => add(data,node)"></i>
                                        <i class="el-icon-edit-outline" @click="() => edit(data,node)"></i>
                                        <i class="el-icon-delete" @click="() => deleteMenu(data,node)"></i>
                                    </template>
                                    <i class="el-icon-arrow-right"></i>
                                </div>
                            </div>
                        </div>
                    </el-tree>
                </el-card>
            </div>
            <div class="info_box">
                <menu-info :data="showInfoMenu"></menu-info>
            </div>
        </div>

        <add-root-menu :data="activeMenu" v-if="isShowRootDialog" :dialogVisible="isShowRootDialog" @hideDialog="hideDialog"></add-root-menu>
        <add-child-menu :data="activeMenu" v-if="isShowChildDialog" :PPID="clickId" :dialogVisible="isShowChildDialog"
                        @hideDialog="hideDialog"></add-child-menu>

    </el-card>
</template>
<script>
    import MenuInfo from "./components/menuInfo";
    import AddRootMenu from "./components/addRootMenu";
    import AddChildMenu from "./components/addChildMenu";

    export default {
        components: {
            MenuInfo,
            AddRootMenu,
            AddChildMenu,
        },
        data() {
            return {
                activeName: "first",
                data: [],
                defaultProps: {
                    children: "menus",
                    label: "name",
                },
                activeMenu: {},
                showInfoMenu: {},
                clickId: "",
                isShowRootDialog: false,
                isShowChildDialog: false,
            };
        },
        created() {
            this.getList();
        },
        methods: {
            async getList() {
                let data = await this.api.menu.getList({});
                this.data = data;
            },
            add(data, node) {
                this.isShowChildDialog = true;
            },
            edit(data, node) {
                this.activeMenu = data;
                if (data.parentId == 0) {
                    this.isShowRootDialog = true;
                } else {
                    this.isShowChildDialog = true;
                }

            },
            hideDialog(isRefresh = false) {
                this.activeMenu = {};
                this.isShowRootDialog = false;
                this.isShowChildDialog = false;
                if (isRefresh) {
                    this.getList();
                }

            },
            nodeClick(node) {
                setTimeout(() => {
                    this.showInfoMenu = node;
                    this.clickId = node.id;
                });
            },
            handleClick() {

            },
            deleteMenu(data, node) {
                console.log(data,node)
                this.$confirm("确认删除该菜单吗?", "提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning",
                }).then(() => {
                    this.api.menu.deleteMenu({id:data.id}).then(res => {
                        this.$message({
                            type: "success",
                            message: "删除成功!",
                        });
                        this.getList();
                    }).catch(err => {
                        this.$message.error(err);
                    });

                }).catch(() => {
                    this.$message({
                        type: "info",
                        message: "已取消删除",
                    });
                });
            },
        },
    };
</script>

<style lang="scss" scoped>
    .add_root {
        margin-bottom: 15px;
    }

    .flex_box {
        display: flex;

        .menu_box {
            flex: 1;
            margin-right: 15px;

            .custom-tree-node {
                flex: 1;
                height: 100%;
                display: flex;
                justify-content: space-between;
            }

            .flex_box {
                width: 100%;
                height: 100%;
                display: flex;
                padding-right: 10px;
                justify-content: space-between;
                align-items: center;
                padding-left: 10px;

                &.active {
                    background: #F5F7FA;
                }
            }

            .tree_btn_box {

                i {
                    margin-left: 12px;
                }

                .el-icon-arrow-right {
                    margin-left: 16px;
                    cursor: default;
                }
            }
        }

        .info_box {
            flex: 2;

            .el-card {
                margin-bottom: 15px;

            }
        }
    }

</style>
