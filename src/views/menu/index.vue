<template>
    <el-card>
        <div class="add_root">
            <el-button type="primary" :disabled="!isEdit" @click="isShowRootDialog=true">新增根菜单</el-button>
        </div>
        <div class="flex_box">
            <div class="menu_box">
                <el-card shadow="hover">
                    <el-tree
                            :data="data"
                            node-key="ID"
                            :props="defaultProps"
                            :default-expanded-keys="[2, 3]"
                            @node-click="nodeClick"
                            :default-checked-keys="[1]">
                        <div class="custom-tree-node" slot-scope="{ node, data }">
                            <div :class="`flex_box ${clickId==data.ID?'active':''}`">
                                <span>{{ data.PNAME }}</span>
                                <div class="tree_btn_box" v-if="clickId==data.ID">
                                    <template v-if="isEdit">
                                        <i class="el-icon-circle-plus" @click="() => add(data,node)"></i>
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
                <function-button  :midType="this.menuType" :pId="clickId" v-if="clickId"></function-button>
            </div>
        </div>

        <add-root-menu :midType="this.menuType" :data="activeMenu" :dialogVisible="isShowRootDialog" @hideDialog="hideDialog"></add-root-menu>
        <add-child-menu :midType="this.menuType"  :data="activeMenu" :PPID="clickId" :dialogVisible="isShowChildDialog"
                        @hideDialog="hideDialog"></add-child-menu>

    </el-card>
</template>
<script>
    import FunctionButton from './components/functionButton';
    import MenuInfo from './components/menuInfo';
    import AddRootMenu from './components/addRootMenu';
    import AddChildMenu from './components/addChildMenu';

    export default {
        props:{
            menuType:{
                type:String,
                required:true,
            }
        },
        components: {
            FunctionButton,
            MenuInfo,
            AddRootMenu,
            AddChildMenu,
        },
        data() {
            return {
                activeName: 'first',
                data: [],
                defaultProps: {
                    children: 'Children',
                    label: 'PNAME',
                },
                activeMenu: {},
                showInfoMenu: {},
                clickId: '',
                isShowRootDialog: false,
                isShowChildDialog: false,
                isEdit:this.$store.state.userInfo.ULOGINNAME=='13620676550',
            }
        },
        created() {
            this.getRsPageModelByMID();
        },
        methods: {
            async getRsPageModelByMID() {
                this.data = await this.api.menu.getRsPageModelByMID({midType:this.menuType});
            },
            add(data, node) {
                if(!this.check()) return false;
                this.isShowChildDialog = true;
            },
            edit(data, node) {
                this.activeMenu = data;
                if (data.PLVL == 1) {
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
                    this.getRsPageModelByMID();
                }

            },
            nodeClick(node) {
                setTimeout(() => {
                    this.showInfoMenu = node;
                    this.clickId = node.ID;
                })
            },
            handleClick() {

            },
            deleteMenu() {
                if(!this.check()) return false;
                this.$confirm('确认删除该菜单吗?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.api.menu.deleteMenu({rsPageId:this.clickId,midType:this.menuType}).then(res => {
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                        this.getRsPageModelByMID();
                    }).catch(err => {
                        this.$message.error(err);
                    })

                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            check(){
                if(this.isEdit){
                    return true;
                }
                this.$message.error('此操作只有开发人员有权限,如需修改请联系开发人员');
                return false;
            }
        }
    }
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
