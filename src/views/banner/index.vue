<template>
    <div class="classGood">
        <el-card>
            <div class="search-box">
                <label for=""><b>文章名称：</b>
                    <el-input placeholder="请输入" v-model.trim="PNAME" clearable></el-input>
                </label>
                <label for=""><b>审核状态 ：</b>
                    <el-select v-model="PSTS">
                        <el-option :value="-1"
                                   label="全部"
                                   :key="-1"></el-option>
                        <el-option v-for="item in Counseling_status"
                                   :value="item.value"
                                   :label="item.label"
                                   :key="item.value"></el-option>
                    </el-select>
                </label>
                <el-button type="primary" icon="el-icon-search" @click="getList">搜索</el-button>
                <el-button type="primary" @click="add">新增心理文章</el-button>
            </div>
            <el-table :data="data"
                      ref="multipleTable"
                      :stripe="true" :size="size">
                <el-table-column prop="INAME" label="文章标题"></el-table-column>
                <el-table-column prop="XPRICE" label="现价"></el-table-column>
                <el-table-column prop="ZPRICE" label="原价"></el-table-column>
                <el-table-column prop="IFROM" label="来源">
                    <template slot-scope="{row:{IFROM}}">
                        {{IFROM|filterSource}}
                    </template>
                </el-table-column>
                <el-table-column prop="PSTS" label="审核状态">
                    <template slot-scope="{row:{PSTS}}">
                        <el-tag :type="PSTS|filterTag">{{PSTS|filterStatus}}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column prop="IFROM" label="是否置顶">
                    <template slot-scope="{row:{ISTOP}}">
                        <el-tag :type="ISTOP?'success':'danger'">{{ISTOP?'是':'否'}}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column prop="ISSHELF" label="上架状态">
                    <template slot-scope="{row:{ISSHELF}}">
                        <el-tag :type="ISSHELF?'success':'danger'">{{ISSHELF?'已上架':'未上架'}}
                        </el-tag>
                    </template>
                </el-table-column>
                <el-table-column prop="CREATEDATE" label="创建日期"></el-table-column>
                <el-table-column label="操作" width="200">
                    <template slot-scope="{row:{ISSHELF,ID,PSTS}}">
                        <el-button type="text" @click="goDetail(ID)">查看详情</el-button>
                        <el-divider direction="vertical"></el-divider>
                        <el-button v-if="ISSHELF" type="text" @click="setProduct(ID,0)">下架
                        </el-button>
                        <template v-else>
                            <el-button  :disabled="PSTS!=2"  type="text" @click="setProduct(ID,1)">上架</el-button>
                            <el-divider direction="vertical"></el-divider>
                            <el-button type="text" @click="deleteProduct(ID)" style="color:red;">删除
                            </el-button>
                        </template>
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
    import mixin from '../product/mixin'
    export default {
        mixins:[mixin],
        data() {
            return {
                PTYPE: '2', //产品大类型1心理课程2心理文章3心理fm
            }
        },
        methods: {
            goDetail(id) {
                this.$router.push({path: '/admin/banner/edit', query: {id}});
            },
            add() {
                this.$router.push('/admin/banner/add');
            }

        },
        computed: {}

    }
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
