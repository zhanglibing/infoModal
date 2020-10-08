import {Counseling_status} from "@/common/js/constant";

export default {
    data() {
        return {
            Counseling_status: Counseling_status,
            size: "mini",
            data: [],

            page: 1,
            limit: 10,
            count: 2,
            PNAME: "",
            PSTS: -1,
            categoryId:'F2F9EAFA3C564FE9BFF85B8886F8E3BB'
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
                limit: this.limit,
                categoryId:this.categoryId,
            };
            const {data, count} = await this.api.product.getContentList(params);
            this.data = data;
            this.count = count;
        },
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
    },
};
