import {Counseling_status} from "@/common/js/constant";

export default {
    data() {
        return {
            size: "mini",
            data: [],

            page: 1,
            limit: 10,
            count: 2,
            title: "",
            PSTS: -1,
        };
    },
    created() {
        this.getList();
    },
    methods: {
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
                pageSize: this.limit,
                type: this.PTYPE,
                title:this.title,
            };
            const {count,rows} = await this.api.content.getList(params);
            this.data = rows;
            this.count = count;
        },
        deleteProduct(id) {
            this.$confirm("确认删除该产品?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
            }).then(() => {
                this.api.content.deleteContent({id}).then(res => {
                    this.$message.success("删除成功!");
                    this.getList();
                }).catch(err => {
                    this.$message.error(err);
                });
            }).catch(() => {
            });
        },

    },
};
