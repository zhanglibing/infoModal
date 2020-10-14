<template>
    <div class="customerRole">
        <div v-title>角色管理</div>
        <div class="top">
            <h2 class="pageTitle">角色管理</h2>
            <el-button type="primary" size="mini" icon="el-icon-plus" @click="addClick"
                       :disabled="$isPermission('role','add')">添加角色
            </el-button>
        </div>
        <el-card>
            <el-table :data="$store.state.roleList" border size="mini" :stripe="true">
                <el-table-column prop="name" label="角色名称"></el-table-column>
                <el-table-column prop="remark" label="备注"></el-table-column>
                <el-table-column label="是否系统角色" width="220">
                    <template slot-scope="scope">
                        <i class="el-icon-success" v-if="scope.row.isSystem" style="color: green;font-size:18px;"></i>
                        <i class="el-icon-error" v-else="" style="color: red;font-size:18px;"></i>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="200">
                    <template slot-scope="scope">
                        <el-button type="info" :disabled="scope.row.isSystem|| $isPermission('role','update')" size="mini"
                                   icon="el-icon-edit" @click="editClick(scope.row)">编辑
                        </el-button>
                        <el-button type="danger" :disabled="scope.row.isSystem||$isPermission('role','delete')" size="mini"
                                   icon="el-icon-delete"
                                   @click="deleteRole(scope.row.id)">删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
        <div class="edit_box" v-if="isActive" @click.self="hide">
            <el-card class="con_box">
                <h2 class="title">{{isAdd ? "新增" : '编辑'}}客户角色</h2>
                <el-form label-position="right" ref="elForm" label-width="100px" :model="editData">
                    <el-form-item prop="name" label="角色名称">
                        <el-input v-model="editData.name" placeholder="请填写名称" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="是否系统角色">
                        <el-checkbox v-model="editData.isSystem"></el-checkbox>
                    </el-form-item>
                    <el-form-item prop="name" label="备注">
                        <el-input type="textarea" v-model="editData.remark" placeholder="请填写名称"
                                  auto-complete="off"></el-input>
                    </el-form-item>
                </el-form>
                <el-button type="primary" @click="saveRole">保存</el-button>
                <el-button type="info" @click="hide">取消</el-button>
            </el-card>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                editData: {
                    name: '',
                    isSystem: false,
                    remark: '',
                },
                isActive: false,
                isAdd: false,
            }
        },
        created() {
            this.getRoleList();
        },
        methods: {
            //获取角色列表
            getRoleList() {
                this.$store.dispatch('getRoles', true);
            },
            //保存角色
            saveRole() {
                let msg = this.isAdd ? '新增成功' : '编辑成功';
                this.api.user.saveRole(this.editData).then(res => {
                    this.$message.success(msg);
                    this.hide();
                    this.getRoleList();
                })
            },
            //删除角色
            deleteRole(id) {
                this.$confirm('确认删除该角色吗?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.api.user.deleteRoleById(id).then(res => {
                        this.$message.success('删除成功');
                        this.getRoleList();
                    })
                })

            },
            //编辑
            editClick(obj) {
                this.editData = {...obj}
                this.isActive = true;
                this.isAdd = false;
            },
            addClick() {
                this.isActive = true;
                this.isAdd = true;
            },
            hide() {
                this.isActive = false;
                this.isAdd = false;
                this.editData = {
                    name: '',
                    isSystem: '',
                    remark: '',
                }
            }
        }
    }
</script>
<style lang="scss" scoped="">
    @import "../../common/css/mixins";

    .top {
        position: relative;

        button {
            position: absolute;
            top: 0;
            right: 30px;
        }
    }

    .edit_box {
        @include fullScreen;
        background: rgba(0, 0, 0, 0.7);
        width: calc(100vw);
        z-index: 200;

        .con_box {
            @include middle;
            width: 460px;

            .title {
                text-align: center;
                margin-bottom: 20px;
            }

            button:last-child {
                float: right;
            }

        }
    }
</style>
